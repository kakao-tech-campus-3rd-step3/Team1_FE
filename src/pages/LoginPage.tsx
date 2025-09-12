import kakaoLoginBtnImg from '@/shared/assets/images/kakao_login_large_narrow.png';

const LoginPage = () => {
  const hadleLoginClick = () => {
    //TODO: 인증 URL 받으면 아래의 주소도 수정할 예정입니다.
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?11';
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center ">
      <div className="flex gap-40">
        <p className="text-5xl font-extrabold leading-16 ">
          대학생을 위한 팀플 관리,
          <br />
          Boo 와 함께하세요.
        </p>
        <button onClick={hadleLoginClick} className="w-60">
          <img src={kakaoLoginBtnImg} alt="카카오 로그인 버튼" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
