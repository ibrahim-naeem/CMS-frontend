import { FC, useEffect, useState } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import ManagerMapperModel from "../../models/manager-model";
import ManagerModal from "./Modals/ManagerModal";

interface IManagersProps {}

const Managers: FC<IManagersProps> = (props) => {
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [allManagers, setAllManagers] = useState<any>([]);
  const [manager, setManager] = useState<any>([
    {
      manager_id: "",
      first_name: "",
      last_name: "",
      title: "",
      employees: [],
    },
  ]);

  const token: any = localStorage.getItem("Token");

  const getManager = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/manager", {
        method: "GET",
        headers: { token },
      });
      const res = await response.json();

      let mapManagerData: ManagerMapperModel = {
        manager_id: "",
        first_name: "",
        last_name: "",
        title: "",
        employees: [""],
      };

      let mapManagerDataArray: Array<ManagerMapperModel> = [];

      res.map((managerRow: ManagerMapperModel) => {
        mapManagerDataArray.push(managerRow);
      });

      setManager(mapManagerDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/manager/${id}`, {
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

  const getAllManagers = async () => {
    setShowManagerModal(true);
    const response = await fetch("http://localhost:5000/user/getAllManagers", {
      headers: { token },
    });

    const res = await response.json();

    res.map((manager) => {
      setAllManagers((prevState) => [...prevState, manager]);
    });
  };

  useEffect(() => {
    getManager();
  }, []);

  return (
    <div className="w-full xl:w-8/12 px-4 mx-auto ">
      {showManagerModal && (
        <ManagerModal
          showManagerModal={showManagerModal}
          setShowManagerModal={setShowManagerModal}
          allManagers={allManagers}
        />
      )}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        {/* Button */}
        <div className="flex items-center justify-between px-4 ">
          <h1 className="text-xl">Manager Details:</h1>
          <button
            onClick={getAllManagers}
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
                  Manager ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Manager Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Manager Email
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Employees
                </th>
              </tr>
            </thead>
            <tbody>
              {manager &&
                manager.map((row) => {
                  return (
                    <tr key={Math.random()}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {row?.manager_id ? row?.manager_id : "..."}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {row?.first_name ? row?.first_name : "..."}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {row?.last_name ? row?.last_name : "..."}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4">
                          {row?.title ? row?.title : "..."}
                        </i>
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                        <div>
                          {row?.employees
                            ? row.employees.map((employee) => {
                                return (
                                  <i
                                    key={Math.random()}
                                    className="fas fa-arrow-up text-emerald-500 mr-4 block"
                                  >
                                    {employee ? employee : "..."}
                                  </i>
                                );
                              })
                            : "..."}
                        </div>

                        {row?.manager_id && (
                          <button
                            onClick={(e) => handleDelete(row?.manager_id)}
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

export default Managers;
