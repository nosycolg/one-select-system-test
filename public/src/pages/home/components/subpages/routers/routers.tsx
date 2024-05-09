import React, { useEffect, useState } from "react";
import { CustomerData, apiService } from "../../../../../services/api";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function Routers() {
    const [routers, setRouters] = useState<CustomerData[]>()

    useEffect(() => {
        getAllRouters()
    }, [])

    async function getAllRouters() {
        try {
            const data = await apiService.getAllRouters()

            setRouters(data);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex justify-center">
            <div className="mt-4 flex flex-wrap gap-4 p-4">
                {routers?.map(data => (
                    <div className="flex bg-gray-100 p-4 justify-between rounded-2xl w-full">
                        <div className="flex justify-center flex-col">
                            <div className="truncate ">{data.brand} {data.model}</div>
                            <div>IPv4: {data.IPv4}</div>
                            <div>IPv6: {data.IPv6}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                <MdEdit className="h-3 w-3" />
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                <FaTrash className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
