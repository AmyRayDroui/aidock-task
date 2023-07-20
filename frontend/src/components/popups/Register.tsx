import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import * as Yup from "yup";
import api from "../../api";

function Register({
  onClose,
  isOpen,
  redirectOnClick,
  setIsRegisteredSuccessPopupOpen,
  setIsSignupPopupOpen,
}: any) {
  async function register(values: any) {
    let result;
    try {
      result = await api.signup(values);
      if (Object.keys(result).length) {
        setIsRegisteredSuccessPopupOpen(true);
        setIsSignupPopupOpen(false);
      }
    } catch (err: any) {}
    return result;
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="signup"
      title="Sign up"
      redirectText="Sign in"
      redirectOnClick={redirectOnClick}
      onPersonalSubmit={register}
      initialValues={{
        username: "",
        password: "",
        name: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "minimum 3 characters required")
          .required("username is required"),
        password: Yup.string()
          .min(6, "minimum 6 characters required")
          .required("password is required"),
        name: Yup.string()
          .min(3, "minimum 3 characters required")
          .required("name is required"),
      })}
    >
      <TextInput label={"Username"} name="username" placeholder={"username"} />
      <TextInput
        label={"Password"}
        name="password"
        placeholder={"password"}
        type="password"
      />
      <TextInput label={"Name"} name="name" placeholder={"name"} />
    </PopupWithForm>
  );
}

export default Register;
