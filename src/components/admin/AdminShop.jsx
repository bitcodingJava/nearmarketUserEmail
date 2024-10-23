import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAdminShopFn } from '../../slice/adminSlice';
import ShopModal from './ShopModal';
import AddShopModal from './AddShopModal';
import ApiShopModal from './ApiShopModal';

const AdminShop = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedShop, setSelectedShop] = useState(); 
    const [isApiModalOpen, setIsApiModalOpen]=useState(false);

    const dispatch = useDispatch();
    const api = useSelector(state => state.admin.api); 

    useEffect(() => {
        dispatch(asyncAdminShopFn());
    }, [dispatch]);

    const handleOpenModal = (shop) => {
        setSelectedShop(shop); 
        setModalOpen(true); 
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedShop(null); 
    };

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };
    const handleOpenApiModal = (shop) =>{
        setSelectedShop(shop); 
        setIsApiModalOpen(true);
    }
    const handleCloseApiModal = () => {
        setIsApiModalOpen(false);
        setSelectedShop(null); 
    };
    return (
        <>
        <div className="admin-shop">
            <div className="admin-shop-con">
                <h1>주문처 관리</h1>
                <button onClick={handleOpenAddModal}>주문처 추가</button>
                <table>
                    <thead>
                        <tr>
                            <th>상점이름</th>
                            <th>주소</th>
                            <th>우편</th>
                            <th>전화번호</th>
                            <th>위도</th>
                            <th>경도</th>
                            <th>보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {api && api.map((el, idx) => (
                            <tr key={idx}>
                                <td>{el.title}</td>
                                <td>{el.address}</td>
                                <td>{el.postNum}</td>
                                <td>{el.phoneNum}</td>
                                <td>{el.lat}</td>
                                <td>{el.lng}</td>
                                <td>
                                    <button onClick={() => handleOpenModal(el)}>보기</button>
                                    <button onClick={() => handleOpenApiModal(el)}>지도보기</button>
                                </td>                       
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {isModalOpen && <ShopModal shop={selectedShop} onClose={handleCloseModal} />}
        {isAddModalOpen && <AddShopModal onClose={handleCloseAddModal} />}
        {isApiModalOpen && <ApiShopModal shop={selectedShop} onClose={handleCloseApiModal} />}
        </>
    );
}

export default AdminShop;
