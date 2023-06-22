'use client'

/* eslint-disable no-unused-vars */
import { User } from 'next-auth'
import { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/Dropdown'
import UserAvatar from './UserAvatar'
import { signOut } from 'next-auth/react'
import Link from 'next/link'



interface UserAccountProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
}

const UserAccount: FC<UserAccountProps> = ({ user }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }} className={''}          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white' align='end'>
          <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-1 leading-none'>
              {user.name && <p className='font-medium'>{user.name}</p>}
              {user.email && (
                <p className='w-[200px] truncate text-sm text-muted-foreground'>
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/'>Feed</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href='/r/create'>Create Community</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href='/settings'>Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={(event) => {
              event.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/sign-in`,
              })
            }}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserAccount;