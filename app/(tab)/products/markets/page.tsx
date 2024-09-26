'use client';
import { NaverProduct } from '@/types/NaverProduct';
import { useEffect, useState } from 'react';
import { getProduct } from './action';
import Image from 'next/image';
import ProductSearchForm from '@/components/ProductSearch';
import { formatToWon } from '@/lib/utils';

export interface GetProductParams {
  query: string;
  offset?: number;
}

const HomePage = () => {
  const [products, setProducts] = useState<NaverProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productNum = 12;

  // 초기 로딩 시 데이터 가져오기
  const fetchProducts = async (query: string, page: number) => {
    try {
      console.log('Fetching products...');
      const data = await getProduct({ query, offset: page * productNum });
      if (data.length > 0) {
        setProducts((prevProducts) => {
          const existingProductIds = new Set(
            prevProducts.map((product) => product.productId)
          );
          const newProducts = data.filter(
            (product: NaverProduct) =>
              !existingProductIds.has(product.productId)
          ); // NaverProduct 타입 지정
          return [...prevProducts, ...newProducts];
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로딩
  useEffect(() => {
    fetchProducts('유아모자', 1); // 최초 데이터 가져오기
  }, []);

  // 페이지가 변경될 때 데이터 가져오기
  useEffect(() => {
    if (currentPage > 1) {
      // 현재 페이지가 0이 아닐 때만
      fetchProducts('유아모자', currentPage);
    }
  }, [currentPage]);

  const cleanTitle = (title: string) => {
    return title.replace(/<\/?b>/g, ''); // <b> 및 </b> 태그 제거
  };

  // 사용 예
  const cleanedProducts = products.map((product) => ({
    ...product,
    title: cleanTitle(product.title), // 제목에서 <b> 태그 제거
  }));

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1); // 다음 페이지로 이동
  };

  return (
    <>
      <div className="flex flex-col text-center p-5 ">
        <div>
          <ProductSearchForm setProducts={setProducts} />
        </div>
        <ul className="flex flex-wrap ">
          {cleanedProducts.map((product) => (
            <li key={product.productId} className="w-1/4">
              <div className="flex flex-col items-center justify-evenly *:text-center p-2">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="aspect-square object-cover"
                />
                <div className="flex flex-col gap-2 pt-2 px-10">
                  <h2 className="font-semibold overflow-hidden">
                    {product.title}
                  </h2>
                  <p className="text-sm">{formatToWon(product.lprice)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center p-5">
          <button
            onClick={handleNextPage}
            className=" bg-orange-600 rounded-full px-7 py-2 "
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
