import { Category } from '../../types';
import EventsList from './EventsList';
import styles from './CategorySection.module.css';
import { ReactNode } from 'react';

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