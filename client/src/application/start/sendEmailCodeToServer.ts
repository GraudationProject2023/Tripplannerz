import type { Member } from "@/domain/Member";
import { postEmailConfirm } from "@/application/api/start/postEmailConfirm";

export const sendEmailCodeToServer = async(user: Member, emailCode: string) => {

    if(user.email){
      const response = await postEmailConfirm(user.email, emailCode);
      return response;
    }

    throw new Error('Email is not valid');
};