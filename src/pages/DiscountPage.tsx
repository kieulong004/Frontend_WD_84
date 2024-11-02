import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  discountAmount: number;
  minOrderValue: number;
  expiryDate: string;
}

const DiscountPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for discounted products
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "DISCOUNT10",
        discountAmount: 10,
        minOrderValue: 50,
        expiryDate: "2023-12-31"
      },
      {
        id: 2,
        name: "DISCOUNT20",
        discountAmount: 20,
        minOrderValue: 100,
        expiryDate: "2023-12-31"
      },
      {
        id: 3,
        name: "DISCOUNT20",
        discountAmount: 20,
        minOrderValue: 100,
        expiryDate: "2023-12-31"
      },
      {
        id: 4,
        name: "DISCOUNT20",
        discountAmount: 20,
        minOrderValue: 100,
        expiryDate: "2023-12-31"
      }
    ];

    // Simulate data fetching
    setTimeout(() => {
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSave = (product: Product) => {
    console.log('Saved product:', product);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Discounted Products</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row justify-content-center">
          {products.map(product => (
            <div className="col-md-6 mb-4" key={product.id}>
              <ProductCard product={product} onSave={handleSave} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscountPage;