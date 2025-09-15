export const useBookStore = defineStore("book", () => {
  const { $api } = useNuxtApp();
  const books = ref<Book[]>([]);

  const getBooks = async () => {
    try {
      const { data } = await $api.get<Book[]>("/books", {
        params: {
          filter: {
            where: {
              is_active: true,
            },
          },
        },
      });
      books.value = data;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const addBook = async (payload: AddBook) => {
    try {
      await $api.post("/books", {
        title: payload.title,
        author_id: payload.author_id,
        genre_id: payload.genre_id,
        num_of_page: payload.num_of_page,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getBooks,
    addBook,
    books,
  };
});
