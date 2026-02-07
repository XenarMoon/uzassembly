import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return Response.json({ 
      count: users.length,
      users: users.map(u => ({ id: u.id, email: u.email, role: u.role }))
    })
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
