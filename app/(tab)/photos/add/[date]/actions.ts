'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import React from 'react';

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

export default async function actions(prevState: any, formData: FormData) {}
