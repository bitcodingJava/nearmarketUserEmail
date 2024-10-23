import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constans';

const { kakao } = window;

const Api = () => {
  const [api, setApi] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null); // 선택된 상점 정보 상태
  const [map, setMap] = useState(null); // 지도 상태 추가

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${API_URL}/api`);
        setApi(res.data); // API 데이터 설정
        if (res.data.length > 0) {
          setSelectedShop(res.data[0]);}
      } catch (err) {
        alert(err)
      }
    };

    fetchApi();
  }, []); // API 데이터를 처음 가져올 때만 실행

  useEffect(() => {
    if (api.length > 0) { // api 데이터가 있을 때만 지도 로딩
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=03bbd3ba17e0e525572e91ca05d086de&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(37.65323, 127.061308), // 초기 중심 위치
              level: 7, // 초기 확대 수준
            };

            const newMap = new window.kakao.maps.Map(container, options);
            setMap(newMap); // 지도 상태 업데이트

            // 상점 목록을 기반으로 마커 및 인포윈도우 생성
            api.forEach((shop) => {
              const markerPosition = new window.kakao.maps.LatLng(shop.lat, shop.lng);
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });

              marker.setMap(newMap); // 마커를 지도에 추가

              // 인포윈도우 내용 생성
              const content = `
                <div class="api-info-window">
                  <b>${shop.title}</b><br>
                  주소:${shop.address}<br>
                  전화번호: ${shop.phoneNum}<br>
                  우편번호: ${shop.postNum}
                </div>
              `;

              const infowindow = new window.kakao.maps.InfoWindow({
                content: content,
                removable: true,
              });

              window.kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(newMap, marker);
              });
            });
          });
        }
      };
    }
  }, [api]); // api 데이터가 변경될 때마다 실행

  const shopInfoFn = (shop) => {
    setSelectedShop(shop); // 클릭된 상점 정보 업데이트

    if (map) {
      const position = new kakao.maps.LatLng(shop.lat, shop.lng);
      map.setCenter(position); // 지도 중심을 해당 상점으로 설정
      map.setLevel(5); // 확대 수준 조정 
    }
  };

  return (
    <>
      <div className="map-con">
        <div id="map"></div>
        <div className="api-right">
          <div className="api-btn">
            {api.map((el) => (
              <button key={el.id} onClick={() => shopInfoFn(el)}>
                {el.title}
              </button>
            ))}
          </div>
          {selectedShop && (
            <div className="shop-info">
              <h3>선택된 상점 정보</h3>
              <p><b>상점명:</b> {selectedShop.title}</p>
              <p><b>주소:</b> {selectedShop.address}</p>
              <p><b>전화번호:</b> {selectedShop.phoneNum}</p>
              <p><b>우편번호:</b> {selectedShop.postNum}</p>
              {selectedShop.img && (
                <img
                  src={`/images/mart/${selectedShop.img}`}
                  alt={selectedShop.img}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Api;
