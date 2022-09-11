import { FC, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsClipboardPlus } from "react-icons/bs";

interface IProfileModalProps {
  display: any;
  setDisplay: any;
  details: any;
}

const ProfileModal: FC<IProfileModalProps> = ({
  display,
  setDisplay,
  details,
}) => {
  const [data, setData] = useState<any>({
    userName: details.userName || "",
    userEmail: details.userEmail || "" || "",
    userStatus: details.userStatus || "",
    dateOfBirth: details.dateOfBirth || "",
    joiningDate: details.joiningDate || "",
    confirmationDate: details.confirmationDate || "",
    gender: details.gender || "",
    martial: details.martial || "",
    shiftType: details.shiftType || "",
    education: details.education || "",
    family: details.family || "",
    employments: details.emplymeents || "",
    awards: details.awards || "",
  });

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplay(!display);

    try {
      const token: any = localStorage.getItem("Token");
      const response = await fetch(
        "http://localhost:5000/user/personalDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      // console.log(res, token, data)
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`${
        !display && "hidden"
      }  overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:inset-0  justify-center items-center flex`}
    >
      <div className="relative p-2 w-full max-w-3xl h-full md:h-[90vh]">
        <div className="relative rounded-lg shadow bg-slate-200">
          <button
            onClick={() => setDisplay(!display)}
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
                {/* Side One */}
                <div className="w-1/3 ">
                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Name{" "}
                    </label>
                    <input
                      onChange={handleChange}
                      defaultValue={details.userName}
                      type="text"
                      name="userName"
                      id="userName"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      type="email"
                      id="userEmail"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none "
                      defaultValue={details.userEmail}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="martial"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Marital Status
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="martial"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.martial}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Gender{" "}
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="gender"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.gender}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="education"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Education{" "}
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="education"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.education}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="family"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Family{" "}
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="family"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.family}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="employments"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      emplyments{" "}
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="employments"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.emplymeents}
                    />
                  </div>
                </div>
                {/* Side Two */}
                <div className="w-1/3">
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Date of Birth
                    </label>
                    <input
                      onChange={handleChange}
                      type="date"
                      id="dateOfBirth"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.dateOfBirth}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="joiningDate"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Joining Date
                    </label>
                    <input
                      onChange={handleChange}
                      type="date"
                      id="joiningDate"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none "
                      defaultValue={details.joiningData}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmationDate"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Confirmation Date
                    </label>
                    <input
                      onChange={handleChange}
                      type="date"
                      id="confirmationDate"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.confirmationDate}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="userStatus"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Status
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="userStatus"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.userStatus}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shiftType"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Shift Type
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="shiftType"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.shiftType}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="awards"
                      className="block mb-0.5 text-xs  text-[#52535D]"
                    >
                      Awards
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="awards"
                      className="border rounded my-1 py-1 px-4 w-full text-sm shadow focus:outline-none bg-white"
                      defaultValue={details.awards}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center  justify-center  mx-auto w-1/2 text-center border-2 border-white rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-[#51535D] hover:border-[#51535D] hover:bg-white"
              >
                <BsClipboardPlus className="mr-2" />
                Submit Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
