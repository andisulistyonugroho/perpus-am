export const useBorrowStore = defineStore("borrow", () => {
  const { $api, $dayjs } = useNuxtApp();

  const borrows = ref<Borrow[]>([]);

  const borrowBook = async (input: AddBorrow) => {
    try {
      await $api.post("/borrows", {
        book_id: input.book_id,
        userId: input.userId,
        borrower_profile_id: input.borrower_profile_id,
        borrow_date: input.borrow_date,
        modified: $dayjs().subtract(7, "hour").format("YYYY-MM-DD HH:mm:ss"),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const returnBook = async (input: ReturnBorrow) => {
    try {
      await $api.patch(`/borrows/${input.id}`, {
        returned_date: input.returned_date,
        borrow_status: 2,
        modified: $dayjs().subtract(7, "hour").format("YYYY-MM-DD HH:mm:ss"),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getBorrow = async (borrow_status: number | null) => {
    try {
      interface WhereFilter {
        is_active: boolean;
        borrow_status?: number;
      }
      const whereF: WhereFilter = { is_active: true };

      if (borrow_status) {
        whereF.borrow_status = borrow_status;
      }
      const { data } = await $api.get("/borrows", {
        params: {
          filter: {
            where: whereF,
            include: ["user", { book: "author" }, "profile"],
            order: "modified DESC",
          },
        },
      });
      borrows.value = data;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    borrowBook,
    returnBook,
    getBorrow,
    borrows,
  };
});
