import React, { useRef, useState } from 'react';
import { CustomerData, RouterData } from '../../services/api';
import { useCustomersToAdd } from '../../hooks/useCustomers';
import { useCustomerAssociation } from '../../hooks/useRouters';
import { useTranslation } from 'react-i18next';

interface RouterDeleteProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    router?: RouterData;
}

const CustomerManagement: React.FC<RouterDeleteProps> = ({ router, show, setShow }) => {
    if (!router) return null;
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null);
    const { data: customers_to_add, refetch } = useCustomersToAdd();
    const { mutate: customer_association } = useCustomerAssociation();
    const [customersToAdd, setCustomersToAdd] = useState<CustomerData[]>(customers_to_add || []);
    const [customersToRemove, setCustomersToRemove] = useState<CustomerData[]>(router.customers || []);
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    const handleMoveToAdding = (customer: CustomerData) => {
        setCustomersToRemove(customersToRemove.filter((c) => c !== customer));
        setCustomersToAdd([...customersToAdd, customer]);
    };

    const handleRemoveCustomer = (customer: CustomerData) => {
        setCustomersToAdd(customersToAdd.filter((c) => c !== customer));
        setCustomersToRemove([...customersToRemove, customer]);
    };

    function addCustomers() {
        try {
            if (!router) return;

            const customersToAddIds = customersToAdd.map((customer) => customer.id);
            const customersToRemoveIds = customersToRemove.map((customer) => customer.id);

            const data = {
                customersToAdd: customersToRemoveIds,
                customersToRemove: customersToAddIds,
            };

            customer_association(
                { routerId: router.id, data },
                {
                    onSuccess: () => {
                        setShow(false);
                        refetch();
                    },
                }
            );
        } catch (err) {
            console.error(err);
        }
    }

    function closeModal() {
        setShow(false);
    }

    return (
        <>
            {show && (
                <div
                    onClick={handleCloseModal}
                    className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto'
                >
                    <div ref={modalRef} className='relative justify-center mx-auto flex w-full max-w-[24rem] h-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md'>
                        <div className='flex h-full'>
                            <div className='flex flex-col p-3 gap-1 text-center w-1/2 border-r-2'>
                                <div>
                                    <p>{t('GENERIC_CUSTOMERS_TO_REMOVE')}</p>
                                </div>
                                {customersToRemove?.map((data) => {
                                    return (
                                        <button
                                            onClick={() => handleMoveToAdding(data)}
                                            className='items-center justify-center gap-x-3 border rounded-lg py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer'
                                        >
                                            {data.name}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className='flex flex-col p-3 gap-1 w-1/2 text-center'>
                                <div>
                                    <p>{t('GENERIC_CUSTOMERS_TO_ADD')}</p>
                                </div>
                                {customersToAdd?.map((data) => {
                                    return (
                                        <button
                                            onClick={() => handleRemoveCustomer(data)}
                                            className='items-center justify-center gap-x-3 border rounded-lg py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer'
                                        >
                                            {data.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <button
                            className='block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            onClick={() => {
                                addCustomers();
                                closeModal();
                            }}
                        >
                            {t('GENERIC_CONFIRM')}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomerManagement;
