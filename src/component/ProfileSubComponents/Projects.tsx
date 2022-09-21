import { FC, useEffect, useState } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import ProjectMapperModel from "../../models/project-model";

import ProjectModal from "./Modals/ProjectModal";

interface IProjectsProps {}

const Projects: FC<IProjectsProps> = (props) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [allProjects, setAllProjects] = useState<any>([]);
  const [project, setProject] = useState<any>([
    {
      project_id: "",
      project_name: "",
      director_id: "",
      manager_id: "",
      employees_id: [],
    },
  ]);
  const token: any = localStorage.getItem("Token");
  const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/projects", {
        method: "GET",
        headers: { token },
      });
      const res = await response.json();
      let mapProjectData: ProjectMapperModel = {
        project_id: "",
        project_name: "",
        director_id: "",
        manager_id: "",
        employees_id: [],
      };
      let mapProjectDataArray: Array<ProjectMapperModel> = [];

      res.map((projectRow: ProjectMapperModel) => {
        mapProjectDataArray.push(projectRow);
      });
      setProject(mapProjectDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/project/${id}`, {
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

  const getAllManager = async () => {
    setShowProjectModal(true);
    const response = await fetch("http://localhost:5000/user/getAllprojects", {
      headers: { token },
    });

    const res = await response.json();

    res.map((project) => {
      setAllProjects((prevState) => [...prevState, project]);
    });
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <div className="w-full  px-4 mx-auto ">
      {showProjectModal && (
        <ProjectModal
          showProjectModal={showProjectModal}
          setShowProjectModal={setShowProjectModal}
          allProjects={allProjects}
        />
      )}
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        {/* Button */}
        <div className="flex items-center justify-between px-4 ">
          <h1 className="text-xl">Project Details:</h1>
          <button
            onClick={getAllManager}
            className="flex items-center border-2 rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]"
          >
            <BsClipboardPlus className="mr-2 -mt-1" /> Add{" "}
          </button>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className=" px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Project ID
                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Project Name
                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Director ID
                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Manager ID
                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Employees ID
                </th>
              </tr>
            </thead>
            <tbody>
              {project &&
                project.map((row) => {
                  return (
                    <tr key={Math.random()}>
                      <th className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {row?.project_id ? row?.project_id : "..."}
                      </th>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4  ">
                        {row?.project_name ? row?.project_name : "..."}
                      </td>
                      <td className="border-t-0 px-3 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4  text-emerald-500">
                        {row?.director_id ? row?.director_id : "..."}
                      </td>
                      <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4  text-emerald-500 ">
                        {row?.manager_id ? row?.manager_id : "..."}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                        <div key={Math.random()}>
                          {row?.employees_id
                            ? row.employees_id.map((employees) => {
                                return (
                                  <>
                                    <i
                                      key={Math.random()}
                                      className="fas fa-arrow-up text-emerald-500 block"
                                    >
                                      {employees ? employees : "..."}
                                    </i>
                                  </>
                                );
                              })
                            : "..."}
                        </div>

                        {row?.project_id && (
                          <button
                            onClick={(e) => handleDelete(row?.project_id)}
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

export default Projects;
