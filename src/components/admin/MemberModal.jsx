import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { asyncAdminMemberFn } from '../../slice/adminSlice';
import ConfirmModal from './ConfirmModal'; 
import { API_URL } from '../../constans';

const MemberModal = ({ member, onClose }) => {
  const [userEmail, setUserEmail] = useState(member.userEmail);
  const [userPw, setUserPw] = useState(member.userPw);
  const [age, setAge] = useState(member.age);
  const [userName, setUserName] = useState(member.userName); 
  const [address, setAddress] = useState(member.address);
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber); 
  const [role, setRole] = useState(member.role);
//모달창
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); //확인모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 
  const [updateSuccess, setUpdateSuccess] = useState(false); // 업데이트 성공 여부

  const dispatch = useDispatch();

//회원등록로직
  const userUpdate = async () => {
    try {
      if (userPw.trim() === '') { //trim()앞뒤 공백을 제거 / trim이 없으면 스페이스, 탭을 못 잡음
        setModalMessage("비밀번호를 입력해 주세요");
        setIsConfirmModalOpen(true);
        return;
      }
      if (age.trim() === '') {
        setModalMessage("나이를 입력해 주세요");
        setIsConfirmModalOpen(true);
        return;
      }
      if (userName.trim() === '') {
        setModalMessage("이름을 등록해 주세요");
        setIsConfirmModalOpen(true);
        return;
      }
      if (address.trim() === '') {
        setModalMessage("주소를 등록해 주세요");
        setIsConfirmModalOpen(true);
        return;
      }
      if (phoneNumber.trim() === '') {
        setModalMessage("전화번호를 등록해 주세요");
        setIsConfirmModalOpen(true);
        return;
      }
      
      await axios.put(`${API_URL}/members/${member.id}`, {
        userEmail,
        userPw,
        age,
        userName,
        address,
        phoneNumber,
        role,
      });
      setModalMessage("회원 정보가 수정되었습니다.");
      setUpdateSuccess(true)
      setIsConfirmModalOpen(true); 
      dispatch(asyncAdminMemberFn()); 
    } catch (err) {
      alert(err)
    }
  };

  const userDelete = async () => {
    try {
      await axios.delete(`${API_URL}/members/${member.id}`);
      setIsDeleteModalOpen(false); // 삭제 모달 닫기
      onClose();
      dispatch(asyncAdminMemberFn()); 
    } catch (err) {
      alert(err);
    }
  };
  const checkConfirm = () => {
    setIsConfirmModalOpen(false); // 모달 닫기

    if(updateSuccess===true){
      onClose();
    }
  }
  return (
    <div className="modal">
      <div className="modal-con">
        <h2>회원 정보 수정</h2>
        <label>이메일</label>
        <div>{userEmail}</div>
        <label>비밀번호</label>
        <input 
          type="text" 
          value={userPw} 
          onChange={(e) => setUserPw(e.target.value)} 
        />
        <label>나이</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <label>이름</label> 
        <input 
          type="text" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
        />
        <label>주소</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <label>전화번호</label> 
        <input 
          type="text" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
        />    
        <label>권한</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ROLE_MEMBER">ROLE_MEMBER</option>
          <option value="ROLE_ADMIN">ROLE_ADMIN</option>
        </select>
        
        <div className="btn1-con">
          <button onClick={userUpdate} className="update-btn">수정</button>
          <button onClick={() => setIsDeleteModalOpen(true)} className="delete-btn">삭제</button>
        </div>
        <button onClick={onClose} className='close'>X</button>
      </div>

      {/* 수정 확인 모달 */}
      {isConfirmModalOpen && (
        <ConfirmModal 
          message={modalMessage}
          onConfirm={checkConfirm} 
          confirmOnly={true} // 확인 버튼만 보이도록 설정
        />
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <ConfirmModal 
          message="정말로 회원 정보를 삭제하시겠습니까?" 
          onConfirm={userDelete} 
          confirmOnly={false} // 취소 버튼 보이게
          onCancel={() => setIsDeleteModalOpen(false)} // 모달 닫기
        />
      )}
    </div>
  );
};

export default MemberModal;
