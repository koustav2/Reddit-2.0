

// import React from 'react'

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/Button"
import { authOptions } from "@/lib/auth"
import UserAccount from "./UserAccount"
import { getServerSession } from "next-auth"
import SearchBar from "./SearchBar"

// type Props = {}

const Navbar = async () => {
    const session = await getServerSession(authOptions)
    return (
        <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2'>
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                <Link href='/' className="flex gap-1 items-center">
                    <Image
                        src="/images/reddit-4.svg"
                        height={32}
                        width={32}
                        alt='reddit'
                    />
                    <p className='hidden text-zinc-700 text-sm font-medium md:block'>reddit</p>
                </Link>

                <SearchBar/>

                {session?.user ? (
                    <UserAccount user={{
                        ...session.user,
                        name: session.user?.name || null
                    }} />
                ) : (
                    <Link href='/sign-in' className={buttonVariants()}>
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    )
}
export default Navbar