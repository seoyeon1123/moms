'use client';

import SelectPostCategory from '@/components/SelectorPostCategory';
import { formatToTime } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getPosts } from './actions';
import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

interface IUser {
  username: string;
}

interface IPost {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  views: number;
  photo: string | null;
  user: IUser;
}

export default function Posts() {
  const [selectCategory, setSelectCategory] = useState('육아팁');
  const [newPosts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(selectCategory);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [selectCategory]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(newPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mx-auto px-10">
      <div className="flex justify-between items-center my-5">
        <SelectPostCategory setSelectCategory={setSelectCategory} />
        <Link href="/posts/add">
          <PencilSquareIcon className="h-8 w-8 text-orange-600 transition-transform transform hover:scale-110" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg shadow-lg p-6 bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <Link href={`/posts/${post.id}`} className="block">
                <h2 className="font-bold text-xl mb-2 text-gray-800 hover:text-orange-500 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 truncate">
                  {post.description}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{post.user.username}</span>
                  <span>{formatToTime(post.createdAt.toString())}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            게시물이 없습니다.
          </p>
        )}
      </div>
      {/* 페이지네이션 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center ">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === number
                ? 'bg-orange-500 text-white'
                : 'bg-white text-orange-500 border-orange-500'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
