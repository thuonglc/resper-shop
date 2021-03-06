import { UserOutlined } from '@ant-design/icons';
import {
  faEdgeLegacy,
  faFacebookF,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Context
import { UserContext } from 'contexts/UserContext';
// image
import cash from 'images/image/cash.jpg';
import installment from 'images/image/installment.jpg';
import internet_banking from 'images/image/internet_banking.jpg';
import jcb from 'images/image/jcb.jpg';
import mastercard from 'images/image/mastercard.jpg';
import visa from 'images/image/visa.jpg';
import { useContext } from 'react';
import './styles.css';
export default function Footer() {
  const state = useContext(UserContext);
  const [UserOnline] = state.UserOnline;
  return (
    <>
      <div className="frames-group-footer">
        <div className="group-footer">
          <div className="footer">
            <div className="group-information-user">
              <h3>HỖ TRỢ KHÁCH HÀNG</h3>
              <ul>
                <li>Các câu hỏi thường gặp</li>
                <li>Gửi yêu cầu hỗ trợ</li>
                <li>Hướng dẫn đặt hàng</li>
                <li>Phương thức vận chuyển</li>
                <li>Chính sách đổi trả</li>
                <li>Hướng dẫn mua trả góp</li>
              </ul>
            </div>
            <div className="group-information-website">
              <h3>VỀ SHOP</h3>
              <ul>
                <li>Giới thiệu</li>
                <li>Tuyển Dụng</li>
                <li>Chính sách bảo mật thanh toán</li>
                <li>Chính sách bảo mật thông tin cá nhân</li>
                <li>Chính sách giải quyết khiếu nại</li>
                <li>Điều khoản sử dụng</li>
              </ul>
            </div>
            <div className="group-payment">
              <h3>PHƯƠNG THỨC THANH TOÁN</h3>
              <ul>
                <li>
                  <img src={cash} alt="cash" />
                </li>
                <li>
                  <img src={installment} alt="installment" />
                </li>
                <li>
                  <img src={internet_banking} alt="internet_banking" />
                </li>
                <li>
                  <img src={jcb} alt="jcb" />
                </li>
                <li>
                  <img src={mastercard} alt="mastercard" />
                </li>
                <li>
                  <img src={visa} alt="visa" />
                </li>
              </ul>
            </div>
            <div className="group-connect-us">
              <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/ThuongResper/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/thuong-resper/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/thuong-resper"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                <li>
                  <a href="F" target="_blank" rel="noreferrer noopener">
                    <FontAwesomeIcon icon={faEdgeLegacy} />
                  </a>
                </li>
              </ul>
              <div className="user-online">
                <p>
                  <UserOutlined /> Online {UserOnline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
