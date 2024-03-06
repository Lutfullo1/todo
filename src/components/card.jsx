import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({ title, description, id, reFetch }) => {
  const [loading, setLoading] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [done, setDone] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  const deleteTodo = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3600/todos/${id}`)
      .then((res) => {
        toast.warn("todo deleted");
        reFetch();
      })
      .catch((err) => {
        console.log(err).finally(() => {
          setLoading(false);
        });
      });
  };
  const editTodo = async () => {
    try {
      const { data, error } = await axios.put(
        `http://localhost:3600/todos/${id}`,
        {
          newTitle,
          description,
        }
      );
      // toast.success("todo edited");
      reFetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit todo");
    }
  };

  const changeTitle = async (e) => {
    setNewTitle(e.target.value);
    await editTodo();
  };

  const handleDone = async (e) => {
    const isChecked = e.target.checked;
    setDone(isChecked);
  };

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-[5px] w-[600px] border rounded-[5px] py-[10px] px-[20px]">
        <input
          className="h-4 w-4 "
          type="checkbox"
          name="done"
          onChange={handleDone}
        />
        <div className="relative">
          {isMouseOver && (
            <p className="absolute right-0 text-[14px]">
              <FontAwesomeIcon icon={faEdit} />
            </p>
          )}
          <input
            type="text"
            value={newTitle}
            className={`w-[500px] outline-none ${done ? "line-through" : ""}`}
            onChange={changeTitle}
            onMouseOver={handleMouseOver}
            onMouseLeave={() => setIsMouseOver(false)}
          />
        </div>
        <button onClick={deleteTodo}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </>
  );
};
