import * as React from "react";
import { observer } from "mobx-react";
import "react-toggle/style.css";
import store from "../store";
import AppButton from "./common/AppButton";
import AddTaskPopup from "./popups/AddTaskPopup";
import EditTaskPopup from "./popups/EditTaskPopup";
import Toggle from "react-toggle";
import pencil from "../images/icons/pencil_icon.svg";

type NewTask = {
  title: string;
  description: string;
};

function TaskViewItems({ openEdit, currentUser, onlyPersonalTasks }: any) {
  return (
    <ul className="w-full flex flex-col-reverse justify-items-stretch md:min-w-[500px] lg:min-w-[700px] mt-4">
      {store.tasks.map((task) => {
        return onlyPersonalTasks ? (
          currentUser.userId === task.user_id && (
            <TaskViewItem
              task={task}
              openEdit={openEdit}
              currentUser={currentUser}
              key={task.id}
            />
          )
        ) : (
          <TaskViewItem
            task={task}
            openEdit={openEdit}
            currentUser={currentUser}
            key={task.id}
          />
        );
      })}
    </ul>
  );
}

function TaskViewItem({ task, openEdit, currentUser }: any) {
  return (
    <li className="flex pt-2 max-w-full overflow-auto justify-between border-b border-gray">
      <div>
        <h3 className="text-xl">{task.title}</h3>
        <p className="text-md text-left ml-4">{task.description}</p>
      </div>
      <div className="flex flex-row gap-x-2 text-primary font-medium">
        {currentUser.userId === task.user_id && (
          <>
            <button
              onClick={() =>
                openEdit(task.id, {
                  title: task.title,
                  description: task.description,
                })
              }
            >
              <img className="h-3 w-3 mt-[7px]" src={pencil} alt="update" />
            </button>
            <button onClick={() => store.removeTask(task.id)}>X</button>
          </>
        )}
        <label className="mb-0 mt-px">completed</label>
        <Toggle
          defaultChecked={task.checked}
          onChange={() => store.toggleChecked(task.id)}
          icons={false}
          disabled={currentUser.userId !== task.user_id}
        />
      </div>
    </li>
  );
}

const ObservedTodoListItems = observer(TaskViewItems);

function TaskView({
  currentUser,
  handleLogout,
  onClose,
  isAddTaskPopupOpen,
  setIsAddTaskPopupOpen,
  isEditTaskPopupOpen,
  setIsEditTaskPopupOpen,
}: any) {
  const [editId, setEditId] = React.useState(0);
  const [currentTask, setCurrentTask] = React.useState({
    title: "",
    description: "",
  });
  const [onlyPersonalTasks, setOnlyPersonalTasks] = React.useState(false);

  React.useEffect(() => {
    store.load();
  }, []);

  function handleAddTask(values: NewTask) {
    store.newTask["title"] = values["title"];
    store.newTask["description"] = values["description"];
    store.addTask(values, currentUser.userId);
    return { status: "success" };
  }

  function handleOpenEditTask(
    id: number,
    data: { title: string; description: string }
  ) {
    setEditId(id);
    setCurrentTask(data);
    setIsEditTaskPopupOpen(true);
  }

  function handleEditTask(values: NewTask) {
    store.editTask(editId, values);
    return { status: "success" };
  }

  return (
    <>
      <h1 className="text-6xl font-semibold">Task manager</h1>
      <div className="flex flex-row justify-between items-center mb-10 my-12">
        <h2 className="text-xl">
          Hello <span className="font-bold">{currentUser.name}</span>
        </h2>
        <AppButton onClick={handleLogout} className="text-base">
          Sign out
        </AppButton>
      </div>
      <div className="flex flex-row justify-between gap-4 items-center">
        <div className="flex flex-row gap-2">
          <label className="text-dark  mb-0">View only personal tasks</label>
          <Toggle
            defaultChecked={false}
            onChange={() => {
              setOnlyPersonalTasks(!onlyPersonalTasks);
            }}
            icons={false}
            className="custom-toggle"
          />
        </div>
        <div className="flex flex-row md:gap-2 items-center">
          <label className="text-dark mb-0 mt-1">add task</label>
          <button
            onClick={() => setIsAddTaskPopupOpen(true)}
            className="text-2xl w-8 border border-gray rounded-md pl-px pb-0.5"
          >
            +
          </button>
        </div>
      </div>
      <ObservedTodoListItems
        openEdit={handleOpenEditTask}
        currentUser={currentUser}
        onlyPersonalTasks={onlyPersonalTasks}
      />
      <AddTaskPopup
        isOpen={isAddTaskPopupOpen}
        onClose={onClose}
        updateStore={handleAddTask}
      />
      <EditTaskPopup
        isOpen={isEditTaskPopupOpen}
        onClose={onClose}
        updateStore={handleEditTask}
        initialValues={currentTask}
      />
      <style>
        {`
          .custom-toggle.react-toggle--checked .react-toggle-track {
            background-color: #2F71E5;
          }
          .custom-toggle.react-toggle--checked:hover .react-toggle-track {
            background-color: #1958c8;
          }
        `}
      </style>
    </>
  );
}

export default TaskView;
