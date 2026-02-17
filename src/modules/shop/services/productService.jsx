export const products = [
  {
    id: 1,
    category: "Mobile",
    name: "iPhone 14",
    specs: ["128GB", "256GB"],
    colors: ["Blue", "Red", "Black"],
    price: 999,
  },
  {
    id: 2,
    category: "Fridge",
    name: "LG Smart Fridge",
    specs: ["300L", "400L"],
    colors: ["Silver", "White"],
    price: 1200,
  },
  {
    id: 3,
    category: "Paint",
    name: "Premium Wall Paint",
    specs: ["5L", "10L"],
    colors: ["Red", "Blue", "Green"],
    price: 25,
  },
];

/* ✅ Simulate API Call */
export const getProducts = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
