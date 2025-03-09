const PatientListType = ({ type, data, patientHandler }) => {
  return (
    <div className=" font-display bg-gray-100 rounded-md mt-8 ">
      <header className="pb-1 mt-1  text-sm sm:text-xl text-blue-400  border-b-2 border-blue-400">
        {`(${data?.length || 0})`} {type}
      </header>
      <div className="w-[350px] sm:w-[490px] sm:h-[235px]  overflow-y-scroll ">
        {data?.length > 0 ? (
          data?.map(({ id, name, image, booking_date }) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row  p-2 items-center cursor-pointer py-5 hover:bg-gray-200 transition text-sm"
              onClick={() => patientHandler(id)}
            >
              <img
                src={image}
                alt=""
                className="
                p-2 w-20 h-20 rounded-full border-2 border-blue-300 "
              />
              <div className="flex flex-col sm:flex-row items-center">
                <div className="text-blue-300 sm:w-50">
                  Name : <span className="text-gray-500">{name}</span>
                </div>
                <div className="text-gray-500 sm:ml-33">{booking_date}</div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="h-full flex justify-center items-center text-2xl text-gray-400 ">
            Empty
          </h3>
        )}
      </div>
    </div>
  );
};

export default PatientListType;
