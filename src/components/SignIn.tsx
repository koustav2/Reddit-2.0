import { FC } from 'react'
import Image from "next/image"

import Link from 'next/link'
import UserAuthForm from './UserAuthForm'
const SignIn: FC = () => {
    return (
        <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
            <div className='flex flex-col space-y-2 text-center'>
                <Image
                    src="/images/reddit-4.svg"
                    height={32}
                    width={32}
                    alt='reddit'
                    className='mx-auto'
                />
                <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
                <p className='text-sm max-w-xs mx-auto'>
                    By continuing, you are setting up a reddit account and agree to our
                    User Agreement and Privacy Policy.
                </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
                New to reddit?{' '}
                <Link
                    href='/sign-up'
                    className='hover:text-brand text-sm underline underline-offset-4'>
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

export default SignIn