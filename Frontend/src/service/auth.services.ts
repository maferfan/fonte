import { api } from "./baseUrl.services"


export const auth = {
    getAuth: async () => {
        try {
            const response = await api.get("/auth")
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    postSessionAuth: async (request_id: string) => {
        try {
            const response = await api.post("/sessionAuth", {
                request_token: request_id
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    getAccountId: async (session_id: string) => {
        try {
            const response = await api.get(`/sessionId/${session_id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    }