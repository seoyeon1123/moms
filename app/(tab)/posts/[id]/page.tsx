import db from '@/lib/db';
import { formatToTime } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getPostDetail(id: number) {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      description: true,
      id: true,
      views: true,
      user: {
        select: {
          username: true,
          babyProfiles: {
            select: { babyImage: true, babyname: true, nickName: true },
          },
        },
      },
      photo: true,
      createdAt: true,
    },
  });
  return post;
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const post = await getPostDetail(id);
  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-300 rounded-md shadow-sm mt-24">
      {/* 글 제목 */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-4 border-b pb-4">
        {post?.title}
      </h1>

      {/* 사용자 프로필 */}
      <div className="flex items-center mb-8 space-x-4">
        {post.user.babyProfiles[0].babyImage && (
          <Image
            src={`${post.user.babyProfiles[0].babyImage}/avatar`}
            alt={post.user.babyProfiles[0].babyname}
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
          />
        )}
        <div>
          <p className="text-lg text-gray-700 font-medium">
            {post.user.babyProfiles[0].nickName}
          </p>
          <p className="text-sm text-gray-500">{post.user.username}</p>
        </div>
      </div>

      <div className="mb-6">
        {post.photo !== 'null' && post.photo !== null ? (
          <div className="mb-4">
            <Image
              src={`${post.photo}/public`}
              alt={post?.title}
              width={600}
              height={400}
              className="rounded-md shadow-sm object-cover w-full"
            />
          </div>
        ) : null}
        <p className="text-gray-800 leading-relaxed">{post?.description}</p>
      </div>

      {/* 조회수 및 작성일 */}
      <div className="flex justify-between text-sm text-gray-500 mt-8 pt-4 border-t">
        <p>조회수: {post?.views}</p>
        <p>{formatToTime(post?.createdAt.toString()!)}</p>
      </div>
    </div>
  );
}
