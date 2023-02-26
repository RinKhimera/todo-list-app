import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  Titre: string;
  Description: string;
  Achevement: string;
}

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const List = ({
  input,
  setInput,
  desc,
  setDesc,
  todos,
  setTodos,
  editTodo,
  setEditTodo,
}: {
  input: string;
  setInput: any;
  desc: string;
  setDesc: any;
  todos: Todo[];
  setTodos: any;
  editTodo: any;
  setEditTodo: any;
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({});

  const updateTodo = (
    title: string,
    description: string,
    id: string,
    completed: boolean
  ) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, description, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
      setDesc(editTodo.description);
    } else {
      setInput("");
      setDesc("");
    }
  }, [setInput, setDesc, editTodo]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.target.value);
  };

  const onFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([
        ...todos,
        { id: uuidv4(), title: input, description: desc, completed: false },
      ]);
      setInput("");
      setDesc("");
    } else {
      updateTodo(input, desc, editTodo.id, editTodo.completed);
    }
  };

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="pb-6">
      <div>
        <h1 className="text-center pb-6 text-3xl font-bold">Todo List</h1>
        <form onSubmit={onFormSubmit}>
          <label className="text-lg pl-0.5">Summary</label>
          <input
            type="text"
            placeholder="Learn React"
            className="block p-2 my-2 w-full rounded-lg text-black"
            {...register("Titre", {
              required: "Cette entrée est requise.",
              maxLength: {
                value: 30,
                message: "L'entrée dépasse la limite maximale de caractères.",
              },
            })}
            value={input}
            onChange={onInputChange}
            maxLength={18}
            minLength={3}
            required
          />
          <label className="text-lg pl-0.5">Description</label>
          <textarea
            placeholder="Understand Props and State"
            className="block p-2 mt-2 mb-2 w-full rounded-lg text-black"
            {...register("Description", {})}
            value={desc}
            onChange={onDescChange}
            maxLength={28}
            minLength={5}
          />

          <div className="flex flex-col items-center pt-6">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-xl font-bold py-2 px-5 rounded-xl"
            >
              {editTodo ? "Save changes" : "Add a task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default List;
