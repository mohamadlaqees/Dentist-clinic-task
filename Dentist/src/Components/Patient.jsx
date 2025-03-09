import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { useDispatch } from "react-redux";
import { showPatientInfo } from "../store/patientSlice";

const Patient = ({ patientInfo, removeHandler, enterHandler }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className=" mr-auto font-display ml-auto rounded-2xl pt-2  bg-gray-100 w-[600px] h-80  transition-all">
        <header className="pb-1 flex justify-end items-center  text-2xl text-blue-400  border-b-2 border-blue-400">
          <p className="mr-[30%]">Patient info</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="mr-4 cursor-pointer text-gray-400 hover:text-blue-400 transition"
            onClick={() => dispatch(showPatientInfo({ patientInfo: {} }))}
          />
        </header>
        <div className=" flex justify-start p-8 items-center gap-[41px]">
          <div className="flex flex-col  items-center">
            <div className="p-2 w-28 h-28 rounded-full border-2 border-blue-300">
              <img src="user.png" alt="" />
            </div>

            <button
              className={`rounded-md mt-4 py-2 px-4   font-bold cursor-pointer transition-all ${
                patientInfo.status === "incoming" ||
                patientInfo.status === "current"
                  ? "bg-transparent text-red-400 border-2 border-red-500 hover:bg-red-500 hover:text-white "
                  : "bg-transparent text-blue-400 border-2 border-blue-500 hover:bg-blue-500 hover:text-white "
              }`}
              onClick={() => {
                if (
                  patientInfo.status === "incoming" ||
                  patientInfo.status === "current"
                ) {
                  removeHandler(patientInfo.id);
                } else {
                  enterHandler(patientInfo.id);
                }
              }}
            >
              {patientInfo.status === "incoming"
                ? "Remove the booking"
                : patientInfo.status === "waiting"
                ? "Enter the patient"
                : patientInfo.status === "current"
                ? "Remove patient"
                : ""}
            </button>
          </div>

          <div className=" flex flex-col items-start gap-2 text-lg">
            <div className="text-blue-300">
              Name : <span className="text-gray-500">{patientInfo.name}</span>
            </div>
            <div className="text-blue-300">
              Phone : <span className="text-gray-500">{patientInfo.phone}</span>
            </div>
            <div className="text-blue-300">
              {" "}
              Blood type :{" "}
              <span className="text-gray-500">{patientInfo.blood_type}</span>
            </div>
            <div className="text-blue-300">
              Booking type :{" "}
              <span className="text-gray-500">{patientInfo.booking_type}</span>
            </div>
            <div className="text-blue-300">
              Booking date :{" "}
              <span className="text-gray-500">{patientInfo.booking_date}</span>
            </div>
            <div className="text-blue-300">
              Status :{" "}
              <span className="text-gray-500">{patientInfo.status}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;
