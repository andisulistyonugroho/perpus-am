export const useBookStore = defineStore("book", () => {
  const { $api, $dayjs } = useNuxtApp();
  const books = ref<Book[]>([]);

  const getBooks = async () => {
    try {
      const { data } = await $api.get<Book[]>("/books", {
        params: {
          filter: {
            where: {
              is_active: true,
            },
            include: ["author", "genre"],
            order: "title",
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
        year: payload.year,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const editBook = async (payload: UpdateBook) => {
    try {
      await $api.patch(`/books/${payload.id}`, {
        title: payload.title,
        author_id: payload.author_id,
        genre_id: payload.genre_id,
        num_of_page: payload.num_of_page,
        year: payload.year,
        modified: $dayjs().subtract(7, "hour").format("YYYY-MM-DD HH:mm:ss"),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getBooksByState = async (state: number) => {
    try {
      const { data } = await $api.get<Book[]>("/books", {
        params: {
          filter: {
            where: {
              is_active: true,
              state: state,
            },
            include: ["author", "genre"],
            order: "title",
          },
        },
      });
      books.value = data;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getBooks,
    addBook,
    editBook,
    getBooksByState,
    books,
  };
});
