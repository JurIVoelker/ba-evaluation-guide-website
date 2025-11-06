// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMinioClient } from "@/lib/minio";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Upload time API called");
  if (req.method === "POST") {
    const dataSchema = z.object({
      startTime: z.string(),
      pauseMillis: z.number(),
      totalSeconds: z.number(),
      isPaused: z.boolean(),
    });

    const schema = z.object({
      task1Data: dataSchema,
      task2Data: dataSchema,
      group: z.enum(["A", "B"]),
      id: z.string(),
    });

    const body = req.body;

    const parsed = schema.safeParse(JSON.parse(body));

    if (!parsed.success) {
      console.log(parsed.error);
      return res
        .status(400)
        .json({ error: "Falsches Datenformat: " + parsed.error.message });
    }

    const { task1Data, task2Data, group, id } = parsed.data;
    const minio = getMinioClient();

    try {
      await minio.putObject(
        process.env.S3_BUCKET!,
        id + "/data.json",
        JSON.stringify({ task1Data, task2Data, group, id })
      );
    } catch {
      return res.status(500).json({ error: "Fehler beim Speichern der Daten" });
    }

    const objects: { name?: string; lastModified?: Date; size?: number }[] =
      await new Promise((resolve, reject) => {
        const objects: { name?: string; lastModified?: Date; size?: number }[] =
          [];
        const objectStream = minio.listObjects(
          process.env.S3_BUCKET!,
          id,
          true
        );
        objectStream.on("data", function (obj) {
          objects.push(obj);
        });
        objectStream.on("end", function () {
          resolve(objects);
        });
        objectStream.on("error", function (e) {
          console.error(e);
          reject(e);
        });
      });

    let dataFound = false;
    let codeFound = false;

    for (const object of objects) {
      if (object.name === id + "/data.json") {
        dataFound = true;
        if (object.size === undefined || object.size === 0) {
          return res.status(400).json({
            error:
              "Beim hochladen der Daten ist etwas schief gelaufen. Die Datei ist leer.",
          });
        }
      }
      if (object.name === id + "/code.tar") {
        codeFound = true;
        if (object.size === undefined || object.size === 0) {
          return res.status(400).json({
            error:
              "Beim hochladen des Codes ist etwas schief gelaufen. Das Archiv ist leer.",
          });
        }
      }
    }

    if (!dataFound) {
      return res.status(400).json({
        error: "Die Daten wurden nicht hochgeladen. Bitte versuche es erneut.",
      });
    }

    if (!codeFound) {
      return res.status(400).json({
        error:
          "Dein hochgeladener Code wurde nicht gefunden. Bitte folge den Anweisungen der Webseite und führe das Kommando zum Hochladen erneut aus.",
      });
    }

    res.status(200).json({});
  }

  res.status(200).json({});
}
