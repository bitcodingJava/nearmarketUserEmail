import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBox from './SearchBox'
import { API_URL } from '../../constans'

const OrderMeat = () => {
  const [meatList, setMeatList] = useState([])
  const [userInput, setUserInput] = useState("")
  const [limit, setLimit] = useState(6)
  const [page, setPage] = useState(1)
  const [sortOption, setSortOption] = useState('default')
  const offset = (page - 1) * limit

  //가상 db에서 데이터 불러오기(get)
  useEffect(() => {
    const axiosFn = async () => {
      try {
        const res = await axios.get(`${API_URL}/meatItems`)
        setMeatList(res.data)
      } catch (error) {
        alert(error)
      }
    };
    axiosFn();
  }, [])

  const navigate = useNavigate()
  const setDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute('data-id')

    // console.log(eId)
    // console.log(e.currentTarget)

    navigate(`/order/meat/meatdetail/${eId}`)
  }

  const handleChange = (e) => {
    setUserInput(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }


  const filteredMeat = [...meatList]
    .filter((meat) =>
      meat.title.toLowerCase().includes(userInput.toLocaleLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'low') return a.price - b.price
      if (sortOption === 'high') return b.price - a.price
      return 0
    })



  const paginatedMeats = filteredMeat.slice(offset, offset + limit)

  const totalPages = Math.ceil(filteredMeat.length / limit)


  return (
    <>
      <div className="order-meat">
        <div className="order-meat-con">
          <div className="order-meat-title">
            <h1>육류코너</h1>
            <div className="title-right">
              <span style={{ color: '#ff0000' }}>{filteredMeat.length}</span>
              <span> 개의 상품이 있습니다.</span>
            </div>
          </div>
          <div className="order-meat-mid">
            <div className="search">
              <span style={{ display: 'block' }}><SearchBox handleChange={handleChange} /></span>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="default">기본순</option>
                <option value="low">낮은 가격순</option>
                <option value="high">높은 가격순</option>
              </select>
            </div>
          </div>
          <div className="order-meat-item">
            <ul>
              {paginatedMeats.map((el, idx) => {
                return (
                  <li key={idx} data-id={el.id} onClick={setDetailFn}>
                    <div className="top">
                      <img src={`/images/meat/${el.img}`} alt={el.img} />
                    </div>
                    <div className="bottom">
                      <span style={{ fontSize: '20px' }}>{el.title}</span>
                      <span style={{ fontSize: '14px' }}>{el.description}</span>
                      <span style={{ fontWeight: 'bold' }}>{el.price.toLocaleString()}원</span>
                    </div>
                  </li>
                )
              })}
            </ul>
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
      </div>
    </>
  )
}

export default OrderMeat