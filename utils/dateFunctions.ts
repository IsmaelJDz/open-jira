import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDistanceToNow = (date: number) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
};
