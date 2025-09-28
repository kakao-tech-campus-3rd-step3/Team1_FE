type ContentItemProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

const ContentItem = ({ icon, title, children, action }: ContentItemProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2  text-gray-900 font-extrabold">
          {icon} <span> {title} </span>
        </div>
        <span> {action}</span>
      </div>
      {children}
    </div>
  );
};
export default ContentItem;
