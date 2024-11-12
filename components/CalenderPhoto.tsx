'use client';

import { getCalenderPhoto } from '@/app/(tab)/photos/actions';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ICalenderPhoto {
  id: number;
  photo: string;
  createdAt: Date;
  title: string;
  description: string;
}

interface IPhotoProps {
  date: string;
  setPhoto: (date: string) => void;
}

export default function CalenderPhoto({ date, setPhoto }: IPhotoProps) {
  const [calenderPhoto, setCalenderPhoto] = useState<ICalenderPhoto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const calenderPhoto = await getCalenderPhoto(date);
      setCalenderPhoto(calenderPhoto);
      // 사진이 있으면 제목을 업데이트
      if (calenderPhoto.length > 0) {
        setPhoto(calenderPhoto[0].title);
      } else {
        setPhoto('');
      }
    };
    fetchData();
  }, [date]);

  return (
    <div className=" w-2/4 p-4">
      {calenderPhoto.length > 0 ? (
        calenderPhoto.map((photo) => (
          <>
            <div className="flex justify-end mb-2">
              <Link
                href={`/photos/add/${date}`}
                className="flex bg-orange-500 rounded-full text-white p-2 text-sm"
              >
                추억 추가하기
              </Link>
            </div>
            <div
              key={photo.id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-orange-500 w-full h-14 flex items-center justify-center rounded-t-lg">
                <h1 className="font-bold text-2xl text-white">{date}</h1>
              </div>
              <div className="p-5 flex flex-col gap-6">
                <h3 className="text-2xl font-semibold text-gray-800">
                  제목 : {photo.title}
                </h3>

                <Image
                  src={`${photo.photo}/public`}
                  alt={photo.title}
                  width={500}
                  height={500}
                  className="rounded-lg aspect-square"
                />

                <p className="text-gray-700 text-sm">{photo.description}</p>
                <p className="text-gray-500 text-xs">
                  {formatDate(photo.createdAt.toString())}
                </p>
              </div>
            </div>
          </>
        ))
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-3 mt-20">
            <Image
              src={'/엄마와아이.png'}
              alt="엄마와 아이"
              width={500}
              height={500}
            />
            <h1 className="text-2xl font-semibold text-black">
              우리 아이의 추억을
            </h1>
            <p className="text-lg text-gray-700">기록하러 가볼까요?</p>
            <Link
              href={`/photos/add/${date}`}
              className="flex bg-orange-500 rounded-full text-white p-2"
            >
              추억 추가하기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
