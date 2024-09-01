import { Calendar, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'globalize/lib/cultures/globalize.culture.vi';
import 'globalize/lib/cultures/globalize.culture.vi-VN';
import { useCallback, useMemo } from 'react';
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

const messages: { [key: string]: any } = {
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
  showMore: (total: number) => `+${total} HĐ`,
};

const localizer = momentLocalizer(moment);

interface Props {
  events: any[];
}

const CCalendar = (props: Props) => {
  const { formats }: { [key: string]: any } = useMemo(
    () => ({
      formats: {
        dayFormat: (date: Date, culture: string, localizer: DateLocalizer) =>
          localizer.format(date, 'ddd', culture),
        dayHeaderFormat: (date: Date, culture: string, localizer: DateLocalizer) =>
          localizer.format(date, 'ddd, D/M', culture),
        timeGutterFormat: (date: Date, culture: string, localizer: DateLocalizer) =>
          localizer.format(date, 'H[h]', culture),
        eventTimeRangeFormat: () => "" //range: { start: Date, end: Date }, culture: string, localizer: DateLocalizer
      },
    }),
    []
  );

  const eventPropGetter = useCallback(
    (event: any, start: Date, end: Date) => { //isSelected: boolean
      if (!end) return {};
      const nowHour = moment(start).hour();
      const time = nowHour < 12 ? "sang" : nowHour < 18 ? "chieu" : "toi";
      const className = `${event.type} ${time}`;

      return { className, style: { fontSize: "small" } };
    },
    []
  )

  return (
    <>
      <Calendar
        eventPropGetter={eventPropGetter}
        events={props.events}
        culture={culture}
        formats={formats}
        localizer={localizer}
        defaultDate={new Date()}
        popup={true}
        allDayMaxRows={4}
        style={{ height: '100%' }}
        step={30}
        messages={messages}
        defaultView='week'
        // views={['week', 'month','day','agenda']}
      />
    </>
  );
};

export default CCalendar;
