import '../../styles/register/Register.scss';
import { IoMdArrowBack } from "react-icons/io";
export default function Register() {
    return (
      <div className='root-container'>
        <button className="back-button"><IoMdArrowBack/></button>
        <div>
          <div className='title-container'>
            <p className='logo'>YU Quiz</p>
            </div>
          <div>
          <p className='register-font'>회원가입</p>
            <div>
              <div>
                <input
                  type="text"
                  id="username"
                  className='form'
                  placeholder="아이디"
                />
                <button
                  type="button"
                  className='button'
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <input
                type="password"
                id="password"
                className='form'
                placeholder="비밀번호"
              />
            </div>
            <div>
              <input
                type="password"
                id="password-confirm"
                className='form'
                placeholder="비밀번호 재입력"
              />
            </div>
            <div>
              <div>
                <input
                  type="text"
                  id="nickname"
                  className='form'
                  placeholder="닉네임"
                />
                <button
                  type="button"
                  className='button'
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="email"
                  id="email"
                  className='form'
                  placeholder="이메일"
                />
                <button
                  type="button"
                  className='button'
                >
                  인증번호 요청
                </button>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  id="verification-code"
                  className='form'
                  placeholder="인증번호"
                />
                <button
                  type="button"
                  className='button'
                >
                  확인
                </button>
              </div>
            </div>
            <div>
              <select
                id="department"
                className='form'
              >
                <option value="">학과선택</option>
                <option value="computer-science">컴퓨터공학과</option>
                <option value="business-administration">경영학과</option>
                <option value="economics">경제학과</option>
              </select>
            </div>
            <div>
              <input
                type="checkbox"
                id="newsletter-consent"
              />
              <label htmlFor="newsletter-consent" className='checkbox-label'>
                알림 메일 수신 동의(선택)
              </label>
            </div>
            <div>
              <button   
                type="submit"
                className='button-register-done'
              >
                회원 가입 하기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }