import { getAuthSession } from '@/lib/auth'
import { getToken } from 'next-auth/jwt'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })

    .middleware(async (req: any) => {
      const session = await getAuthSession()
      if (!session) {
        throw new Error('You must be logged in to upload files')
      }
      return {
        userId: session.user.id,
      }
    })
    
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }
    
    ),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter