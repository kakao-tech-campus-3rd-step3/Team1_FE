const AvatarBackgroundDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 animate-pulse" />
    <div
      className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full blur-3xl opacity-30 animate-pulse"
      style={{ animationDelay: '2s' }}
    />
    <div className="absolute top-1/3 right-10 w-2 h-2 bg-blue-300 rounded-full animate-bounce opacity-40" />
    <div className="absolute bottom-1/3 left-20 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-40" />
  </div>
);

export default AvatarBackgroundDecorations;
