'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';
import z from 'zod';

export async function getNickName() {
  const session = await getSession();
  const nickname = await db.babyProfile.findMany({
    where: {
      userId: session.id,
    },
    select: {
      nickName: true,
    },
  });
  return nickname;
}

const formSchema = z.object({
  title: z.string({
    required_error: '제목을 입력해주세요.',
  }),
  description: z.string({
    required_error: '내용을 입력해주세요.',
  }),
  photo: z.string({
    required_error: '우리아이 사진을 추가해주세요.',
  }),
  date: z.string(),
});

export default async function PhotoAction(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    photo: formData.get('photo'),
    date: formData.get('date'),
  };

  console.log('Received form data:', data);
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  await db.calenderPhoto.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      photo: result.data.photo,
      date: result.data.date,
      userId: session.id!,
    },
  });

  redirect('/photos');
}
