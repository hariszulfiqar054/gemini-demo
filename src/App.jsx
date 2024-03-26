import { useState } from 'react';
import './App.css';
import { Ingredients } from './ingredients';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientSelector = (ingredient) => {
    const exists = selectedIngredients.includes(ingredient);
    if (exists) {
      setSelectedIngredients(
        ...[selectedIngredients.filter((value) => value !== ingredient)]
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  return (
    <div>
      {Ingredients.map((value) => (
        <button
          onClick={() => handleIngredientSelector(value)}
          key={value}
          style={{
            backgroundColor: selectedIngredients.includes(value)
              ? 'yellow'
              : 'salmon',
            margin: '12px',
            color: selectedIngredients.includes(value) ? 'black' : 'white',
          }}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default App;
