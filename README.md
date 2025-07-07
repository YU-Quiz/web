# 🎓 YU-Quiz

**YU-Quiz**는 대학생을 위한 **온라인 퀴즈 및 스터디 플랫폼**입니다.  
사용자들은 퀴즈를 직접 생성하고 응시할 수 있으며, 스터디 그룹을 구성하여 함께 학습하고 소통할 수 있습니다.  
실시간 채팅, 공지사항, 퀴즈 공유, 알림 등 다양한 기능을 통해 **효율적인 자기주도 학습과 협업**을 지원합니다.

---

## 🚀 주요 기능

### ✅ 퀴즈 시스템
- 퀴즈 문제 생성, 수정, 삭제 (CRUD)
- 문제집 기반 퀴즈 관리
- 퀴즈 응시, 정답 제출 및 자동 채점
- 사용자 점수 결과 및 피드백 확인
- 퀴즈 공개/비공개 설정

### ✅ 스터디 그룹 기능
- 스터디 그룹 생성 및 초대/가입
- 멤버 역할(관리자/일반) 관리
- 스터디별 퀴즈 및 문제집 공유
- 스터디 탈퇴, 삭제 기능

### ✅ 스터디 내 소통 기능
- **실시간 채팅 기능 (SockJS 기반)**  
  → 스터디 구성원 간 원활한 실시간 대화 지원  
- 공지사항 작성 및 열람 기능
- 공지/채팅 구분 UI 제공
- 메시지 읽음 처리 및 **실시간 알림 구현**

### ✅ 스터디 내 학습 기능
- 스터디 내 퀴즈 풀이 및 결과 공유
- 문제집 기반 퀴즈를 통한 협업 학습
- 학습 이력 확인 및 스터디별 활동 추적

### ✅ 사용자 인증 및 보안
- 이메일 회원가입 / 로그인
- **카카오, 네이버 소셜 로그인** 연동
- JWT 기반 인증 처리
- **Interceptor를 통한 토큰 자동 재발급 로직** 구현

### ✅ UI 및 UX
- 직관적인 반응형 UI (모바일 및 데스크탑 최적화)
- **문제집 리스트 및 애니메이션 효과 적용 (CSS / styled-components)**  
  → 사용자 인터랙션 향상
- 상태에 따른 시각적 피드백 처리

---

## 🛠 기술 스택

- **Frontend**: React, JavaScript, HTML, CSS
- **스타일링**: styled-components, CSS Animation
- **상태 관리**: React Hooks, Context API
- **네트워킹**: Axios + Interceptor, REST API
- **실시간 통신**: **SockJS + STOMP**, 실시간 채팅 및 알림 처리
- **인증 연동**: Kakao API, Naver API
- **기타**: JWT 인증, Git/GitHub 협업

---

## 📂 주요 디렉토리 구조

```
yuquiz/
├── public/
│   └── images/
├── src/
│   ├── components/         # 재사용 가능한 UI 요소
│   ├── pages/              # 기능별 라우팅 페이지
│   ├── assets/             # 이미지, 영상 등 정적 자원
│   ├── hooks/              # 커스텀 훅
│   ├── utils/              # 유틸성 함수
│   └── index.js            # 애플리케이션 진입점
├── package.json
└── yarn.lock
```

---

## ⚙️ 실행 방법

```bash
git clone https://github.com/YU-Quiz/web.git
cd web/yuquiz
yarn install       # 또는 npm install
yarn start         # 또는 npm start
```

> 기본 포트: `http://localhost:3000`

---

## 🙋‍♂️ 개발자 역할 예시

- 퀴즈 기능 전체 로직 구현 (CRUD, 채점, 풀이 처리)
- 로그인 및 회원가입 플로우 + 소셜 로그인(Kakao, Naver)
- JWT 인증 및 Interceptor 기반 토큰 재발급 로직 개발
- styled-components 기반 UI 구성 및 문제집 애니메이션 적용
- **SockJS 기반 채팅 통신 처리 및 실시간 알림 구현**

---

## 📄 라이선스

본 프로젝트는 비상업적 목적의 교육용 프로젝트입니다.
