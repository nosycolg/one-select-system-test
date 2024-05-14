import { FaHome } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { BsFillRouterFill } from 'react-icons/bs';
import React, { ReactElement } from 'react';
import { IoMdListBox } from 'react-icons/io';

export interface SubMenuProps {
    title: string;
    path: string;
    beta?: boolean;
    new?: boolean;
    soon?: boolean;
    description: string;
    icon: ReactElement<any, any>;
}

export interface SidebarItems {
    title: string;
    path: string;
    icon: React.ReactNode;
    separated?: boolean;
    submenu?: boolean;
    submenuItems?: SubMenuProps[];
    chevron?: React.ReactNode;
}

export const SIDEBAR_ITEMS: SidebarItems[] = [
    {
        title: 'GENERIC_CUSTOMERS',
        path: '/customers',
        icon: <FaPerson size={20} />,
    },
    {
        title: 'GENERIC_ROUTERS',
        path: '/routers',
        icon: <BsFillRouterFill size={20} />,
    },
    {
        title: 'GENERIC_LOGS',
        path: '/logs',
        icon: <IoMdListBox size={20} />,
    },
];
