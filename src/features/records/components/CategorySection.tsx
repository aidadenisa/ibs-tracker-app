import { ReactNode } from 'react';
import { Category } from '@/types';
import styles from '@/features/records/components/styles/CategorySection.module.css';

interface CategorySectionProps {
  category: Category, 
  children?: ReactNode,
}
const CategorySection = ({ category, children }: CategorySectionProps) => {
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