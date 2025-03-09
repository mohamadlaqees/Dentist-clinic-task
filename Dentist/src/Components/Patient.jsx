import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPatientAnimation, showPatientInfo } from "../store/patientSlice";

const Patient = ({
  patientInfo,
  removeHandler,
  enterHandler,
  makePatientWaiting,
}) => {
  const dispatch = useDispatch();
  const { patientAnimation } = useSelector((state) => state.patient);

  const handleButtonClick = () => {
    if (patientInfo.status === "incoming" || patientInfo.status === "current") {
      removeHandler(patientInfo.id);
    } else {
      enterHandler(patientInfo.id);
    }
  };

  const waitingHandler = () => {
    makePatientWaiting(patientInfo.id);
  };

  const closeHandler = () => {
    dispatch(
      setPatientAnimation({
        patientAnimation: "animate__animated animate__zoomOut",
      })
    );
    setTimeout(() => {
      dispatch(showPatientInfo({ patientInfo: {} }));
    }, 500);
  };

  const getButtonText = () => {
    switch (patientInfo.status) {
      case "incoming":
        return "Remove the booking";
      case "waiting":
        return "Enter the patient";
      case "current":
        return "Remove patient";
      default:
        return "";
    }
  };

  const getButtonClass = () => {
    if (patientInfo.status === "incoming" || patientInfo.status === "current") {
      return "bg-transparent text-red-400 border-2 border-red-500 hover:bg-red-500 hover:text-white";
    } else {
      return "bg-transparent text-blue-400 border-2 border-blue-500 hover:bg-blue-500 hover:text-white";
    }
  };

  const getMoveToWaitingButton = () => {
    return (
      patientInfo.status === "incoming" && (
        <button
          className=" sm:w-[200px] w-[140px] rounded-md  text-sm   sm:mt-4  sm:px-4 py-1 sm:py-2    sm:font-bold  cursor-pointer transition-all bg-transparent text-blue-400 border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
          onClick={waitingHandler}
        >
          Move to waiting
        </button>
      )
    );
  };

  return (
    <div
      className={`mr-auto h-fit  font-display ml-auto rounded-2xl pt-2 bg-gray-100 w-[350px] sm:w-[600px] sm:h-[320px] transition-all ${patientAnimation}`}
    >
      <header className="pb-1 flex justify-end items-center text-sm sm:text-2xl text-blue-400 border-b-2 border-blue-400">
        <p className="mr-[60%] sm:mr-[30%]">Patient info</p>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="mr-4 cursor-pointer text-gray-400 hover:text-blue-400 transition"
          onClick={closeHandler}
        />
      </header>
      <div className="h-full sm:h-fit  flex flex-col sm:flex-row justify-between p-2 sm:p-8 items-center  sm:gap-[41px]">
        <div className="flex flex-col items-center">
          <div className="mb-2 sm:m-0 p-2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-blue-300">
            <img src="user.png" alt="Patient" />
          </div>

          <div className=" flex sm:flex-col gap-5 sm:gap-0 mb-3">
            {getMoveToWaitingButton()}

            <button
              className={` sm:w-[200px] w-[140px] rounded-md  text-sm   sm:mt-4 py-1 sm:py-2 sm:px-4  sm:font-bold  cursor-pointer transition-all ${getButtonClass()}`}
              onClick={handleButtonClick}
            >
              {getButtonText()}
            </button>
          </div>
        </div>

        <div className="w-full mt-4 sm:mt-0 sm:w-fit flex flex-col  items-start gap-2 text-sm sm:text-lg">
          <div className="text-blue-300">
            Name: <span className="text-gray-500">{patientInfo.name}</span>
          </div>
          <div className="text-blue-300">
            Phone: <span className="text-gray-500">{patientInfo.phone}</span>
          </div>
          <div className="text-blue-300">
            Blood type:{" "}
            <span className="text-gray-500">{patientInfo.blood_type}</span>
          </div>
          <div className="text-blue-300">
            Booking type:{" "}
            <span className="text-gray-500">{patientInfo.booking_type}</span>
          </div>
          <div className="text-blue-300">
            Booking date:{" "}
            <span className="text-gray-500">{patientInfo.booking_date}</span>
          </div>
          <div className="text-blue-300">
            Status: <span className="text-gray-500">{patientInfo.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
