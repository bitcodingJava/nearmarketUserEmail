import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  asyncAdminFruitFn,
  asyncAdminVegetableItemsFn,
  asyncAdminSnackItemsFn,
  asyncAdminMeatItemsFn,
  asyncAdminindexItemsFn
} from '../../slice/adminSlice';
import ConfirmModal from './ConfirmModal'; 
import { API_URL } from '../../constans';



const AdminProductModal = ({ product, type, onClose }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [img, setImg] = useState(product.img); // img 파일 이름 사용
  const [rocket, setRocket] = useState(product.rocket); 
  const [slideImage, setSlideImage] = useState(product.slide); 
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState([])

//모달창
const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      setImg(file.name); // 이미지 파일 이름 저장
    }
  };

  const preview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    }
    if(file && file.type.match('image.*')){
      reader.readAsDataURL(file);
    }
  }

  // 상품 업데이트 함수
  const productUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${type}/${product.id}`, {
        title,
        price,
        img, // img 파일 이름 전송
        description,
        rocket,
        slideImage
      });
      setIsConfirmModalOpen(false); // 수정모달 닫기
      onClose(); //전체모달 

      // 상품 종류에 따라 데이터 다시 불러오기
      switch (type) {
        case 'fruitItems':
          dispatch(asyncAdminFruitFn());
          break;
        case 'vegetableItems':
          dispatch(asyncAdminVegetableItemsFn());
          break;
        case 'snackItems':
          dispatch(asyncAdminSnackItemsFn());
          break;
        case 'meatItems':
          dispatch(asyncAdminMeatItemsFn());
          break;
        case 'indexItems':
          dispatch(asyncAdminindexItemsFn());
          break;
        default:
          break;
      }
      
    } catch (err) {
      alert(err);
    }
  };

  // 상품 삭제 함수
  const productDelete = async () => {
      try {
        await axios.delete(`${API_URL}/${type}/${product.id}`);
        setIsDeleteModalOpen(false); // 삭제 모달 닫기
        onClose();

        // 상품 종류에 따라 데이터 다시 불러오기
        switch (type) {
          case 'fruitItems':
            dispatch(asyncAdminFruitFn());
            break;
          case 'vegetableItems':
            dispatch(asyncAdminVegetableItemsFn());
            break;
          case 'snackItems':
            dispatch(asyncAdminSnackItemsFn());
            break;
          case 'meatItems':
            dispatch(asyncAdminMeatItemsFn());
            break;
          case 'indexItems':
            dispatch(asyncAdminindexItemsFn());
            break;
          default:
            break;
        }
      } catch (err) {
        alert(err);
      }
    
  };

  return (
    <div className="modal">
      <div className="modal-con">
        <button className="close" onClick={onClose}>X</button>
        <h2>{`상품 정보 수정 (${type})`}</h2>
        <label>상품명</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <label>이미지 수정</label>
        <input 
          type="file" 
          accept="image/jpg, image/png, image/jpeg" 
          name="img" 
          id="img"
          onChange={uploadFile} 
          onChangeCapture={preview}
        />
        {img && <img src={previewImg ? previewImg : "/default-image-path.jpg"} alt="미리보기" style={{ width: '100px', height: '100px' }} />}
        <label>가격</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label>설명</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <div className="btn1-con">
        <button onClick={() => setIsConfirmModalOpen(true)} className="update-btn">수정</button>
        <button onClick={() => setIsDeleteModalOpen(true)} className="delete-btn">삭제</button>
        </div>
      </div>
    {/* 수정 확인 모달 */}
    {isConfirmModalOpen && (
        <ConfirmModal 
          message="상품 정보가 수정되었습니다." 
          onConfirm={productUpdate} 
          confirmOnly={true} // 확인 버튼만 보이도록 설정
          //확인을 누르면 productUpdate의 onClose() (부모컴퍼넌트) 상위모달이 닫히며 같이 닫힘
        />
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <ConfirmModal 
          message="정말로 상품 정보를 삭제하시겠습니까?" 
          onConfirm={productDelete}  //확인버튼 누르면
          confirmOnly={false} // 취소 버튼도
          onCancel={() => setIsDeleteModalOpen(false)} // 취소버튼누르면
        />
      )}
    
    </div>
  );
};

export default AdminProductModal;
