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

    fastify.get('/polls/count', async () => {
        const count = await prisma.poll.count();
        return { count: count}
    });

    fastify.post('/polls', async (request, reply) => {

        const creatPollBody = z.object({
            title: z.string().min(3)
        });

        const { title } = creatPollBody.parse(request.body);

        const generateCode = new ShortUniqueId({ length: 7 });
        const code = String(generateCode()).toUpperCase()

        await prisma.poll.create({
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