import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartAPI } from "../service/cartService";

export const useCart = () => {
  const queryClient = useQueryClient();

  // 장바구니 추가
  const addCartMutation = useMutation({
    mutationFn: (data) => cartAPI.addCart(data),
    onSuccess: (res) => {
      if (res.resultCode === 200) {
        alert(res.msg || '장바구니에 추가되었습니다.');
        queryClient.invalidateQueries(['cartList']);
      } else {
        alert(res.msg || '장바구니 추가 실패');
      }
    },
    onError: (err) => {
      console.error('❌ 장바구니 추가 실패:', err);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    },
  });

  // 장바구니 조회
  const useGetCartList = (userId) =>
    useQuery({
      queryKey: ['cartList', userId],
      queryFn: () => cartAPI.getCartList(userId),
      enabled: !!userId,
    });

  // 장바구니 삭제
  const deleteCartMutation = useMutation({
    mutationFn: (cartId) => cartAPI.deleteCart(cartId),
    onSuccess: () => queryClient.invalidateQueries(['cartList']),
  });

  // 수량 변경
  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartId, quantity }) => cartAPI.updateQuantity(cartId, quantity),
    onSuccess: () => queryClient.invalidateQueries(['cartList']),
  });

  return { addCartMutation, useGetCartList, deleteCartMutation, updateQuantityMutation };
};
