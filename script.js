const products = {
    1: {
        title: "Видеокарта",
        price: "25 000 грн",
        img: "12345.jpg",
        description: "Потужна видеокарта для ігор та графіки."
    },
    2: {

    }
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = products[id];

if (window.location.pathname.includes("product.html")) {
    if (product) {
        document.querySelector(".product-title").textContent = product.title;

        const image = document.querySelector(".product-image");
        image.src = product.img;
        image.alt = product.title;

        document.querySelector(".product-price").textContent = "Ціна: " + product.price;
        document.querySelector(".product-description").textContent = product.description;

        const button = document.getElementById("add-to-cart");
        if (button) {
            button.addEventListener("click", () => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];

                cart.push({
                    title: product.title,
                    price: product.price,
                    img: product.img,
                    description: product.description
                });

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Товар додано до кошика!");
            });
        }
    } else {
        document.querySelector(".product-details").innerHTML = "<h2>Товар не знайдено</h2>";
    }
}

if (window.location.pathname.includes("basket.html")) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-container");

    if (container) {
        if (cart.length === 0) {
            container.innerHTML = "<p> Кошик порожній</p>";
        } else {
            cart.forEach(item => {
                const div = document.createElement("div");
                div.className = "cart-item";
                div.innerHTML = `
                    <h2>${item.title}</h2>
                    <img src="${item.img}" alt="${item.title}" width="200">
                    <p><strong>Ціна:</strong> ${item.price}</p>
                    <p>${item.description}</p>
                    <hr>
                `;
                container.appendChild(div);
            });
        }
    }
}