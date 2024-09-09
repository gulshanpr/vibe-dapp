import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function POST(request: Request) {
    // try {
    //     const { veriferId, email, name, address } = await request.json();

    //     const user = await prisma.user.create({
    //         data: {
    //             veriferId: veriferId,
    //             email: email,
    //             name: name,
    //             address: address,
    //         }
    //     });
    //     console.log(user)
    //     return NextResponse.json({ message: "post created", data: user }, { status: 200 });
    // } catch (error) {
    //     console.error('Error creating record:', error);
    //     return NextResponse.json({ message: "internal server problem" }, { status: 500 });
    // }
}

export async function GET() {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    veriferId: "testingthe",
                },
            });
            return NextResponse.json(user, { status: 200 });
        } catch (error) {
            console.error('Database query failed:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
}
