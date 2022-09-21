import { AnySoaRecord } from "dns";
import { FC, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsClipboardPlus } from "react-icons/bs";

interface IHeaderImageModalProps {
  showImageModal: any;
  setShowImageModal: any;

  setImage: any;
}

const HeaderImageModal: FC<IHeaderImageModalProps> = ({
  showImageModal,
  setShowImageModal,

  // image,
  setImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>();
  const token: any = localStorage.getItem("Token");
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    localStorage.removeItem("ProfileImagePath");
    setImage("");
    setShowImageModal(!showImageModal);
    const data = new FormData();
    data.append("file", selectedImage);

    const response = await fetch("http://localhost:5000/user/uploadImage", {
      method: "POST",
      headers: { token: token },
      body: data,
    });
    const res = await response.json();
    localStorage.setItem("ProfileImagePath", res.imagePath);

    console.log(localStorage.getItem("ProfileImagePath"));
    console.log("Header Modal", res);
  };

  return (
    <div
      className={` overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:inset-0  justify-center items-center flex`}
    >
      <div className="absolute p-2  w-full   max-w-lg h-full md:h-[90vh] z-1000">
        <div className="relative rounded-lg shadow bg-slate-200">
          <button
            onClick={() => setShowImageModal(!showImageModal)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <AiOutlineCloseCircle className="text-2xl" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8  border flex flex-col justify-center items-center">
            <h3 className="mb-3 text-xl text-center font-semibold text-[#51535D] ">
              Add File :
            </h3>

            <form
              className=""
              id="uploadForm"
              encType="multipart/form-data"
              onSubmit={handleImageUpload}
            >
              <input
                className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="profileImage"
                onChange={handleImageChange}
              />
              <button
                type="submit"
                className="flex items-center  justify-center  mx-auto  text-center border-2 border-white rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-[#51535D] hover:border-[#51535D] hover:bg-white"
              >
                <BsClipboardPlus className="mr-2" />
                Upload Image
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderImageModal;
