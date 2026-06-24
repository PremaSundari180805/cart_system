import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/products"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load products"
        );
      }

      const data = await response.json();

      setProducts(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.log(error);
      setProducts([]);
      setError(
        "Unable to load products right now."
      );
    }
  };

  const loadCart = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/cart"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load cart"
        );
      }

      const data = await response.json();

      setCart(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setCart([]);
    }
  };

  const addToCart = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/cart",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            product_id: id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to add item to cart"
        );
      }

      setError("");
      loadCart();
    } catch (error) {
      console.log(error);
      setError(
        "Unable to add item to cart."
      );
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to remove item from cart"
        );
      }

      setError("");
      loadCart();
    } catch (error) {
      console.log(error);
      setError(
        "Unable to remove item from cart."
      );
    }
  };

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple E-Commerce</h1>

      {error ? <p>{error}</p> : null}

      <hr />

      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{product.name}</h3>

            <p>Price : Rs. {product.price}</p>

            <button
              onClick={() =>
                addToCart(product.id)
              }
            >
              Add To Cart
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid green",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{item.name}</h3>

            <p>Price : Rs. {item.price}</p>

            <p>
              Quantity : {item.quantity}
            </p>

            <p>
              Total : Rs.{" "}
              {item.price * item.quantity}
            </p>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
