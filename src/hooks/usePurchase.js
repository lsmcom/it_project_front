import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { purchaseAPI } from "../service/purchaseService";

export const usePurchase = () => {
  const queryClient = useQueryClient();

  //장바구니 전체 구매
  const purchaseFromCartMutation = useMutation({
    mutationFn: (userId) => purchaseAPI.purchaseFromCart(userId),
    onSuccess: (res) => {
      if (res.resultCode === 200) {
        alert("구매가 완료되었습니다!");
        queryClient.invalidateQueries(['cartList']);
        queryClient.invalidateQueries(['purchaseList']);
      } else {
        alert(res.msg || "구매 처리 중 오류가 발생했습니다.");
      }
    },
    onError: () => {
      alert("서버 오류가 발생했습니다.");
    },
  });

  //바로 구매
  const directPurchaseMutation = useMutation({
    mutationFn: ({ userId, bookId, quantity }) =>
      purchaseAPI.directPurchase(userId, bookId, quantity),
    onSuccess: (res) => {
      if (res.resultCode === 200) {
        alert("구매가 완료되었습니다!");
        queryClient.invalidateQueries(['purchaseList']);
      } else {
        alert(res.msg || "구매 처리 중 오류가 발생했습니다.");
      }
    },
    onError: () => {
      alert("서버 오류가 발생했습니다.");
    },
  });

  //구매 내역 조회
  const useGetPurchaseList = (userId) =>
    useQuery({
      queryKey: ['purchaseList', userId],
      queryFn: () => purchaseAPI.getPurchaseList(userId),
      enabled: !!userId,
    }
  );

  //사용자별 구매횟수 조회
  const useGetPurchaseCount = (userId) =>
    useQuery({
      queryKey: ["purchaseCount", userId],
      queryFn: () => purchaseAPI.getPurchaseCount(userId),
      enabled: !!userId,
    }
  );

  return {purchaseFromCartMutation, directPurchaseMutation, useGetPurchaseList, useGetPurchaseCount};
};
