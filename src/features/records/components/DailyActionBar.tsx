import Button from '@/components/Button';
import styles from '@/features/records/components/styles/DailyActionBar.module.css';
interface DailyActionBarProps {
  onAddRecord: () => void;
}

const DailyActionBar = ({ onAddRecord }: DailyActionBarProps) => {

  return (
    <div className={`daily-report__action-bar ${styles.dailyActionBar}`}>
      <Button
        variant="primary"
        label="Add record"
        size="lg"
        onClick={onAddRecord}
      />
    </div>
  )
}

export default DailyActionBar;