import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../constants/prisma';
import { getSession } from 'next-auth/react';
import { ReflectionCreation } from '../../../constants/interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method == 'POST' && session) {
    const { dayId, feelingInt, notes }: ReflectionCreation = req.body;
    try {
      const reflection = await prisma.reflection.create({
        data: {
          dayId,
          feelingInt,
          notes,
        },
      });
      console.log('reflection created', reflection);
      res.status(201).json({ reflection });
    } catch (e) {
      console.log(e);
      res.json(e);
      res.status(405).end();
    }
  } else {
    res.status(400);
  }
}
