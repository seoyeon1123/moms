'use client';
import Image from 'next/image';
import { useState } from 'react';
import ProfileImage from './ProfileImageUpload';
import Input from './input';
import AgeGroutSelector from './AgeGroupSelector';
import GenderSelection from './GenderSelection';
import { useFormState } from 'react-dom';
import SaveBabyProfile, { getUploadUrl } from '@/app/profile/actions';
import { PhotoIcon } from '@heroicons/react/16/solid';

export default function MyBabyProfile() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleAgeGroupChange = (value: string) => {
    setSelectedAgeGroup(value);
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
  };

  const [preview, setPreview] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [photoId, setPhotoId] = useState('');

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) {
      return;
    }

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { result, success } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setPhotoId(id);
    }
    console.log(result);
  };

  const interceptAction = async (prevState: any, formData: FormData) => {
    const file = formData.get('photo');
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudflareForm,
    });
    console.log(await response.text());
    if (response.status !== 200) {
      return;
    }
    const photoUrl = `https://imagedelivery.net/2YRH3jpkhrWOOYZOL3zGhA/${photoId}`;
    formData.set('photo', photoUrl);
    return SaveBabyProfile(prevState, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <form action={action}>
      <div className="w-screen h-screen flex flex-col justify-center items-center p-6">
        <div className=" p-20 bg-white rounded-xl shadow-xl">
          <div className="flex flex-row gap-4 mb-30 justify-center items-center">
            <h1 className="text-4xl font-bold text-center">
              우리 아이의 프로필을 완성시켜주세요
            </h1>
            <Image src="/yellowBaby.png" alt="아기" width={100} height={100} />
          </div>
          <div className="flex flex-row gap-20 mt-20">
            <div>
              <label
                className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover w-96"
                htmlFor="profileImage"
                style={{
                  backgroundImage: `url(${preview})`,
                  zIndex: 1,
                }}
              >
                {preview ? null : <PhotoIcon className="size-10" />}
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
            <div className=" flex flex-col gap-5 ">
              <div className="w-full max-w-md">
                <h2 className="text-lg mb-1">🍼 아이의 이름을 입력해주세요</h2>
                <Input
                  type="text"
                  placeholder="아이의 이름을 입력해주세요"
                  required
                  name="name"
                  errors={state?.fieldErrors.name}
                />
              </div>

              <div className="w-full max-w-md">
                <h2 className="text-lg">🍼 우리 아이의 나이를 선택해주세요</h2>
                <AgeGroutSelector onChange={handleAgeGroupChange} />
              </div>

              <div className="w-full max-w-md">
                <h2 className="text-lg ">🍼 우리 아이의 성별을 선택해주세요</h2>
                <GenderSelection onChange={handleGenderChange} />
              </div>

              <div className="w-full max-w-md flex flex-col gap-2">
                <h2 className="text-lg mb-1">
                  🍼 엄마들에서 사용할 닉네임을 입력해주세요
                </h2>
                <Input
                  type="text"
                  placeholder="우리 아이의 특징을 살려주세요 😎"
                  required
                  name="nickname"
                  errors={state?.fieldErrors.nickname}
                />

                <button type="submit" className="mt-4 btn">
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
