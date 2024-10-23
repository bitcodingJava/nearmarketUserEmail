import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminFruitFn } from '../../slice/adminSlice';
import AdminProductModal from './AdminProductModal';

const AdminFruit = () => {
  const fruitItems = useSelector(state => state.admin.fruitItems);
  const dispatch = useDispatch(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(asyncAdminFruitFn());
  }, [dispatch]); 

  // 모달 열기 함수
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); 
  };

  return (
    <div className="admin-product">
      <div className="admin-product-con">
        <h1>베스트 상품 목록</h1>
        <div className="products">
          <table>
            <thead>
              <tr>
                <th>아이디</th>
                <th>제목</th>
                <th>이미지</th>
                <th>가격</th>
                <th>설명</th>
                <th>보기</th>
              </tr>
            </thead>
            <tbody>
              {fruitItems && fruitItems.length > 0 ? (
                fruitItems.map((el, idx) => (
                  <tr key={idx}>
                    <td>{el.id}</td>
                    <td>{el.title}</td>
                    <td><img src={`/images/fruit/${el.img}`} alt={el.title}  
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                    <td>{el.price.toLocaleString()}원</td>
                    <td>{el.description}</td>
                    <td><button onClick={() => openModal(el)}>보기</button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">상품 정보가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <AdminProductModal
          product={selectedProduct} 
          type="fruitItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminFruit;