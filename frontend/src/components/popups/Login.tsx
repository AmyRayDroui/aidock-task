import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import * as Yup from "yup";
import api from "../../api";

function Login({
  onClose,
  isOpen,
  redirectOnClick,
  setIsSigningPopupOpen,
  setIsLoggedIn,
  setCurrentUser,
}: any) {
  async function login(values: any) {
    let result;
    try {
      result = await api.signin(values);
      if (Object.keys(result).length) {
        setCurrentUser({ userId: result.userId, name: result.name });
        localStorage.setItem("jwt", result.token);
        api.setToken(localStorage.jwt);
        setIsLoggedIn(true);
        setIsSigningPopupOpen(false);
      }
    } catch (err: any) {}
    return result;
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="signin"
      title="Sign in"
      redirectText="Sign up"
      redirectOnClick={redirectOnClick}
      onPersonalSubmit={login}
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("username is required"),
        password: Yup.string().required("password is required"),
      })}
    >
      <TextInput label={"Username"} name="username" placeholder={"username"} />
      <TextInput
        label={"Password"}
        name="password"
        placeholder={"password"}
        type="password"
      />
    </PopupWithForm>
  );
}

export default Login;
