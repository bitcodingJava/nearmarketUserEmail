import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminProductModal from './AdminProductModal';
import { asyncAdminMeatItemsFn } from '../../slice/adminSlice';

const AdminBest = () => {
  const indexItems = useSelector(state => state.admin.meatItems);
  const dispatch = useDispatch(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(asyncAdminMeatItemsFn());
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
        <h1>육류 상품 목록</h1>
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
              {indexItems && indexItems.length > 0 ? (
                indexItems.map((el, idx) => (
                  <tr key={idx}>
                    <td>{el.id}</td>
                    <td>{el.title}</td>
                    <td><img src={`/images/meat/${el.img}`} alt={el.title} style={{ width: '50px' }} /></td>
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
          type="meatItems" 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default AdminBest;
