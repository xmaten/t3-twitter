import { User } from "@clerk/nextjs/api";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username || user.firstName,
    profileImageUrl: user.profileImageUrl
  };
};