import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactComponent as Checkbox } from "../assets/logo/check.svg";
import { ReactComponent as CheckboxDone } from "../assets/logo/done.svg";
import styles from "../css/Footer.module.css";
import {
  faTrashCan,
  faStopwatch,
  faBell,
  faBellSlash
} from "@fortawesome/free-solid-svg-icons";

function Item({
  name,
  time,
  complete,
  onToggleComplete,
  onDeleteTask,
  onSaveTime,
  onClearTime
}) {
  const [isChecked, setIsChecked] = useState(complete);
  const [showPopup, setShowPopup] = useState(false);
  const [timeInput, setTimeInput] = useState("");

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onToggleComplete();
  };

  const handleDelete = () => {
    onDeleteTask();
  };
  const handleCleartime =()=>{
    onClearTime();
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleSaveTime = () => {
    onSaveTime(timeInput);
    setShowPopup(false);
  };

  return (
    <div>
      <div
        className={`flex items-center  justify-between ${
          isChecked ? "bg-gray500" : "bg-gray400"
        } p-4 rounded-lg my-5 hover:scale-[1.01] ease-in-out duration-75`}
      >
        <div className="flex gap-3 items-center ">
          {isChecked ? (
            <div onClick={toggleCheckbox}>
              <CheckboxDone />
            </div>
          ) : (
            <div onClick={toggleCheckbox}>
              <Checkbox />
            </div>
          )}
          <div className="flex flex-col text-gray100">
            <p
              className={`text-[16px] font-normal ${
                isChecked ? " text-gray300 line-through" : ""
              }`}
            >
              {name}
            </p>
            {time && (
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faStopwatch} />
                <p>{time}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <FontAwesomeIcon
            icon={faBell}
            className={styles["iconItem"]}
            onClick={togglePopup}
          />
          {time && <FontAwesomeIcon icon={faBellSlash}  className={styles["iconItem"]} onClick={handleCleartime}/>}
          <FontAwesomeIcon
            icon={faTrashCan}
            className={styles["delete"]}
            onClick={handleDelete}
          />
        </div>
      </div>
      {showPopup && (
        <div className="absolute right-auto z-50 flex gap-3 bg-white p-1">
          <input
            type="datetime-local"
            placeholder="Enter time..."
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            className="mr-6"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSaveTime}
              className="bg-purple rounded-sm p-1 hover:bg-purpleDark hover:text-white duration-75 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-purple rounded-sm p-1 hover:bg-purpleDark hover:text-white duration-75 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
