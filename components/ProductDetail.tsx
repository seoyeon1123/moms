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

  const isProductAvailable = () =>
    Boolean(product && selectCategory && selectCategory === product.category);

  return (
    <div className="flex flex-col justify-center items-center mx-auto ">
      <div className="">
        {!isProductAvailable() ? (
          <div className="flex justify-center items-center flex-col gap-3 relative pt-48 ">
            <Image
              src="/엄마와_아이들.png"
              alt="엄마와_아이들"
              width={300}
              height={300}
              className="transition-transform spin-slow "
            />
            <p
              className="absolute inset-0 flex items-center justify-center text-xl 
            text-neutral-500 text-center pt-48"
            >
              상품을
              <br />
              선택해주세요
            </p>
          </div>
        ) : (
          product && (
            <div className="flex flex-col  gap-3 justify-center items-center p-6 mx-auto w-full max-w-5xl  bg-white rounded-lg shadow-lg ">
              <Image
                src={`${product.photo}/public`}
                alt={product.title}
                width={350}
                height={350}
                className="aspect-square object-cover rounded-lg border border-gray-300"
              />
              <div className="flex flex-col gap-4 justify-start mt-5">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-800 break-word text-start max-w-[20ch]">
                    {product.title}
                  </h1>
                </div>
                <div className="flex flex-row justify-between">
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
                </div>

                <h2 className="text-lg break-word w-full bg-yellow-50 h-auto p-2 text-neutral-600 max-w-[32ch] break-words">
                  {product.description}
                </h2>
                <h2 className="text-sm text-gray-500">
                  {formatToDayAndTime(product.createdAt.toString())}
                </h2>
                <div className="flex flex-row items-center gap-4 justify-start">
                  {likeStatus && (
                    <LikeButton
                      isLiked={likeStatus.isLiked}
                      likeCount={likeStatus.likeCount}
                      productId={id}
                    />
                  )}
                  <p>・</p>
                  <h1 className="text-sm">조회 {product.views}</h1>
                </div>

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
