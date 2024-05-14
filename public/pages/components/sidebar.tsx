import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { SIDEBAR_ITEMS } from './constants';
import MenuItem from './sidebar/menu-item';
import { AnimatePresence, motion } from 'framer-motion';
import { Option, Select } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import i18n from '../../lib/i18n';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

export default function Sidebar(props: SidebarProps) {
    {
        const [value, setValue] = useState(i18n.language);
        const { t } = useTranslation();

        useEffect(() => {
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage) {
                i18n.changeLanguage(savedLanguage);
                setValue(savedLanguage);
            }
        }, []);

        function handleChangeLanguage(val: string) {
            setValue(val);
            i18n.changeLanguage(val);
            localStorage.setItem('language', val);
        }

        return (
            <div className={props.className}>
                <div className='flex flex-col items-center w-full justify-between'>
                    <ScrollArea className='flex flex-col w-full gap-3 mt-3'>
                        <AnimatePresence>
                            {SIDEBAR_ITEMS.map((item, index) => {
                                return (
                                    <motion.div layout='position' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key={index}>
                                        {!item.separated ? (
                                            <motion.div
                                                layout='position'
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className='flex flex-col w-full'
                                            >
                                                <MenuItem key={index} item={item} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                layout='position'
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className='flex flex-col w-full gap-3'
                                            >
                                                <MenuItem key={index} item={item} />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </ScrollArea>
                    <div className='p-4'>
                        <Select
                            defaultValue='pt'
                            defaultChecked={true}
                            value={value}
                            onChange={(val) => {
                                if (!val) return;
                                handleChangeLanguage(val);
                            }}
                            label={t('GENERIC_LANGUAGE')}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            placeholder={undefined}
                        >
                            <Option value='pt'>{t('GENERIC_PORTUGUESE')}</Option>
                            <Option value='en'>{t('GENERIC_ENGLISH')}</Option>
                        </Select>
                    </div>
                </div>
            </div>
        );
    }
}
