document.addEventListener("DOMContentLoaded", function () {
    const authSection = document.getElementById("auth-section");
    const mainContent = document.getElementById("main-content");
    const authForm = document.getElementById("auth-form");
    const authButton = document.getElementById("auth-button");
    const toggleMode = document.getElementById("toggle-mode");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    let isSignUpMode = true;

    // Auth logic using localStorage
    authForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (isSignUpMode) {
            localStorage.setItem("foodhub_user", username);
            localStorage.setItem("foodhub_pass", password);
            alert("Account created! You can now log in.");
            toggleAuthMode();
        } else {
            const storedUser = localStorage.getItem("foodhub_user");
            const storedPass = localStorage.getItem("foodhub_pass");

            if (username === storedUser && password === storedPass) {
                authSection.classList.add("hidden");
                mainContent.classList.remove("hidden");
            } else {
                alert("Incorrect username or password.");
            }
        }
    });

    toggleMode.addEventListener("click", toggleAuthMode);

    function toggleAuthMode() {
        isSignUpMode = !isSignUpMode;
        authButton.textContent = isSignUpMode ? "Sign Up" : "Log In";
        toggleMode.textContent = isSignUpMode ? "Log In" : "Sign Up";
    }

    // Original recipes
    const recipes = {
        Breakfast: {
            title: "Sweet Potato & Spinach Omelette",
            image: "https://via.placeholder.com/300x200?text=Omelette",
            instructions: "1. Sauté diced sweet potatoes and spinach in olive oil. 2. Whisk eggs and pour over veggies. 3. Cook until set. 4. Fold and serve with toast."
        },
        Lunch: {
            title: "Zesty Lemon Chickpea Wrap",
            image: "https://via.placeholder.com/300x200?text=Chickpea+Wrap",
            instructions: "1. Mash chickpeas with lemon juice, olive oil, and paprika. 2. Add diced tomatoes and cucumbers. 3. Wrap in wholegrain tortilla and enjoy."
        },
        Supper: {
            title: "Ugandan Peanut Stew (Groundnut Sauce)",
            image: "https://via.placeholder.com/300x200?text=Peanut+Stew",
            instructions: "1. Brown onions, garlic, and tomatoes. 2. Stir in natural peanut butter and vegetable broth. 3. Simmer with chopped greens. 4. Serve with steamed matoke or rice."
        },
        Dessert: {
            title: "Tropical Fruit Bowl with Coconut Drizzle",
            image: "https://via.placeholder.com/300x200?text=Tropical+Dessert",
            instructions: "1. Combine chopped mango, pineapple, and banana. 2. Drizzle with coconut cream. 3. Top with toasted coconut flakes and mint."
        }
    };

    const mealCards = document.querySelectorAll(".meal-card");
    const recipeTitle = document.getElementById("recipe-title");
    const recipeImage = document.getElementById("recipe-image");
    const recipeBody = document.getElementById("recipe-body");

    mealCards.forEach(card => {
        card.addEventListener("click", () => {
            const mealType = card.getAttribute("data-meal");
            const recipe = recipes[mealType];

            if (recipe) {
                recipeTitle.textContent = recipe.title;
                recipeImage.src = recipe.image;
                recipeBody.textContent = recipe.instructions;
            }
        });
    });
});
