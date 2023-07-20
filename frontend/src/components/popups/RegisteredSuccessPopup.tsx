import Popup from "./Popup";

function RegisteredSuccessPopup({ onClose, isOpen, redirectOnClick }: any) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="success">
      <div className="relative justify-between items-center flex min-w-[430px] box-border text-dark bg-light shadow-xl rounded-2xl pt-[34px] px-9 pb-7 min-h-[182px]">
        <button
          type="button"
          className="w-6 h-6 absolute -top-[38px] -right-[38px] bg-transparent bg-close-image bg-no-repeat bg-center border-none transition-opacity hover:opacity-60 hover:cursor-pointer"
          onClick={onClose}
          aria-label="Close popup"
        />
        <h2 className="font-black text-2xl mb-[22px] max-w-[315px]">
          Registration successfully completed!
        </h2>
        <button
          className="text-primary bg-light border-none p-0 cursor-pointer"
          onClick={redirectOnClick}
        >
          Sign in
        </button>
      </div>
    </Popup>
  );
}

export default RegisteredSuccessPopup;
