import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/sidebar';

export default function Home() {
    return (
        <div className='bg-forum-bg flex flex-row h-full w-full justify-between'>
            <Sidebar className='fixed w-[300px] min-h-screen bg-white border-r-[1px] border-r-slate-200 top-0 flex px-5 gap-5 z-50' />
            <div className='w-[300px]' />
            <main className='bg-white overflow-y-auto w-[calc(100%-300px)] min-h-screen'>
                <Outlet />
            </main>
        </div>
    );
}