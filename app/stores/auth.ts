export const useAuthStore = defineStore("auth", () => {
  const { $api } = useNuxtApp();
  const { setUser } = useUserStore();

  const login = async (username: string, password: string) => {
    try {
      const { data } = await $api.post("/Users/login", {
        username: `admni:${username}`,
        password: password,
      });
      setUser({ token: data.id, userId: data.userId });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { login };
});
