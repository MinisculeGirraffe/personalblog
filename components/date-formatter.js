import { parseISO, format } from 'date-fns'

export default function DateFormatter({ dateString }) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const date = new Intl.DateTimeFormat('en-US', options)
    .format(new Date(dateString));


  return <time>{date}</time>
}
