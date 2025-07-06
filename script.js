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


if (product) {
    document.querySelector(".product-title").textContent = product.title;
    const image = document.querySelector(".product-image");
    image.src = product.img;
    image.alt = product.title;
    document.querySelector(".product-price").textContent = "Ціна: " + product.price;
    document.querySelector(".product-description").textContent = product.description;
}