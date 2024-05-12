import React, { useEffect, useRef } from "react";
import { RouterData, apiService } from "../../services/api";
import { useForm, SubmitHandler } from "react-hook-form"

interface RouterFormProps {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    type: "UPDATE" | "CREATE",
    router?: RouterData
}

const RouterForm: React.FC<RouterFormProps> = ({ showForm, setShowForm, type, router }) => {
    const { register, setValue, handleSubmit, getValues, reset } = useForm<RouterData>()
    const onSubmit: SubmitHandler<RouterData> = (data) => {
        if (type == "CREATE") {
            return createRouter(data)
        }
        updateRouter(data)
    }
    const modalRef = useRef<HTMLDivElement>(null);
    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal()
        }
    };

    useEffect(() => {
        if (router) {
            setValue("IPv4", router.IPv4);
            setValue("IPv6", router.IPv6);
            setValue("brand", router.brand);
            setValue("model", router.model);
        }
    }, [router]);

    async function createRouter(data: RouterData) {
        try {
            await apiService.createRouter(data);
            closeModal()
        } catch (err) {
            console.error(err)
        }
    }

    async function updateRouter(data: RouterData) {
        if (!router) return

        try {
            await apiService.updateRouter(router.id, data);
            closeModal()
        } catch (err) {
            console.error(err)
        }
    }

    function closeModal() {
        reset();
        setShowForm(false);
    }

    return (
        <>
            {showForm ?
                <div onClick={handleCloseModal} className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
                    <div ref={modalRef} className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2 p-6 pb-2">
                                <h4
                                    className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {type == 'CREATE' ? 'Create Router' : 'Update Router'}
                                </h4>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('IPv4')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            IPv4
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('IPv6')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            IPv6
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('brand')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Brand
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('model')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Model
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <button
                                    className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="submit">
                                    {type}
                                </button>
                            </div>
                        </ form>
                    </div >
                </div>
                : null}
        </>
    );
};

export default RouterForm;
