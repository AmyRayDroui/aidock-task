import PopupWithForm from "./PopupWithForm";
import TextInput from "./TextInput";
import * as Yup from "yup";

function EditTaskPopup({ onClose, isOpen, updateStore, initialValues }: any) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-task"
      title="Edit task"
      onPersonalSubmit={updateStore}
      initialValues={{
        title: initialValues.title,
        description: initialValues.description,
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

export default EditTaskPopup;
