import OrderListItem from '../OrderListItem/OrderListItem';
import './OrderList.css';

export default function OrderList({ orders, activeOrder, handleSelectOrder }) {
  const orderItems = orders.map(o =>
    <OrderListItem
      order={o}
      isSelected={o === activeOrder} 
      handleSelectOrder={handleSelectOrder}
      key={o._id}
    />
  );

  return (
    <main className="OrderList">
      {orderItems.length ?
        orderItems
        :
        <span className="no-orders">No Previous Orders</span>
      }
    </main>
  );
}