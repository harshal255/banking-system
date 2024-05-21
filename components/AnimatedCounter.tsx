'use client';
import CountUp from 'react-countup';

import React from 'react'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CountUp decimals={2} prefix='$' end={amount}></CountUp>
        </div>
    )
}

export default AnimatedCounter