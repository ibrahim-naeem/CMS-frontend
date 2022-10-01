import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { CircularProgress } from "@mui/material";
interface IVerificationProps {}

const Verification: FC<IVerificationProps> = (props) => {
  const navigate = useNavigate();
  const [verifiactionCode, setVerifiactionCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const email = localStorage.getItem("email");
    const body = {
      email,
      verifiactionCode,
    };

    try {
      const response = await fetch("http://localhost:5000/cognito/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      setIsLoading(false);
      if (res.message) {
        navigate("/login");
      }

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-[100vh]">
      {/* BOX START */}
      <div className="w-1/2 border bg-white rounded py-6">
        <div className="flex flex-col items-center">
          <img className="w-16" src={logo} alt="" />
          <h1 className="text-lg pt-2 pb-6 text-[#CBCCD4]"> CMS Dashboard </h1>
          <h1 className="text-xl font-bold">Email Verifiaction </h1>
          <p className="text-sm py-2 text-[#CBCCD4]">
            Enter your details below
          </p>
        </div>

        {/* FORM  START*/}
        <form className="flex justify-center" onSubmit={handleSubmit}>
          {/* Form Container Start  */}
          <div className="w-2/3 flex flex-col items-center justify-center">
            {/* Username  */}
            <div className="w-full my-2">
              <label
                className="block text-xs text-slate-400 font-semibold"
                htmlFor="code"
              >
                VERIFICATION CODE
              </label>
              <input
                onChange={(e) => setVerifiactionCode(e.target.value)}
                className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none "
                id="code"
                type="string"
                placeholder="code"
              />
            </div>

            {/* BUTTON */}
            <button className="w-full bg-[#3751FF] text-white font-semibold py-2 mt-2 mb-5 rounded">
              {!isLoading ? (
                "Verify Email"
              ) : (
                <CircularProgress color="inherit" size={20} />
              )}
            </button>
          </div>
          {/* Form Container End  */}
        </form>
        {/* FORM  END*/}
      </div>
      {/* BOX END */}
    </div>
  );
};

export default Verification;
