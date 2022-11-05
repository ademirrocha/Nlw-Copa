import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

export async function pollRoutes(fastify: FastifyInstance){

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

}