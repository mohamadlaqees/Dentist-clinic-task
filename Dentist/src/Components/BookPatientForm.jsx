import React from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setBookFormAnimation, setOpenBookForm } from "../store/bookSlice";

const BookPatientForm = ({ bookPatientHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const { openBookForm, bookFormAnimation } = useSelector(
    (state) => state.book
  );

  const closeHandler = () => {
    dispatch(
      setBookFormAnimation({
        bookFormAnimation: "animate__animated animate__zoomOut",
      })
    );
    setTimeout(() => {
      dispatch(
        setOpenBookForm({
          openBookForm: false,
        })
      );
    }, 300);
  };

  const onSubmit = (data) => {
    reset();
    closeHandler();
    bookPatientHandler(data);
  };

  const Backdrop = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-10" />
    );
  };

  const Overlay = () => {
    return (
      <Container
        className={`fixed w-[350px] sm:w-[600px] sm:h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-lg shadow-lg ${bookFormAnimation} z-20`}
      >
        <header className="pb-1 flex justify-end items-center text-sm sm:text-2xl text-blue-400 border-b-2 border-blue-400">
          <p className="mr-[60%] sm:mr-[30%]">Book patient</p>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="mr-4 cursor-pointer text-gray-400 hover:text-blue-400 transition"
            onClick={closeHandler}
          />
        </header>
        <Row className="justify-content-center p-4 sm:mt-6">
          <Col md={6}>
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Form.Group className="mb-4">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter patient name"
                  {...register("name", { required: "Name is required" })}
                  isInvalid={!!errors.name}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.name && (
                  <div className="mt-2 text-sm text-red-600">
                    {errors.name?.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Phone
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                  isInvalid={!!errors.phone}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.phone && (
                  <div className="mt-2 text-sm text-red-600">
                    {errors.phone?.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Blood Type
                </Form.Label>
                <Form.Select
                  {...register("bloodType", {
                    required: "Blood type is required",
                  })}
                  isInvalid={!!errors.bloodType}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Form.Select>
                {errors.bloodType && (
                  <div className="mt-2 text-sm text-red-600">
                    {errors.bloodType?.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="block text-sm font-medium text-gray-700">
                  Booking Date
                </Form.Label>
                <Form.Control
                  type="date"
                  {...register("bookingDate", {
                    required: "Booking date is required",
                  })}
                  isInvalid={!!errors.bookingDate}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                {errors.bookingDate && (
                  <div className="mt-2 text-sm text-red-600">
                    {errors.bookingDate?.message}
                  </div>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-full sm:mt-6 text-sm sm:text-xl py-3 px-4 bg-transparent text-blue-400 font-semibold rounded-md border-2 border-blue-400 hover:bg-blue-400  hover:text-white cursor-pointer  transition"
              >
                Book patient
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      {openBookForm && (
        <>
          {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById("backdrop-bookPatient")
          )}
          {ReactDOM.createPortal(
            <Overlay />,
            document.getElementById("overlay-bookPatient")
          )}
        </>
      )}
    </>
  );
};

export default BookPatientForm;
