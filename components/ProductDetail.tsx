'use client';

import {
  getLikeStatus,
  getProductDetail,
} from '@/app/(tab)/products/shareOrsell/actions';
import { formatToDayAndTime, formatToWon } from '@/lib/utils';
import { GiftIcon, HeartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LikeButton from './LikeButton';

interface IProductDetailProps {
  productId: string;
  selectCategory: string;
  nickName: string;
}

interface IProductProps {
  title: string;
  description: string;
  photo: string;
  createdAt: string;
  share: Boolean;
  category: string;
}

interface LikeStatus {
  likeCount: number;
  isLiked: boolean;
}

export default function ProductDetail({
  productId,
  selectCategory,
  nickName,
}: IProductDetailProps) {
  const [product, setProduct] = useState<any>(null);
  const id = Number(productId);
  const [likeStatus, setLikeStatus] = useState<LikeStatus | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const productData = await getProductDetail(id);
        setProduct(productData);
      }
      const likeStatus = await getLikeStatus(id); // 좋아요 상태를 가져옴
      setLikeStatus(likeStatus);
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      <div className="flex flex-col justify-center items-center p-4 mx-auto w-full max-w-7xl">
        {!selectCategory && selectCategory !== product?.category ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-500">카테고리를 선택해주세요.</p>
          </div>
        ) : (
          product && (
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 bg-white rounded-lg shadow-lg p-6 w-full">
              <Image
                src={`${product.photo}/public`}
                alt={product.title}
                width={600}
                height={600}
                className="aspect-square object-cover rounded-lg"
              />
              <div className="flex flex-col gap-4 justify-start mt-5">
                <div className="flex flex-row justify-between">
                  <h1 className="text-4xl font-bold text-gray-800">
                    {product.title}
                  </h1>
                  <div className="flex flex-row items-center gap-1 text-base text-center">
                    <h1 className="text-orange-600 font-bold">{nickName}</h1>
                    <span>moms</span>
                    <Image
                      src="/딸랑이.png"
                      alt="딸랑이"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                {product.price ? (
                  <h2 className="text-lg text-neutral-600">
                    {formatToWon(product.price)}
                  </h2>
                ) : (
                  <div className="flex flex-row gap-1 items-center">
                    <GiftIcon className="size-4 text-orange-600" />
                    <h2 className="text-start"> 나눔중 </h2>
                    <GiftIcon className="size-4 text-orange-600" />
                  </div>
                )}

                <h2 className="text-lg break-word w-full bg-yellow-50 h-auto p-2 text-neutral-600">
                  {product.description}
                </h2>
                <h2 className="text-sm text-gray-500">
                  {formatToDayAndTime(product.createdAt.toString())}
                </h2>
                <div className="flex flex-row items-center gap-4">
                  <h1 className="text-sm ">마음 {product._count.like}</h1>
                  <p>・</p>
                  <h1 className="text-sm">조회 {product.views}</h1>
                </div>
                <LikeButton
                  isLiked={likeStatus?.isLiked!}
                  likeCount={likeStatus?.likeCount!}
                  productId={id}
                />

                <button className="btn shadow-md hover:bg-orange-800 transition duration-200">
                  채팅하기
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
