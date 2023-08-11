import Button from '@/components/general/Button';

interface DailyActionBarProps {
  onAddRecord: () => void;
}

const DailyActionBar = ({ onAddRecord }: DailyActionBarProps) => {

  return (
    <div className="daily-report__action-bar">
      <Button
        variant="primary"
        label="Add record"
        onClick={onAddRecord}
      />
    </div>
  )
}

export default DailyActionBar;