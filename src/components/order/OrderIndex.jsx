import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constans';

const OrderIndex = () => {
  const [indexList, setIndexList] = useState([]);
  const [fruitItem, setFruitItem] = useState({});
  const [vegetableItem, setVegetableItem] = useState({});
  const [snackItem, setSnackItem] = useState({});
  const [meatItem, setMeatItem] = useState({});
  const navigate = useNavigate()

  useEffect (()=>{
    const fetchData = async () =>{
      try{
        const [indexRes, fruitRes, vegetableRes, snackRes, meatRes] = await Promise.all([
          axios.get(`${API_URL}/indexItems`),
          axios.get(`${API_URL}/fruitItems`),
          axios.get(`${API_URL}/vegetableItems`),
          axios.get(`${API_URL}/snackItems`),
          axios.get(`${API_URL}/meatItems`)
        ])
        setIndexList(indexRes.data)
        setFruitItem(fruitRes.data[0])
        setVegetableItem(vegetableRes.data[3])
        setSnackItem(snackRes.data[3])
        setMeatItem(meatRes.data[0])
      }catch(error){
        alert(error)
      }
    }
    fetchData()
  }, [])
  
  const vegetableDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')
    navigate(`/order/vegetable/detail/${eId}`)
  }
  const meatDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')
    navigate(`/order/meat/meatDetail/${eId}`)
  }
  const fruitDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')
    navigate(`/order/fruit/detail/${eId}`)
  }
  const snackDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')
    navigate(`/order/snack/detail/${eId}`)
  }
  const indexDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')
    navigate(`/order/index/detail/${eId}`)
  }

  return (
    <div className='order-index'>
      <div className="order-index-con">
        <div className='order-index-top'>
          <h2>코너별 추천상품</h2>
          <ul>
            <li data-id={vegetableItem.id} onClick={vegetableDetailFn}>
              <div className="top">
                <img src={`/images/vegetable/${vegetableItem.img}`} alt={vegetableItem.title} />
              </div>
              <div className="bottom">
                <h4>{vegetableItem.title}</h4>
                <p>{vegetableItem.description}</p>
                <span>{vegetableItem.price ? vegetableItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
            <li data-id={meatItem.id} onClick={meatDetailFn}>
              <div className="top">
                <img src={`/images/meat/${meatItem.img}`} alt={meatItem.title} />
              </div>
              <div className="bottom">
                <h4>{meatItem.title}</h4>
                <p>{meatItem.description}</p>
                <span>{meatItem.price ? meatItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
            <li data-id={fruitItem.id} onClick={fruitDetailFn}>
              <div className="top">
                <img src={`/images/fruit/${fruitItem.img}`} alt={fruitItem.title} />
              </div>
              <div className="bottom">
                <h4>{fruitItem.title}</h4>
                <p>{fruitItem.description}</p>
                <span>{fruitItem.price ? fruitItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
            <li data-id={snackItem.id} onClick={snackDetailFn}>
              <div className="top">
                <img src={`/images/ordersnack/${snackItem.img}`} alt={snackItem.title} />
              </div>
              <div className="bottom">
                <h4>{snackItem.title}</h4>
                <p>{snackItem.description}</p>
                <span>{snackItem.price ? snackItem.price.toLocaleString() : '가격 정보 없음'}원</span>
              </div>
            </li>
          </ul>
        </div>
        <div className='order-index-top'>
          <h2>이런 상품 어때요?</h2>
          <ul>
            {indexList && indexList.map((el, idx) => (
              <li key={idx} data-id={el.id} onClick={indexDetailFn}>
                <div className="top">
                  <img src={`/images/index/${el.img}`} alt={el.img} />
                </div>
                <div className="bottom">
                  <h4>{el.title}</h4>
                  <p>{el.description}</p> 
                  <span>{el.price.toLocaleString()}원</span> 
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderIndex;
