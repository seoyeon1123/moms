'use client';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { getProduct } from '@/app/(tab)/products/markets/action';
import { NaverProduct } from '@/types/NaverProduct';

interface ProductSearchFormProps {
  setProducts: (products: NaverProduct[]) => void; // 부모 컴포넌트의 setProducts 함수
}

export default function ProductSearchForm({
  setProducts,
}: ProductSearchFormProps) {
  const [product, setProduct] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 방지
    if (!product.trim()) {
      console.error('검색어가 비어있습니다.');
      return;
    }
    try {
      const data = await getProduct({ query: product, offset: 1 });
      setProducts(data); // 검색된 상품 세트
      setProduct(''); // 입력값 초기화
    } catch (error) {
      console.error('제품 검색 중 오류 발생:', error);
    }
  };

  return (
    <form
      className="flex flex-row justify-end items-center left-3 gap-2 pr-16 my-5"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        required
        name="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="px-5 py-1 rounded-full focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition-all duration-200 ease-in-out focus:outline-none"
      />
      <button type="submit">
        <MagnifyingGlassCircleIcon className="size-8 text-orange-600" />
      </button>
    </form>
  );
}
