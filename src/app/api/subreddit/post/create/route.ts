/* eslint-disable no-unused-vars */
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostValidator } from '@/lib/validators/post'
import { z } from 'zod'


export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json()
        const { title, subredditId, content } = PostValidator.parse(body)
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const subscription = await db.subscription.findFirst({
            where: {
                subredditId,
                userId: session.user.id,
            },
        })

        if (!subscription) {
            return new Response('Subscribe to post', { status: 403 })
        }

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id,
                subredditId,
            },
        })

        return new Response('Post created', { status: 201 })



    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response(
            'Could not post to subreddit at this time. Please try later',
            { status: 500 }
        )
    }
}