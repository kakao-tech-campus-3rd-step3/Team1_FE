export const handleApiError = (error: any) => {
  if (!error.response) {
    alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요');
    return;
  }
  const { status, data } = error.response;
  switch (status) {
    case 500:
      //500 에러일때 에러바운더리에 걸리게 함
      throw new Error(data?.message || '서버 에러가 발생했습니다. ');
    case 401:
      alert('로그인이 만료되었습니다. ');
      break;
    default:
      alert(data.message || '알 수 없는 오류가 발생했습니다.');
  }
};
//TODO: BE와 에러코드에 관한 논의 후 더 추가할 예정
