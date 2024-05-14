import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex min-h-screen items-center justify-center bg-white'>
            <ColorRing
                visible={true}
                height='80'
                width='80'
                ariaLabel='color-ring-loading'
                wrapperStyle={{}}
                wrapperClass='color-ring-wrapper'
                colors={['rgb(53 51 122)', 'rgb(53 51 122)', 'rgb(53 51 122)', 'rgb(53 51 122)', 'rgb(53 51 122)']}
            />
        </div>
    );
};

export default Loader;
