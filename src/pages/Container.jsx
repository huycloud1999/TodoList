// Trong Container.js
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Footer.module.css";
import img from "../assets/imgs/Clipboard.png";
import Item from "../components/Item";

function Container() {
  const [taskName, setTaskName] = useState("");
  const [listTask, setListTask] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    setTotalTasks(listTask.length);
    const completedCount = listTask.filter((task) => task.complete).length;
    setCompletedTasks(completedCount);
  }, [listTask]);

  const handleFilterChange = (filter) => {
    setFilterStatus(filter);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = listTask.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    setListTask(updatedTasks);
    localStorage.setItem("listTask", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = listTask.filter((task) => task.id !== taskId);
    setListTask(updatedTasks);
    localStorage.setItem("listTask", JSON.stringify(updatedTasks));
  };
  const handleClearTime = (taskId) => {
    const updatedTasks = listTask.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          timeRemind: "",
        };
      }
      return task;
    });
    setListTask(updatedTasks);
    localStorage.setItem("listTask", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (!taskName) {
      alert("Please enter a task name.");
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      name: taskName,
      timeRemind: "", // Khởi tạo timeRemind là một chuỗi trống
      complete: false,
    };

    setListTask([newTask, ...listTask]);
    setTaskName("");
    localStorage.setItem("listTask", JSON.stringify([...listTask, newTask]));
  };

  // Hàm để xử lý việc lưu thời gian nhắc nhở vào công việc tương ứng
  const handleSaveTime = (taskId, time) => {
    const updatedTasks = listTask.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          timeRemind: time,
        };
      }
      return task;
    });
    setListTask(updatedTasks);
    localStorage.setItem("listTask", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const data = localStorage.getItem("listTask");
    if (data) {
      const parsedData = JSON.parse(data);
      setListTask(parsedData);
    } else {
      setListTask([]);
    }
  }, []);
  const filteredTasks = listTask.filter((task) => {
    if (filterStatus === "all") {
      return true;
    } else if (filterStatus === "done") {
      return task.complete;
    } else if (filterStatus === "doing") {
      return !task.complete;
    }
  });

  return (
    <div className="bg-gray600 justify-center py-7 relative  ">
      <div className="content max-w-4xl w-full mx-auto min-h-screen">
        <div className="max-w-4xl w-full justify-centerw-full flex justify-center gap-4 text-white absolute top-[-30px] max-lg:px-5">
          <input
            className="p-4 w-full rounded-[8px] border-solid border-[1px] border-gray700 bg-gray600 text-[16px] text-gray300 focus:outline-none focus:border-purple"
            type="text"
            placeholder="Add task...."
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button
            className="flex justify-center p-4 items-center bg-blueDark gap-1 rounded-[8px] text-[14px] hover:bg-blue px-6"
            onClick={handleAddTask}
          >
            Add
            <FontAwesomeIcon icon={faPlus} className={styles["iconAdd"]} />
          </button>
        </div>

        <div className="flex justify-between w-full p-5 border-b-[1px] border-gray300 mt-12 items-center max-sm:flex-col max-sm:gap-6 pt-0">
          <div className="flex gap-4 text-[14px]">
            <p className="text-blue">
              Task:{" "}
              <span className="px-[8px] py-[2px] bg-gray400 rounded-[999px] text-[12px] font-bold text-gray200">
                {totalTasks}
              </span>
            </p>
            <p className="text-purpleDark">
              Complete:{" "}
              <span className="px-[8px] py-[2px] bg-gray400 rounded-[999px] text-[12px] font-bold text-gray200">
                {completedTasks}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-gray-100">
            <button
              className={`border-solid border-[1px] border-purpleDark bg-purpleDark px-3 py-1 rounded-[5px] hover:scale-[1.1] duration-75  ${
                filterStatus === "all" ? "bg-red-400" : ""
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>

            <button
              className={`border-solid border-[1px] border-purpleDark bg-purpleDark px-3 py-1 rounded-[5px] hover:scale-[1.1] duration-[0.5s] ease-in-out ${
                filterStatus === "done" ? "bg-red-400" : ""
              }`}
              onClick={() => handleFilterChange("done")}
            >
              Done
            </button>

            <button
              className={`border-solid border-[1px] border-purpleDark bg-purpleDark px-3 py-1 rounded-[5px] hover:scale-[1.1] duration-[0.5s] ease-in-out ${
                filterStatus === "doing" ? "bg-red-400" : ""
              }`}
              onClick={() => handleFilterChange("doing")}
            >
              Doing
            </button>
          </div>
        </div>

        <div className="max-h-screen h-full overflow-auto p-5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                time={item.timeRemind}
                complete={item.complete}
                onToggleComplete={() => handleToggleComplete(item.id)}
                onDeleteTask={() => handleDeleteTask(item.id)}
                onClearTime={() => handleClearTime(item.id)}
                onSaveTime={(time) => handleSaveTime(item.id, time)} // Truyền thời gian và ID công việc vào Item
              />
            ))
          ) : (
            <div className="text-gray300 text-[16px] flex flex-col justify-center items-center gap-5 pt-20">
              <img src={img} alt="" className="w-[56px] h-[56px]" />
              <div className="flex flex-col justify-center items-center">
                <p>You don't have tasks registered yet</p>
                <p>Create tasks and organize your to-do items</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Container;
