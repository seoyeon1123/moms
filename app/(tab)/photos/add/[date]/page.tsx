'use client';

import Input from '@/components/input';
import { useImageUpload } from '@/components/UseImageUpload';
import { useInterceptAction } from '@/components/useInterceptAction';
import { PhotoIcon } from '@heroicons/react/24/outline';
import AddPhotos, { getNickName } from './actions';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import PhotoAction from './actions';

export default function AddPhoto({ params }: { params: { date: string } }) {
  const [nickname, setNickname] = useState<string | null>('');
  const { preview, uploadUrl, photoId, onChangeImage } = useImageUpload();

  const interceptAction = useInterceptAction(uploadUrl, photoId, PhotoAction);

  const date = params.date;

  useEffect(() => {
    const fetchData = async () => {
      const nicknameData = await getNickName();
      if (nicknameData.length > 0) {
        setNickname(nicknameData[0].nickName); // 안전하게 첫 번째 nickname을 설정
      }
    };
    fetchData();
  }, []);

  const [state, action] = useFormState(interceptAction, null);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4  ">
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl mb-1">
          <h1 className="text-4xl font-serif text-gray-700 mb-2">{date}</h1>
          <h2 className="text-2xl bg-orange-600 bg-opacity-50 p-2 text-white rounded-md">
            {nickname} 의 기록
          </h2>
        </div>

        <form
          className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl"
          action={action}
        >
          {/* 사진 업로드 */}
          <div className="flex flex-col items-center justify-center mb-6">
            <label
              className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-400 border-neutral-300 rounded-lg border-dashed cursor-pointer bg-center bg-cover w-full max-w-lg h-80"
              htmlFor="profileImage"
              style={{
                backgroundImage: `url(${preview})`,
                zIndex: 1,
              }}
            >
              {preview ? null : <PhotoIcon className="w-16 h-16" />}
            </label>
            <input
              onChange={onChangeImage}
              type="file"
              className="hidden"
              name="photo"
              accept="image/*"
              id="profileImage"
            />
          </div>

          {/* 제목과 내용 입력 */}
          <div className="flex flex-col gap-4 w-full">
            <Input
              name="title"
              type="text"
              placeholder="제목을 입력해주세요"
              className="border p-2 rounded-md text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
              errors={state?.fieldErrors.title}
            />
            <Input
              type="textarea"
              name="description"
              placeholder="내용을 입력해주세요"
              className="w-full p-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              errors={state?.fieldErrors.description}
            />
            <input type="hidden" value={date} name="date" />
            <button className="btn active:bg-orange-400" type="submit">
              추억 저장하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
