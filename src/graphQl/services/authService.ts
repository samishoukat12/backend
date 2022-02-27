import jwt from 'jsonwebtoken';
import { UserInfo } from './../model/user-info';
import { Role } from '@generated/type-graphql';
import { UserContext } from './../types/user-context';
import { AuthChecker, ResolverData } from 'type-graphql';
import * as  bycrypt from 'bcryptjs';
import { PrismaClient, user } from '@prisma/client';
import { UserCreateInput, User } from '@generated/type-graphql';
import Container, { Inject, Service } from "typedi";
import { prismaToken } from '../types/typedi-tokens';
import jwtDecode from "jwt-decode";
import 'reflect-metadata'

export interface IJwtDecode {
    (authHeader: string): any;
}
export const createAuthService = (): AuthService => {
    return new AuthService(Container.get(prismaToken));
};
//Build in 
export interface IAuthService {
    isUserAuthorized: AuthChecker<UserContext, Role>;
    getUserInfo(authHeader: string): UserInfo;
}

@Service()
export class AuthService implements IAuthService {
    constructor(
        @Inject(prismaToken)
        private readonly prisma: PrismaClient
    ) { }
    //{    build in
    isUserAuthorized = async (
        token: ResolverData<UserContext>
    ): Promise<boolean> => {
        console.log("run");
        return true;
    };
    getUserInfo(authHeader: string): UserInfo {
        try {
            const jwtKey = "dasgvjtnkkweroutojfldmvturhglmslfjgibtrle";
            const decodedToken: any = jwt.verify(authHeader, jwtKey);
            return {
                roles: decodedToken ? [decodedToken.role] : [],
                id: decodedToken ? decodedToken.id : "",
            };
        } catch (e) {
            return {
                roles: [],
                id: "",
            };
        }
    }
    ////}

    register = async (
        {
            name,
            email,
            password,
            role
        }: UserCreateInput
    ): Promise<user | null> => {
        const checkExsitance = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (checkExsitance) {
            throw new Error("email already exist");
        }
        if (role === "ADMIN") {
            throw new Error('admin cannot be created');
        }
        const hashedPassword = await bycrypt.hash(password, 12)
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
               token:"io"
            }
        })
        return user
    }

    login = async (email: string, password: string): Promise<user> => {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            rejectOnNotFound: true,

        });
        if (!(await bycrypt.compare(password, user.password))) {
            throw new Error('password not correct')
        }
        const jwtKey = "dasgvjtnkkweroutojfldmvturhglmslfjgibtrle"
        var jstoken = jwt.sign({
            id: user.id, role: user.role, email: user.email, name: user.name
        }, jwtKey,
            { expiresIn: 5 }
        );
        user.token = jstoken;
        return user;
    }
}