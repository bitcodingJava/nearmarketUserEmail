import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { API_URL } from '../../constans';

const OrderFruit = () => {
  const [fruitList, setFruitList] = useState([]);
  const [userInput, setUserInput] = useState("")
  const [limit, setLimit] = useState(6)
  const [page, setPage] = useState(1)
  const [sortOption, setSortOption] = useState('default')
  const offset = (page - 1) * limit
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFruitItems = async () => {
      try {
        const res = await axios.get(`${API_URL}/fruitItems`);
        setFruitList(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchFruitItems();
  }, []);

  const fruitDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id');
    navigate(`/order/fruit/detail/${eId}`);
  };


  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  };


  const filteredFruit = [...fruitList]
    .filter((fruit) =>
      fruit.title.toLowerCase().includes(userInput.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'low') return a.price - b.price;
      if (sortOption === 'high') return b.price - a.price;
      return 0;
    })


  const paginatedFruits = filteredFruit.slice(offset, offset + limit)

  const totalPages = Math.ceil(filteredFruit.length / limit)



  return (
    <div className='order-fruit'>
      <div className='order-fruit-header'>
        <h2>과일 Total {filteredFruit.length}</h2>
        <div className="search">
          <span ><SearchBox handleChange={handleChange} /></span>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">기본순</option>
            <option value="low">낮은 가격순</option>
            <option value="high">높은 가격순</option>
          </select>
        </div>
      </div>
      <div className="order-fruit-mid">
        <div className='order-fruit-con'>
          <ul>
            {paginatedFruits.map((el, idx) => (
              <li key={idx} data-id={el.id} onClick={fruitDetailFn}>
                <div className="top">
                  <img src={`/images/fruit/${el.img}`} alt={el.img} />
                </div>
                <div className="bottom">
                  <h3>{el.title}</h3>
                  <p>{el.description}</p>
                  <span>{el.price.toLocaleString()}원</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFruit;
