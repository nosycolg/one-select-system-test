import React, { useState } from 'react';
import { CustomerData } from '../../../../services/api';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import CustomerForm from '../../../../components/ui/customerForm';
import { useTranslation } from 'react-i18next';
import CustomerDelete from '../../../../components/ui/customerDelete';
import { useChangeCustomerStatus, useCreateCustomer, useCustomers, useDeleteCustomer, useUpdateCustomer } from '../../../../hooks/useCustomers';
import { TFunction } from 'i18next';
import { GiHamburgerMenu } from 'react-icons/gi';
import Sidebar from '../../sidebar';
import { Drawer } from '@material-tailwind/react';

export default function Customers() {
    const { t }: { t: TFunction } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [typeForm, setTypeForm] = useState<'CREATE' | 'UPDATE'>('CREATE');
    const [customer, setCustomer] = useState<CustomerData>();
    const { data: customers, refetch } = useCustomers();
    const { mutate: create_customer } = useCreateCustomer();
    const { mutate: update_customer } = useUpdateCustomer();
    const { mutate: change_customer_status } = useChangeCustomerStatus();
    const { mutate: delete_customer } = useDeleteCustomer();
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    function createCustomer(data: CustomerData) {
        create_customer(data, {
            onSuccess: () => {
                setShowForm(false);
                refetch();
            },
        });
    }

    function updateCustomer(data: CustomerData) {
        if (!customer) return;
        update_customer(
            { customerId: customer.id, data },
            {
                onSuccess: () => {
                    setShowForm(false);
                    refetch();
                },
            }
        );
    }

    function changeCustomerStatus(customerId: number) {
        change_customer_status(customerId, {
            onSuccess: () => {
                refetch();
            },
        });
    }

    function deleteCustomer() {
        if (!customer) return;
        delete_customer(customer.id, {
            onSuccess: () => {
                setShowModal(false);
                refetch();
            },
        });
    }

    return (
        <>
            <div className='p-4'>
                <div className='flex p-4 sm:justify-between justify-center lg:justify-end gap-4 flex-wrap'>
                    <button
                        className='select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none visible lg:hidden'
                        type='button'
                        data-dialog-target='sign-in-dialog'
                        onClick={openDrawer}
                    >
                        <GiHamburgerMenu />
                    </button>
                    <button
                        className='select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                        type='button'
                        data-dialog-target='sign-in-dialog'
                        onClick={() => {
                            setShowForm(true);
                            setTypeForm('CREATE');
                        }}
                    >
                        {t('GENERIC_CREATE_CUSTOMER')}
                    </button>
                </div>
                {customers?.length ? (
                    <ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {customers?.map((data) => {
                            return (
                                <li key={data.id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'>
                                    <div className='flex w-full items-center justify-between space-x-6 p-6'>
                                        <div className='flex-1 truncate'>
                                            <div className='flex items-center space-x-3'>
                                                <h3 className='truncate text-sm font-medium text-gray-900'>{data.name}</h3>
                                                {data.activated ? (
                                                    <span className='inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium text-white bg-green-500 ring-1 ring-inset ring-green-600/20'>
                                                        {t('GENERIC_ACTIVATED')}
                                                    </span>
                                                ) : (
                                                    <span className='inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium text-white bg-red-500 ring-1 ring-inset ring-green-600/20'>
                                                        {t('GENERIC_DISABLED')}
                                                    </span>
                                                )}
                                            </div>
                                            <p className='mt-1 truncate text-sm text-gray-500'>
                                                {t('GENERIC_' + data.type)} - {data.cpf}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='-mt-px flex divide-x divide-gray-200'>
                                            <div className='flex w-0 flex-1'>
                                                <button
                                                    onClick={() => {
                                                        setShowForm(true);
                                                        setTypeForm('UPDATE');
                                                        setCustomer(data);
                                                    }}
                                                    className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 border-l py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer'
                                                >
                                                    <MdEdit />
                                                    {t('GENERIC_UPDATE')}
                                                </button>
                                            </div>
                                            <div className='-ml-px flex w-0 flex-1'>
                                                <button
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setCustomer(data);
                                                    }}
                                                    className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 border border-transparent py-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-800'
                                                >
                                                    <IoMdTrash />
                                                    {t('GENERIC_DELETE')}
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex rounded-b-xl'>
                                            <div className='flex w-0 flex-1'>
                                                <a
                                                    onClick={() => {
                                                        changeCustomerStatus(data.id);
                                                    }}
                                                    className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-b-lg border py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer'
                                                >
                                                    {data.activated ? t('GENERIC_DISABLE') : t('GENERIC_ACTIVATE')}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className='flex justify-center'>
                        <p>{t('GENERIC_EMPTY_LIST')}</p>
                    </div>
                )}
            </div>
            <Drawer open={open} onClose={closeDrawer} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Sidebar className='min-h-screen bg-white border-r-[1px] border-r-slate-200 top-0 fixed px-5 gap-5 z-50 overflow-y-auto' />
            </Drawer>
            <CustomerForm showForm={showForm} type={typeForm} setShowForm={setShowForm} customer={customer} createCustomer={createCustomer} updateCustomer={updateCustomer} />
            <CustomerDelete showModal={showModal} setShowModal={setShowModal} customer={customer} deleteCustomer={deleteCustomer} />
        </>
    );
}
