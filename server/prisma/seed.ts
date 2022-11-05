import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    
    const user = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://github.com/ademirrocha.png'
        }
    });

    const poll = await prisma.poll.create({
        data: {
            title: 'Exemplo Poll',
            code: 'BOOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    const game = await prisma.game.create({
        data: {
            date: '2022-11-05T18:00:00.920Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE'
        }
    });

    const game2 = await prisma.game.create({
        data: {
            date: '2022-11-08T18:00:00.920Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 0,
                    secondTeamPoints: 3,

                    participant: {
                        connect: {
                            userId_pollId: {
                                userId: user.id,
                                pollId: poll.id
                            }
                        }
                    }
                }
            }
        }
    });

}

main();