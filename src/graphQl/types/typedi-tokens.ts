import { PrismaClient } from '@prisma/client';
import { Token } from 'typedi';

export const prismaToken = new Token<PrismaClient>('PrismaClient');
