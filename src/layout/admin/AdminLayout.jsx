import React, { useEffect, useState } from 'react';
import AdminLeft from './AdminLeft';
import AdminRight from './AdminRight';

const AdminLayout = () => {
  const [isGnbVisible, setGnbVisible] = useState(false);

  const toggleGnb = () => {
    setGnbVisible((prev) => !prev); // gnb의 표시 상태 토글
  };

  const handleClickOutside = (e) => {
    const gnbElement = document.querySelector('.admin-left');
    const buttonElement = document.querySelector('.button');
    
    if (window.innerWidth <= 1030) {
      if (gnbElement && !gnbElement.contains(e.target) && !buttonElement.contains(e.target)) {
        setGnbVisible(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1030) {
        setGnbVisible(true); // 너비가 1030px 이상일 때 gnb 보이기
      } else {
        setGnbVisible(false); // 1030px 미만일 때 gnb 숨기기
      }
    };

    handleResize(); // 초기 렌더링 시 호출
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="admin">
      <div className="admin-con">
        <AdminLeft isGnbVisible={isGnbVisible} setGnbVisible={setGnbVisible}/>
        <AdminRight />
        <span className='button' onClick={toggleGnb}>=</span>
      </div>
    </div>
  );
};

export default AdminLayout;
