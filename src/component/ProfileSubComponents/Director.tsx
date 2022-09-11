import { FC, useEffect, useState } from 'react';


import { BsClipboardPlus } from "react-icons/bs";
import { MdOutlineDeleteSweep } from 'react-icons/md';
import DirectorMapperModel from '../../models/director-model';

interface IDirectorProps {
}
const Director: FC<IDirectorProps> = (props) => {

    const [director, setDirector] = useState<any>([{
        director_id: '',
        first_name: '',
        last_name: '',
        title: '',
        managers: []
    }])

    const token: any = localStorage.getItem('Token');
    const getDirector = async () => {

        try {
            const response = await fetch("http://localhost:5000/user/director", {
                method: "GET",
                headers: { token }
            })
            const res = await response.json();
            // console.log(res)

            let mapDirectorData: DirectorMapperModel = {
                director_id: '',
                first_name: '',
                last_name: '',
                title: '',
                managers: [""]
            }

            let mapDirectorDataArray: Array<DirectorMapperModel> = []

            // res.map((managerRow: DirectorMapperModel) => {
            //     mapDirectorData.director_id = managerRow.director_id;
            //     mapDirectorData.first_name = managerRow.first_name;
            //     mapDirectorData.last_name = managerRow.last_name;
            //     mapDirectorData.title = managerRow.title;
            //     mapDirectorData.managers = managerRow.managers;

            //     mapDirectorDataArray.push(mapDirectorData)
            //     setDirector(mapDirectorDataArray)
            // })

            res.map((managerRow: DirectorMapperModel) => {
                mapDirectorDataArray.push(managerRow)
            })
            setDirector(mapDirectorDataArray)

            // console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/user/director/${id}`, {
                method: "DELETE",
                headers: { token }
            })
            const res = await response.json();
            console.log(res)
            alert(res.message)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getDirector()
    }, [])
    return (

        <div className="w-full xl:w-8/12 px-4 mx-auto ">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">

                {/* Button */}
                <div className="flex items-center justify-between px-4 ">
                    <h1 className="text-xl">Director Details:</h1>
                    <button className='flex items-center border-2 rounded-full px-4 py-2 my-4 text-[#51535D] hover:text-white hover:border-white hover:bg-[#51535D]'><BsClipboardPlus className='mr-2 -mt-1' /> Add </button>
                </div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Director ID
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    First Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Last Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Title
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Managers
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {director.map((row) => {
                                return (
                                    <tr key={Math.random()}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {row?.director_id ? row?.director_id : "..."}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {row?.first_name ? row?.first_name : "..."}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row?.last_name ? row?.last_name : "..."}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-up text-emerald-500 mr-4">{row?.title ? row?.title : "..."}</i>
                                        </td>
                                        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {row?.managers ? row?.managers.map((manager) => {
                                                return (
                                                    <i key={Math.random()} className="block fas fa-arrow-up text-emerald-500 mr-4">{manager ? manager : "..."}</i>
                                                )
                                            }) : "..."}

                                        </td> */}

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                                            <div>
                                                {row?.managers ? row.managers.map(managerId => {
                                                    return (<i key={Math.random()} className="fas fa-arrow-up text-emerald-500 mr-4 block">{managerId ? managerId : "..."}</i>)
                                                }) : "..."}
                                            </div>


                                            {row?.director_id &&
                                                <button onClick={(e) => handleDelete(row?.director_id)} className='flex text-3xl text-red-500'><MdOutlineDeleteSweep /></button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
};

export default Director;
