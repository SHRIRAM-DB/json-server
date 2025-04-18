import React, { useCallback, useEffect, useState } from "react";

function Product() {
  const [change, setChange] = useState([]);

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("")

  const [url, setUrl] = useState("http://127.0.0.1:3000/Products");

  const fetchProduct = useCallback(async () => {
    setLoading(true)
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(response.statusText);   
        }
        const data = await response.json();
        setLoading(false)
        setChange(data);
    } catch (error) {
        console.log(error.message);
        setLoading(false)
        setError(error.message);
        
    }

  }, [url]);

  useEffect(() => {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setChange(data));

    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
        {loading && <p><img src="https://i.gifer.com/ZKZg.gif" alt="loading_image" /></p>}

        {error && <p>{error}</p>}

      <div className="buttons">
        <button
          onClick={() => setUrl("http://127.0.0.1:3000/Products")}
          className="button1"
        >
          All
        </button>
        <button
          onClick={() => setUrl("http://127.0.0.1:3000/Products?inStock=true")}
        >
          In Stock Only
        </button>
        {/* <button onClick={() => setUrl("http://127.0.0.1:3000/Products?inStock=false")}>Unavailble Only</button> */}
      </div>
      {change.map((pro) => {
        return (
          <div key={pro.id} className="card">
            <p>{pro.id}</p>
            <p>{pro.name}</p>
            <p style={{ display: "flex", justifyContent: "space-around" }}>
              <span>
                {" "}
                <strong>${pro.price}</strong>
              </span>
              <span>
                <strong>{pro.inStock ? "Instock" : "Unavailble"}</strong>
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
