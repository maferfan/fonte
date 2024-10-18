import { api } from "./baseUrl.services";

export const auth = {
  getAuth: async () => {
    try {
      const response = await api.get("/auth");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  loginAuth: async (params: { name: string; password: string }) => {
    try {
      const response = await api.post("/authLogin", {
        name: params.name,
        password: params.password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  registerAuth: async (params: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/authRegister", {
        name: params.name,
        password: params.password,
        email: params.email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post("/authLogout");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAccountId: async (token: string) => {
    try {
      if (token) {
        const response = await api.get(`/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },
};
