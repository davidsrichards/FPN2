import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

function Scroller() {
  const [distance, setDistance] = useState(0);

  const handleDistance = () => {
    const height = window.pageYOffset;
    setDistance(height);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleDistance);
    return () => window.removeEventListener("scroll", handleDistance);
  });

  return (
    <div className="fixed bottom-8 right-8">
      {distance > 200 && (
        <div
          className="bg-primary p-4 rounded-full text-[#fff] cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
}

export default Scroller;
