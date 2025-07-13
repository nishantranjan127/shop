const User = require('./models/User');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'electronics',
    brand: 'AudioTech',
    stock: 50,
    sku: 'ATH-WH001',
    weight: 0.3,
    dimensions: {
      length: 18,
      width: 16,
      height: 8
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'
    ],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (10 min = 5 hours)',
      'Bluetooth 5.0',
      'Built-in microphone'
    ],
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'headphones'],
    isFeatured: true,
    discount: 30,
    shippingInfo: {
      weight: 0.3,
      dimensions: '18x16x8 cm',
      freeShipping: true
    }
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and water resistance. Track your workouts and health metrics.',
    price: 199.99,
    originalPrice: 249.99,
    category: 'electronics',
    brand: 'FitTech',
    stock: 35,
    sku: 'FT-SW001',
    weight: 0.05,
    dimensions: {
      length: 4.5,
      width: 4.5,
      height: 1.2
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500'
    ],
    features: [
      'Heart rate monitor',
      'GPS tracking',
      'Water resistant (5ATM)',
      '7-day battery life',
      'Sleep tracking',
      '50+ workout modes'
    ],
    tags: ['fitness', 'smartwatch', 'health', 'tracking'],
    isFeatured: true,
    discount: 20,
    shippingInfo: {
      weight: 0.05,
      dimensions: '4.5x4.5x1.2 cm',
      freeShipping: true
    }
  },
  {
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe, 12-cup capacity, and auto-shutoff feature. Perfect for coffee enthusiasts.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'home',
    brand: 'BrewMaster',
    stock: 25,
    sku: 'BM-CM001',
    weight: 2.5,
    dimensions: {
      length: 30,
      width: 20,
      height: 35
    },
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500'
    ],
    features: [
      '12-cup capacity',
      'Thermal carafe',
      'Programmable timer',
      'Auto-shutoff',
      'Brew strength control',
      'Easy-clean design'
    ],
    tags: ['coffee', 'kitchen', 'appliance', 'brewing'],
    isFeatured: false,
    discount: 20,
    shippingInfo: {
      weight: 2.5,
      dimensions: '30x20x35 cm',
      freeShipping: false
    }
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable organic cotton t-shirt available in multiple colors. Sustainable and eco-friendly fashion choice.',
    price: 24.99,
    originalPrice: 29.99,
    category: 'clothing',
    brand: 'EcoWear',
    stock: 100,
    sku: 'EW-TS001',
    weight: 0.2,
    dimensions: {
      length: 70,
      width: 50,
      height: 2
    },
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500'
    ],
    features: [
      '100% organic cotton',
      'Multiple colors available',
      'Sizes XS-XXL',
      'Machine washable',
      'Sustainable production'
    ],
    tags: ['organic', 'cotton', 'tshirt', 'sustainable'],
    isFeatured: false,
    discount: 17,
    shippingInfo: {
      weight: 0.2,
      dimensions: '70x50x2 cm',
      freeShipping: true
    }
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-performance wireless gaming mouse with RGB lighting, 25K DPI sensor, and programmable buttons.',
    price: 69.99,
    originalPrice: 89.99,
    category: 'electronics',
    brand: 'GameTech',
    stock: 40,
    sku: 'GT-WM001',
    weight: 0.12,
    dimensions: {
      length: 12.5,
      width: 6.5,
      height: 3.8
    },
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'
    ],
    features: [
      '25K DPI optical sensor',
      'RGB lighting',
      '7 programmable buttons',
      '2.4GHz wireless',
      '70-hour battery life',
      'On-board memory'
    ],
    tags: ['gaming', 'wireless', 'mouse', 'rgb'],
    isFeatured: true,
    discount: 22,
    shippingInfo: {
      weight: 0.12,
      dimensions: '12.5x6.5x3.8 cm',
      freeShipping: true
    }
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and fitness activities.',
    price: 34.99,
    originalPrice: 44.99,
    category: 'sports',
    brand: 'ZenFit',
    stock: 75,
    sku: 'ZF-YM001',
    weight: 1.8,
    dimensions: {
      length: 183,
      width: 61,
      height: 0.6
    },
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=500',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'
    ],
    features: [
      'Non-slip surface',
      'Eco-friendly materials',
      '6mm thickness',
      '183x61cm size',
      'Includes carrying strap',
      'Easy to clean'
    ],
    tags: ['yoga', 'fitness', 'mat', 'eco-friendly'],
    isFeatured: false,
    discount: 22,
    shippingInfo: {
      weight: 1.8,
      dimensions: '183x61x0.6 cm',
      freeShipping: true
    }
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user'
    });

    // Create products
    const products = await Product.create(sampleProducts);

    console.log('✅ Database seeded successfully!');
    console.log(`👤 Admin user created: ${adminUser.email}`);
    console.log(`👤 Regular user created: ${regularUser.email}`);
    console.log(`📦 ${products.length} products created`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

module.exports = seedData; 