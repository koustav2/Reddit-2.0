import { FC } from 'react'

// import { Icons } from '@/components/Icons'
import Image from "next/image"
// import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'
const SignUp: FC = () => {
    return (
        <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
            <div className='flex flex-col space-y-2 text-center'>
                <Image
                    src="/images/reddit-4.svg"
                    height={32}
                    width={32}
                    className='mx-auto'
                    alt='reddit'
                />
                <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
                <p className='text-sm max-w-xs mx-auto'>
                    By continuing, you are setting up a reddit account and agree to our
                    User Agreement and Privacy Policy.
                </p>
            </div>
            <UserAuthForm />
            <p className='px-8 text-center text-sm text-muted-foreground'>
                Already a redditor?{' '}
                <Link
                    href='/sign-in'
                    className='hover:text-brand text-sm underline underline-offset-4'>
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default SignUp