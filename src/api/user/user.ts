import axios from "axios"
import { SERVER_URL } from "@/constants/constants"

export const fetchUser = async(chatId:Number)=>{
    try {
        const res = await axios.get(`${SERVER_URL}/users/${chatId}`)
        console.log(res)
        
    } catch (error) {
        console.log(error)
    }
}