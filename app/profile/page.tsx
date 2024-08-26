'use client';

import AgeGroutSelector from '@/components/AgeGroupSelector';
import GenderSelection from '@/components/GenderSelection';
import Input from '@/components/input';
import ProfileImage from '@/components/ProfileImageUpload';
import { useState } from 'react';

export default function MyBabyProfile() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleAgeGroupChange = (value: string) => {
    setSelectedAgeGroup(value);
  };

  const handleGenderChange = (value: string) => {
    setSelectedGender(value);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-28 p-6">
      <h1 className="text-4xl font-bold mb-4">
        우리 아이의 프로필을 완성시켜주세요!
      </h1>
      <div className="flex flex-row gap-20">
        <div>
          <ProfileImage />
        </div>
        <div>
          <div className="w-full max-w-md">
            <h2 className="text-lg mb-2">아이의 이름을 입력해주세요</h2>
            <Input
              type="text"
              placeholder="아이의 이름을 입력해주세요"
              required
              name="name"
              errors={[]}
            />
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-lg mb-2">우리 아이의 나이를 선택해주세요</h2>
            <AgeGroutSelector onChange={handleAgeGroupChange} />
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-lg mb-2">우리 아이의 성별을 선택해주세요</h2>
            <GenderSelection onChange={handleGenderChange} />
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-lg mb-2">
              엄마들에서 사용할 닉네임을 입력해주세요
            </h2>
            <Input
              type="text"
              placeholder="우리 아이의 특징을 살려주세요 😎"
              required
              name="nickname"
              errors={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
