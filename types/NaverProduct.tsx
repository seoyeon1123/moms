// NaverProduct.ts
export interface NaverProduct {
  title: string; // 상품 이름
  link: string; // 상품 정보 URL
  image: string; // 섬네일 이미지의 URL
  lprice: number; // 최저가
  hprice: number; // 최고가
  mallName: string; // 상품을 판매하는 쇼핑몰
  productId: string; // 네이버 쇼핑의 상품 ID
  productType: number; // 상품군과 상품 종류에 따른 상품 타입
  maker?: string; // 제조사 (옵션)
  brand: string; // 브랜드
  category1: string; // 상품의 대분류
  category2: string; // 상품의 중분류
  category3: string; // 상품의 소분류
  category4?: string; // 상품의 세분류 (옵션)
}

// NaverResponse.ts
export interface NaverResponse {
  rss: {
    channel: {
      lastBuildDate: string; // 검색 결과를 생성한 시간 (ISO 형식)
      total: number; // 총 검색 결과 개수
      start: number; // 검색 시작 위치
      display: number; // 한 번에 표시할 검색 결과 개수
      item: NaverProduct[]; // 개별 검색 결과 배열
    };
  };
}
