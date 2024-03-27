import React, { useState } from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  incrementPizzaQuantity,
  decrementPizzaQuantity,
  addToCart,
} from "./store";
import Accordion from "./Accordion";
import pizzaImage from "./assets/Pizza Romana.jpg";
import "./App.css";

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
        <Header />
        <div className="pizza-details">
          <div className="pizza-info">
            <h4>Selected Pizza Type:</h4>
            <h2>Pizza Romana</h2>
            <img src={pizzaImage} alt="Pizza Image" />
            <p>
              Description: Roman pizza is practically the opposite to Neapolitan
              pizza: it is crispy and they are not afraid of toppings. A classic
              on all menus in Rome is the Capricciosa: topped with ham,
              mushrooms, olives, artichoke, an egg and tomato. Long strips of
              pizza are topped with the most delicious toppings and then cut and
              sold by weight and wrapped in paper. It is original Roman street
              food and it is an institution of the city loved by all but you can
              also find it all over Italy.
            </p>
          </div>
          <div className="quantity-price">
            <h3>Selected Quantity: {pizzaQuantity}</h3>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <h2>Pizza Price: ${pizzaQuantity * pizzaPrice}</h2>
          </div>
        </div>
        <p>Please select your choices to make the selected pizza more spicy</p>
        <Accordion sections={sections} validateOptions={validateOptions} pizzaQuantity={pizzaQuantity} pizzaPrice={pizzaPrice} />
        <div className="feedback-section">
          <h4>Feedback:</h4>
          <textarea>
            We would like to receive Feedback for an improvement if any.. Enjoy
            your Pizza..
          </textarea>
        </div>
          <div className="buttons">
            <button onClick={handleBuy} disabled={!isOptionsSelected}>
              Buy
            </button>
            <button onClick={handleAddToCart} disabled={!isOptionsSelected}>
              Add to Cart
            </button>
          </div>
      </div>
    </Router>
  );
};

export default App;
