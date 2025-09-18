export const useMemberStore = defineStore("member", () => {
  const { $api, $dayjs } = useNuxtApp();
  const members = ref<Member[]>([]);

  const addMember = async (payload: AddMember) => {
    try {
      const trimmed = payload.fullname.replace(/\s/g, "").toLowerCase();
      const { data } = await $api.post("/Users", {
        email: trimmed + "@mailinator.com",
        username: trimmed,
        realm: "member",
        password: "usermaktab5202",
      });

      await $api.post("/profiles", {
        userId: data.id,
        fullname: payload.fullname,
        gender: payload.gender,
        age: payload.age,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getMember = async () => {
    try {
      const { data } = await $api.get<Member[]>("/profiles", {
        params: {
          filter: {
            where: { is_active: true },
          },
        },
      });
      members.value = data;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const editMember = async (payload: UpdateMember) => {
    try {
      await $api.patch(`/profiles/${payload.id}`, {
        fullname: payload.fullname,
        gender: payload.gender,
        age: payload.age,
        modified: $dayjs().subtract(7, "hour").format("YYYY-MM-DD HH:mm:ss"),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { addMember, getMember, editMember, members };
});
