import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import {
  isTokenPresent,
  verifyExpiredToken,
} from "../utils/utitlityMethods/utilityMethods";
import { Avatar, CircularProgress } from "@mui/material";
import HeaderImageModal from "./ProfileSubComponents/Modals/HeaderImageModal";
import { BsClipboardPlus } from "react-icons/bs";

interface IHeaderProps {}
declare let process: {
  env: {
    REACT_APP_HEADER_GET_USER_URL: string;
    REACT_APP_HEADER_GET_IMAGE_PATH_URL: string;
    REACT_APP_HEADER_GET_S3_IMAGE_URL: string;
  };
};
const Header: FC<IHeaderProps> = ({}): JSX.Element => {
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState<any>("");
  const [image, setImage] = useState<any>();
  const [name, setName] = useState<string>("");
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token: any = localStorage.getItem("Token");

  const getProfile = async () => {
    // "http://localhost:5000/user/"
    try {
      const response = await fetch(process.env.REACT_APP_HEADER_GET_USER_URL, {
        method: "GET",
        headers: { token },
      });

      const res = await response.json();

      // isTokenPresent("Token");
      // let tokenExpired = verifyExpiredToken(res);

      // if (tokenExpired) {
      //   navigate("/login");
      // }

      setName(res.user_name);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    setIsLoading(true);
    localStorage.removeItem("Token");
    setIsLoading(false);
    navigate("/login");
  };

  const handleModal = () => {
    setShowImageModal(!showImageModal);
  };
  const getImagePath = async () => {
    // "http://localhost:5000/user/getImagepath"
    try {
      const response = await fetch(
        process.env.REACT_APP_HEADER_GET_IMAGE_PATH_URL,
        {
          method: "GET",
          headers: {
            token: token,
          },
        }
      );

      const res = await response.json();

      setImagePath(res.image_path);
    } catch (error) {
      console.log(error);
    }
  };

  const getS3Image = async () => {
    // `http://localhost:5000/user${imagePath}`
    try {
      if (imagePath) {
        const response = await fetch(
          `${process.env.REACT_APP_HEADER_GET_S3_IMAGE_URL}${imagePath}`,
          {
            method: "GET",
            headers: {
              token: token,
            },
          }
        );

        const res = await response.blob();

        let newImage = URL.createObjectURL(res);
        setImage(newImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getImagePath();
    getS3Image();
  }, [imagePath]);
  return (
    <div className=" py-6 flex items-center px-9  ">
      {showImageModal && (
        <HeaderImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          setImage={setImage}
        />
      )}
      <div className="flex justify-between items-center w-56  ">
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 56, height: 56 }}
          src={image ? `${image}` : ""}
        />

        <button
          onClick={handleModal}
          className="flex items-center border-2 rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]"
        >
          <BsClipboardPlus className="mr-2 -mt-1" />
          {image ? "Update Image" : "Add Image"}
        </button>
      </div>

      {/* Button to get image from DB */}
      <p className="font-semibold text-lg  mr-6 ml-auto text-[#51535D]">
        {name && name.toUpperCase()}
      </p>
      <button
        onClick={signOut}
        className="flex items-center border-2 rounded-full px-4 py-2 my-4 mr-8 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]"
      >
        <BiLogOutCircle className="mr-2 mt-1" />
        {!isLoading ? "Logout" : <CircularProgress color="inherit" size={20} />}
      </button>
    </div>
  );
};

export default Header;
