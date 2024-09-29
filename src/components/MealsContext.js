import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const MealContext = createContext();

// MealProvider component
export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);

  // Simulate fetching data (this can be replaced with a real API call)
  useEffect(() => {
    const initialMealsData = [
        { id: 1, name: 'Dönerteller', price: 10, category: "Etliler", image: '/images/doner-teller.jpg' },
        { id: 2, name: 'Pommdöner', price: 6, category: "Etliler", image: '/images/pommdoner.jpg' },
        { id: 3, name: 'Döner', price: 7, category: "Etliler", image: '/images/doner.jpg' },
        { id: 4, name: 'Kuzu Pirzola / Lamm Kotelett', price: 10, category: "Etliler", image: '/images/kuzu-pirzola.jpg' },
        { id: 5, name: 'Adana', price: 7, category: "Etliler", image: '/images/adana.jpg' },
        { id: 6, name: 'Kuzu Şiş / Lamm auf Spieß', price: 7, category: "Etliler", image: '/images/kuzu-sis.jpg' },
        { id: 7, name: 'Tavuk Şiş / Hähnchen auf Spieß', price: 7, category: "Etliler", image: '/images/tavuk-sis.jpg' },
        { id: 8, name: 'Pommes klein', price: 2, category: "Aperatif", image: '/images/pommes-klein.jpg' },
        { id: 9, name: 'Pommes groß', price: 3, category: "Aperatif", image: '/images/pommes-gross.jpg' },
        { id: 10, name: 'Backfisch', price: 8, category: "Balik", image: '/images/backfisch.jpg' },
        { id: 11, name: 'Burger', price: 7.50, category: "Aperatif", image: '/images/burger.jpg' },
        { id: 12, name: 'Burger Menu', price: 10, category: "Aperatif", image: '/images/burger-menu.jpg' },
        { id: 13, name: 'Manti', price: 3, category: "Aperatif", image: '/images/manti.jpg' },
        { id: 14, name: 'Içli Köfte 1 adet', price: 1.5, category: "Aperatif", image: '/images/iclikofte.jpg' },
        { id: 15, name: 'Yağlı katmer', price: 3.5, category: "Aperatif", image: '/images/katmer.jpg' },
        { id: 16, name: 'Kahve', price: 1.5, category: "Icecek", image: '/images/kahve.jpg' },
        { id: 17, name: 'Gözleme', price: 2.5, category: "Aperatif", image: '/images/gozleme.jpg' },
        { id: 18, name: 'Lahmacun', price: 2, category: "Aperatif", image: '/images/lahmacun.jpg' },
        { id: 19, name: 'Lahmacun mit Salat', price: 2.50, category: "Aperatif", image: '/images/lahmacun.jpg' },
        { id: 20, name: 'Çay / Tee', price: .50, category: "Icecek", image: '/images/cay.png' },
        { id: 21, name: 'Su / Wasser', price: 1.00, category: "Icecek", image: '/images/su.jpg' },
        { id: 22, name: 'Ayran', price: 1.00, category: "Icecek", image: '/images/ayran.webp' },
        { id: 23, name: 'Cola / Fanta / Sprite', price: 1.50, category: "Icecek", image: '/images/mesrubat.webp' },
    ];

    const initialCategories = [
        { name: 'Etliler', image: '/images/etliler.jpg' }, 
        { name: 'Balik', image: '/images/balik.jpg' }, 
        { name: 'Aperatif', image: '/images/aperatif.jpg' }, 
        { name: 'Icecek', image: '/images/icecekler.jpg' },
    ];

    // Simulate an API call delay with setTimeout
    setTimeout(() => {
      setMeals(initialMealsData);
      setCategories(initialCategories);
    }, 1000); // Simulate 1 second delay
  }, []);

  return (
    <MealContext.Provider value={{ meals, categories }}>
      {children}
    </MealContext.Provider>
  );
};

// Custom hook to use Meal context
export const useMeals = () => {
  const context = useContext(MealContext);

  // Ensure the context is not undefined
  if (!context) {
    throw new Error('useMeals must be used within a MealProvider');
  }

  return context;
};
