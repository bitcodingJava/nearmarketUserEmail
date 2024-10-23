import React, { useEffect, useState } from 'react';

const { kakao } = window;

const ApiShopModal = ({ shop, onClose }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);

    useEffect(() => {
        if (shop) {
            const script = document.createElement("script");
            script.async = true;
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=03bbd3ba17e0e525572e91ca05d086de&autoload=false`;
            document.head.appendChild(script);

            script.onload = () => {
                if (window.kakao && window.kakao.maps) {
                    window.kakao.maps.load(() => {
                        const container = document.getElementById('shop-map');
                        const options = {
                            center: new kakao.maps.LatLng(shop.lat, shop.lng),
                            level: 5,
                        };

                        const newMap = new kakao.maps.Map(container, options);
                        setMap(newMap); // 맵 상태 저장

                        // 마커 생성
                        const newMarker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(shop.lat, shop.lng),
                        });
                        newMarker.setMap(newMap);
                        setMarker(newMarker); // 마커 상태 저장

                        // 인포윈도우 생성
                        const newInfoWindow = new kakao.maps.InfoWindow({
                            content: `
                            <div class="kakao-info-window">
                              <b>${shop.title}</b><br/>
                              주소: ${shop.address}<br/>
                              전화번호: ${shop.phoneNum}<br/>
                              우편번호:${shop.postNum}<br/>
                              위도:${shop.lat}<br/>
                              경도:${shop.lng}      
                              </div>`,
                            removable: true,
                        });
                        newInfoWindow.open(newMap, newMarker);
                        setInfoWindow(newInfoWindow); // 인포윈도우 상태 저장

                        // 마커 클릭 시 인포윈도우 다시 열기
                        kakao.maps.event.addListener(newMarker, 'click', () => {
                            newInfoWindow.open(newMap, newMarker);
                        });
                    });
                }
            };
        }
    }, [shop]);

    if (!shop) {
        return null;
    }

    return (
        <div className="paymentApi-modal">
            <div className="paymentApi-modal-con">
                <button className="paymentApi-close-btn" onClick={onClose}>X</button>
                <h3>{shop.title}의 위치</h3>
                <div id="shop-map" style={{ width: '100%', height: '500px', boxSizing: 'border-box' }}></div>
            </div>
        </div>
    );
};

export default ApiShopModal;
