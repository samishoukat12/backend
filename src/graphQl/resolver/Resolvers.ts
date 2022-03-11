import { UserContext } from './../types/user-context';
import { prismaToken } from './../types/typedi-tokens';
import { AuthService } from '../services/authService';
import { User, CreateUserArgs } from '@generated/type-graphql';
import { Arg, Args, Mutation, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import * as  bcrypt from 'bcryptjs'

import { PrismaClient, user } from '@prisma/client';


@Service()
@Resolver()

export class AuthResolver {

  constructor(private readonly authService: AuthService) { }

  @Mutation(() => User)
  async register(
    @Args() { data }: CreateUserArgs,

  ): Promise<User | null> {
    return await this.authService.register(data)
  }

  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User | null> {
    const student = await this.authService.login(email, password);
    return student;
  }

}