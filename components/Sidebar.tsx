'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({ user }: SiderbarProps) => {
    const pathName = usePathname();
    return (
        <div className='sidebar'>
            <nav className="flex flex-col gap-4">
                <Link href="" className='mb-12 cursor-pointer flex items-center gap-2'>
                    <Image alt='logo' src="/icons/logo.svg" width={34} height={34} className='size-[24px] max-xl:size-14' />
                    <h1 className='sidebar-logo'>Next X Bank</h1>
                </Link>
                {
                    sidebarLinks.map(link => {
                        // console.log(pathName);
                        const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)
                        return (
                            <Link className={cn('sidebar-link', { 'bg-bank-gradient': isActive })} href={link.route} key={link.label}>
                                <div className='relative size-6 flex items-center gap-4'>
                                    <Image src={link.imgURL} alt={link.label} fill
                                        className={cn({ 'brightness-[3] invert-0': isActive })} />
                                </div>
                                <p className={cn("sidebar-label", { "!text-white": isActive })}>
                                    {link.label}
                                </p>
                            </Link>
                        )
                    })
                }
                User
            </nav>
            Footer
        </div>
    )
}

export default Sidebar