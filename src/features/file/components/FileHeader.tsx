const FileHeader = () => {
  return (
    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50/50">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 text-sm font-semibold text-gray-600">
        <div className="flex-shrink-0 w-12 h-12 hidden sm:block" />
        <div className="flex-1 min-w-[180px] md:min-w-[280px]">
          <span>파일명</span>
        </div>
        <div className="flex justify-center items-center flex-shrink-0 w-full sm:w-auto md:w-[200px]">
          <span>할 일</span>
        </div>
        <div className="flex justify-end gap-1 w-full sm:w-auto md:w-[72px] pr-1">
          <span>다운로드</span>
        </div>
      </div>
    </div>
  );
};

export default FileHeader;
