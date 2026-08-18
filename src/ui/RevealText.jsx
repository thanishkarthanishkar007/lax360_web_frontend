const RevealText = ({ text }) => {
  return (
    <h1 className="flex  font-bold tracking-wide">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="opacity-0 animate-reveal"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}

      <style>
        {`
          @keyframes reveal {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-reveal {
            animation: reveal 0.6s ease-out forwards;
          }
        `}
      </style>
    </h1>
  );
};

export default RevealText;
