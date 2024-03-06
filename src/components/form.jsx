import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export const Form = ({ reFetch }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    axios.post("http://localhost:3600/todos", data).then((res) => {
      toast.success("todo created");
      reFetch();
      reset();
    });
  };
  return (
    <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit(submit)}>
      <div>
        <div className="mb-[5px]">
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-[600px] border py-[10px] px-[20px] rounded-[5px] outline-none"
            placeholder="Add your todo"
          />
        </div>
      </div>
    </form>
  );
};
