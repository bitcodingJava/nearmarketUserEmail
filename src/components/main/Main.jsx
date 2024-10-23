import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {

  const navigate = useNavigate()
  const [autoImg, setAutoImg] = useState(0)

  const FirstIndex = 0;
  const LastIndex = 3;
  const MoveIndex = 1;
  const intervalTime = 4000;

  const moveToSlide = (value) => {
    if (value === 'prev') {
      setAutoImg((prevState) =>
        prevState > FirstIndex ? prevState - MoveIndex : LastIndex
      )
    }
    if (value === 'next') {
      setAutoImg((prevState) =>
        prevState < LastIndex ? prevState + MoveIndex : FirstIndex
      )
    }
    if (typeof value === 'number') {
      setAutoImg(value)
    }
  }

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setAutoImg((prevState) =>
        prevState < LastIndex ? prevState + MoveIndex : FirstIndex
      );
    }, intervalTime);

    // 컴포넌트 언마운트 시 인터벌 제거
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <>
      <div className="main">
        <div className="main-sec">
          <div className="section1">
            {/* 이미지 양 옆 넘기기 버튼 */}
            <div className="bCon">
              <button className="leftBtn" onClick={() => moveToSlide('prev')}>&lsaquo;</button>
              <button className="rightBtn" onClick={() => moveToSlide('next')}>&rsaquo;</button>
            </div>
            {/* 자동 넘기기 이미지 */}
            <div className="autoGallery">
              <ul>
                <li style={{
                  transform: `translateX(${-100 * autoImg}%)`
                }}></li>
                <li style={{
                  transform: `translateX(${-100 * autoImg}%)`
                }}></li>
                <li style={{
                  transform: `translateX(${-100 * autoImg}%)`
                }}></li>
                <li style={{
                  transform: `translateX(${-100 * autoImg}%)`
                }}></li>
              </ul>
            </div>
            {/* 이미지 넘어가면 한 칸씩 넘어가는 하단 바 */}
            <div className="bottomBar">
              <ul>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <li key={idx}
                    onClick={() => moveToSlide(idx)}
                    style={{ backgroundColor: autoImg === idx ? 'white' : 'rgba(255, 255, 255, 0.3)' }}></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="horizontal">&nbsp;</div>
          {/* grid 작업 LIST */}
          <div className="section2">
            <div className="sec2-con">
              <ul>
                <li onClick={() => navigate('/order/vegetable')}>
                  <div className="top">
                    <img src="/images/orderheader/vegetable.png" alt="vagetable-img" />
                  </div>
                  <div className="bottom">
                    <span>야채코너</span>
                  </div>
                </li>
                <li onClick={() => navigate('/order/meat')}>
                  <div className="top">
                    <img src="/images/orderheader/meat.png" alt="meat-img" />
                  </div>
                  <div className="bottom">
                    <span>육류코너</span>
                  </div>
                </li>
                <li onClick={() => navigate('/order/fruit')}>
                  <div className="top">
                    <img src="/images/orderheader/fruit.png" alt="fruit-img" />
                  </div>
                  <div className="bottom">
                    <span>과일코너</span>
                  </div>
                </li>
                <li onClick={() => navigate('/order/snack')}>
                  <div className="top">
                    <img src="/images/orderheader/snack.png" alt="snack-img" />
                  </div>
                  <div className="bottom">
                    <span>과자코너</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="horizontal">&nbsp;</div>
        </div>
      </div>
    </>
  )
};

export default Main;
