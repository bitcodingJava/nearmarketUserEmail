import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal'; 
import { API_URL } from '../../constans';
const itemData = {
  title: "",
  price: 0,
  description: "",
  img: ""
}

const AdminProductsInsert = () => {
  const [formData, setFormData] = useState(itemData);
  const [imgFile, setImgFile] = useState('');
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 모달 
  const imgRef = useRef();
  const selectedCategory = formData["order-corner"];
  const navigate = useNavigate();

  const itemAddFn = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? Number(value) : value; // 가격을 숫자로 변환
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  // 이미지 미리보기
  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        img: file.name
      });
    }
  };

  // 상품 등록 로직
  const updateItemFn = async () => {
    try {
      if (formData.title === "") {
        setModalMessage("상품 이름을 입력해 주세요");
        setConfirmModalOpen(true);
        return;
      }
      if (formData.price === 0) {
        setModalMessage("상품 가격을 입력해 주세요");
        setConfirmModalOpen(true);
        return;
      }
      if (formData.description === "") {
        setModalMessage("상품 설명을 입력해 주세요");
        setConfirmModalOpen(true);
        return;
      }
      if (formData.img === "") {
        setModalMessage("상품 이미지를 등록해 주세요");
        setConfirmModalOpen(true);
        return;
      }
      
      let itemUrl = '';
      switch (selectedCategory) {
        case 'vegetable':
          itemUrl = 'vegetableItems';
          break;
        case 'meat':
          itemUrl = 'meatItems';
          break;
        case 'fruit':
          itemUrl = 'fruitItems';
          break;
        case 'snack':
          itemUrl = 'snackItems';
          break;
        case 'best':
          itemUrl = 'indexItems';
          break;
        default:
          setModalMessage('상품 코너를 선택하세요.');
          setConfirmModalOpen(true);
          return;
      }

      const res = await axios.get(`${API_URL}/${itemUrl}`);
      const num = res.data.findIndex(el => el.title === formData.title);

      if (num !== -1) {
        setModalMessage("이미 등록된 상품입니다.");
        setConfirmModalOpen(true);
        return;
      }

      await axios.post(`${API_URL}/${itemUrl}`, formData);
      setModalMessage("상품등록 성공!~ (˶ᵔ ᵕ ᵔ˶)");
      setConfirmModalOpen(true);
      
    } catch (error) {
      setModalMessage('상품 등록 중 오류가 발생했습니다.');
      setConfirmModalOpen(true);
    }
  };

  // 모달 확인 버튼 클릭 시
  const checkConfirm = () => {
    setConfirmModalOpen(false); // 모달 닫기
    if (modalMessage === "상품등록 성공!~ (˶ᵔ ᵕ ᵔ˶)") {//에러가 있으면 이동 불가
      navigate(`/admin/${selectedCategory}`); // 상품 등록 성공 시 이동
    }
  };

  return (
    <>
      <div className="insert">
        <div className="insert-con">
          <div className="insert-left">
            <div className="insert-left-con">
              <img
                src={imgFile ? imgFile : "https://placehold.co/500x500/ffffff/cccccc.png"}
                alt="이미지를 첨부해 주세요"
              />
            </div>
          </div>
          <div className="insert-right">
            <div className="insert-right-con">
              <div className="right-top">
                <h1>상품등록</h1>
                <ul>
                  <li>
                    <p>상품 이름</p>
                    <input type="text" name="title" id="title"
                      onChange={itemAddFn}
                      placeholder='상품 이름을 입력하세요.' />
                  </li>
                  <hr />
                  <li>
                    <p>상품 가격</p>
                    <input type="number" name="price" id="price"
                      onChange={itemAddFn}
                      placeholder='상품 가격을 입력하세요. (숫자만)' />
                  </li>
                  <hr />
                  <li>
                    <p>상품 설명</p>
                    <textarea name="description" id="description"
                      onChange={itemAddFn}
                      placeholder='상품 설명을 입력하세요.'></textarea>
                  </li>
                  <hr />
                  <li>
                    <select name="order-corner" id="order-corner" onChange={itemAddFn}>
                      <option value="">상품코너 선택</option>
                      <option value="best">베스트코너</option>
                      <option value="vegetable">채소코너</option>
                      <option value="meat">고기코너</option>
                      <option value="fruit">과일코너</option>
                      <option value="snack">과자코너</option>
                    </select>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="right-bottom">
                <label htmlFor="img">상품 이미지 선택</label>
                <input multiple type="file" accept='image/jpg, image/png, image/jpeg' name="img" id="img"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
                <button onClick={updateItemFn}>상품등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          confirmOnly={true}
          message={modalMessage}
          onConfirm={checkConfirm}
        />
      )}
    </>
  );
}
export default AdminProductsInsert;
