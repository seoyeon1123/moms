'use client';

import { getCalenderPhoto } from '@/app/(tab)/photos/actions';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ICalenderPhoto {
  id: number;
  photo: string;
  createdAt: Date;
  title: string;
  description: string;
}

export default function CalenderPhoto({ date }: { date: string }) {
  const [calenderPhoto, setCalenderPhoto] = useState<ICalenderPhoto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const calenderPhoto = await getCalenderPhoto(date);
      setCalenderPhoto(calenderPhoto);
      return calenderPhoto;
    };
    fetchData();
  }, [date]);

  return (
    <div className=" w-2/4 p-4">
      {calenderPhoto.map((photo) => (
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
      ))}
    </div>
  );
}
