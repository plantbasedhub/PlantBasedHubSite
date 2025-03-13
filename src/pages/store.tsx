import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Store.module.css';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const categories = [
    'All Products',
    'Food & Snacks',
    'Drinks',
    'Accessories'
  ];

  const products = [
    {
      id: 1,
      name: 'Vegan Protein Powder',
      price: 29.99,
      category: 'Food & Snacks',
      image: '/product1.jpg',
      description: 'Plant-based protein powder with 20g protein per serving'
    },
    {
      id: 2,
      name: 'Reusable Shopping Bag',
      price: 12.99,
      category: 'Accessories',
      image: '/product2.jpg',
      description: 'Eco-friendly shopping bag made from recycled materials'
    },
    {
      id: 3,
      name: 'Almond Milk',
      price: 4.99,
      category: 'Drinks',
      image: '/product3.jpg',
      description: 'Organic unsweetened almond milk'
    },
    {
      id: 4,
      name: 'Vegan Energy Bars',
      price: 16.99,
      category: 'Food & Snacks',
      image: '/product4.jpg',
      description: 'Pack of 12 plant-based energy bars'
    }
  ];

  const filteredProducts = activeCategory === 'All Products'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <ProtectedRoute>
      <AuthenticatedLayout>
        <div className={styles.storeContainer}>
          <div className={styles.categories}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.productsGrid}>
            {filteredProducts.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className={styles.productFooter}>
                    <span className={styles.price}>${product.price}</span>
                    <button className={styles.addToCartButton}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AuthenticatedLayout>
    </ProtectedRoute>
  );
} 