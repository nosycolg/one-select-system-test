import React, { useEffect, useState } from "react";
import { CustomerData, apiService } from "../../../../../services/api";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import CustomerForm from "../../../../../components/ui/customerForm";
import { FaSearch } from "react-icons/fa";

export default function Customers() {
    const [customers, setCustomers] = useState<CustomerData[]>()
    const [showForm, setShowForm] = useState(false);

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
            <div className="flex p-4 justify-end gap-4 flex-wrap">
                <button
                    className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button" data-dialog-target="sign-in-dialog" onClick={() => setShowForm(true)}>
                    CREATE CUSTOMER
                </button>
                <CustomerForm showForm={showForm} type="CREATE" setShowForm={setShowForm} />
                <div className="relative flex w-full max-w-[24rem]">
                    <div className="relative h-10 w-full min-w-[200px]">
                        <input type="email"
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " value="" />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Search
                        </label>
                    </div>
                    <button disabled
                        className="!absolute right-1 top-1 select-none rounded bg-blue-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <FaSearch className="w-4 h-4" />
                    </button>
                </div>
            </div>
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
                                        <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100" data-dialog-target="sign-in-dialog">
                                            <MdEdit />
                                            Edit
                                        </button>

                                        {/* <CustomerForm /> */}
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-800">
                                            <IoMdTrash />
                                            Delete
                                        </button>
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
