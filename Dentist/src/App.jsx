import { useEffect, useState } from "react";
import Patient from "./Components/Patient";
import PatientListType from "./Components/PatientListType";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setPatientAnimation, showPatientInfo } from "./store/patientSlice";
import { setBookFormAnimation, setOpenBookForm } from "./store/bookSlice";
import BookPatientForm from "./Components/BookPatientForm";

function App() {
  const dispatch = useDispatch();
  const { patientInfo } = useSelector((state) => state.patient);
  const [patients, setPatients] = useState([]);

  const getPatientData = async () => {
    try {
      const response = await fetch("http://localhost:5000/patients");
      if (!response.ok) throw new Error("Failed to fetch patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const patientHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/patients/${id}`);
      if (!response.ok) throw new Error("Failed to fetch patient details");
      const data = await response.json();
      dispatch(
        setPatientAnimation({
          patientAnimation: "animate__animated animate__zoomIn",
        })
      );
      dispatch(showPatientInfo({ patientInfo: data }));
    } catch (error) {
      console.error("Error fetching patient info:", error);
    }
  };

  const removeHandler = async (id) => {
    dispatch(
      setPatientAnimation({
        patientAnimation: "animate__animated animate__zoomOut",
      })
    );
    try {
      const response = await fetch(`http://localhost:5000/patients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete patient");
    } catch (error) {
      console.error("Error removing patient:", error);
    }
  };

  const makePatientWaiting = async (id) => {
    dispatch(
      setPatientAnimation({
        patientAnimation: "animate__animated animate__zoomOut",
      })
    );
    try {
      const response = await fetch(`http://localhost:5000/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "waiting" }),
      });
      if (!response.ok) throw new Error("Failed to update patient status");
    } catch (error) {
      console.error("Error updating patient status:", error);
    }
  };

  const enterHandler = async (id) => {
    dispatch(
      setPatientAnimation({
        patientAnimation: "animate__animated animate__zoomOut",
      })
    );
    try {
      const response = await fetch(`http://localhost:5000/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "current" }),
      });
      if (!response.ok) throw new Error("Failed to update patient status");
    } catch (error) {
      console.error("Error updating patient status:", error);
    }
  };

  const bookPatientHandler = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/patients/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          blood_type: data.bloodType,
          booking_type: "walk-in",
          booking_date: data.bookingDate,
          image: "user.png",
          status: "incoming",
        }),
      });
      if (!response.ok) throw new Error("Failed to update patient status");
    } catch (error) {
      console.error("Error updating patient status:", error);
    }
  };

  const bookHandler = () => {
    dispatch(
      setBookFormAnimation({
        bookFormAnimation: "animate__animated animate__zoomIn",
      })
    );
    dispatch(setOpenBookForm({ openBookForm: true }));
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
      <BookPatientForm bookPatientHandler={bookPatientHandler} />
      <header className="flex justify-between items-center bg-blue-400 py-4 pl-2 text-sm sm:text-xl text-white font-display">
        Booking system
        <button
          className="mr-2 border-2 border-white rounded-md py-2 px-4 transition hover:bg-white hover:text-blue-400 hover:border-blue-400 cursor-pointer"
          onClick={bookHandler}
        >
          Book patient
        </button>
      </header>
      <div className="pt-8 px-4 md:px-8 lg:px-16">
        <div className="text-center">
          {patientInfo && Object.keys(patientInfo).length !== 0 ? (
            <Patient
              patientInfo={patientInfo}
              removeHandler={removeHandler}
              makePatientWaiting={makePatientWaiting}
              enterHandler={enterHandler}
            />
          ) : (
            <div className="text-gray-600 text-3xl flex items-center justify-center h-[300px]">
              Click on a patient to see its info
            </div>
          )}
          <div className="flex   justify-center items-center flex-wrap    md:gap-6 lg:gap-2 xl:flex-nowrap">
            <PatientListType
              type="Incoming patients"
              data={incomingPatients}
              patientHandler={patientHandler}
            />
            <PatientListType
              type="Waiting patients"
              data={waitingPatients}
              patientHandler={patientHandler}
            />
            <PatientListType
              type="Current patient"
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
