'use client';

import ProductDetail from '@/components/ProductDetail';
import ProductList from '@/components/ProductList';
import SelectorCategory from '@/components/SelectorCategory';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ShareOrSell() {
  const [productId, setProductId] = useState('');
  const [selectCategory, setSelectCategory] = useState('상의');
  const [nickName, setNickName] = useState('');

  // 카테고리가 변경될 때 선택한 상품 초기화
  useEffect(() => {
    setProductId('');
  }, [selectCategory]);

  return (
    <>
      <div className="max-h-screen px-10">
        <div className="flex flex-row justify-between mt-5 mb-4 mx-5">
          <SelectorCategory setSelectCategory={setSelectCategory} />
          <Link
            href="/products/shareOrsell/add"
            className="flex flex-row justify-center items-center space-x-2 bg-orange-600 text-white px-2 py-1 rounded-full hover:bg-orange-500 text-sm"
          >
            <PlusIcon className="w-6 h-6" />
            <p className="font-medium">상품 추가하기</p>
          </Link>
        </div>
        <div className="flex flex-row ">
          <div className="w-2/3 ">
            <ProductList
              setProductId={setProductId}
              selectCategory={selectCategory}
              setNickName={setNickName}
            />
          </div>
          <div className="border-r-4 border-orange-400 border-dotted my-4 max-h-screen px-4" />

          <div className="w-1/3 mx-auto">
            <ProductDetail
              productId={productId}
              selectCategory={selectCategory}
              nickName={nickName}
            />
          </div>
        </div>
      </div>
    </>
  );
}
