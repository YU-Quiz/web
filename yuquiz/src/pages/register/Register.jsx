/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4sYrEfEk5io
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import '../../styles/Register.scss';
export default function Register() {
    return (
      <div>
        <div>
          <div>
            <h3>YU Quiz 회원가입</h3>
          </div>
          <div>
            <div>
              <label htmlFor="username">
                아이디
              </label>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="아이디를 입력하세요"
                />
                <button
                  type="button"
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="password">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password-confirm">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="password-confirm"
                
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="nickname" >
                닉네임
              </label>
              <div>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임을 입력하세요"
                />
                <button
                  type="button"
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="email" >
                이메일
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder="이메일을 입력하세요"
                />
                <button
                  type="button"
                >
                  인증번호 발급
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="verification-code">
                인증번호
              </label>
              <div>
                <input
                  type="text"
                  id="verification-code"
                  placeholder="인증번호를 입력하세요"
                />
                <button
                  type="button"
                >
                  확인
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="department" >
                학과 선택
              </label>
              <select
                id="department"
              >
                <option value="">학과를 선택하세요</option>
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
              <label htmlFor="newsletter-consent" >
                알림 메일 수신 동의(선택)
              </label>
            </div>
            <div>
              <button
                type="submit"
              >
                회원 가입 하기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }