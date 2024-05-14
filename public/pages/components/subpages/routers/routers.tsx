import React, { useEffect, useState } from 'react';
import { RouterData, apiService } from '../../../../services/api';
import { MdEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';
import RouterForm from '../../../../components/ui/routerForm';
import RouterDelete from '../../../../components/ui/routerDelete';
import { FaPerson } from 'react-icons/fa6';
import CustomerManagement from '../../../../components/ui/customerManagement';
import { useTranslation } from 'react-i18next';
import { useCreateRouter, useChangeRouterStatus, useDeleteRouter, useUpdateRouter, useRouters } from '../../../../hooks/useRouters';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Drawer } from '@material-tailwind/react';
import Sidebar from '../../sidebar';

export default function Routers() {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCustomersModal, setShowCustomersModal] = useState(false);
    const [typeForm, setTypeForm] = useState<'CREATE' | 'UPDATE'>('CREATE');
    const [router, setRouter] = useState<RouterData>();
    const { mutate: create_router } = useCreateRouter();
    const { mutate: update_router } = useUpdateRouter();
    const { mutate: change_router_status } = useChangeRouterStatus();
    const { mutate: delete_router } = useDeleteRouter();
    const { data: routers, refetch } = useRouters();
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    function createRouter(data: RouterData) {
        create_router(data, {
            onSuccess: () => {
                setShowForm(false);
                refetch();
            },
        });
    }

    function updateRouter(data: RouterData) {
        if (!router) return;
        update_router(
            { routerId: router.id, data },
            {
                onSuccess: () => {
                    setShowForm(false);
                    refetch();
                },
            }
        );
    }

    function changeRouterStatus(routerId: number) {
        change_router_status(routerId, {
            onSuccess: () => {
                refetch();
            },
        });
    }

    function deleteRouter() {
        if (!router) return;
        delete_router(router.id, {
            onSuccess: () => {
                setShowDeleteModal(false);
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
                        {t('GENERIC_CREATE_ROUTER')}
                    </button>
                </div>
                {routers?.length ? (
                    <ul role='list' className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        {routers?.map((data) => {
                            return (
                                <li key={data.id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow'>
                                    <div className='flex w-full items-center justify-between space-x-6 p-6'>
                                        <div className='flex-1 truncate'>
                                            <div className='flex items-center space-x-3'>
                                                <h3 className='truncate text-sm font-medium text-gray-900'>{data.IPv4}</h3>
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
                                                {data.brand} - {data.model}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='-mt-px flex divide-x divide-gray-200'>
                                            <div className='flex w-0 flex-1'>
                                                <a
                                                    onClick={() => {
                                                        setShowForm(true);
                                                        setTypeForm('UPDATE');
                                                        setRouter(data);
                                                    }}
                                                    className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer'
                                                >
                                                    <MdEdit />
                                                    {t('GENERIC_UPDATE')}
                                                </a>
                                            </div>
                                            <div className='-ml-px flex w-0 flex-1'>
                                                <a
                                                    onClick={() => {
                                                        setShowDeleteModal(true);
                                                        setRouter(data);
                                                    }}
                                                    className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3  border border-transparent py-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-800 cursor-pointer'
                                                >
                                                    <IoMdTrash />
                                                    {t('GENERIC_DELETE')}
                                                </a>
                                            </div>
                                        </div>
                                        <div className='flex rounded-b-xl'>
                                            <div className='flex w-0 flex-1'>
                                                <a
                                                    onClick={() => {
                                                        setShowCustomersModal(true);
                                                        setRouter(data);
                                                    }}
                                                    className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-white bg-core-secondary hover:bg-core-primary cursor-pointer'
                                                >
                                                    <FaPerson />
                                                    {t('GENERIC_CUSTOMERS')}
                                                </a>
                                            </div>
                                            <div className='flex w-0 flex-1'>
                                                <a
                                                    onClick={() => {
                                                        changeRouterStatus(data.id);
                                                    }}
                                                    className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer'
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
            <RouterForm showForm={showForm} type={typeForm} setShowForm={setShowForm} router={router} createRouter={createRouter} updateRouter={updateRouter} />
            <RouterDelete showModal={showDeleteModal} setShowModal={setShowDeleteModal} router={router} deleteRouter={deleteRouter} />
            <CustomerManagement router={router} setShow={setShowCustomersModal} show={showCustomersModal} />
        </>
    );
}
