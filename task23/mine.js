
const categoriesList = document.querySelector('.categories ul');
const productsList = document.querySelector('.products ul');
const section3 = document.querySelector('.section_3');
const orderFormSection = document.querySelector('.field');
const orderForm = document.querySelector('form');
const buyButton = document.querySelector('.buyButton')


const categories =[
  {
    id:'cat',
    name: 'Для котів',
    products: [
      {
        id: 'cat1',
        name:'Корм для котів',
        price:'5$',
        description:'Корм для котів Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'cat2',
        name:'Шампунь для котів',
        price:'2$',
        description:'Шампунь для котів Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'cat3',
        name:'Одяг для котів',
        price:'17$',
        description:'Одяг для котів Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      }
    ]
  },
  {
    id:'dog',
    name: 'Для собак',
    products: [
      {
        id: 'dog1',
        name:'Корм для собак',
        price:'15$',
        description:'Корм для собак Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'dog2',
        name:'Шампунь для собак',
        price:'8$',
        description:'Шампунь для собак Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'dog3',
        name:'Одяг для собак',
        price:'25$',
        description:'Одяг для собак Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      }
    ]
  },
  { 
    id:'fish',
    name: 'Для рибок',
    products: [
      {
        id: 'fish1',
        name:'Корм для рибок',
        price:'5$',
        description:'Корм для рибок Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'fish2',
        name:'Акваріум',
        price:'28$',
        description:'Акваріум Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      },
      {
        id: 'fish3',
        name:'Водоочисник',
        price:'25$',
        description:'Водоочисник Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, vel?',
      }
    ]
  },
]



let currentProd = {};

categories.forEach((el)=> {
  console.log(el.name);
  const li = document.createElement('li');
  li.innerText = el.name;
  li.setAttribute('data-id', el.id);
  categoriesList.appendChild(li);
});

categoriesList.addEventListener('click', (e)=>{
  const catId = e.target.dataset.id;
  console.log(catId);

const filteredCat = categories.filter((obj) =>{
  return obj.id === catId;
  });
  console.log(filteredCat);
   
  productsList.innerHTML = '';

  filteredCat[0].products.forEach((product)=>{
    const li = document.createElement('li');
    li.innerText = product.name;
    li.setAttribute('data-id', product.id);
    productsList.appendChild(li); 
  });  
});

productsList.addEventListener('click', (e) => {
  const productId = e.target.dataset.id;

  const filteredProd = categories.flatMap((cat) => cat.products).filter((prod) => {
    return prod.id === productId;
  });
    currentProd = filteredProd[0];

  if (filteredProd.length > 0) {
    const product = filteredProd[0];
    const description = document.createElement('p');
    description.innerText = product.description;
    const price = document.createElement('p');
    price.innerText = `Price: ${product.price}`;

    

    section3.innerHTML = '';
    section3.appendChild(description);
    section3.appendChild(price);
    section3.innerHTML += '<button class ="buyButton">Придбати</button>';
  }
});




let userOrders = {};

// Function to save user orders to local storage
function saveUserOrders() {
  localStorage.setItem('userOrders', JSON.stringify(userOrders));
}

// Function to load user orders from local storage
function loadUserOrders() {
  const storedOrders = localStorage.getItem('userOrders');
  if (storedOrders) {
    userOrders = JSON.parse(storedOrders);
  }
}

// Function to display the list of user orders
function showOrdersList() {
  const ordersListSection = document.querySelector('.orders-list');
  ordersListSection.style.display = 'block';

  const ordersUl = document.querySelector('.orders-ul');
  ordersUl.innerHTML = '';

  userOrders.forEach((order, index) => {
    const orderLi = document.createElement('li');
    orderLi.innerText = `Order ${index + 1} - Date: ${order.date}, Price: ${order.price}`;
    orderLi.setAttribute('data-index', index);
    ordersUl.appendChild(orderLi);

    orderLi.addEventListener('click', () => {
      showOrderDetails(order);
    });
  });
}
// Function to display the details of a specific order
function showOrderDetails(order) {
  const orderDetailsSection = document.querySelector('.order-details');
  orderDetailsSection.innerHTML = '';

  const orderInfo = document.createElement('p');
  orderInfo.innerText = `Order Date: ${order.date}, Total Price: ${order.price}`;
  orderDetailsSection.appendChild(orderInfo);

  order.products.forEach((product) => {
    const productInfo = document.createElement('p');
    productInfo.innerText = `Product Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`;
    orderDetailsSection.appendChild(productInfo);
  });

  orderDetailsSection.style.display = 'block';
}

// Event listener for the "Мої замовлення" button
const ordersBtn = document.querySelector('.orders-btn');
ordersBtn.addEventListener('click', () => {
  // Load user orders from local storage
  loadUserOrders();

  // Hide the categories and products sections
  const categoriesSection = document.querySelector('.categories');
  const productsSection = document.querySelector('.products');
  categoriesSection.style.display = 'none';
  productsSection.style.display = 'none';

  // Show the list of orders
  showOrdersList();
});

// Event listener for the "Придбати" button
buyButton.addEventListener('click', () => {
  // Show the order form section
  const orderFormSection = document.querySelector('.field');
  orderFormSection.style.display = 'block';


  const productNameInput = document.querySelector('#product-name');
  productNameInput.value = currentProd.name;

  const productPriceInput = document.querySelector('#product-price');
  productPriceInput.value = currentProd.price;

  // 
});





