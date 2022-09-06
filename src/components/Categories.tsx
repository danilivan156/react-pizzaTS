import React from 'react'
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: number,
  onChangeCategory: (target: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({value,onChangeCategory}) => {
  useWhyDidYouUpdate('Categories', {value,onChangeCategory})
  const categories = ["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые"]

  return (
    <div className="categories">
        <ul>
          {
            categories.map((categoryName, index) => (
              <li onClick={()=>onChangeCategory(index)} key={index} className={value === index ? 'active' : ''}>{categoryName}</li>
            ))
          }
            
        </ul>
    </div>
  )
})

export default Categories
