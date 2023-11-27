import type { Member } from "@/domain/Member";
import { postEmailSend } from "@/application/api/start/postEmailSend";

export const sendEmailToServer = async(user: Member) => {

    if(user.email){
      const response = await postEmailSend(user.email);
      return response;
    }
   
    throw new Error('Email is not valid');
};