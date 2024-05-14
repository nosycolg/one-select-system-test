import React from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { SIDEBAR_ITEMS } from './constants';
import MenuItem from './sidebar/menu-item';
import { AnimatePresence, motion } from 'framer-motion';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> { }

export default function Sidebar(props: SidebarProps) {
    return (
        <div className={props.className}>
            <div className='flex flex-col items-center w-[100vw]'>
                <ScrollArea className='flex flex-col w-full gap-3 mt-3'>
                    <AnimatePresence>
                        {SIDEBAR_ITEMS.map((item, index) => {
                            return (
                                <motion.div
                                    layout="position"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    key={index}
                                >
                                    {!item.separated ?
                                        <motion.div
                                            layout="position"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className='flex flex-col w-full'>
                                            <MenuItem key={index} item={item} />
                                        </motion.div>
                                        :
                                        <motion.div
                                            layout="position"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className='flex flex-col w-full gap-3'>
                                            <MenuItem key={index} item={item} />
                                        </motion.div>
                                    }
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </ScrollArea>
            </div>
        </div>
    );
}