import Popup from "./Popup";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import AppButton from "../common/AppButton";
import AlertMessage from "./AlertMessage";

function PopupWithForm({
  children,
  isOpen,
  onClose,
  onPersonalSubmit,
  name,
  title,
  redirectText,
  redirectOnClick,
  initialValues,
  validationSchema,
}: any) {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [timeoutRef, setTimeoutRef] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const ref = React.useRef(null);

  const setTimeoutAgain = () => {
    if (timeoutRef !== null) {
      clearTimeout(timeoutRef);
    }
    const t = setTimeout(() => {
      setMessage("");
    }, 6000);
    setTimeoutRef(t);
  };

  const onSubmit = async (values: any, { resetForm }: any) => {
    if (submitting) {
      setMessage("one moment...");
      setTimeoutAgain();
      return;
    } else {
      setMessage("one moment...");
    }
    const result = await onPersonalSubmit(values);
    if (Object.keys(result).length) {
      setMessage("Message received successfully");
      setTimeoutAgain();
      resetForm();
    } else {
      setMessage("error");
    }
    setSubmitting(false);
  };
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <div className="relative justify-between items-center flex md:min-w-[430px] min-h-[380px] box-border text-dark bg-light shadow-xl rounded-2xl pt-[34px] px-9 pb-7">
        <button
          type="button"
          className="w-6 h-6 absolute -top-[38px] right-0 md:-right-[38px] bg-transparent bg-close-image bg-no-repeat bg-center border-none transition-opacity hover:opacity-60 hover:cursor-pointer"
          onClick={onClose}
          aria-label="Close popup"
        />
        <h2 className="font-black text-2xl mb-[22px]">{title}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form
            noValidate
            className="h-fit gap-y-6 max-w-5xl w-full flex flex-col items-center"
          >
            <div className="grid gap-y-2 w-full">{children}</div>
            <AlertMessage
              message={message}
              ref={ref}
              style={{ padding: 0, color: "#282828" }}
            />
            <AppButton type="submit" className="w-28">
              submit
            </AppButton>
          </Form>
        </Formik>
        {redirectText && (
          <div className="flex flex-row justify-center text-base text-center mt-4">
            <p className="mr-1">or</p>
            <button
              className="text-primary bg-light border-none p-0 cursor-pointer"
              onClick={redirectOnClick}
            >
              {redirectText}
            </button>
          </div>
        )}
      </div>
    </Popup>
  );
}

export default PopupWithForm;
