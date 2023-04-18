// pages/api/saveContent.js
import { prisma } from "@/prisma/config/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const contentString = req.body.content as string | undefined;

    const createdPost = await prisma.post.create({
      data: {
        content: contentString,
      },
    });

    res.status(200).json({ id: createdPost.id });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
