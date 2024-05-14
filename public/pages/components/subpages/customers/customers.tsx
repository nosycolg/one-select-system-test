import React, { useEffect, useState } from "react";
import { CustomerData, apiService } from "../../../../services/api";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import CustomerForm from "../../../../components/ui/customerForm";
import { useTranslation } from "react-i18next";
import CustomerDelete from "../../../../components/ui/customerDelete";

export default function Customers() {
    const { t } = useTranslation();
    const [customers, setCustomers] = useState<CustomerData[]>()
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [typeForm, setTypeForm] = useState<"CREATE" | "UPDATE">("CREATE")
    const [customer, setCustomer] = useState<CustomerData>()

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
        <>
            <div className="p-4">
                <div className="flex p-4 justify-end gap-4 flex-wrap">
                    <button
                        className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button" data-dialog-target="sign-in-dialog" onClick={() => { setShowForm(true); setTypeForm("CREATE") }}>
                        CREATE CUSTOMER
                    </button>
                </div>
                {customers?.length ? <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {customers?.map((data) => {
                        return (
                            <li key={data.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
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
                                            <button
                                                onClick={() => { setShowForm(true); setTypeForm("UPDATE"); setCustomer(data) }}
                                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer">
                                                <MdEdit />
                                                Edit
                                            </button>
                                        </div>
                                        <div className="-ml-px flex w-0 flex-1">
                                            <button onClick={() => { setShowModal(true); setCustomer(data) }} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-800">
                                                <IoMdTrash />
                                                Delete
                                            </button>
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
            <CustomerForm showForm={showForm} type={typeForm} setShowForm={setShowForm} customer={customer} />
            <CustomerDelete showModal={showModal} setShowModal={setShowModal} customer={customer} />
        </>
    )
}
