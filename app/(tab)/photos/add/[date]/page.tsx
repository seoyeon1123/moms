'use client';

import Input from '@/components/input';
import { useImageUpload } from '@/components/UseImageUpload';
import { useInterceptAction } from '@/components/useInterceptAction';
import { PhotoIcon } from '@heroicons/react/24/outline';
import AddPhotos, { getNickName } from './actions';
import { useEffect, useState } from 'react';

export default function AddPhoto({ params }: { params: { date: string } }) {
  const [nickname, setNickname] = useState<string | null>('');
  const { preview, uploadUrl, photoId, onChangeImage } = useImageUpload();

  // uploadUrl과 photoId가 있을 때만 interceptAction 실행
  const interceptAction =
    uploadUrl && photoId
      ? useInterceptAction(uploadUrl, photoId, AddPhotos)
      : null;

  const date = params.date;

  useEffect(() => {
    const fetchData = async () => {
      const nicknameData = await getNickName();
      if (nicknameData.length > 0) {
        setNickname(nicknameData[0].nickName); // 안전하게 첫 번째 nickname을 설정
      }
    };
    fetchData();
  }, []); // 빈 배열을 의존성으로 넣어 컴포넌트가 처음 렌더링 될 때만 실행

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl">{date}</h1>
          <h2 className="text-2xl">{nickname} 우리 아이의 기록</h2>
        </div>

        <div className="flex flex-row gap-4">
          {/* 사진 업로드 섹션 */}
          <div>
            <label
              className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-400 border-neutral-300 rounded-lg border-dashed cursor-pointer bg-center bg-cover w-96 h-96"
              htmlFor="profileImage"
              style={{
                backgroundImage: `url(${preview})`,
                zIndex: 1,
              }}
            >
              {preview ? null : <PhotoIcon className="w-20 h-20" />}
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

          {/* 제목과 내용 입력 섹션 */}
          <div className="flex flex-col gap-4">
            <Input name="title" type="text" placeholder="제목을 입력해주세요" />
            <textarea
              name="description"
              placeholder="내용을 입력해주세요"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
