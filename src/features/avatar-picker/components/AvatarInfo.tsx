const AvatarInfo = () => {
  return (
    <div className="text-center pt-8 mb-8 ">
      <div className="flex items-center justify-center gap-2 mb-2">
        <p className="text-gray-600 font-medium">아바타는 언제든지 변경할 수 있습니다</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg">✨</span>
        <p className="text-gray-500 text-sm">프로필과 댓글에서 사용됩니다</p>
      </div>
    </div>
  );
}

export default AvatarInfo
