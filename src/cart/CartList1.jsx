import React, { useState, useEffect } from "react"; // React와 훅 불러오기
import { useDispatch, useSelector } from "react-redux"; // Redux 사용을 위한 훅
import { useNavigate } from "react-router-dom"; // 페이지 이동용 훅
import { deleteCart, migrateGuestCartToUser } from "../../src/slice/cartSlice1"; // Redux 액션 가져오기
import CartModal from "./CartModal"; // 상품 상세 모달
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // 단일 삭제 확인 모달
import SelectDeleteModal from "./SeleteModal"; // 선택 삭제 확인 모달

const CartList1 = () => {
  const dispatch = useDispatch(); // Redux 액션 호출용
  const navigate = useNavigate(); // 페이지 이동용

  // 여러 상태 관리: 모달 열림, 선택한 아이템, 현재 페이지 등
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectDeleteModalOpen, setIsSelectDeleteModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null); // 모달에 표시할 아이템 정보 저장
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 아이템들
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const itemsPerPage = 4; // 한 페이지에 표시할 상품 수
  const isLogin = useSelector((state) => state.auth.isLogin); // 로그인 여부 확인
  const loginUser = useSelector((state) => state.auth.loginUser || []); // 로그인된 유저 정보 가져오기
  const userEmail = isLogin ? loginUser[0].userEmail : "guest"; // 로그인 상태에 따라 이메일 설정
  const cartItems = useSelector((state) => state.cart.items || []); // 장바구니 아이템 가져오기

  // 현재 로그인한 사용자의 장바구니 아이템만 필터링하고 중복 제거
  const filteredCartItems = Array.from(
    new Map(
      cartItems
        .filter((item) => item.userEmail === userEmail) // 현재 사용자의 아이템만 필터링
        .map((item) => [`${item.id}-${item.category}-${item.userEmail}`, item]) // 중복 제거
    ).values()
  );

  const totalPages = Math.ceil(filteredCartItems.length / itemsPerPage); // 총 페이지 수 계산
  const currentItems = filteredCartItems.slice(
    (currentPage - 1) * itemsPerPage, // 현재 페이지의 시작 인덱스
    currentPage * itemsPerPage // 현재 페이지의 마지막 인덱스
  );

  const totalPrice = filteredCartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0 // 총합 계산
  );

  // 로그인 시, 게스트 장바구니를 회원 장바구니로 이관
  useEffect(() => {
    if (isLogin && cartItems.some((item) => item.userEmail === "guest")) {
      dispatch(migrateGuestCartToUser({ userEmail }));
    }
  }, [isLogin, userEmail, cartItems, dispatch]);

  // 아이템 선택 여부 확인
  const isItemSelected = (item) =>
    selectedItems.some(
      (selected) =>
        selected.id === item.id &&
        selected.category === item.category &&
        selected.userEmail === item.userEmail
    );

  // 아이템 선택/해제 토글
  const toggleItemSelection = (item) => {
    setSelectedItems(
      (prev) =>
        isItemSelected(item)
          ? prev.filter(
              (selected) =>
                selected.id !== item.id ||
                selected.category !== item.category ||
                selected.userEmail !== item.userEmail
            )
          : [...prev, item] // 선택된 아이템 추가
    );
  };

  // 전체 선택/해제 토글
  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === currentItems.length ? [] : currentItems
    );
  };

  // 상품 상세 모달 열기
  const openModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  // 단일 삭제 모달 열기
  const openDeleteModal = (item) => {
    setModalItem(item);
    setIsDeleteModalOpen(true);
  };

  // 선택 삭제 모달 열기
  const openSelectDeleteModal = () => setIsSelectDeleteModalOpen(true);

  // 단일 상품 삭제 확인
  const confirmDelete = () => {
    dispatch(deleteCart(modalItem));
    setIsDeleteModalOpen(false);

    // 삭제 후 페이지 조정
    const updatedFilteredCartItems = cartItems.filter(
      (item) =>
        item.id !== modalItem.id ||
        item.category !== modalItem.category ||
        item.userEmail !== modalItem.userEmail
    );

    const newTotalPages = Math.ceil(
      updatedFilteredCartItems.length / itemsPerPage
    );

    setCurrentPage((prevPage) => Math.min(prevPage, newTotalPages));
  };

  // 선택된 상품 삭제 확인
  const confirmSelectDelete = () => {
    selectedItems.forEach((item) => dispatch(deleteCart(item)));
    setSelectedItems([]);
    setIsSelectDeleteModalOpen(false);

    // 삭제 후 필터링해서 남아있는 장바구니 아이템 계산
    const updatedFilteredCartItems = cartItems.filter(
      (item) =>
        item.id !== modalItem.id || // ID가 다른 아이템만 남기기
        item.category !== modalItem.category ||
        item.userEmail !== modalItem.userEmail
    );

    // 남은 아이템의 페이지 수 계산
    const newTotalPages = Math.ceil(
      updatedFilteredCartItems.length / itemsPerPage
    );

    // 현재 페이지가 남아있는 페이지 수보다 큰 경우, 마지막 페이지로 이동
    setCurrentPage((prevPage) => Math.min(prevPage, newTotalPages));
  };

  // 페이지 클릭 처리
  const handlePageClick = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 화면 상단으로 스크롤
  }, [currentPage]);

  return (
    <div className="cart-list">
      <div className="cart-list-con">
        <h3 className="cart-title">장바구니 목록</h3>

        {currentItems.length > 0 ? (
          <>
            <div className="cart-item-con">
              {currentItems.map((item) => (
                <div
                  className="cart-item"
                  key={`${item.id}-${item.category}-${item.userEmail}`}
                >
                  <input
                    type="checkbox"
                    checked={isItemSelected(item)}
                    onChange={() => toggleItemSelection(item)}
                  />
                  <div className="cart-item-top">
                    <img src={item.img} alt={item.title} />
                    <button
                      onClick={() => openModal(item)}
                      className="cart-details-button"
                    >
                      상세정보
                    </button>
                  </div>
                  <div className="cart-item-bottom">
                    <span>카테고리: {item.category}</span>
                    <span>상품명: {item.title}</span>
                    <span>가격: {item.price.toLocaleString()} 원</span>
                    <span>갯수: {item.count}</span>
                    <span>
                      총금액: {(item.price * item.count).toLocaleString()} 원
                    </span>
                    <span
                      className="cart-delete"
                      onClick={() => openDeleteModal(item)}
                    >
                      삭제
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer-controls">
              <input
                type="checkbox"
                checked={selectedItems.length === currentItems.length}
                onChange={handleSelectAll}
              />
              <label>전체 선택</label>
              <button onClick={openSelectDeleteModal} className="delete-button">
                선택 삭제
              </button>
            </div>

            <div className="cart-pagination-container">
              <button onClick={prevPage} disabled={currentPage === 1}>
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                다음
              </button>
            </div>

            <div className="cart-payment">
              <div className="cart-sum-price">
                총합계: {totalPrice.toLocaleString()} 원
              </div>
              <button
                className="cart-payment-button"
                onClick={() => navigate("/order/payment")}
              >
                결제하기
              </button>
            </div>
          </>
        ) : (
          <div className="cart-null">
            <h1 onClick={() => navigate(-1)}>장바구니가 비어 있습니다</h1>
          </div>
        )}

        {isModalOpen && (
          <CartModal item={modalItem} setIsModalOpen={setIsModalOpen} />
        )}
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            item={modalItem}
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
        {isSelectDeleteModalOpen && (
          <SelectDeleteModal
            items={selectedItems}
            onConfirm={confirmSelectDelete}
            onCancel={() => setIsSelectDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CartList1;
