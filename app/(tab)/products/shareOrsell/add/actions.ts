'use server';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import z from 'zod';

// Form Schema 정의
const formSchema = z.object({
  title: z.string({
    required_error: '제목을 입력해주세요',
  }),
  description: z
    .string({
      required_error: '내용을 입력해주세요.',
    })
    .min(10, '내용을 자세하게 입력해주세요. 최소 10글자 입니다.'),
  photo: z.string({
    required_error: '사진을 필수적으로 추가해주세요.',
  }),
  category: z.string({
    required_error: '카테고리는 필수 선택입니다.',
  }),
  price: z.number().optional().nullable(), // 선택적 필드로 수정
  share: z.boolean().optional().nullable(), // 선택적 필드로 수정
});

export default async function AddAction(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    photo: formData.get('photo'),
    category: formData.get('category'),
    price: formData.get('price')
      ? parseInt(formData.get('price') as string)
      : null, // 빈 문자열인 경우 null로 설정
    share: formData.get('share') === 'on' ? true : null, // 'on'일 경우 true로 설정
  };
  console.log(data);

  const result = formSchema.safeParse(data);
  console.log(result.data);
  console.log('Validation Result:', result);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    await db.product.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        price: result.data.price,
        share: result.data.share,
        photo: result.data.photo,
        category: result.data.category,
        userId: session.id!,
      },
    });
  }
  redirect('/products/shareOrsell');
}
