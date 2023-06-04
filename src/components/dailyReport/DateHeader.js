import styles from './DateHeader.module.css';

const DateHeader = ({ date }) => {
  const dateObject = new Date(date);
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(dateObject);
  console.log(date)
  const day = dateObject.getDate();
  return (
    <div className={styles.dateHeader}>
      {day} {month}
    </div>
  );
};

export default DateHeader;