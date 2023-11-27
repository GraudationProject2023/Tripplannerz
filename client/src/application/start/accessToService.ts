import type { Member } from "@/domain/Member";
import { postLoginJwt } from "@/application/api/start/postLoginJwt";
import { setToken } from "@/store/action/tokenAction";

export const accessToService = async(user: Member, dispatch: any) => {

    if(user.email && user.pw) {
      try{
        const response = await postLoginJwt(user.email, user.pw);

        const token: string | null = response.data.token;
        if(token) {
          dispatch(setToken(token));
        }

        return response;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to log in');
      }
    }

    throw new Error('User Info is not vaild');
}