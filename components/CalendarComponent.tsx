'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // 상호작용 플러그인
import '@fullcalendar/core/locales/ko';

interface ICalendarComponent {
  setDate: (date: string) => void; // 날짜를 받는 함수로 수정
}

const CalendarComponent = ({ setDate }: ICalendarComponent) => {
  const handleDateClick = (info: DateClickArg) => {
    setDate(info.dateStr);
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
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        dateClick={handleDateClick}
        contentHeight="750px"
      />
    </div>
  );
};

export default CalendarComponent;
