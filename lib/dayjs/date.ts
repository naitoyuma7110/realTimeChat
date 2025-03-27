import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const getFormattedRelativeTime = (timestamp: dayjs.ConfigType): string => {
  const timeDifference = dayjs(timestamp);
    return timeDifference.fromNow();
};