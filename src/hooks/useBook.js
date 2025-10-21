import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bookAPI } from "../service/bookService";

export const useBook = (categoryId) => {
  const queryClient = useQueryClient();

  //카테고리별 도서 목록 조회
  const useGetBooksByCategory = (categoryId) =>
    useQuery({
      queryKey: ['bookList', categoryId],
      queryFn: () => bookAPI.listByCategory(categoryId),
      enabled: !!categoryId, // categoryId가 있을 때만 실행
    }
  );

  //이번주 특가 도서 조회
  const useGetSaleBooks = () =>
    useQuery({
      queryKey: ['bookSale'],
      queryFn: () => bookAPI.getSaleBooks(),
    }
  );

  //도서 상세 조회
  const useGetBookDetail = (bookId) =>
    useQuery({
      queryKey: ['bookDetail', bookId],
      queryFn: () => bookAPI.getBookDetail(bookId),
      enabled: !!bookId,
    }
  );

  const useSearchBooks = (keyword) =>
    useQuery({
      queryKey: ["searchBooks", keyword],
      queryFn: () => bookAPI.searchBooks(keyword),
      enabled: !!keyword,
    }
  );

  //전체 베스트셀러 (메인 페이지용)
  const useBestSeller = () => {
    return useQuery({
      queryKey: ['bestSeller'],
      queryFn: bookAPI.getBestSeller,
    });
  };

  //카테고리별 베스트셀러 (카테고리 페이지용)
  const useBestSellerByCategory = (categoryId) => {
    return useQuery({
      queryKey: ['bestSellerCategory', categoryId],
      queryFn: () => bookAPI.getBestSellerByCategory(categoryId),
      enabled: !!categoryId,
    });
  };

  return { useGetBooksByCategory, useGetSaleBooks, useGetBookDetail, useSearchBooks, useBestSeller, useBestSellerByCategory }
};
