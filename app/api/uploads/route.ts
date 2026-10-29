import { getUploads } from '@/lib/db'

export async function GET() {
  const uploads = await getUploads()
  return Response.json(uploads)
}
