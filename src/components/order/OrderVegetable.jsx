import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { API_URL } from "../../constans";

const OrderVegetable = () => {
  const [vegetable, setVgetable] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const offset = (page - 1) * limit;

  const navigate = useNavigate();

  useEffect(() => {
    const axiosFn = async () => {
      try {
        const res = await axios.get(`${API_URL}/vegetableItems`);
        setVgetable(res.data);
      } catch (error) {
        alert(error);
      }
    };
    axiosFn();
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredVegetable = [...vegetable] //배열을 복사하는 이유: 원본 배열을 수정하지 않고 정렬된 배열을 만들기 위해서
    .filter((vege) =>
      vege.title.toLowerCase().includes(userInput.toLowerCase())
    )
    .sort((a, b) => {
      //.sort() : 배열 정렬시 사용하는 method임(정렬기준에 맞게 분류함)
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0; // 기본순 (원래 순서 유지)
    });

  const paginatedVegetables = filteredVegetable.slice(offset, offset + limit); // slice()는 전체정보에서 내가 원하는 정보만 잘라서 가져오는 코드임!

  const totalPages = Math.ceil(filteredVegetable.length / limit); ///math.ceil 은 소수점을 올림해서 전체페이지 갯수 계산한 것임!!

  const orderVegetableDetailFn = (e) => {
    const eId = e.currentTarget.getAttribute("data-id");

    navigate(`/order/vegetable/detail/${eId}`);
  };

  return (
    <>
      <div className="order-vtb">
      </div>
      <div className="order-vegetable">
        <div className="order-vegetable-header">
          <div className="title">신선한 채소</div>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="default">기본순</option>
            <option value="low">낮은 가격순</option>
            <option value="high">높은 가격순</option>
          </select>
        </div>
        <div className="order-vegetable-con">
          <span>Total {filteredVegetable.length}</span>
          <span style={{ display: "block", margin: "20px 0" }}>
            <SearchBox handleChange={handleChange} />
          </span>

          <ul>
            {paginatedVegetables.map((el) => {
              return (
                <li
                  key={el.id}
                  data-id={el.id}
                  onClick={orderVegetableDetailFn}
                >
                  <div className="top">
                    <img src={`/images/vegetable/${el.img}`} alt={el.img} />
                  </div>
                  <div className="bottom">
                    <span>{el.title}</span>
                    <span className="delivery-order">
                      <img
                        src={`/images/vegetable/${el.rocket}`}
                        alt={el.rocket}
                      />
                      로켓배송
                    </span>
                    <span>{el.description}</span>
                    <span>{el.price}원</span>
                  </div>
                </li>
              );
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
                className={page === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
              // (_,i)
              //첫 번째 매개변수 _: 배열의 요소 값이에요. 이 코드에서는 배열이 빈 배열이라 값이 필요 없어서 무시하고, 그냥 _로 표시합니다.
              //두 번째 매개변수 i: 배열의 인덱스 번호예요. 0부터 시작해서 1씩 증가합니다.
              //기억하기!
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
    </>
  );
};

export default OrderVegetable;
