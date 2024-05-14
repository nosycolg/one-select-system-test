import React, { useRef } from 'react';
import { RouterData, apiService } from '../../services/api';
import { useTranslation } from 'react-i18next';

interface RouterDeleteProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteRouter: () => void;
    router?: RouterData;
}

const RouterDelete: React.FC<RouterDeleteProps> = ({ showModal, setShowModal, router, deleteRouter }) => {
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null);
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowModal(false);
        }
    };

    return (
        <>
            {showModal ? (
                <div
                    onClick={handleCloseModal}
                    className='fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto'
                >
                    <div ref={modalRef} className='relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md'>
                        <div className='p-3 pb-0 text-center '>
                            <p>{t('GENERIC_DELETE_ROUTER_MESSAGE')}</p>
                        </div>
                        <div className='flex p-3 gap-3'>
                            <button
                                className='block w-full select-none rounded-lg bg-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                                type='submit'
                                onClick={() => setShowModal(false)}
                            >
                                {t('GENERIC_CANCEL')}
                            </button>
                            <button
                                className='block w-full select-none rounded-lg bg-gradient-to-tr from-red-900 to-red-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                                type='submit'
                                onClick={() => deleteRouter()}
                            >
                                {t('GENERIC_DELETE')}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default RouterDelete;
