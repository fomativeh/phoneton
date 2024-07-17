import axios from "axios"
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const fetchUser = async (chatId: number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/users/${chatId}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const fetchFriends = async (chatId: number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/friends/${chatId}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const claimMine = async (chatId: number, amount:number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/claim-mine/${chatId}/${amount}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const claimReferralIncome = async (chatId: number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/claim-referrals/${chatId}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const buy = async (chatId: number, level:number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/buy/${chatId}/${level}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const startMine = async (chatId: number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/start-mine/${chatId}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const claimDailyReward = async (chatId: number, amount:number) => {
    try {
        const res = await axios.get(`${SERVER_URL}/claim-daily-reward/${chatId}/${amount}`)
        if (res?.data?.success) {
            return { success: true, data: res?.data?.data }
        }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}
