import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <Switch>
          <Route path="/orders/new">
            <NewOrderPage user={user} setUser={setUser} />
          </Route>
          <Route path="/orders">
            <OrderHistoryPage user={user} setUser={setUser} />
          </Route>
          <Redirect to="/orders" />
        </Switch>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
