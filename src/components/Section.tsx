import { ReactNode } from 'react'

interface SectionProps {
  title: string,
  children: ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      { children }
    </div>
  )
}

export default Section