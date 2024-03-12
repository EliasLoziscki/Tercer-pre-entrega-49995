document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav-toggle').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    document.getElementById('nav-toggle').addEventListener('click', function() {
        let navToggleText = document.getElementById('nav-toggle-text');
        navToggleText.textContent = navToggleText.textContent === 'Menu' ? 'X' : 'Menu';
    });

    const fetchAndUpdateCart = (buttonClass, method, toastMessage) => {
        document.querySelectorAll(buttonClass).forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const cartId = this.getAttribute('data-cart-id');

                fetch(`/api/carts/${cartId}/products/${productId}`, { method })
                    .then(data => {
                        if(data.ok) {
                            Toastify({
                                text: toastMessage,
                                duration: 3000
                            }).showToast();
                            if (method === 'DELETE') location.reload();
                        }
                    })
                    .then(response => response.json())
                    .catch(error => console.log(error));
            });
        });
    };

    fetchAndUpdateCart('.add-to-cart', 'POST', "Producto añadido al carrito");
    fetchAndUpdateCart('.remove-from-cart', 'DELETE', "Producto eliminado del carrito");

    let items = Array.from(document.getElementsByClassName('subtotal'));
    let total = items.reduce((acc, item) => {
        let quantity = parseFloat(item.getAttribute('data-subtotal-quantity'));
        let price = parseFloat(item.getAttribute('data-subtotal-price'));
        return acc + (quantity * price);
    }, 0);

    let totalElement = document.getElementById('total');
    totalElement.textContent = total === 0 ? 'Carrito vacío' : `El total es: ${total.toFixed(2)}`;

});


document.addEventListener('DOMContentLoaded', (event) => {
    const deleteProduct = document.querySelectorAll('.delete-product');
    deleteProduct.forEach((button) => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-pid');
            fetch(`/api/products/${productId}`, { method: 'DELETE' })
            .then(data => {
                    if(data.ok) {
                        Toastify({
                            text: "Producto eliminado",
                            duration: 3000
                        }).showToast();
                        location.reload();
                    }
                })
                .then(response => response.json())
                .catch(error => console.log(error));
        });
    });
});

//finaliza compra

document.addEventListener('DOMContentLoaded', (event) => {
    const purchase = document.querySelectorAll('.purchase');
    purchase.forEach((button) => {
        button.addEventListener('click', function() {
            const cartId = this.getAttribute('data-cart-id');
            fetch(`/api/carts/${cartId}/purchase`, { method: 'PUT' })
            .then(data => {
                    if(data.ok) {
                        Toastify({
                            text: "Compra realizada",
                            duration: 3000
                        }).showToast();
                        location.reload();
                    }
                })
                .then(response => response.json())
                .catch(error => console.log(error));
        });
    });
});