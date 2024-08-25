'use client';

import AgeGroutSelector from '@/components/AgeGroupSelector';
import Input from '@/components/input';
import { useState } from 'react';

export default function MyBabyProfile() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');

  const handleAgeGroupChange = (value: string) => {
    setSelectedAgeGroup(value);
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <h1>우리 아이의 프로필을 완성시켜주세요!</h1>

        <div>
          <h1>아이의 이름을 입력해주세요</h1>
          <Input
            type="text"
            placeholder="아이의 이름을 입력해주세요"
            required
            name="password"
            errors={[]}
          />
        </div>
        <div>
          <h1>우리 아이의 나이를 선택해주세요</h1>
          <AgeGroutSelector onChange={handleAgeGroupChange} />
          {selectedAgeGroup ?? (
            <div className="mt-4 text-lg">
              선택된 연령대: {selectedAgeGroup}
            </div>
          )}
        </div>
        <div>
          <h1>우리 아이의 성별을 선택해주세요</h1>
        </div>
        <div>
          <h1>엄마들에서 사용할 닉네임을 입력해주세요</h1>
        </div>
      </div>
    </>
  );
}
