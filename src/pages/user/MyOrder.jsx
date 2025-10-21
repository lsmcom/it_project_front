import React from 'react';
import '../../assets/css/user/MyOrder.css';
import { usePurchase } from '../../hooks/usePurchase';
import { authStore } from '../../store/authStore';

function MyOrder() {
  const { userId } = authStore();
  const { useGetPurchaseList } = usePurchase();

  const { data, isLoading } = useGetPurchaseList(userId);

  if (isLoading) return <div className="loading">구매 내역을 불러오는 중...</div>;

  const purchaseList = data?.data || [];

  return (
    <div className="myOrder">
      <h2 className="order-title">나의 구매 내역</h2>

      {purchaseList.length === 0 ? (
        <div className="no-order">
          <p>구매한 도서가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="order-list">
            {purchaseList.map((order) => (
              <div key={order.orderId} className="order-item">
                <div className="order-info">
                  <div className="order-date">
                    구매일 : {new Date(order.purchaseDate).toLocaleDateString()}
                  </div>
                  <div className="order-total">
                    총 금액 : {order.totalPrice.toLocaleString()}원
                  </div>
                </div>

                <div className="order-books">
                  {order.items.map((item) => (
                    <div key={item.bookId} className="order-book">
                      <img
                        src={item.filePath || '/default-book.jpg'}
                        alt={item.bookName}
                        className="order-book-img"
                      />
                      <div className="order-book-info">
                        <div className="order-book-name">{item.bookName}</div>
                        <div className="order-book-author">{item.author}</div>
                        <div className="order-book-quantity">
                          수량: {item.quantity}권
                        </div>
                        <div className="order-book-price">
                          {item.price.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyOrder;
