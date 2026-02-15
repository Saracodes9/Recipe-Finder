# 🍽️ Recipe Finder Web App

A simple and responsive **Recipe Finder** web application that allows users to search for meals and view detailed cooking instructions using data from the public **TheMealDB API**.

This project is built using **HTML, CSS, and JavaScript** and demonstrates API integration, DOM manipulation, and dynamic content rendering.

---

## 🚀 Features

✅ Search recipes by dish name  
✅ Fetch real-time data from TheMealDB API  
✅ Display meal image, origin, and ingredients  
✅ View detailed step-by-step cooking instructions  
✅ Opens full recipe in a new tab  
✅ Copy recipe instructions to clipboard  
✅ Loading indicator while fetching data  
✅ Error handling for empty input or failed requests  
✅ Responsive and clean UI design  

---

## 🖼️ Application Preview

### 🔎 Search Interface
Users can enter any dish name and fetch recipes instantly.

### 📋 Recipe Details
Displays:
- Meal image  
- Cuisine origin  
- Ingredients list  
- Step-by-step instructions  
- Copy recipe button  

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox + Responsive Design)
- JavaScript (ES6)
- Fetch API
- TheMealDB Public API

---

## 📂 Project Structure

```
Recipe/
│
├── Recipe.html      # Main UI structure
├── Recipe.css       # Styling and responsive layout
├── Recipe.js        # API calls and app logic
└── README.md        # Project documentation
```

---

## 🔌 API Used

This project uses the free public API:

👉 https://www.themealdb.com/api.php

### Endpoints Used

Search meal by name:
```
https://www.themealdb.com/api/json/v1/1/search.php?s=MEAL_NAME
```

Lookup full recipe by ID:
```
https://www.themealdb.com/api/json/v1/1/lookup.php?i=MEAL_ID
```

---

## ▶️ How to Run the Project

1️⃣ Clone the repository
```
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

2️⃣ Open the project folder

3️⃣ Run the app  
Simply open:

```
Recipe.html
```

in your web browser.

No installation required ✅

---

## 💡 How It Works

- User enters a dish name
- App sends request to TheMealDB API
- Results are dynamically rendered
- Clicking **View Recipe** opens full instructions in a new tab
- Users can copy instructions with one click

---

## 🎯 Learning Objectives

This project demonstrates:

- Working with REST APIs
- DOM manipulation in JavaScript
- Event handling
- Dynamic UI updates
- Responsive design principles
- Clipboard API usage

---

## 🌱 Future Improvements

- Add search by category
- Add favorite recipes feature
- Dark mode toggle
- Pagination for results
- Save recipes locally
- Add recipe video support

---

## 👨‍💻 Author

Developed by **Your Name**

If you like this project, feel free to ⭐ the repository!

---
