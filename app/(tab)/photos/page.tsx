'use client';

import CalendarComponent from '@/components/CalendarComponent';
import CalenderPhoto from '@/components/CalenderPhoto';
import { useState } from 'react';

export default function Photos() {
  const [date, setDate] = useState(''); // 선택된 날짜를 저장하는 상태

  return (
    <>
      <div className="flex flex-row m-0">
        <div className="w-full">
          <CalendarComponent setDate={setDate} />
        </div>

        {date && <CalenderPhoto date={date} />}
      </div>
    </>
  );
}
