/* eslint-disable no-unused-vars */
'use client'

import { FC } from 'react'
import { useCustomToasts } from '@/hooks/custom-toast'
import { PostVoteRequest } from '@/lib/validators/vote'
import { usePrevious } from '@mantine/hooks'
import { VoteType } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

import { toast, Toaster } from 'react-hot-toast';


interface PostVoteClientProps {
    postId: string
    initialVotesAmt: number
    initialVote?: VoteType | null
}

const PostVoteClient: FC<PostVoteClientProps> = ({ postId, initialVotesAmt, initialVote }) => {

    const { loginToast } = useCustomToasts()
    const [votesCount, setVotesCount] = useState<number>(initialVotesAmt)
    const [currentVote, setCurrentVote] = useState(initialVote)
    const prevVote = usePrevious(currentVote)

    useEffect(() => {
        setCurrentVote(initialVote)
    }, [initialVote])

    const { data: session } = useSession()

    const { mutateAsync: vote } = useMutation({
        mutationFn: async (type: VoteType) => {
            const payload: PostVoteRequest = {
                voteType: type,
                postId: postId,
            }

            await axios.patch('/api/subreddit/post/vote', payload)
        },
        onError: (err, voteType) => {
            if (voteType === 'UP') setVotesCount((prev) => prev - 1)
            else setVotesCount((prev) => prev + 1)

            // reset current vote
            setCurrentVote(prevVote)

            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast.error('Something went wrong,Your vote was not registered. Please try again.')
        },
        onMutate: (type: VoteType) => {
            if (currentVote === type) {
                // User is voting the same way again, so remove their vote
                setCurrentVote(undefined)
                if (type === 'UP') setVotesCount((prev) => prev - 1)
                else if (type === 'DOWN') setVotesCount((prev) => prev + 1)
            } else {
                // User is voting in the opposite direction, so subtract 2
                setCurrentVote(type)
                if (type === 'UP') setVotesCount((prev) => prev + (currentVote ? 2 : 1))
                else if (type === 'DOWN')
                    setVotesCount((prev) => prev - (currentVote ? 2 : 1))
            }
        },
    })



    return (
        <div className='flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
            <Button
                onClick={() => vote('UP')}
                size='sm'
                variant='ghost'
                aria-label='upvote'>
                <ArrowBigUp
                    className={cn('h-5 w-5 text-zinc-700', {
                        'text-emerald-500 fill-emerald-500': currentVote === 'UP',
                    })}
                />
            </Button>
            {/* score */}
            <p className='text-center py-2 font-medium text-sm text-zinc-900'>
                {votesCount}
            </p>
            <Button
                onClick={() => vote('DOWN')}
                size='sm'
                className={cn({
                    'text-emerald-500': currentVote === 'DOWN',
                })}
                variant='ghost'
                aria-label='upvote'>
                <ArrowBigDown
                    className={cn('h-5 w-5 text-zinc-700', {
                        'text-red-500 fill-red-500': currentVote === 'DOWN',
                    })}
                />
            </Button>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default PostVoteClient