import React from "react";
import Accordion from "./Accordion";
import pizzaImage from "./assets/Pizza Romana.jpg";

interface Section {
  title: string;
  options: { name: string; price: number }[];
  multipleChoice: boolean;
}

interface HomeProps {
  sections: Section[];
  validateOptions: (isValid: boolean) => void;
  pizzaQuantity: number;
  pizzaPrice: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleBuy: () => void;
  handleAddToCart: () => void;
  isOptionsSelected: boolean;
}

const Home: React.FC<HomeProps> = ({
  sections,
  validateOptions,
  pizzaQuantity,
  pizzaPrice,
  handleIncrement,
  handleDecrement,
  handleBuy,
  handleAddToCart,
  isOptionsSelected,
}) => {
  return (
    <div className="home">
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
      <Accordion
        sections={sections}
        validateOptions={validateOptions}
        pizzaQuantity={pizzaQuantity}
        pizzaPrice={pizzaPrice}
      />
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
  );
};

export default Home;
