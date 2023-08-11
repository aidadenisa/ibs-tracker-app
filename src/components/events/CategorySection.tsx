import { ReactNode } from 'react';
import { Category } from '@/types';
import styles from '@/components/events/CategorySection.module.css';

interface CategorySectionProps {
  category: Category, 
  canInteract?: boolean,
  children?: ReactNode,
}
const CategorySection = ({ category, canInteract=false, children }: CategorySectionProps) => {
  return (
    <div className={styles.categorySection}>
      <div className="category__name">
        <h3>{category.name}</h3>
      </div>
      { children }
    </div>
  )
}

export default CategorySection