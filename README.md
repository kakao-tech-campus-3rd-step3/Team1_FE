## 🚀 프로젝트 소개

<div align="center">
  <img src="src/shared/assets/images/boost/boo-with-title.png" width="200" />
</div>
<div align="center">
대학생을 위한 팀 프로젝트 매니저 <strong>🚀 Boost</strong>의 <strong>Front-end 프로젝트</strong>입니다!
</div>

<br/>

## 👩‍💻 팀 멤버

|                                                                깃허브                                                                 |  이름  | 역할 |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :----: | :--: |
| <div align="center">[<img src="https://avatars.githubusercontent.com/u/143688136?v=4" width="60"/>](https://github.com/daaoooy)</div> | 유다연 |  FE  |
| <div align="center">[<img src="https://avatars.githubusercontent.com/u/129584580?v=4" width="60"/>](https://github.com/hyemomo)</div> | 김혜민 |  FE  |

<br/>

## 🔧 프로젝트 실행

```
git clone git@github.com:kakao-tech-campus-3rd-step3/Team1_FE.git
cd Team1_FE
pnpm install
pnpm run dev
```

<br/>

## 🗂️ 폴더 구조

```
src/
├─ app/ # 전역 설정, 공통 엔트리
│ ├─ providers/ # Context Provider, 상태 관련 설정
│ ├─ routes/ # 라우팅 관련 설정
│ └─ styles/ # 글로벌 스타일, 테마
│
├─ shared/ # 공통으로 사용하는 요소
│ ├─ components/ # 재사용 가능한 UI 컴포넌트
│ ├─ utils/ # 유틸 함수
│ ├─ api/ # API 호출 함수
│ └─ types/ # TypeScript 타입 정의
│
├─ features/ # 기능 단위 구현
│ ├─ featureA/ # ex. 로그인
│ │ ├─ components/ # featuresA 전용 UI 컴포넌트
│ │ ├─ hooks/ # featuresA 전용 커스텀 훅
│ │ ├─ types/ # featuresA 전용 타입 정의
│ │ ├─ utils/ # featuresA 전용 유틸 함수
│ │ └─ api/ # featuresA 전용 API 요청/서비스 로직
│ └─ featureB/ # ex. 회원가입
│
├─ entities/ # 도메인 모델
│ └─ user/ # User 엔티티, 관련 타입/모델
│
├─ pages/ # 라우팅 단위 페이지
│ ├─ HomePage/
│ └─ LoginPage/
│
├─ widgets/ # 여러 페이지에서 재사용되는 조합 컴포넌트
│ └─ Header/
└─ index.tsx # 엔트리 포인트
```

<br/>

## 🛠️ 기술 스택

| 구분                      | 기술                                                                                                                                                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **개발 언어**             | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                       |
| **UI 라이브러리**         | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)                                                                                                                      |
| **스타일링**              | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logoColor=white) |
| **클라이언트 상태 관리**  | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logoColor=white)                                                                                                                             |
| **서버 상태 관리**        | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)                                                                                                    |
| **라우팅**                | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)                                                                                                 |
| **애니메이션 라이브러리** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)                                                                                                     |

<br/>

## 💻 개발 도구

| 구분                  | 사용 도구 / 플랫폼                                                                                                                                                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 개발 환경 / 버전 관리 | ![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) |
| 협업 도구             | ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)                                                                                                             |
| 패키지 / 빌드         | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=yellow)                                                                                                                     |
| 배포                  | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                |
| CI/CD                 | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github&logoColor=white)                                                                                                                                                                                                |
