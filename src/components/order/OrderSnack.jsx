import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { API_URL } from "../../constans";

const OrderSnack = () => {
  const [snackList, setSnackList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const offset = (page - 1) * limit;

  useEffect(() => {
    const axiosSetFn = async () => {
      try {
        const res = await axios.get(`${API_URL}/snackItems`);
        setSnackList(res.data);
      } catch (err) {
        alert(err);
      }
    };
    axiosSetFn();
  }, []);

  const navigate = useNavigate();

  const snackDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute("data-id");
    navigate(`/order/snack/detail/${eId}`);
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredSnack = [...snackList]
    .filter((snack) =>
      snack.title.toLowerCase().includes(userInput.toLocaleLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0;
    });

  const paginatedSnacks = filteredSnack.slice(offset, offset + limit);

  const totalPages = Math.ceil(filteredSnack.length / limit);

  return (
    <>
      <div className="order-snack-main">
        <div className="osm"></div>
      </div>
      <div className="order-snack-header">
        <h2>
          과자코너 <span>Total {filteredSnack.length}</span>
        </h2>
        <div className="order-snack-header-right">
          <span style={{ display: "block", marginLeft: "20px " }}>
            <SearchBox handleChange={handleChange} />
          </span>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">기본순</option>
            <option value="low">낮은 가격순</option>
            <option value="high">높은 가격순</option>
          </select>
        </div>
      </div>
      <div className="order-snack">
        <div className="order-snack-con">
          <ul>
            {paginatedSnacks.map((el, idx) => {
              return (
                <li key={idx} data-id={el.id} onClick={snackDetailFn}>
                  <div className="top">
                    <img
                      src={`/images/ordersnack/${el.img}`}
                      alt={`${el.title} 이미지`} // alt 속성 추가
                    />
                  </div>
                  <div className="bottom">
                    <span className="title">{el.title}</span>
                    <p className="description">{el.description}</p>
                    <span className="price">{el.price}원</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
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
            className={page === i + 1 ? "active" : ""}
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
    </>
  );
};

export default OrderSnack;
