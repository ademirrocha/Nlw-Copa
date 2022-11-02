import Fastify from "fastify";
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import { z } from 'zod';

import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ['query'],
});

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true
    })

    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();
        return { count: count}
    });

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();
        return { count: count}
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();
        return { count: count}
    });

    fastify.post('/pools', async (request, reply) => {

        const creatPoolBody = z.object({
            title: z.string().min(3)
        });

        const { title } = creatPoolBody.parse(request.body);

        const generateCode = new ShortUniqueId({ length: 7 });
        const code = String(generateCode()).toUpperCase()

        await prisma.pool.create({
            data: {
                title: title,
                code: code
            }
        })

        return reply.status(201).send({code});
    });

    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap()