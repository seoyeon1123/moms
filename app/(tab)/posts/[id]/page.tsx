import db from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getDetailPost(id: number) {
  const post = await db.post.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      photo: true,
      views: true,
      createdAt: true,
      user: { select: { username: true } },
    },
  });

  console.log(post); // 포스트 데이터가 제대로 조회되는지 확인
  return post;
}

export default async function DetailPost({
  params,
}: {
  params: { id: number };
}) {
  const post = await getDetailPost(params.id);
  if (!post) {
    return notFound();
  }
  console.log(post);

  return (
    <>
      <h1>{post?.title}</h1>
      <p>{post?.description}</p>
      <p>{post?.views}</p>
      <p>{post?.user.username}</p>
      {post.photo && (
        <Image src={post.photo} alt={post.title} className="w-full h-auto" />
      )}
    </>
  );
}
