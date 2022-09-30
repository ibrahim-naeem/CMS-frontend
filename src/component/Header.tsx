import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import {
  isTokenPresent,
  verifyExpiredToken,
} from "../utils/utitlityMethods/utilityMethods";
import { Avatar } from "@mui/material";
import HeaderImageModal from "./ProfileSubComponents/Modals/HeaderImageModal";
import { BsClipboardPlus } from "react-icons/bs";

interface IHeaderProps {}
const Header: FC<IHeaderProps> = ({}): JSX.Element => {
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState<any>("");
  const [image, setImage] = useState<any>();
  const [name, setName] = useState<string>("");
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  const token: any = localStorage.getItem("Token");

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/", {
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

  const handleClick = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  const handleModal = () => {
    setShowImageModal(!showImageModal);
  };
  const getImagePath = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/getImagepath`, {
        method: "GET",
        headers: {
          token: token,
        },
      });

      const res = await response.json();

      setImagePath(res.image_path);
    } catch (error) {
      console.log(error);
    }
  };

  const getS3Image = async () => {
    try {
      if (imagePath) {
        const response = await fetch(`http://localhost:5000/user${imagePath}`, {
          method: "GET",
          headers: {
            token: token,
          },
        });

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
        onClick={handleClick}
        className="flex items-center border-2 rounded-full px-4 py-2 my-4 mr-8 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]"
      >
        <BiLogOutCircle className="mr-2 mt-1" /> Logut
      </button>
    </div>
  );
};

export default Header;
