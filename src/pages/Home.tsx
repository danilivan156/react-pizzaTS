import React from 'react'
import { useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { selectFilter } from '../redux/filter/selectors'

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components'

import { fetchPizzas } from '../redux/pizza/slice'
import { selectPizzaData } from '../redux/pizza/selectors'
import { useAppDispatch } from '../redux/store'
import { Pizza } from '../redux/pizza/types'

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
        // eslint-disable-next-line
    }, [])
    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}`: ''
        const search = searchValue ? `&search=${searchValue}`: ''
        const sortBy = sort.sortProperty.replace('-','')
        const order = sort.sortProperty.includes('-') ? 'acs' : 'desc'

        dispatch(
            fetchPizzas({
                category,
                search,
                sortBy,
                order,
                currentPage: String(currentPage)
            })
        )
        window.scrollTo(0, 0)
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        getPizzas()
        // eslint-disable-next-line
    }, [categoryId,sort.sortProperty,searchValue,currentPage])
    
    const pizzas = items.map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj}/>)
    const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index}/>)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error'
                 ? <div>Ошибка загрузки пицц</div>
                 : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}

export default Home
