export const ERROR = {
  // 할 일 관련
  TASK: {
    RE_REVIEW_COOLDOWN: {
      type: 'urn:problem:task_re_review_cooldown',
      code: 400,
      detail: '재검토 요청은 10분 간격으로만 가능합니다.',
    },
  },

  // 멤버 관련
  MEMBER: {
    ALREADY_JOINED: {
      type: 'urn:problem:member_already_joined',
      code: 409,
      detail: '이미 참여한 멤버입니다.',
    },
  },

  // 참여 코드 관련
  JOIN_CODE: {
    NOT_FOUND: {
      type: 'urn:problem:join_code_not_found',
      code: 404,
      detail: '참가 코드를 찾을 수 없습니다.',
    },
    EXPIRED: {
      type: 'urn:problem:join_code_expired', // 확인 필요
      code: 400,
      detail: '만료된 참가 코드입니다.',
    },
  },

  // 사용자 관련
  USER: {
    HAS_OWNED_PROJECTS: {
      type: 'urn:problem:member_has_owned_projects',
      code: 409,
      detail: '소유한 프로젝트가 있어 탈퇴할 수 없습니다. 프로젝트를 먼저 삭제해주세요.',
    },
  },
} as const;
