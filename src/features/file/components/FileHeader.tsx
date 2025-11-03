const FileHeader = () => {
  return (
    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/50">
      <div className="grid grid-cols-[3rem_minmax(0,1fr)_500px_4.5rem] items-center gap-4">
        {/* 아이콘 자리 */}
        <div className="w-12"></div>

        {/* 파일명 */}
        <div className="min-w-0 max-w-[420px]">
          <span className="text-sm font-semibold text-gray-600">파일명</span>
        </div>

        {/* 할 일 */}
        <div className="flex justify-center items-center text-center">
          <span className="text-sm font-semibold text-gray-600">할 일</span>
        </div>

        {/* 액션 (다운로드) */}
        <div className="flex justify-end gap-1 pr-1">
          <span className="text-sm font-semibold text-gray-600">다운로드</span>
        </div>
      </div>
    </div>
  );
};

export default FileHeader;
