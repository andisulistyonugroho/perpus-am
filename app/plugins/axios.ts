import axios from "axios";
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { user, clearToken } = useAuthStore();

  const api = axios.create({
    baseURL: config.public.apiBase,
  });

  api.interceptors.request.use((config) => {
    config.headers.Authorization = user.token;
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const code = parseInt(error.response && error.response.status);
      if (code === 401) {
        const { data } = await api.post("/users/tokenThere");

        if (data.result === false) {
          clearToken();
          navigateTo("/login", { replace: true });
        }
      } else if (code === 404) {
        navigateTo("/", { replace: true });
        alert("Resource not found");
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      api: api,
    },
  };
});
