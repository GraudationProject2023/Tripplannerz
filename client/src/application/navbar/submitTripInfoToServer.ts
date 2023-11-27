import { postTripInfo } from "@/application/api/navbar/postTripInfo"

export const SubmitTripInfoToServer = async() => {
    const formData = new FormData();

    formData.append("image", image[0].originFileObj);
    formData.append("contentsData", new Blob([JSON.stringify(contentsData)], {type: 'application/json'}));

    const response = await postTripInfo(token, formData);
}