const products = {
    1: {
        title: "Відеокарта",
        price: "17 999 грн",
        img: "12345.jpg",
        description: "Відеокарта Gigabyte GeForce RTX 4060 GAMING OC 8G (GV-N4060GAMING OC-8GD)"
    },
    2: {
        title: "Відеокарта",
        price: "14 999 грн",
        img: "123.jpg",
        description: "Відеокарта Gigabyte PCI-Ex GeForce RTX 3060 Gaming OC 12GB GDDR6"
    },
    3: {
        title: "Відеокарта",
        price: "9 999 грн",
        img: "321.webp",
        description: "Відеокарта GeForce RTX 2060 GIGABYTE 6GB GDDR6"
    },
    4: {
        title: "Процесор",
        price: "5 499 грн",
        img: "i3.jpg",
        description: "Процесор Intel Core i3-14100 3.5GHz/12MB (BX8071514100) s1700 BOX"
    },
    5: {
        title: "Процесор",
        price: "9 999 грн",
        img: "i5.jpg",
        description: "Процесор Intel Core i5-14600KF 3.5GHz/24MB (BX8071514600KF) s1700 BOX"
    },
    6: {
        title: "Процесор",
        price: "Ціна: 16 999 грн",
        img: "i7.jpg",
        description: "Процесор Intel Core i7-14700K 3.4GHz/33MB (BX8071514700K) s1700 BOX"
    },
};

function openProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

if (window.location.pathname.includes("product.html")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = products[id];

    if (product) {
    document.querySelector(".product-title").textContent = product.title;
    const image = document.querySelector(".product-image");
    image.src = product.img;
    image.alt = product.title;

    document.querySelector(".product-price").textContent = "Ціна: " + product.price;
    document.querySelector(".product-description").textContent = product.description;

    const addBtn = document.querySelector(".add-to-cart");
    if (addBtn) {
        addBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Товар додано до кошика!");
        });
    }
}
}

if (window.location.pathname.includes("basket.html")) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-container");
    const template = document.getElementById("cart-template");

    if (container && template) {
        if (cart.length === 0) {
            container.innerHTML = "<p> Кошик порожній</p>";
        } else {
            cart.forEach((item, index) => {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".item-title").textContent = item.title;
                clone.querySelector(".item-image").src = item.img;
                clone.querySelector(".item-image").alt = item.title;
                clone.querySelector(".item-price").textContent = "Ціна: " + item.price;
                clone.querySelector(".item-description").textContent = item.description;

                clone.querySelector(".remove-button").addEventListener("click", () => {
                    removeFromCart(index);
                });

                container.appendChild(clone);
            });
        }
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
}

if (window.location.pathname.includes("checkout.html")) {
    const container = document.getElementById("checkout-products");
    const template = document.getElementById("cart-template");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (container && template) {
        if (cart.length === 0) {
            container.innerHTML = "<p> Ваш кошик порожній</p>";
        } else {
            cart.forEach(item => {
                const clone = template.content.cloneNode(true);
                clone.querySelector(".item-title").textContent = item.title;
                clone.querySelector(".item-image").src = item.img;
                clone.querySelector(".item-image").alt = item.title;
                clone.querySelector(".item-price").textContent = "Ціна: " + item.price;
                clone.querySelector(".item-description").textContent = item.description;

                container.appendChild(clone);
            });
        }
    }

    const form = document.getElementById("order-form");
    const message = document.getElementById("confirmation-message");

    form?.addEventListener("submit", function (e) {
        e.preventDefault();
        message.textContent = " Дякуємо! Ваше замовлення прийнято.";
        localStorage.removeItem("cart");
        container.innerHTML = "";
        form.reset();
    });
}

const orderContainer = document.getElementById("order-container");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach(product => {
    const item = document.createElement("div");
    item.classList.add("order-item");

    item.innerHTML = `
        <h2 class="item-title">${product.title}</h2>
        <img class="item-image" src="${product.img}" alt="${product.title}">
        <p class="item-price">Ціна: ${product.price}</p>
        <p class="item-description">${product.description}</p>
    `;

    orderContainer.appendChild(item);
});