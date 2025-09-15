export const useUserStore = defineStore(
  "user",
  () => {
    const user = reactive({
      token: "",
      userId: 0,
      role: "",
    });

    function setUser(obj: { token: string; userId: number }) {
      user.token = obj.token;
      user.userId = obj.userId;
    }
    function setRole(value: string) {
      user.role = value;
    }
    async function clearToken() {
      try {
        user.token = "";
        user.userId = 0;
        user.role = "";
      } catch (error) {
        alert(error);
      }
    }

    return { setUser, setRole, clearToken, user };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      key: "peradminpuz_aoot",
    },
  },
);
