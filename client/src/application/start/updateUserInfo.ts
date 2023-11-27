import { Member } from "@/domain/Member"

export const updateUserInfo = (prevUser: Member, key: keyof Member, value) => ({
    ...prevUser,
    [key]: value,
})