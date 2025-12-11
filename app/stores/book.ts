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
        book_amount: payload.book_amount,
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
        book_amount: payload.book_amount,
        modified: $dayjs().subtract(7, "hour").format("YYYY-MM-DD HH:mm:ss"),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getBooksByState = async (state: number) => {
    try {
      const whereFAvailable = {
        is_active: true,
        current_available_amount: { gt: 0 },
      };

      const whereFNotAvailable = {
        is_active: true,
        current_available_amount: 0,
      };

      const { data } = await $api.get<Book[]>("/books", {
        params: {
          filter: {
            where: state === 1 ? whereFAvailable : whereFNotAvailable,
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
