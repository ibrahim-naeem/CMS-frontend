import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface IRegisterProps {}

const Register: FC<IRegisterProps> = ({}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const body = { username, email, role, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      console.log(res);
      localStorage.setItem("Token", res.token);
      if (res.token) {
        navigate("/");
      }
      // console.log(username, email, role, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-[100vh]">
      {/* BOX START */}
      <div className="w-1/2 border bg-white rounded py-6">
        <div className="flex flex-col items-center">
          <img className="w-16" src={logo} alt="" />
          <h1 className="text-lg pt-2 pb-6 text-[#CBCCD4]"> Dashboard Kit</h1>
          <h1 className="text-xl font-bold">Register to Dashboad Kit</h1>
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
                htmlFor="username"
              >
                USERNAME
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none "
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            {/* Email  */}
            <div className="w-full my-2">
              <label
                className="block text-xs text-slate-400 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none "
                id="email"
                type="email"
                placeholder="Email address"
              />
            </div>
            {/* User Role - Admin/Director/Manager/Employee */}
            <div className="w-full my-2">
              <label
                className="block text-xs text-slate-400 font-semibold"
                htmlFor="email"
              >
                Please Select your Role
              </label>
              <select
                onChange={(e) => setRole(e.target.value.trim())}
                className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none "
                id="role"
                placeholder="Email address"
              >
                <option value="">--Please choose an option--</option>
                <option value="director">Director</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            {/* Password  */}
            <div className="w-full my-2">
              <label
                className="block text-xs text-slate-400 font-semibold"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded my-1 py-2 px-4 w-full text-sm shadow focus:outline-none "
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            {/* BUTTON */}
            <button className="w-full bg-[#3751FF] text-white font-semibold py-2 mt-2 mb-5 rounded">
              Register
            </button>
            <p>
              Already have an Account?{" "}
              <Link to="/login">
                <span className="text-[#3751FF] font-semibold">Login here</span>{" "}
              </Link>
            </p>
          </div>
          {/* Form Container End  */}
        </form>
        {/* FORM  END*/}
      </div>
      {/* BOX START */}
    </div>
  );
};

export default Register;
