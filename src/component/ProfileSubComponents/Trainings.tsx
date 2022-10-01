import { FC, useState, useEffect } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import TrainingMapperModel from "../../models/training-model";
import { MdOutlineDeleteSweep } from "react-icons/md";
import TrainingModal from "./Modals/TrainingModal";

interface ITrainingsProps {}

const Trainings: FC<ITrainingsProps> = (props) => {
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [allTrainings, setAllTrainings] = useState<any>([]);
  const [data, setData] = useState<any>([
    {
      trainingID: "",
      trainingName: "",
      employees: [],
    },
  ]);
  const token: any = localStorage.getItem("Token");

  const getAllTraining = async () => {
    setShowTrainingModal(!showTrainingModal);
    const response = await fetch("http://localhost:5000/user/getAllTrainings", {
      headers: { token },
    });

    const res = await response.json();
    console.log("getAllTraining=>", res, res.status);

    res.map((training) => {
      setAllTrainings((prevState) => [...prevState, training]);
    });
  };

  const getTrainings = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/trainings", {
        method: "GET",
        headers: { token },
      });
      const res = await response.json();

      let mappedTrainingDataArray: Array<TrainingMapperModel> = [];
      if (res) {
        res.map((trainingRow: TrainingMapperModel) => {
          mappedTrainingDataArray.push(trainingRow);
        });
      } else {
        console.log(res);
      }

      setData(mappedTrainingDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/user/trainings/${id}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );
      const res = await response.json();
      console.log(res);
      alert(res.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrainings();
  }, []);
  return (
    <div className="w-full xl:w-8/12 px-4 mx-auto ">
      {showTrainingModal && (
        <TrainingModal
          showTrainingModal={showTrainingModal}
          setShowTrainingModal={setShowTrainingModal}
          allTrainings={allTrainings}
        />
      )}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        {/* Button */}
        <div className="flex items-center justify-between px-4 ">
          <h1 className="text-xl">Training Details:</h1>
          <button
            onClick={getAllTraining}
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
                  Training ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Training Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Employees
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((row) => {
                  // console.log("row in html is ", row);
                  return (
                    <tr key={Math.random()}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {row?.training_id ? row.training_id : "..."}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {row?.training_name ? row.training_name : "..."}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                        <div>
                          {row?.employees
                            ? row.employees.map((employeesId) => {
                                return (
                                  <i
                                    key={Math.random()}
                                    className="fas fa-arrow-up text-emerald-500 mr-4 block"
                                  >
                                    {employeesId}
                                  </i>
                                );
                              })
                            : "..."}
                        </div>

                        {row?.training_id && (
                          <button
                            onClick={(e) => handleDelete(row?.training_id)}
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

export default Trainings;
