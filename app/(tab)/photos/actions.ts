'use server';

import db from '@/lib/db';

export async function getCalenderPhoto(date: string) {
  const calenderPhoto = await db.calenderPhoto.findMany({
    where: {
      date,
    },
    select: {
      id: true,
      title: true,
      description: true,
      photo: true,
      createdAt: true,
    },
  });
  return calenderPhoto;
}
