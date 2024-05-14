import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItems } from '../constants';
import React from 'react';
import { Label } from '../../../components/ui/label';
import { useTranslation } from 'react-i18next';

export interface MenuItemAttributes {
    item: SidebarItems;
}

export default function MenuItem({ item }: MenuItemAttributes) {
    const { t } = useTranslation();
    const [submenuOpen, setSubmenuOpen] = useState(false);

    return (
        <>
            <NavLink
                to={item.path}
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className={({ isActive }) =>
                    isActive ? 'flex flex-row items-center justify-between p-3 rounded-lg w-[100%] bg-core-light text-core-primary' : 'flex flex-row items-center justify-between p-3 w-[100%]'
                }
            >
                <div className='flex flex-row gap-2 items-center'>
                    {item.icon}
                    <Label className='text-[16px] font-normal cursor-pointer'>{t(item.title)}</Label>
                </div>
                {item.submenu && item.chevron && <div className={`h-full w-[15%] items-center justify-center flex ${submenuOpen ? 'rotate-180' : ''}`}>{item.chevron}</div>}
            </NavLink>
        </>
    );
}
