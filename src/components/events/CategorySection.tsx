import { Category } from '../../types';
import EventsList from './EventsList';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  category: Category
}
const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <div className={styles.categorySection}>
      <div className="category__name">
        <h3>{category.name}</h3>
      </div>
      {
        category.events !== undefined && category.events && category.events.length 
          && <EventsList events={category.events} />
      }
    </div>
  )
}

export default CategorySection