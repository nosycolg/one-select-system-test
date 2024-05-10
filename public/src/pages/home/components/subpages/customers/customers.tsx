import React, { useEffect, useState } from "react";
import { CustomerData, apiService } from "../../../../../services/api";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

export default function Customers() {
    const [customers, setCustomers] = useState<CustomerData[]>()

    useEffect(() => {
        getAllCustomers()
    }, [])

    async function getAllCustomers() {
        try {
            const customers = await apiService.getAllCustomers()

            setCustomers(customers);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-4">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {customers?.map((data) => {
                    return (
                        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate text-sm font-medium text-gray-900">{data.name}</h3>
                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">{data.type} - {data.cpf}</p>
                                </div>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <a href="howpossible17@example.com" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                                            <MdEdit />
                                            Edit
                                        </a>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <a href="tel:+1-202-555-0170" className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-800">
                                            <IoMdTrash />
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
