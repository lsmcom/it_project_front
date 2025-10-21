import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookAdminAPI } from "../service/bookAdminService";

export const useBookAdmin = () => {
  const queryClient = useQueryClient();

  const useGetBookList = () => useQuery({
    queryKey: ['adminBookList'],
    queryFn: bookAdminAPI.list,
  });

  const addBookMutation = useMutation({
    mutationFn: bookAdminAPI.add,
    onSuccess: () => {
      alert('도서 등록 완료');
      queryClient.invalidateQueries(['adminBookList']);
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: ({ bookId, formData }) => bookAdminAPI.update(bookId, formData),
    onSuccess: () => {
      alert('도서 수정 완료');
      queryClient.invalidateQueries(['adminBookList']);
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: bookAdminAPI.delete,
    onSuccess: () => {
      alert('도서 삭제 완료');
      queryClient.invalidateQueries(['adminBookList']);
    },
  });

  return { useGetBookList, addBookMutation, updateBookMutation, deleteBookMutation };
};
