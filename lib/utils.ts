import { format, isToday, parseISO } from 'date-fns';

export function formatToWon(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${numericPrice.toLocaleString('ko')} 원`;
}

export function formatToTimeAgo(date: string): string {
  const dayInMs = 24 * 60 * 60 * 1000;
  const time = new Date(date).getTime();
  const now = new Date().getTime();

  const diff = Math.round((time - now) / dayInMs);
  const formatter = new Intl.RelativeTimeFormat('ko');

  return formatter.format(diff, 'days');
}

export function formatToTime(date: string): string {
  const time = new Date(date);

  const formatter = new Intl.DateTimeFormat('ko', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 12시간 형식으로 오전/오후 표시
  });

  return formatter.format(time); // 오전/오후 시간 형식 반환
}

export function formatToDayAndTime(date: string): string {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long', // '10월'
    day: '2-digit', // '23일'
  });

  const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12시간 형식으로 오전/오후 표시
  });

  const formattedDate = dateFormatter.format(dateObj); // 날짜 부분 포맷팅
  const formattedTime = timeFormatter.format(dateObj); // 시간 부분 포맷팅

  return `${formattedDate} ${formattedTime}`; // 날짜와 시간을 함께 반환
}

export function formatDate(date: string): string {
  // 오늘 날짜인 경우 시간만 포맷팅
  if (isToday(date)) {
    return formatToTime(date); // 오늘 날짜는 시간만 표시
  }

  // 그 외의 경우 날짜와 시간을 함께 포맷팅
  return formatToDayAndTime(date);
}

export enum ProductStatus {
  SALE = '판매중',
  RESERVED = '예약중',
  SOLD_OUT = '판매완료',
}
