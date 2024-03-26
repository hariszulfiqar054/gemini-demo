import { useState } from 'react';
import './App.css';
import { Ingredients } from './ingredients';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
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

  const generateResponse = async () => {
    if (selectedIngredients.length < 3) {
      alert('please select at least 3 ingredients');
    } else {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Can you please generate new recipes with the given ingredients ${selectedIngredients.join(
        ','
      )}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
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
      <div>
        {selectedIngredients.length >= 3 && (
          <button
            onClick={generateResponse}
            style={{
              backgroundColor: 'MenuText',
              color: 'black',
              marginTop: '12px',
              width: '300px',
            }}
          >
            Generate Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

// https://www.npmjs.com/package/@google/generative-ai
// https://ai.google.dev/tutorials/get_started_web
