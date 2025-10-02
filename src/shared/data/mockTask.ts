export const mockTask = {
  id: '1',
  title: '로그인 페이지 UI/UX 개선 및 접근성 향상',
  description:
    '사용자 로그인 페이지의 디자인과 사용자 경험을 전반적으로 개선합니다. 현재 폼 필드의 레이블과 placeholder가 명확하지 않아 사용자가 혼동할 수 있으며 버튼 색상 대비가 낮아 접근성 기준을 충족하지 못합니다. 모바일 환경에서 일부 요소들이 겹치거나 화면을 넘어가는 문제가 있어 반응형 레이아웃 개선이 필요합니다. 이번 작업에서는 디자인 가이드에 따라 폰트, 버튼 색상, 입력 폼 레이블을 수정하고 시멘틱 HTML 태그를 사용하여 접근성을 강화하며 aria-label과 aria-describedby 속성을 추가하여 스크린리더 사용자가 로그인 과정에서 필요한 정보를 명확하게 인식할 수 있도록 합니다. 에러 메시지와 안내 문구도 개선하여 입력 오류 발생 시 즉각적으로 피드백이 제공되도록 하고, 비밀번호 입력 시 시각적 피드백과 토글 기능을 제공하여 사용 편의성을 높입니다. 브라우저 호환성 테스트를 진행하여 Chrome, Firefox, Safari, Edge 환경에서도 일관된 UI/UX를 제공하도록 합니다. 이번 개선 작업이 완료되면 로그인 과정에서 발생하는 혼동을 최소화하고 사용자의 접근성과 경험을 동시에 향상시키는 것을 목표로 합니다.',
  status: 'TODO',
  tags: ['FE', 'UI', 'UX', 'Accessibility'],
  assignees: ['홍길동', '김혜민', '유다연', '이진호', '서영진', '김원호'],
  dueDate: '2025-09-24',
  urgent: false,
  files: 3,
  comments: 2,
  review: {
    requiredReviewCount: 3,
    approvedCount: 0,
    pendingCount: 3,
    isCompleted: false,
  },
};
