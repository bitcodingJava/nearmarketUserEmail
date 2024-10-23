import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const items = [
  { src: '/images/start/snack.jpg', title: 'SNACK', content: 'Dessert is a course that concludes a meal. The course consists of sweet food.' },
  { src: '/images/start/vegetable.jpg', title: 'VEGETABLE', content: 'Vegetables are parts of plants that are consumed by humans or other animals as food.' },
  { src: '/images/start/meat.jpg', title: 'MEAT', content: 'Meat is animal tissue, often muscle, that is eaten as food. Humans have hunted and farmed other animals for meat since prehistory.' },
  { src: '/images/start/fruit.jpg', title: 'FRUIT', content: 'Fruits are the means by which flowering plants (also known as angiosperms) disseminate their seeds.' }
]



const Start = () => {
  const [itemActive, setItemActive] = useState(0);
  const intervalRef = useRef(null);   // 자동슬라이드의 타이머를 저장하기 위한 변수
  const navigate = useNavigate()


  const handleNext = () => {
    setItemActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setItemActive((prev) => (prev - 1 + items.length) % items.length);
  };



  const handleThumbnailClick = (index) => {
    setItemActive(index);
  };


  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };


  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);


  useEffect(() => {
    clearInterval(intervalRef.current);
    startAutoSlide();
  }, [intervalRef.current]);




  return (
    <div className="slider">
      <div className="list">

        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${index === itemActive ? 'active' : ''}`}
          >
            <img src={item.src} alt={`Slide ${index + 1}`} />
            <div className="content">
              <p>NM.K</p>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <div className="buttons">
                <button onClick={() => {
                  navigate('/main')
                }}>GO MARKET</button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <div className="arrows">
        <div className="buttons">
          <button id="prev" onClick={handlePrev}>
            &lt;
          </button>
          <button id="next" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
      <div className="thumbnail">

        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${index === itemActive ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={item.src} alt={`Thumbnail ${index + 1}`} />
            <div className="content">{item.title}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Start;