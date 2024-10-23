import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAdminShopFn } from '../../slice/adminSlice';
import ConfirmModal from './ConfirmModal'; 
import { API_URL } from '../../constans';

const AddShopModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [postNum, setPostNum] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [img, setImg] = useState('');
    const [previewImg, setPreviewImg] = useState([])
    const dispatch = useDispatch();
    //모달창
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("")
    const [updateSuccess, setUpdateSuccess] = useState(false);

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

    const shopAdd = async () => {
        try {
            if (title.trim() === "") { //trim()앞뒤 공백을 제거 / trim이 없으면 스페이스, 탭을 못 잡음
                setModalMessage("상점 이름을 입력해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
              if (img.trim() === "") {
                setModalMessage("상점 이미지를 등록해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
              if (address.trim() === "") {
                setModalMessage("상점 주소를 입력해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
              if (postNum.trim() === "") {
                setModalMessage("상점 우편번호를 입력해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
              if (phoneNum.trim() === "") {
                setModalMessage("상점 전화번호를 입력해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
              if (lat === "") {//trim은 문자열만 가능하다 숫자는 공백이 없다
                setModalMessage("상점 위도를 입력해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
              if (lng === "") {
                setModalMessage("상점 경도를 입력해 주세요.");
                setConfirmModalOpen(true);
                return;
              }
            await axios.post(`${API_URL}/api`, {
                title,
                address,
                postNum,
                phoneNum,
                img,
                lat,
                lng,
            });
            setModalMessage("상점이 추가되었습니다.");
            setConfirmModalOpen(true); // 수정 모달 닫기 
            dispatch(asyncAdminShopFn());
            setUpdateSuccess(true);
        } catch (err) {
            alert(err);
        }
    };
        const checkConfirm = () =>{
            setConfirmModalOpen(false);
            if(updateSuccess===true){
                onClose();
            }
        }
    return (
        <div className="modal">
            <div className="modal-con">
                <h2>주문처 추가</h2>
                <label>주문처 이름</label>
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
                <label>주소</label>
                <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                />
                <label>우편번호</label>
                <input 
                    type="number" 
                    value={postNum} 
                    onChange={(e) => setPostNum(e.target.value)} 
                />
                <label>전화번호</label> 
                <input 
                    type="text" 
                    value={phoneNum} 
                    onChange={(e) => setPhoneNum(e.target.value)} 
                />
                <label>위도</label>
                <input 
                    type="number" 
                    value={lat} 
                    onChange={(e) => setLat(Number(e.target.value))} 
                />
                <label>경도</label> 
                <input 
                    type="number" 
                    value={lng} 
                    onChange={(e) => setLng(Number(e.target.value))} 
                />           
                <button onClick={shopAdd} className="update-btn">추가</button>
                <button onClick={onClose} className='close'>X</button>
            </div>
            {/* 수정 확인 모달 */}
           {isConfirmModalOpen && (
                 <ConfirmModal 
                  message={modalMessage}
                  onConfirm={checkConfirm} 
                  confirmOnly={true} // 확인 버튼
                />
             )}
        </div>
    );
};

export default AddShopModal;
