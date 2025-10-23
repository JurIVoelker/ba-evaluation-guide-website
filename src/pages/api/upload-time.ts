// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMinioClient } from "@/lib/minio";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Data = {
  group: string;
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
      return res.status(400).json({ group: "Invalid data" });
    }

    const { task1Data, task2Data, group, id } = parsed.data;
    const minio = getMinioClient();
    minio.putObject(
      process.env.S3_BUCKET!,
      id + "/data.json",
      JSON.stringify({ task1Data, task2Data, group, id })
    );

    res.status(200).end();
  }

  res.status(405).end();
}
