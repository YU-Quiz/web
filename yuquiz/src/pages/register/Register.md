## 컴포넌트 구조

Register (최상위 컴포넌트)
├── div (최상위 컨테이너)
├── div (카드 컨테이너)
├── div (헤더)
│ └── h3 (타이틀: "YU Quiz 회원가입")
└── div (폼 컨테이너)
├── div (아이디 입력 섹션)
│ ├── label (아이디 라벨)
│ └── div
│ ├── input (아이디 입력 필드)
│ └── button (중복 확인 버튼)
├── div (비밀번호 입력 섹션)
│ ├── label (비밀번호 라벨)
│ └── input (비밀번호 입력 필드)
├── div (비밀번호 확인 입력 섹션)
│ ├── label (비밀번호 확인 라벨)
│ └── input (비밀번호 확인 입력 필드)
├── div (닉네임 입력 섹션)
│ ├── label (닉네임 라벨)
│ └── div
│ ├── input (닉네임 입력 필드)
│ └── button (중복 확인 버튼)
├── div (이메일 입력 섹션)
│ ├── label (이메일 라벨)
│ └── div
│ ├── input (이메일 입력 필드)
│ └── button (인증번호 발급 버튼)
├── div (인증번호 입력 섹션)
│ ├── label (인증번호 라벨)
│ └── div
│ ├── input (인증번호 입력 필드)
│ └── button (확인 버튼)
├── div (학과 선택 섹션)
│ ├── label (학과 라벨)
│ └── select (학과 선택 드롭다운)
├── div (메일 수신 동의 섹션)
│ ├── input (메일 수신 동의 체크박스)
│ └── label (메일 수신 동의 라벨)
└── div (회원가입 버튼 섹션)
└── button (회원가입 버튼)