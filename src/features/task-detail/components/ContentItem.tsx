type ContentItemProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const ContentItem = ({ icon, title, children }: ContentItemProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-gray-900 font-extrabold">
        {icon} <span> {title} </span>
      </div>
      {children}
    </div>
  );
};
export default ContentItem;
