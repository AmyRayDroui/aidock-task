import { makeAutoObservable } from "mobx";
import api from "./api";

interface Task {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  user_id: number;
}

type NewTask = {
  title: string;
  description: string;
};

const removeTask = (tasks: Task[], id: number): Task[] =>
  tasks.filter((task) => task.id !== id);

const addTask = (tasks: Task[], newTask: NewTask, userId: number): Task[] => [
  ...tasks,
  {
    id: Math.max(0, Math.max(...tasks.map(({ id }) => id))) + 1,
    title: newTask["title"],
    description: newTask["description"],
    checked: false,
    user_id: userId,
  },
];

class Tasks {
  tasks: Task[] = [];
  newTask: NewTask = {
    title: "",
    description: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  findTask(id: number) {
    return JSON.parse(
      JSON.stringify(this.tasks.filter((task: Task) => task.id === id)[0])
    );
  }

  async removeTask(id: number) {
    const result = await api.deleteTask(id);
    if (result) {
      this.tasks = removeTask(this.tasks, id);
    }
  }

  async addTask(values: NewTask, userId: number) {
    try {
      const result = await api.addTask(values);
      if (Object.keys(result).length) {
        this.tasks = addTask(this.tasks, this.newTask, userId);
        this.newTask = {
          title: "",
          description: "",
        };
      }
    } catch (err: any) {}
  }

  async editTask(id: number, values: NewTask) {
    const task = this.findTask(id);
    const dummyTask = {
      id: id,
      title: values.title,
      description: values.description,
      checked: task.checked,
      user_id: task.user_id,
    };
    try {
      const result = await api.updateTask(values, id);
      if (result) {
        this.tasks = this.tasks.map((task) =>
          task.id === id ? dummyTask : task
        );
      }
    } catch (err: any) {}
  }

  async toggleChecked(id: number) {
    const task = this.findTask(id);
    const dummyTask = {
      id: id,
      title: task.title,
      description: task.description,
      checked: !task.checked,
      user_id: task.user_id,
    };
    try {
      const result = await api.updateTask({ checked: !task.checked }, id);
      if (result) {
        this.tasks = this.tasks.map((task) =>
          task.id === id ? dummyTask : task
        );
      }
    } catch (err: any) {}
  }

  load() {
    api.getTasks().then((tasks: Task[]) => (store.tasks = tasks));
  }
}

const store = new Tasks();

export default store;
