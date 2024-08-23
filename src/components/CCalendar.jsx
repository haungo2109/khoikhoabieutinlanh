import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'globalize/lib/cultures/globalize.culture.vi';
import 'globalize/lib/cultures/globalize.culture.vi-VN';
import { useMemo } from 'react';
import 'moment-timezone';

const culture = 'vi';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
moment.locale('vi');
moment.updateLocale('vi', {
  weekdays: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthsShort: [
    'Th1',
    'Th2',
    'Th3',
    'Th4',
    'Th5',
    'Th6',
    'Th7',
    'Th8',
    'Th9',
    'Th10',
    'Th11',
    'Th12',
  ],
  longDateFormat: {
    LT: 'hh:mm A',
    LTS: 'hh:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'Do MMMM YYYY',
    LLL: 'Do MMMM YYYY LT',
    LLLL: 'ddd, Do MMMM YYYY LT',
  },
  week: {
    dow: 0,
  },
});

const messages = {
  week: 'Tuần',
  work_week: 'Tuần làm việc',
  day: 'Ngày',
  month: 'Tháng',
  agenda: 'Ds sắp tới',
  previous: 'Trước',
  next: 'Sau',
  today: 'Hiện tại',
  date: 'Ngày',
  time: 'Thời gian',
  event: 'Hoạt động',
  allDay: 'Cả ngày',
  yesterday: 'Hôm qua',
  tomorrow: 'Ngày mai',
  noEventsInRange: 'Sắp tới không có hoạt động nào.',
  showMore: (total, remainingEvents, events) => `+${total} hoạt động`,
};

const localizer = momentLocalizer(moment);

const CCalendar = ({ events }) => {
  const { formats } = useMemo(
    () => ({
      formats: {
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, 'ddd, D/M', culture),
        dayHeaderFormat: (date, culture, localizer) =>
          localizer.format(date, 'ddd, D/M', culture),
      },
    }),
    []
  );

  return (
    <>
      <Calendar
        events={events}
        culture={culture}
        formats={formats}
        localizer={localizer}
        defaultDate={new Date()}
        popup={true}
        allDayMaxRows={3}
        style={{ height: '100%' }}
        messages={messages}
      />
    </>
  );
};

export default CCalendar;
