/* eslint-disable no-unused-vars */
'use client'
import { cn } from '@/lib/utils'
import { FC, HtmlHTMLAttributes, useState } from 'react'
import { Button } from './ui/Button'
import { signIn } from 'next-auth/react'
import Image from "next/image"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserAuthFormProps extends HtmlHTMLAttributes<HTMLDivElement> {

}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const notify = async () => {
        setIsLoading(true)

        try {
            // throw new Error()
            await signIn('google')
            toast.success('🦄 signin successfull!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error) {

            toast.error('🤔 There was an error logging in with Google!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    } finally {
        setIsLoading(false)
    }
}





return (
    <div className={cn('flex justify-center', className)} {...props}>
        <Button className='flex gap-2' onClick={notify} isLoading={isLoading}>
            <Image
                src="/images/Google.svg"
                height={30}
                width={30}
                alt='google image'
            />
            Google
        </Button>
        <ToastContainer/>
    </div>
)
}

export default UserAuthForm