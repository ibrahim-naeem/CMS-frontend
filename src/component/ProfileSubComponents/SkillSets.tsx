import { FC, useEffect, useState } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import SkillsetMapperModel from "../../models/skillset-model";
import SkillsetModal from "./Modals/SkillSetModal";

interface ISkillSetsProps {}

const SkillSets: FC<ISkillSetsProps> = (props) => {
  const [showSkillsetModal, setShowSkillsetModal] = useState(false);
  const [allSkillsets, setAllSkillsets] = useState<any>([]);
  const [skillset, setSkillset] = useState<any>([
    {
      skill_id: "",
      skill_name: "",
      employees: [],
    },
  ]);

  const token: any = localStorage.getItem("Token");
  const getSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/skills", {
        method: "GET",
        headers: { token },
      });
      const res = await response.json();
      let mapSkillsetData: SkillsetMapperModel = {
        skill_id: "",
        skill_name: "",
        employees: [""],
      };

      let mapSkillsetDataArray: Array<SkillsetMapperModel> = [];

      res.map((skillsetRow: SkillsetMapperModel) => {
        mapSkillsetDataArray.push(skillsetRow);
      });

      setSkillset(mapSkillsetDataArray);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/skills/${id}`, {
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

  const getAllSkillsets = async () => {
    setShowSkillsetModal(true);
    const response = await fetch("http://localhost:5000/user/getAllskillsets", {
      headers: { token },
    });

    const res = await response.json();

    res.map((skill) => {
      setAllSkillsets((prevState) => [...prevState, skill]);
    });
  };

  useEffect(() => {
    getSkills();
  }, []);
  return (
    <div className="w-full xl:w-8/12 px-4 mx-auto ">
      {showSkillsetModal && (
        <SkillsetModal
          showSkillsetModal={showSkillsetModal}
          setShowSkillsetModal={setShowSkillsetModal}
          allSkillsets={allSkillsets}
        />
      )}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        {/* Button */}
        <div className="flex items-center justify-between px-4 ">
          <h1 className="text-xl">Skill Set Details:</h1>
          <button
            onClick={getAllSkillsets}
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
                  Skill ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Skill Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Employees
                </th>
              </tr>
            </thead>
            <tbody>
              {skillset &&
                skillset.map((row) => {
                  return (
                    <tr key={Math.random()}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {row?.skill_id ? row?.skill_id : "..."}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {row?.skill_name ? row?.skill_name : "..."}
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

                        {row?.skill_id && (
                          <button
                            onClick={(e) => handleDelete(row?.skill_id)}
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

export default SkillSets;
