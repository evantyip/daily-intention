import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../constants/prisma';
import { getSession } from 'next-auth/react';
import { DayCreation } from '../../../constants/interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method == 'POST' && session) {
    const { userId, word, notes }: DayCreation = req.body;
    try {
      const day = await prisma.day.create({
        data: {
          userId,
          Intent: {
            create: [
              {
                word,
                notes,
              },
            ],
          },
        },
        include: {
          Intent: true,
        },
      });
      console.log(day);
      res.status(201).json({ day });
    } catch (e) {
      console.log(e);
      res.json(e);
      res.status(405).end();
    }
  } else {
    res.status(400);
  }
}
