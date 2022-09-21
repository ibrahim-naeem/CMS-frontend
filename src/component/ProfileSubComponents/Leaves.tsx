import { FC, useEffect, useState } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import LeaveMapperModel from "../../models/leave-model";
import LeaveModal from "./Modals/LeaveModal";

interface ILeavesProps {}

const Leaves: FC<ILeavesProps> = (props) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [allLeave, setAllLeave] = useState<any>([]);
  const [leave, setLeave] = useState<any>([
    {
      leave_id: "",
      date: "",
      employees_id_status: [],
    },
  ]);

  const token: any = localStorage.getItem("Token");
  const getLeaves = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/leave", {
        method: "GET",
        headers: { token },
      });
      const res = await response.json();
      let mapLeaveDataArray: Array<LeaveMapperModel> = [];

      res.map((leaveRow: LeaveMapperModel) => {
        mapLeaveDataArray.push(leaveRow);
      });

      setLeave(mapLeaveDataArray);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/leave/${id}`, {
        method: "DELETE",
        headers: { token },
      });
      const res = await response.json();
      console.log(res);
      alert(res.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const getAllLeaves = async () => {
    setShowLeaveModal(true);
    const response = await fetch("http://localhost:5000/user/getAllleaves", {
      method: "GET",
      headers: { token },
    });

    const res = await response.json();

    res.map((leave) => {
      setAllLeave((prevState) => [...prevState, leave]);
    });
  };

  useEffect(() => {
    getLeaves();
  }, []);
  return (
    <div className="w-full xl:w-8/12 px-4 mx-auto ">
      {showLeaveModal && (
        <LeaveModal
          showLeaveModal={showLeaveModal}
          setShowLeaveModal={setShowLeaveModal}
          allLeave={allLeave}
        />
      )}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        {/* Button */}
        <div className="flex items-center justify-between px-4 ">
          <h1 className="text-xl">Leaves Details:</h1>
          <button
            onClick={getAllLeaves}
            className="flex items-center border-2 rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]"
          >
            <BsClipboardPlus className="mr-2 -mt-1" /> Add{" "}
          </button>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Leave ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Employees ID & Status
                </th>
              </tr>
            </thead>
            <tbody>
              {leave &&
                leave.map((row) => {
                  return (
                    <tr key={Math.random()}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {row?.leave_id ? row?.leave_id : "..."}_
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {row?.date ? row?.date : "..."}
                      </td>

                      <td
                        key={Math.random()}
                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center"
                      >
                        <div key={Math.random()}>
                          {row?.employees_id_status
                            ? row.employees_id_status.map((employees_id) => {
                                return (
                                  <>
                                    <i
                                      key={Math.random()}
                                      className=" block fas fa-arrow-up text-emerald-500 mr-4"
                                    >
                                      {employees_id}
                                    </i>
                                  </>
                                );
                              })
                            : "..."}
                        </div>

                        {row?.leave_id && (
                          <button
                            onClick={(e) => handleDelete(row?.leave_id)}
                            className="flex text-3xl text-red-500"
                          >
                            <MdOutlineDeleteSweep />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaves;
