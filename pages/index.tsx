import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Tasks from "../components/Tasks";
import List from "../components/List";

const Home: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  return (
    <div className="bg-hero grid h-screen">
      <Head>
        <title>Todo List App</title>
        <meta
          name="description"
          content="Todo List App bootstrapped with Next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-indigo-900 text-slate-200 p-12 w-10/12 rounded-xl md:w-2/3 xl:w-1/2">
          {" "}
          <Tasks
            input={input}
            setInput={setInput}
            desc={desc}
            setDesc={setDesc}
            todos={todos}
            setTodos={setTodos}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
          />
          <List todos={todos} setTodos={setTodos} setEditTodo={setEditTodo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
