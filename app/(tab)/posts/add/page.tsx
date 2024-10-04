'use client';

import EmojiComponent from '@/components/emojiComponent';
import Input from '@/components/input';
import SelectPostCategory from '@/components/SelectorPostCategory';
import { useImageUpload } from '@/components/UseImageUpload';
import { useInterceptAction } from '@/components/useInterceptAction';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState, useRef } from 'react';
import PostAddAction from './actions';
import { useFormState } from 'react-dom';

export default function Posts() {
  const [selectCategory, setSelectCategory] = useState('');

  const { onChangeImage, preview, uploadUrl, photoId } = useImageUpload();
  const interceptAction = useInterceptAction(
    uploadUrl,
    photoId || '',
    PostAddAction
  );
  const [description, setDescription] = useState('');
  //const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const handleEmojiSelect = (emoji: string) => {
  //   if (textareaRef.current) {
  //     const startPos = textareaRef.current.selectionStart;
  //     const endPos = textareaRef.current.selectionEnd;
  //     const newValue =
  //       description.substring(0, startPos) +
  //       emoji +
  //       description.substring(endPos, description.length);
  //     setDescription(newValue);
  //     textareaRef.current.focus();
  //   }
  // };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <>
      <div className="pt-10 flex justify-center items-center w-full gap-10">
        <form
          className="flex flex-col w-2/3 bg-white p-5 rounded-xl gap-2 py-4 bg-opacity-50"
          action={action}
        >
          <div className="flex flex-row justify-center items-center gap-4 my-5">
            <Image src={'/딸랑이.png'} alt="딸랑이" width={40} height={40} />
            <h1 className="text-4xl text-center">엄마들과 소통할까요?</h1>
            <Image src={'/딸랑이.png'} alt="딸랑이" width={40} height={40} />
          </div>
          <div className="flex flex-row gap-4">
            <SelectPostCategory setSelectCategory={setSelectCategory} />
            <label
              htmlFor="photo"
              className="flex items-center justify-center cursor-pointer rounded-full"
            >
              <PhotoIcon className="size-8 hover:text-orange-600" />
              <input
                onChange={onChangeImage}
                type="file"
                name="photo"
                accept="image/*"
                id="photo"
                className="hidden"
              />
            </label>
            {/* <EmojiComponent onEmojiSelect={handleEmojiSelect} /> */}
          </div>
          <Input
            name="title"
            placeholder="제목을 입력해주세요"
            errors={[]}
            type="text"
          />
          {preview ? (
            <div className="flex flex-row justify-center items-end mt-4">
              <label
                className="relative border-2 aspect-square flex items-center justify-center flex-col text-neutral-400 border-neutral-300 rounded-lg border-dashed cursor-pointer bg-center bg-cover w-96 h-96"
                htmlFor="photo"
                style={{
                  backgroundImage: `url(${preview})`,
                }}
              />

              <textarea
                //ref={textareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="내용을 입력해주세요"
                className="h-[390px] w-full ml-4 bg-white border-2 rounded-lg 
                text-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
              ></textarea>
            </div>
          ) : (
            <textarea
              // ref={textareaRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              placeholder="내용을 입력해주세요"
              className="h-[400px] w-full mt-4 bg-white border-2 rounded-lg border-neutral-200 py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 ease-in-out"
            ></textarea>
          )}
          <button type="submit" className="btn my-5 px-3 py-2 text-sm">
            저장하기
          </button>
        </form>
      </div>
    </>
  );
}
