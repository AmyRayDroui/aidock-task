import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import * as Yup from "yup";

function AddTaskPopup({ onClose, isOpen, updateStore }: any) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-task"
      title="Add task"
      onPersonalSubmit={updateStore}
      initialValues={{
        title: "",
        description: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("title is required"),
        description: Yup.string().required("description is required"),
      })}
    >
      <TextInput label={"Title"} name="title" placeholder={"title"} />
      <TextInput
        label={"Description"}
        name="description"
        placeholder={"description"}
        tag="textarea"
      />
    </PopupWithForm>
  );
}

export default AddTaskPopup;
