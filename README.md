# Meme Marketplace

A fully functional React application for browsing and "buying" memes. This project demonstrates modern React patterns including Hooks, Context API, Routing, and TypeScript.

## Features

* **🔐 Auth System:** Mock login with local storage persistence and protected routes.
* **📊 Dashboard:** Admin-like overview with statistics (total memes, categories, popular items).
* **🔎 Browse & Filter:** Advanced filtering (Search, Category) and Sorting (Name, Rating, Size) with debouncing.
* **🛒 Shopping Cart:** Global cart state management using Context API. Add, remove, and adjust quantities.
* **📱 Responsive Design:** Fully responsive layout using Tailwind CSS (Mobile, Tablet, Desktop).
* **📄 Meme Details:** Dedicated detail page for every meme with "Related Memes" suggestions.

## Tech Stack

* **Core:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM (v6)
* **State Management:** React Context API + Custom Hooks
* **Icons:** Lucide React

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/hoch12/meme-marketplace.git](https://github.com/hoch12/meme-marketplace.git)
    cd meme-marketplace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Click the link shown in your terminal (usually `http://localhost:5173`).

## Login Credentials

Since this is a mock application, there is no backend database. You can register/login with any credentials that meet the validation rules:

* **Username:** Minimum 3 characters (e.g., `admin`)
* **Password:** Minimum 5 characters (e.g., `12345`)
