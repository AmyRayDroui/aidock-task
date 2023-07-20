import { useField } from "formik";
import AlertMessage from "./AlertMessage";

const TextInput = ({ label, tag = "input", ...props }: any) => {
  const [field, meta, helpers] = useField(props);

  const { setError, setTouched } = helpers;
  const FieldTag = tag;
  const showError = meta.touched && meta.error;
  return (
    <>
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <FieldTag
          style={props.style}
          className={`${showError ? "error" : ""}`}
          {...field}
          {...props}
          onFocus={() => {
            setError("");
            setTouched(false);
          }}
          noValidate
        />
        <AlertMessage
          style={{
            color: "#282828",
            marginBottom: showError ? "20px" : "0",
          }}
          message={showError ? meta.error : ""}
        />
      </div>
      <style>{`
        div label {
          color: #2f71e5;
          font-family: "Inter";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.25;
          margin: 0;
          margin-bottom: 9px;
        }
        div input {
          color: black;
          font-weight: normal;
          font-size: 18px;
          line-height: 1.21;
          padding-bottom: 5px;
          border: none;
          border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
          margin-bottom: 3px;
        }
        div textarea {
          color: black;
          font-family: "Inter";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.25;
          margin: 0;
          margin-bottom: 9px;
        }
      `}</style>
    </>
  );
};

export default TextInput;
