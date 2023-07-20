import { useEffect } from "react";

function Popup({ children, isOpen, onClose, name }: any) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlay}
      className={` fixed min-w-[100vw] min-h-screen top-0 left-0 bg-popupBg justify-center items-center z-0 transition-all ease-linear duration-500 ${
        isOpen ? "!visible !opacity-100 delay-0 flex" : "hidden opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default Popup;
