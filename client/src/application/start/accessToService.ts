import type { Member } from "@/domain/Member";
import { postLoginJwt } from "@/application/api/start/postLoginJwt";

export const accessToService = async(user: Member) => {

    if(user.email && user.pw) {
      const response = await postLoginJwt(user.email, user.pw);
      return response;
    }

    throw new Error('User Info is not vaild');
}