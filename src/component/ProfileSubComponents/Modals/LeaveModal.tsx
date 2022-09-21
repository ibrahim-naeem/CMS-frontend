import { FC, useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsClipboardPlus } from "react-icons/bs";

interface ILeaveModalProps {
  showLeaveModal: any;
  setShowLeaveModal: any;
  allLeave: any;
}

const LeaveModal: FC<ILeaveModalProps> = ({
  showLeaveModal,
  setShowLeaveModal,
  allLeave,
}) => {
  let token: any = localStorage.getItem("Token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectValue = e.target.Leaves.value;
    let inputValue = e.target.LeaveDate.value;
    let leaveStatus = e.target.Status.value;
    if (selectValue || inputValue) {
      if (inputValue) {
        selectValue = "";
      }
      let LeaveDate = selectValue || inputValue;

      console.log(LeaveDate, leaveStatus);
      try {
        const response = await fetch("http://localhost:5000/user/leave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ LeaveDate, leaveStatus }),
        });
        const res = await response.json();

        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please select Leave or enter a Leave");
    }
  };

  return (
    <div
      className={` overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:inset-0  justify-center items-center flex`}
    >
      <div className="absolute p-2  w-full   max-w-lg h-full md:h-[90vh] z-1000">
        <div className="relative rounded-lg shadow bg-slate-200">
          <button
            onClick={() => setShowLeaveModal(!showLeaveModal)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <AiOutlineCloseCircle className="text-2xl" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8  ">
            <h3 className="mb-3 text-xl text-center font-semibold text-[#51535D] ">
              Add Profile Details :
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-around ">
                <div className="w-2/3">
                  <label htmlFor="cars">Choose a Leave:</label>
                  <select name="Leaves" id="Leaves">
                    <option value="">Leaves</option>
                    {allLeave.map((Leave) => {
                      return (
                        <option key={Math.random()} value={Leave.date}>
                          {Leave.date}
                        </option>
                      );
                    })}
                  </select>
                  <h1 className="my-4">Add new Leave below :</h1>

                  <input
                    type="date"
                    id="LeaveDate"
                    className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none "
                  />
                  <label htmlFor="cars">Choose a Leave Stats:</label>
                  <select name="Status" id="Status">
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center  justify-center  mx-auto w-1/2 text-center border-2 border-white rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-[#51535D] hover:border-[#51535D] hover:bg-white"
              >
                <BsClipboardPlus className="mr-2" />
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
