import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Header from "./Header";
import Home from "./Home"; 
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  incrementPizzaQuantity,
  decrementPizzaQuantity,
  addToCart,
} from "./store";
import "./App.css";
import Contact from "./Contact";
import Cart from "./Cart";

const App: React.FC = () => {
  const [isOptionsSelected, setIsOptionsSelected] = useState(false);
  const pizzaQuantity = useSelector((state: RootState) => state.pizza.quantity);
  const dispatch = useDispatch();

  const sections = [
    {
      title: "Select Pizza Size",
      options: [
        { name: "Small", price: 7 },
        { name: "Medium", price: 17 },
        { name: "Large", price: 27 },
      ],
      multipleChoice: false,
    },
    {
      title: "Select Pizza Crust",
      options: [
        { name: "Thin Crust", price: 2 },
        { name: "Thick Crust", price: 3 },
        { name: "Stuffed Crust", price: 4 },
      ],
      multipleChoice: false,
    },
    {
      title: "Select Pizza Sauce",
      options: [
        { name: "Tomato Sauce", price: 1 },
        { name: "Alfredo Sauce", price: 3 },
        { name: "Pesto Sauce", price: 2 },
      ],
      multipleChoice: false,
    },
    {
      title: "Select Pizza Toppings",
      options: [
        { name: "Pepperoni", price: 2 },
        { name: "Mushrooms", price: 1 },
        { name: "Onions", price: 1 },
        { name: "Olives", price: 2 },
      ],
      multipleChoice: true,
    },
  ];

  const handleIncrement = () => {
    dispatch(incrementPizzaQuantity());
  };

  const handleDecrement = () => {
    dispatch(decrementPizzaQuantity());
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ quantity: pizzaQuantity }));
    alert("Pizza Added to Cart");
  };

  const handleBuy = () => {
    alert("Pizza purchased!");
  };

  const pizzaPrice = 149;

  const validateOptions = (isValid: boolean) => {
    setIsOptionsSelected(isValid);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Header />
            <Home
              sections={sections}
              validateOptions={validateOptions}
              pizzaQuantity={pizzaQuantity}
              pizzaPrice={pizzaPrice}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleBuy={handleBuy}
              handleAddToCart={handleAddToCart}
              isOptionsSelected={isOptionsSelected}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
