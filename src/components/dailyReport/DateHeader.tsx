import styles from './DateHeader.module.css';

interface DateProps {
  date: string,
};

const DateHeader = ({ date }: DateProps) => {
  const dateObject = new Date(date);
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(dateObject);
  const day = dateObject.getDate();
  return (
    <div className={styles.dateHeader}>
      {day} {month}
    </div>
  );
};

export default DateHeader;