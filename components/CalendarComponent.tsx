'use client';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import '@fullcalendar/core/locales/ko';
import '@/app/(tab)/photos/calender.css';
import Link from 'next/link';

interface ICalendarComponent {
  setDate: (date: string) => void;
  photo: string;
}

const CalendarComponent = ({ setDate, photo }: ICalendarComponent) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 클릭한 날짜를 저장하는 상태
  const [hasPhoto, setHasPhoto] = useState(false); // photo가 있는지 체크하는 상태

  useEffect(() => {
    if (photo) {
      setHasPhoto(true); // photo가 있으면 상태 업데이트
    } else {
      setHasPhoto(false); // photo가 없으면 상태 업데이트
    }
  }, [photo]);

  const handleDateClick = (info: DateClickArg) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate); // 클릭한 날짜를 상태로 저장
    setDate(clickedDate); // 부모 컴포넌트에 날짜 전달

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
      (cell as HTMLElement).style.borderWidth = '4px';
    });
  };

  const renderEventContent = (eventInfo: any) => {
    const date = eventInfo.event.startStr.split('T')[0];
    return (
      <div className="flex items-center">
        <span>{date}</span>
        {hasPhoto && <span className="ml-2">🫶</span>}
      </div>
    );
  };

  return (
    <div className="px-5 py-3 bg-white bg-opacity-40">
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
        contentHeight="700px"
        events={[]}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default CalendarComponent;
