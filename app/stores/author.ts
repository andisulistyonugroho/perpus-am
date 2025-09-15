export const useAuthorStore = defineStore("author", () => {
  const { $api } = useNuxtApp();
  const authors = ref<Author[]>([]);

  const getAuthors = async () => {
    try {
      const { data } = await $api.get<Author[]>("/authors", {
        params: {
          filter: {
            where: { is_active: true },
          },
        },
      });
      authors.value = data;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createAuthor = async (payload: AddAuthor) => {
    try {
      await $api.post("/authors", { name: payload.name });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    createAuthor,
    getAuthors,
    authors,
  };
});
