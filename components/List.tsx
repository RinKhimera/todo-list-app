import { TbEdit } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import React from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const List = ({
  todos,
  setTodos,
  setEditTodo,
}: {
  todos: Todo[];
  setTodos: any;
  setEditTodo: any;
}) => {
  const handleComplete = (todo: Todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = ({ id }: Todo) => {
    const findTodo = todos.find((todo) => todo.id === id);
    if (findTodo) {
      setEditTodo(findTodo);
    }
  };

  const handleDelete = ({ id }: Todo) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 list-none justify-between">
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between gap-1">
          <div className="">
            <h1
              className={` text-black font-bold p-2 rounded-lg ${
                todo.completed
                  ? "line-through decoration-2 decoration-red-500 bg-gradient-to-r from-blue-500 to-green-500"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
            >{`${todo.title} · ${todo.description}`}</h1>
          </div>
          <div>
            <button>
              <IoMdCheckmarkCircleOutline
                className="text-3xl hover:text-gray-500"
                onClick={() => handleComplete(todo)}
              />
            </button>
            <button onClick={() => handleEdit(todo)}>
              <TbEdit className="text-3xl hover:text-gray-500" />
            </button>
            <button onClick={() => handleDelete(todo)}>
              <MdDeleteForever className="text-3xl hover:text-gray-500" />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default List;
