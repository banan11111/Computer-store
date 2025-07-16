const products = {
    1: {
        title: "Видеокарта",
        price: "25 000 грн",
        img: "12345.jpg",
        description: "Відеокарта Gigabyte GeForce RTX 4060 GAMING OC 8G (GV-N4060GAMING OC-8GD)"
    },
    2: {
        title: "Відеокарта",
        price: "100 000 грн",
        img: "12345.jpg",
        description: "Потужна відеокарта для ігор та графікиааааа ааааааааааааааа ааааааааааааааа аааааааааа аааааааааааа."
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
                alert(" Товар додано до кошика!");
            });
        }
    } else {
        document.querySelector(".product-details").innerHTML = "<h2>Товар не знайдено</h2>";
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

                const removeBtn = clone.querySelector(".remove-button");
                removeBtn.addEventListener("click", () => {
                    removeFromCart(index);
                });

                container.appendChild(clone);
            });
        }
    }
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}