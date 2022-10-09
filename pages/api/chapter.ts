// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId, cursor } = req.query;
  if (!videoId) {
    res.status(400).json({ message: "videoId is required" });
  }

  const data = await prisma.chapter.findMany({
    cursor: cursor && {
      id: +cursor,
    },
    take: 11,
    where: {
      videoId: +videoId,
    },
  });
  res.status(200).json({
    data: makeSerializable(data.slice(0, 10)),
    nextCursor: data[10]?.id,
  });
}
