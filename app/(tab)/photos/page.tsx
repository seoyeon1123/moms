'use client';

import CalendarComponent from '@/components/CalendarComponent';
import CalenderPhoto from '@/components/CalenderPhoto';
import Image from 'next/image';
import { useState } from 'react';

export default function Photos() {
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState('');

  return (
    <>
      <div className="flex flex-row ">
        <div className="w-full">
          <CalendarComponent setDate={setDate} photo={photo} />
        </div>

        {date && <CalenderPhoto date={date} setPhoto={setPhoto} />}
      </div>
    </>
  );
}
