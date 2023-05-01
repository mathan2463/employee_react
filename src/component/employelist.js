import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import apiurl from './apiurl';
// import {DownloadTableExcel} from 'react-export-table-to-excel';
// import { useReactToPrint } from 'react-to-print';
// import { CSVLink } from 'react-csv';

const Employelist = () => {

    // usestate is used to get responce data  
    const [empdata, setempdata] = useState([])


    // function to get data
    const Getdata = async () => {
        const response = await fetch("http://localhost:3000/employee/getall", {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });
        const data = await response.json();
        // console.log(data)
        setempdata(data.responseData);
    }

    // useeffect is used to get data from json server by axios
    useEffect(() => {
        Getdata()
    }, [])



    //to delete a item
    const Deletefunction = async (id) => {

        await apiurl.delete(`/employee/delete/${id}`)

        Getdata()
    }


    console.log(empdata);
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div>
            <div className='bg-blue-600 h-[100px] relative '>
                <h1 className='text-5xl bg-blue-600 text-center pt-3'>EMPLOYEE MANAGEMENT</h1>
                <Link to={"/crateemploye"}>
                    <button className='text-right w-[180px] bg-white hover:bg-green-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow absolute top-[20px] left-[5px]'><i className='absolute top-[26px] left-[5px]'><AddCircleIcon /></i> CREATE EMPLOYEE</button>
                </Link>
                {/* <Link to={'/'}> */}
                    <button onClick={handleLogout} className='float-right w-[100px] text-right bg-white hover:bg-red-500 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow absolute top-[20px] right-[5px]'><i className='absolute top-[27px] right-[80px]'><LogoutIcon /></i> LOGOUT</button>
                {/* </Link> */}

            </div>
            <div>
                {/* this method is used for download excel bt react-export-table-to-excel */}
                {/* <DownloadTableExcel
                filename="employee list"
                sheet="list"
                currentTableRef={tableref.current}
                >
                <button  className='ml-2 mt-1 bg-white hover:bg-green-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>excel file</button>
                </DownloadTableExcel> */}
                {/* <button onClick={topdf}  className='ml-2 mt-1 bg-white hover:bg-green-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>print or save as pdf</button>
                <button className='ml-2 mt-1 bg-white hover:bg-green-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'><CSVLink data={empdata} title='employee list'>CSV</CSVLink></button> */}
            </div>
            <div className='border-8  m-2  '>
                <h2 className='text-4xl text-center pb-4'>EMPLOYEE LIST</h2>
                <table className='mx-auto mb-2 center w-[700px]'>
                    <thead className='border-2 text-2xl bg-black'>
                        <tr className='border-2'>
                            <td className='border-2 px-2 py-2 bck-Gray'>
                                ID
                            </td>
                            <td className='border-2  px-2 py-2 bck-Gray'>
                                NAME
                            </td>
                            <td className='border-2 px-2 py-2 bck-Gray'>
                                TYPE
                            </td>
                            <td className='border-2 px-2 py-2 bck-Gray'>
                                MAILID
                            </td>
                            <td className='border-2 px-2 py-2 bck-Gray'>
                                PHONE NO
                            </td>
                            <td className='border-2 px-2 py-2 bck-Gray'>
                                ADDRESS
                            </td>
                            <td className='border-2 px-2 py-2 bck-Gray'>
                                ACTION
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empdata !== "" ? (
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td className='border-2 px-2 py-2'>{item.id}</td>
                                        <td className='border-2 px-2 py-2'>{item.name}</td>
                                        <td className='border-2 px-2 py-2'>{item.typeName}</td>
                                        <td className='border-2 px-2 py-2'>{item.email}</td>
                                        <td className='border-2 px-2 py-2'>{item.phone}</td>
                                        <td className='border-2 px-2 py-2'>{item.address}</td>
                                        <td className='border-2 px-2 py-2 space-x-2.5 > *'>
                                            <Link to={`/editemploye/${item.id}`}>
                                                <button className=' hover:bg-red-500 rounded'><i><EditIcon /></i></button>
                                            </Link>
                                            <button onClick={() => Deletefunction(item.id)} className='hover:bg-red-500 rounded'><i><PersonRemoveIcon /></i></button>
                                        </td>
                                    </tr>

                                ))
                            ) : (<tr><td className=''>nodata</td></tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Employelist;