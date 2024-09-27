'use client';

import ProductDetail from '@/components/ProductDetail';
import ProductList from '@/components/ProductList';
import SelectorCategory from '@/components/SelectorCategory';
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
      <div className="max-h-screen">
        <SelectorCategory setSelectCategory={setSelectCategory} />
        <div className="flex flex-row ">
          <div className="w-1/2 ">
            <ProductList
              setProductId={setProductId}
              selectCategory={selectCategory}
              setNickName={setNickName}
            />
          </div>

          <div className="w-1/2 mx-auto">
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
