import React, { useEffect, useRef, useState } from "react";
import { CustomerData, CustomerManagementData, RouterData, apiService } from "../../services/api";
import { Button } from "./button";

interface RouterDeleteProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    router?: RouterData;
}

const CustomerManagement: React.FC<RouterDeleteProps> = ({ router, show, setShow }) => {
    if (!router) return null;
    const [customersToAdd, setCustomersToAdd] = useState<CustomerData[]>([]);
    const [customersToRemove, setCustomersToRemove] = useState<CustomerData[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal()
        }
    };

    const handleMoveToAdding = (customer: CustomerData) => {
        setCustomersToRemove(customersToRemove.filter(c => c !== customer));
        setCustomersToAdd([...customersToAdd, customer]);
    };

    const handleRemoveCustomer = (customer: CustomerData) => {
        setCustomersToAdd(customersToAdd.filter(c => c !== customer));
        setCustomersToRemove([...customersToRemove, customer]);
    };

    useEffect(() => {
        getAllCustomers()
    }, [router])

    async function getAllCustomers() {
        try {
            if (!router?.customers) return
            const data = await apiService.getCustomersToAdd()
            setCustomersToAdd(data);
            setCustomersToRemove(router.customers)
        } catch (err) {
            console.error(err)
        }
    }

    function addCustomers() {
        try {
            if (!router) return

            const customersToAddIds = customersToAdd.map(customer => customer.id);
            const customersToRemoveIds = customersToRemove.map(customer => customer.id);

            const data = {
                customersToAdd: customersToRemoveIds,
                customersToRemove: customersToAddIds
            };

            apiService.customerAssociation(router.id, data)
        } catch (err) {
            console.error(err)
        }
    }

    function closeModal() {
        setCustomersToAdd([]);
        setCustomersToRemove([]);
        setShow(false);
    }

    return (
        <>
            {show && (
                <div onClick={handleCloseModal} className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
                    <div ref={modalRef} className="relative justify-center mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                        <div className="flex">
                            <div className="flex flex-col p-3 gap-1 text-center w-1/2 border-r-2">
                                <div>
                                    <p>To remove</p>
                                </div>
                                {customersToRemove?.map((data) => {
                                    return (
                                        <Button onClick={() => handleMoveToAdding(data)}>
                                            {data.name}
                                        </Button>
                                    )
                                })}
                            </div>
                            <div className="flex flex-col p-3 gap-1 w-1/2 text-center">
                                <div>
                                    <p>To add</p>
                                </div>
                                {customersToAdd?.map((data) => {
                                    return (
                                        <Button onClick={() => handleRemoveCustomer(data)}>
                                            {data.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                        <button
                            className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={() => { addCustomers(); closeModal() }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>)}
        </>
    );
};

export default CustomerManagement;
