import { FC, useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsClipboardPlus } from "react-icons/bs";

interface IDirectorModalProps {
  showDirectorModal: any;
  setShowDirectorModal: any;
  allDirector: any;
}

const DirectorModal: FC<IDirectorModalProps> = ({
  showDirectorModal,
  setShowDirectorModal,
  allDirector,
}) => {
  let token: any = localStorage.getItem("Token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectValue = e.target.Directors.value;
    let inputValue = e.target.DirectorName.value;
    if (selectValue || inputValue) {
      if (inputValue) {
        selectValue = "";
      }
      let DirectorName = selectValue || inputValue;
      console.log(DirectorName);

      // try {
      //   const response = await fetch("http://localhost:5000/user/Directors", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       token,
      //     },
      //     body: JSON.stringify({ DirectorName }),
      //   });
      //   const res = await response.json();
      //   console.log(res);
      //   window.location.reload();
      // } catch (error) {
      //   console.error(error);
      // }
    } else {
      console.log("Please select Director or enter a Director");
    }
  };

  return (
    <div
      className={` overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:inset-0  justify-center items-center flex`}
    >
      <div className="absolute p-2  w-full   max-w-lg h-full md:h-[90vh] z-1000">
        <div className="relative rounded-lg shadow bg-slate-200">
          <button
            onClick={() => setShowDirectorModal(!showDirectorModal)}
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
                <div className="">
                  <label htmlFor="cars">Choose a Director:</label>
                  <select name="Directors" id="Directors">
                    <option value="">Directors</option>
                    {allDirector.map((Director) => {
                      return (
                        <option key={Math.random()} value={Director.first_name}>
                          {Director.first_name}
                        </option>
                      );
                    })}
                  </select>
                  <h1 className="my-4">Add new Director below :</h1>

                  <input
                    type="text"
                    id="DirectorName"
                    className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none "
                  />
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

export default DirectorModal;
