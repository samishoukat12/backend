import { PrismaClient } from '@prisma/client';
import {Request,Response} from 'express';
import { UserInfo } from '../model/user-info';

export interface UserContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  // user : UserInfo
}
