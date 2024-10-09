'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 상호작용 플러그인
import '@fullcalendar/core/locales/ko';
import '@/app/(tab)/photos/calender.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ICalendarComponent {
  setDate: (date: string) => void;
}

const CalendarComponent = ({ setDate }: ICalendarComponent) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 클릭한 날짜를 저장하는 상태

  const handleDateClick = (info: DateClickArg) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate); // 클릭한 날짜를 상태로 저장
    setDate(clickedDate); // 부모 컴포넌트에 날짜 전달

    // 클릭한 날짜의 테두리를 오렌지 색으로 설정
    const allCells = document.querySelectorAll('.fc-day');
    allCells.forEach((cell) => {
      (cell as HTMLElement).style.borderColor = ''; // 기존 테두리 제거
      (cell as HTMLElement).style.borderWidth = ''; // 기존 테두리 두께 제거
    });

    const selectedCells = document.querySelectorAll(
      `.fc-day[data-date="${clickedDate}"], .fc-day-grid .fc-daygrid-day[data-date="${clickedDate}"], .fc-col-header-cell[data-date="${clickedDate}"]`
    );

    selectedCells.forEach((cell) => {
      (cell as HTMLElement).style.borderColor = 'orange';
      (cell as HTMLElement).style.borderWidth = '4px'; // 테두리 두께를 4px로 설정
    });
  };

  return (
    <div className="px-5 py-3 bg-white bg-opacity-40">
      {/* FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth',
        }}
        dateClick={handleDateClick}
        contentHeight="600px"
      />

      {/* 클릭한 날짜가 있을 경우 "Add" 버튼 생성 */}
      {selectedDate && (
        <div className="mt-4 text-center">
          <Link href={`/photos/add/${selectedDate}`} className="btn">
            우리 아이의 이미지를 저장하러 갈까요?
          </Link>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
