import type { Member } from "@/domain/Member";
import { postMemberRegister } from "@/application/api/start/postMemberRegister";

export const SubmitUserInfoToServer = async(user:Member, selectedPreferenceList) => {

    user.types = selectedPreferenceList;

    if(user.name && user.gender && user.email && user.pw && user.types){
      const response = await postMemberRegister(
        user.name, 
        user.gender,
        user.email, 
        user.pw,  
        user.types 
      )
    
      return response;
    }

    throw new Error('User Info is not valid');
}