import { FC, useEffect, useState } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import { MdOutlineDeleteSweep } from "react-icons/md";
import FileModal from "./Modals/FilleModal";
import download from "downloadjs";
interface IFilesProps {}

declare let process: {
  env: {
    REACT_APP_FILE_GET_FILE_URL: string;
    REACT_APP_FILE_DOWNLOAD_FILE_URL: string;
    REACT_APP_FILE_DELETE_FILE_URL: string;
  };
};

const Files: FC<IFilesProps> = ({}) => {
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [files, setFiles] = useState<any>([]);
  const token: any = localStorage.getItem("Token");
  const handleClick = () => {
    setShowFileModal(!showFileModal);
  };

  const getFiles = async () => {
    // "http://localhost:5000/user/getFiles"
    const response = await fetch(process.env.REACT_APP_FILE_GET_FILE_URL, {
      method: "GET",
      headers: { token: token },
    });
    const res = await response.json();

    setFiles(res);
  };
  const downloadFile = async (id) => {
    //  `http://localhost:5000/user/downloadFile/${id}
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FILE_DOWNLOAD_FILE_URL}/${id}`,
        {
          method: "GET",
          headers: { token },
        }
      );
      const res = response;
      const blob = await res.blob();
      download(blob);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    // `http://localhost:5000/user/deleteFiles/${id}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FILE_DELETE_FILE_URL}/${id}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );
      const res = await response.json();
      console.log(res);
      alert(res.message);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="w-full xl:w-8/12 px-4 mx-auto ">
      {showFileModal && (
        <FileModal
          showFileModal={showFileModal}
          setShowFileModal={setShowFileModal}
        />
      )}

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        {/* Button */}
        <div className="flex items-center justify-between px-4 ">
          <h1 className="text-xl">Files Detail:</h1>

          <button
            onClick={handleClick}
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
                  File ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  User ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  File Name
                </th>
              </tr>
            </thead>
            <tbody>
              {files &&
                files.map((row) => {
                  return (
                    <tr key={Math.random()}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {row?.file_id ? row?.file_id : ""}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {row?.user_id ? row?.user_id : ""}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                        <div>
                          <button
                            onClick={() => downloadFile(row?.file_id)}
                            className=" block fas fa-arrow-up text-emerald-500 "
                          >
                            {row?.file_path
                              ? row?.file_path.replace("/getFile/", "")
                              : ""}
                          </button>
                        </div>

                        <button
                          onClick={() => handleDelete(row?.file_id)}
                          className="flex text-3xl text-red-500"
                        >
                          <MdOutlineDeleteSweep />
                        </button>
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

export default Files;
