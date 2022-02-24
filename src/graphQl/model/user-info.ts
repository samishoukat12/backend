import { Role } from "@generated/type-graphql";

export interface UserInfo {
  roles: Role[];
  //user id
  id: string;
}
