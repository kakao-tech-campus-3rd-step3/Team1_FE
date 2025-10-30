const InfoCard = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-3 rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.08)] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default InfoCard;
