import React from 'react'
import { Link } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const MrderFooter = () => {
  return (
    <>
      <div className="main-footer">
        <div className="main-footer-con">
          <div className="information">
            <div className="information-con">
              <h4>NM.K</h4>
              <ul>
                <li>서울시 노원구</li>
                <li>02-6953-7551</li>
                <li>그린컴퓨터학원</li>
                <li>www.greenart.co.kr</li>
              </ul>
            </div>
            <div className="information-con">
              <h4>help</h4>
              <ul>
                <li>FAQ</li>
                <li>Shipping</li>
                <li>Return</li>
                <li>Payment</li>
              </ul>
            </div>
            <div className="information-con">
              <h4>shop</h4>
              <ul>
                <li><Link to={"/order/vegetable"}>Vegetable</Link></li>
                <li><Link to={"/order/meat"}>Meat</Link></li>
                <li><Link to={"/order/fruit"}>Fruit</Link></li>
                <li><Link to={"/order/snack"}>Snack</Link></li>
              </ul>
            </div>
            <div className="information-con">
              <h4>follow</h4>
              <div className="social-links">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default MrderFooter
