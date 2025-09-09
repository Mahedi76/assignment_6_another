

const categoryContainer = document.getElementById('category-container');
const cardContainer = document.getElementById('card-container');
const cartContainer = document.getElementById('cart-container');
const cartTotal = document.getElementById('cart-total');
const spinner = document.getElementById('spinner');


let cart = [];
  
// Load Categories
const loadCategories = async () => {
try {
const res = await fetch('https://openapi.programming-hero.com/api/categories');
const data = await res.json();
displayCategories(data.categories);
} catch (err) {
console.error('Error loading categories:', err);
}
};


// Display Categories
const displayCategories = (categories) => {
categoryContainer.innerHTML = '';


// All Plants button
const allBtn = document.createElement('button');
allBtn.innerText = 'All Plants';
allBtn.className = 'btn btn-outline w-full';
allBtn.onclick = () => {
setActiveCategory(allBtn);
loadPlants();
};
categoryContainer.appendChild(allBtn);

// Other categories
categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat.category_name; 
    btn.className = 'btn btn-outline w-full';
    btn.onclick = () => {
      setActiveCategory(btn);
      loadCategoryPlants(cat.id);
    };
    categoryContainer.appendChild(btn);
  });
};



// Active Category Highlight
const setActiveCategory = (activeBtn) => {
const buttons = categoryContainer.querySelectorAll('button');
buttons.forEach(btn => btn.classList.remove('btn-success'));
activeBtn.classList.add('btn-success');
};

// Load All Plants
const loadPlants = async () => {
toggleSpinner(true);
const res = await fetch('https://openapi.programming-hero.com/api/plants');
const data = await res.json();
displayPlants(data.plants);
toggleSpinner(false);
};


// Load Plants by Category
const loadCategoryPlants = async (id) => {
  toggleSpinner(true);
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    console.log('Category API response:', data); 

    if (data.plants && data.plants.length > 0) {
      displayPlants(data.plants);  
    } else if (data.data && data.data.length > 0) {
      displayPlants(data.data);  
    } else {
      cardContainer.innerHTML = '<p class=\"text-center col-span-3 text-gray-500\">No plants found in this category.</p>';
    }
  } catch (err) {
    console.error('Error loading category plants:', err);
  }
  toggleSpinner(false);
};


// Display Plants
const displayPlants = (plants) => {
  cardContainer.innerHTML = '';
  plants.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'card bg-white shadow-md rounded-xl overflow-hidden';
    card.innerHTML = `
      <figure class="h-40">
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover">
      </figure>
      <div class="p-4">
        <!-- Name -->
        <h3 onclick="showDetails(${plant.id})"
            class="font-bold text-lg text-green-700 cursor-pointer hover:underline">
          ${plant.name}
        </h3>

        <!-- Short Description -->
        <p class="text-sm text-gray-600 mb-2">
          ${plant.description.slice(0, 60)}...
        </p>

        <!-- Category + Price in one line -->
        <div class="flex items-center justify-between">
          <span class="badge badge-outline">${plant.category}</span>
          <span class="font-semibold">৳${plant.price}</span>
        </div>

        <!-- Full width Add to Cart (rounded) -->
        <button class="btn btn-success btn-sm w-full mt-3 rounded-xl" onclick='addToCart(${JSON.stringify(plant)})'>
         Add to Cart
        </button>


        
      </div>
    `;
    cardContainer.appendChild(card);
  });
};


// show Details
const showDetails = async (id) => {
  console.log("Clicked Plant ID:", id);

  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    console.log("Plant details:", data);

    const plant = data.plants; // ✅ FIXED (আগে ছিল data.data)

    // Fill modal content
    document.getElementById('modal-title').innerText = plant.name;
    document.getElementById('modal-img').src = plant.image;
    document.getElementById('modal-desc').innerText = plant.description;

    // Open modal
    document.getElementById('plant-modal').checked = true;
  } catch (err) {
    console.error('Error loading plant details:', err);
  }
};


  // Add to Cart
const addToCart = (plant) => {
  const exists = cart.find(item => item.id === plant.id);
  if (exists) {
  exists.quantity += 1;
  } else {
  cart.push({ ...plant, quantity: 1 });
  }
  displayCart();
  };

  // Display Cart
const displayCart = () => {
  cartContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
  total += item.price * item.quantity;
  const div = document.createElement('div');
  div.className = 'flex items-center justify-between border p-2 rounded';
  div.innerHTML = `
  <span>${item.name} <br><small>৳${item.price} × ${item.quantity}</small></span>
  <button onclick='removeFromCart(${item.id})' class='text-red-500 font-bold'>✖</button>
  `;
  cartContainer.appendChild(div);
  });
  cartTotal.innerText = `৳${total}`;
  };

  // Remove from Cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  displayCart();
  };

  // Spinner toggle
const toggleSpinner = (isLoading) => {
  spinner.classList.toggle('hidden', !isLoading);
  };

  // Init
loadCategories();
loadPlants();