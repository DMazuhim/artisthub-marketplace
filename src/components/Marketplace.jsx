import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ShoppingCart } from "lucide-react";
import axios from "axios";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const API_URL = "http://localhost:1337/api/products";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setProducts(response.data)) 
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => {
          const imageUrl =
            product.gallery?.[0]?.formats?.large?.url ||
            product.gallery?.[0]?.formats?.medium?.url ||
            product.gallery?.[0]?.formats?.small?.url ||
            "/placeholder.jpg"; 

          return (
            <Card key={product.id} className="shadow-md rounded-lg overflow-hidden">
              <img
                src={`http://localhost:1337${imageUrl}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
                <Button className="mt-2 w-full flex items-center justify-center">
                  <ShoppingCart className="mr-2" size={16} /> Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
