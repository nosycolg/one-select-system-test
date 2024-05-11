import React, { useRef } from "react";
import { CustomerData, apiService } from "../../services/api";

interface ModalConfirmationProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    customer?: CustomerData;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ showModal, setShowModal, customer }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowModal(false)
        }
    };

    function deleteCustomer() {
        if (!customer) return
        try {
            apiService.deleteCustomer(customer.id)
            setShowModal(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {showModal ?
                <div onClick={handleCloseModal} className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
                    <div ref={modalRef} className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" >
                        <div className="p-3 pb-0 text-center ">
                            <p>Do you really want to delete this customer?</p>
                            <p>{customer ? customer.name : ''}</p>
                        </div>
                        <div className="flex p-3 gap-3">
                            <button
                                className="block w-full select-none rounded-lg bg-white py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="submit" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button
                                className="block w-full select-none rounded-lg bg-gradient-to-tr from-red-900 to-red-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="submit" onClick={() => deleteCustomer()}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div> : null}
        </>
    );
};

export default ModalConfirmation;
