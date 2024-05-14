import React, { useEffect, useState } from "react";
import { RouterData, apiService } from "../../../../services/api";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import RouterForm from "../../../../components/ui/routerForm";
import RouterDelete from "../../../../components/ui/routerDelete";
import { FaPerson } from "react-icons/fa6";
import CustomerManagement from "../../../../components/ui/customerManagement";
import { useTranslation } from "react-i18next";

export default function Routers() {
    const { t } = useTranslation();
    const [routers, setRouters] = useState<RouterData[]>()
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [typeForm, setTypeForm] = useState<"CREATE" | "UPDATE">("CREATE")
    const [router, setRouter] = useState<RouterData>()

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
        <>
            <div className="p-4">
                <div className="flex p-4 justify-end gap-4 flex-wrap">
                    <button
                        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button" data-dialog-target="sign-in-dialog" onClick={() => { setShowForm(true); setTypeForm("CREATE") }}>
                        CREATE ROUTER
                    </button>
                </div>
                {routers?.length ? <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {routers?.map((data) => {
                        return (
                            <li key={data.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                                <div className="flex w-full items-center justify-between space-x-6 p-6">
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-sm font-medium text-gray-900">{data.IPv4}</h3>
                                        </div>
                                        <p className="mt-1 truncate text-sm text-gray-500">{data.brand} - {data.model}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="flex w-0 flex-1">
                                            <a onClick={() => { setShowForm(true); setTypeForm("UPDATE"); setRouter(data) }} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer">
                                                <MdEdit />
                                                Edit
                                            </a>
                                        </div>
                                        <div className="-ml-px flex w-0 flex-1">
                                            <a onClick={() => { setShowModal(true); setRouter(data) }} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3  border border-transparent py-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-800">
                                                <IoMdTrash />
                                                Delete
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex rounded-b-xl">
                                        <div className="flex w-0 flex-1">
                                            <a onClick={() => { setShowModal(true); setRouter(data) }} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border border-transparent py-4 text-sm font-semibold text-white bg-core-secondary hover:bg-core-primary cursor-pointer">
                                                <FaPerson />
                                                Customers
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul> :
                    <div className="flex justify-center">
                        <p>
                            {t('GENERIC_EMPTY_LIST')}
                        </p>
                    </div>}
            </div>
            <RouterForm showForm={showForm} type={typeForm} setShowForm={setShowForm} router={router} />
            <RouterDelete showModal={showModal} setShowModal={setShowModal} router={router} />
            <CustomerManagement router={router} setShow={setShowModal} show={showModal} />
        </>
    )
}
