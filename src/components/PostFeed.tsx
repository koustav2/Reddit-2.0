'use client'

/* eslint-disable no-unused-vars */
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Post from './Post'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subredditName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` + (!!subredditName ? `&subredditName=${subredditName}` : '')

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },
    {
      getNextPageParam: (_: any, pages: string | any[]) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )



  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post: ExtendedPost, index) => {
        const votesCount = post.votes.reduce((acc: number, vote: { type: string }) => {
          if (vote.type === 'UP') return acc + 1;
          if (vote.type === 'DOWN') return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          (vote: { userId: string | undefined }) => vote.userId === session?.user.id
        )

        if (index === posts.length - 1) {
          // Add a ref to the last post in the list
          return (
            <li key={post.id} ref={ref}>
              <Post
                post={post}
                commentAmt={post.comments.length}
                subredditName={post.subreddit.name}
                votesCount={votesCount}
                currentVote={currentVote}
              />
            </li>
          )
        } else {
          return (
            <Post
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              subredditName={post.subreddit.name}
              votesCount={votesCount}
              currentVote={currentVote}
            />
          )
        }
      })}

      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
    </ul>
  )
}

export default PostFeed