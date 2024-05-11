import React, { useRef, useState } from "react";
import { CustomerData, apiService } from "../../services/api";
import { Option, Select } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils"
import moment from 'moment';

interface CustomerFormProps {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    type: "EDIT" | "CREATE",
    customer?: CustomerData
}

const CustomerForm: React.FC<CustomerFormProps> = ({ showForm, setShowForm, type, customer }) => {
    const { register, setValue, handleSubmit, getValues } = useForm<CustomerData>()
    const onSubmit: SubmitHandler<CustomerData> = (data) => createCustomer(data)
    const [selectedDate, setSelectedDate] = useState<Date>(getValues('dateOfBirth'));
    const [customerType, setCustomerType] = useState<string>()

    const modalRef = useRef<HTMLDivElement>(null);

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowForm(false)
        }
    };

    async function createCustomer(data: CustomerData) {
        try {
            await apiService.createCustomer(data);
            setShowForm(false)
        } catch (err) {
            console.error(err)
        }
    }

    async function editCustomer(data: CustomerData) {
        try {
            await apiService.createCustomer(data);
            setShowForm(false)
        } catch (err) {
            console.error(err)
        }
    }

    async function getCEP() {
        try {
            const { logradouro, bairro, localidade } = await apiService.getCEP(getValues('cep'));
            setValue('street', logradouro)
            setValue('district', bairro)
            setValue('city', localidade)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {showForm ?
                <div onClick={handleCloseModal} className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
                    <div ref={modalRef} className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2 p-6 pb-2">
                                <h4
                                    className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    Create Customer
                                </h4>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('name')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Name
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full">
                                    <Popover >
                                        <PopoverTrigger asChild className="border-blue-gray-200" >
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !selectedDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : 'Date of birth'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 z-[9999]" >
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(val) => {
                                                    if (!val) return
                                                    setSelectedDate(val);
                                                    setValue('dateOfBirth', val);
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <Select onChange={(val) => { if (!val) return; setValue('type', val); setCustomerType(val) }} label="Customer type" defaultValue="PERSON" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} >
                                        <Option value="PERSON">Person</Option>
                                        <Option value="COMPANY">Company</Option>
                                    </Select>
                                </div>
                                {customerType === 'PERSON' && (
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" " {...register('cpf')}
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                CPF
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {customerType === 'COMPANY' && (
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        <div className="relative h-10 w-full min-w-[200px]">
                                            <input
                                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" " {...register('cnpj')}
                                            />
                                            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                CNPJ
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input placeholder=" " {...register('cep')} onBlur={() => getCEP()}
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            CEP
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('street')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Street
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('streetNumber')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            Street number
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('district')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            District
                                        </label>
                                    </div>
                                </div>
                                <div className="relative h-11 w-full min-w-[200px]">
                                    <div className="relative h-10 w-full min-w-[200px]">
                                        <input
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-gray-500 focus:border-t-transparent border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                            placeholder=" " {...register('city')}
                                        />
                                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                            City
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

export default CustomerForm;
