
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberModal from './MemberModal';
import { asyncAdminMemberFn } from '../../slice/adminSlice';
import SearchBox from '../order/SearchBox';




const AdminMember = () => {
  const members = useSelector(state => state.admin.members)
  const dispatch = useDispatch()
  console.log(members)
  useEffect(() => {
    dispatch(asyncAdminMemberFn())
  }, [])
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState();
  const [userInput, setUserInput] = useState("")

  const handleOpenModal = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
  };


  const handleChange = (e) => {
    setUserInput(e.target.value)
  }
  const filteredMembers = members.filter((mem) => {
    return mem.userEmail.toLowerCase().includes(userInput.toLowerCase())
  })

  return (
    <>
      <div className="admin-member">
        <div className="admin-member-con">
          <h1>ADMIN-MEMBERS</h1>
          <span style={{ display: 'flex'}}>
            <SearchBox handleChange={handleChange} />
          </span>
          <div className="members">
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>이메일</th>
                  <th>비밀번호</th>
                  <th>나이</th>
                  <th>이름</th>
                  <th>주소</th>
                  <th>전화번호</th>
                  <th>권한</th>
                  <th>보기</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers && filteredMembers.map((el, idx) => (
                  <tr key={idx} className={el.role === 'ROLE_ADMIN' ? 'role-admin' : ''}>
                    <td>{el.id}</td>
                    <td>{el.userEmail}</td>
                    <td>{el.userPw}</td>
                    <td>{el.age}</td>
                    <td>{el.userName}</td>
                    <td>{el.address}</td>
                    <td>{el.phoneNumber}</td>
                    <td>{el.role}</td>
                    <td>
                      <button onClick={() => handleOpenModal(el)}>보기</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <MemberModal
        member={selectedMember}
        onClose={handleCloseModal}
      />}
    </>
  );
}

export default AdminMember;
