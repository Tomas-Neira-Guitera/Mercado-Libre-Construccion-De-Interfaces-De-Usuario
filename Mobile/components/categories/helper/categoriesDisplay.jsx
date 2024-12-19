import { Armchair, Bike, Cable, CookingPot, EyeClosed, Laptop, Shirt, ShoppingBasketIcon, Smartphone, Watch, Volleyball, Glasses, Tablet, Car, ShoppingBag, Gem, Cookie, CookingPotIcon, LampFloor} from 'lucide-react-native'; 
import { Icon } from 'lucide-react-native';
import { bagHand, dress, sneaker, topCrop, bottlePerfume, bottleDispenser } from '@lucide/lab';

export const CategoriesDisplay = {
    furniture: {
      icon: <Armchair/>,
      categoryName: "Furniture",
    },
    beauty: {
      icon: <EyeClosed />,
      categoryName: "Beauty",
    },
    fragrances: {
      icon: <Icon iconNode={bottlePerfume} />,
      categoryName: "Fragrances",
    },
    groceries: {
      icon: <ShoppingBasketIcon/>,
      categoryName: "Groceries",
    },
    "home-decoration": {
      icon: <LampFloor/>,
      categoryName: "Home Decoration",
    },
    "kitchen-accessories": {
      icon: <CookingPot/>,
      categoryName: "Kitchen Accessories",
    },
    laptops: {
      icon: <Laptop/>,
      categoryName: "Laptops",
    },
    shirts: {
      icon: <Shirt />,
      categoryName: "Shirts",
    },
    shoes: {
      icon: <Icon iconNode={sneaker} />,
      categoryName: "Shoes",
    },
    watches: {
      icon: <Watch/>,
      categoryName: "Watches",
    },
    "mobile-accessories": {
      icon: < Cable />,
      categoryName: "Mobile Accessories",
    },
    motorcycle: {
      icon: <Bike/>,
      categoryName: "Motorcycle",
    },
    "skin-care": {
      icon: <Icon iconNode={bottleDispenser} />,
      categoryName: "Skin Care",
    },
    smartphones: {
      icon: <Smartphone/>,
      categoryName: "Smartphones",
    },
    "sports-accessories": {
      icon: <Volleyball />,
      categoryName: "Sports Accessories",
    },
    sunglasses: {
      icon: <Glasses />,
      categoryName: "Sunglasses",
    },
    tablets: {
      icon: <Tablet/>,
      categoryName: "Tablets",
    },
    tops: {
      icon: <Icon iconNode={topCrop}/>,
      categoryName: "Tops",
    },
    vehicle: {
      icon: <Car/>,
      categoryName: "Vehicle",
    },
    bags: {
      icon: <Icon iconNode={bagHand}/>,
      categoryName: "Bags",
    },
    dresses: {
      icon: <Icon iconNode={dress}/>,
      categoryName: "Dresses",
    },
    jewellery: {
      icon: <Gem/>,
      categoryName: "Jewellery",
    },
  };
  