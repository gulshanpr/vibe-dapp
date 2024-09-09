import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const { veriferId } = await request.json();

        const user = await prisma.user.findUnique({
            where: {
                veriferId: veriferId,
            },
        });
        console.log(user);

        return NextResponse.json({ message: "", data: user }, { status: 200 });
    } catch (error) {
        console.error('Error creating record:', error);
        return NextResponse.json({ message: "internal server problem" }, { status: 500 });
    }
}
