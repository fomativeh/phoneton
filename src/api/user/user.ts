import axios from "axios"
import { SERVER_URL } from "@/constants/constants"

export const fetchUser = async (chatId: number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/users/${chatId}`)
        if (res?.data?.success) {
            return {success:true, data:res?.data?.data}
        }

    } catch (error) {
        console.log(error)
        return {success:false}
    }
}