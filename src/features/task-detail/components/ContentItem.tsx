const ContentItem = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex-col">
      <div className="flex items-center gap-2 mb-2 text-gray-900 font-extrabold">
        {icon} <span> {title} </span>
      </div>
      {children}
    </div>
  );
};
export default ContentItem;
