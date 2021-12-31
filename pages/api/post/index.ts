import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../constants/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method == 'POST' && session) {
    const { userId, feelingInt, word, notes } = req.body;
    try {
      const post = await prisma.post.create({
        data: {
          userId,
          feelingInt,
          word,
          notes,
        },
      });
      res.status(201).json({ post });
    } catch (e) {
      console.log(e);
    }
  }
  if (req.method == 'GET' && session) {
    try {
      const posts = await prisma.user.findUnique({
        select: {
          Post: true,
        },
        where: {
          id: session.user.id,
        },
      });
      res.send(JSON.stringify(posts));
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400);
  }
}
