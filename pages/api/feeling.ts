import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../constants/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method == 'GET' && session) {
    try {
      const feelings = await prisma.feeling.findMany();
      res.send(JSON.stringify(feelings));
    } catch (e) {
      console.log(e);
    }
  } else {
    res.status(400);
  }
}
