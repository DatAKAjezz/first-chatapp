const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="block lg:flex items-center justify-center p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-zinc-700 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 style={{paddingBlock: "16px", fontSize: "1.2rem", color: "grey"}} className="bold mb-4">{title}</h2>
        <p style={{fontSize: "12px", color: "grey"}}>{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
