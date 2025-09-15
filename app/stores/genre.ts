export const useGenreStore = defineStore("genre", () => {
  const { $api } = useNuxtApp();

  const genres = ref<Genre[]>([]);

  const addGenre = async (payload: AddGenre) => {
    try {
      await $api.post("/genres", { title: payload.title });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getGenres = async () => {
    try {
      const { data } = await $api.get("/genres", {
        params: {
          filter: {
            where: { is_active: true },
          },
        },
      });
      genres.value = data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    addGenre,
    getGenres,
    genres,
  };
});
