import { useEffect, useState } from "react";
import Patient from "./Components/Patient";
import PatientListType from "./Components/PatientListType";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { showPatientInfo } from "./store/patientSlice";
function App() {
  const dispatch = useDispatch();
  const { patientInfo } = useSelector((state) => state.patient);
  const [patients, setPatients] = useState([]);

  const getPatientData = async () => {
    const data = await fetch("http://localhost:5000/patients");
    const response = await data.json();
    setPatients(response);
  };

  const patientHandler = async (id) => {
    const data = await fetch(`http://localhost:5000/patients/${id}`);
    const response = await data.json();
    dispatch(showPatientInfo({ patientInfo: response }));
  };

  const removeHandler = async (id) => {
    await fetch(`http://localhost:5000/patients/${id}`, {
      method: "DELETE",
    });
  };

  const enterHandler = async (id) => {
    await fetch(`http://localhost:5000/patients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "current" }),
    });
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const incomingPatients = patients.filter(
    (patient) => patient.status === "incoming"
  );
  const waitingPatients = patients.filter(
    (patient) => patient.status === "waiting"
  );
  const currentPatients = patients.filter(
    (patient) => patient.status === "current"
  );

  return (
    <>
      <header className="bg-blue-400 py-4 pl-2 text-xl text-white font-display">
        Booking system
      </header>
      <div className="pt-8">
        <div className="text-center">
          {Object.keys(patientInfo).length != 0 ? (
            <Patient
              patientInfo={patientInfo}
              removeHandler={removeHandler}
              enterHandler={enterHandler}
            />
          ) : (
            <div className="text-gray-600 text-3xl flex items-center justify-center h-[300px]">
              Click on patient to see it's info
            </div>
          )}
          <div className="flex justify-center gap-2  ">
            <PatientListType
              type={"Incoming patients"}
              data={incomingPatients}
              patientHandler={patientHandler}
            />
            <PatientListType
              type={"Watining patients"}
              data={waitingPatients}
              patientHandler={patientHandler}
            />

            <PatientListType
              type={"Current patient"}
              data={currentPatients}
              patientHandler={patientHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
