// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../prisma/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  group: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const aGroupCount = await prisma.group.count({ where: { value: "A" } });
    const bGroupCount = await prisma.group.count({ where: { value: "B" } });
    if (bGroupCount > aGroupCount) {
      await prisma.group.create({ data: { value: "A" } });
      return res.status(200).json({ group: "A" });
    } else {
      await prisma.group.create({ data: { value: "B" } });
      return res.status(200).json({ group: "B" });
    }
  }

  res.status(405).end();
}
