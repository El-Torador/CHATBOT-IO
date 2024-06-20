export function formatRelativeTime(date: string) {
    const now = new Date();
    const messageTime = new Date(date);

    const diffInSeconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('fr', { style: 'short' });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return rtf.format(-diffInMinutes, 'minute');
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return rtf.format(-diffInHours, 'hour');
    }
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return rtf.format(-diffInDays, 'day');
  }