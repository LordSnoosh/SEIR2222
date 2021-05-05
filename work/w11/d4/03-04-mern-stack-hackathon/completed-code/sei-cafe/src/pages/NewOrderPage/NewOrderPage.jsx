import { useState, useEffect } from 'react';
import './NewOrderPage.css';
import { Link, useHistory } from 'react-router-dom';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  /*--- State --- */
  const [menuItems, setMenuItems] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);

  // Use history object to change routes programmatically
  const history = useHistory();

  /*--- Side Effects --- */
  useEffect(function () {
    // Load menu items
    async function fetchMenuItems() {
      const items = await itemsAPI.getAll();
      setMenuItems(items);
      // Extract unique categories from the menu items
      setMenuCategories(items.reduce((cats, item) => {
        const cat = item.category.name;
        return cats.includes(cat) ? cats : [...cats, cat];
      }, []));
      setActiveCat(items[0].category.name);
    }
    fetchMenuItems();
    // Load cart (a cart is the unpaid order for the logged in user)
    async function fetchCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    fetchCart();
  }, []);

  /*--- Event Handlers --- */
  async function handleAddToOrder(itemId) {
    const cart = await ordersAPI.addItemToCart(itemId);
    setCart(cart);
  }

  async function handleChangeQty(itemId, newQty) {
    const cart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(cart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    history.push('/orders');
  }

  /*--- Rendered UI --- */
  return (
    <main className="NewOrderPage">
      <aside>
        <Logo />
        <CategoryList
          categories={menuCategories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <MenuList
        menuItems={menuItems.filter(item => item.category.name === activeCat)}
        handleAddToOrder={handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}