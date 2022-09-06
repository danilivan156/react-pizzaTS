import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://628f92a1dc478523654307e6.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы!')
        navigate('/')
      }
    }
    fetchPizza()
    // eslint-disable-next-line
  }, [])

  if (!pizza) {
    return <>'loading'</>
  }

  return (
    <div className="fullpizza-wrapper">
      <img src={pizza.imageUrl} alt=''/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza