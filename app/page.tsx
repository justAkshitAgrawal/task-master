import TaskCard from "@/components/TaskCard";
import React from "react";

const Home = () => {
  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center">
        Welcome to <span className="text-blue-500">TaskMaster</span>
      </h1>

      <p className="xl:text-xl mt-5 text-center">
        TaskMaster is a simple task management application that helps you keep
        track of your tasks.
      </p>

      <p className="xl:text-lg mt-4 text-center">
        Easily add, edit and delete tasks. Login or register to get started. As
        simple as that.
      </p>

      <p className="mt-8 max-md:text-xs text-center">
        Built using NextJS, TailwindCSS, MongoDB, React Query, NextAuth and a
        few other libraries.
      </p>

      <p className="absolute max-md:text-sm max-sm:mx-10 text-center bottom-10">
        React out to{" "}
        <a href="mailto:me@akshitagrawal.dev" className=" underline">
          me@akshitagrawal.dev
        </a>{" "}
        for any queries.
      </p>
    </div>
  );
};

export default Home;
