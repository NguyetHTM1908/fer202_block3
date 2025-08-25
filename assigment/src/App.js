import React, { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import AppRoutes from "./routes/AppRoutes";
import "./styles.css";

function AppContent() {
  const { dark } = useTheme();
  
  const { toasts } = useToast();
  
  const rootClass = useMemo(() => (dark ? "app dark" : "app"), [dark]);

  const dishes = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      name: "Apple",
      image: "images/iphone15promax.jpg",
      price: 1199,
      salePrice: 1099,
      description: "Flagship Apple với chip A17 Pro, màn hình 6.7\" Super Retina XDR.",
      tags: ["hot", "sale"]
    },
    {
      id: 2,
      title: "iPhone 14",
      name: "Apple",
      image: "images/iphone14.jpg",
      price: 799,
      salePrice: 749,
      description: "Thiết kế quen thuộc, chip A15 Bionic, camera kép chất lượng.",
      tags: ["sale"]
    },
    {
      id: 3,
      title: "iPhone 13 Mini",
      name: "Apple",
      image: "images/iphone13mini.jpg",
      price: 699,
      description: "Nhỏ gọn 5.4\", hiệu năng mạnh mẽ, pin được cải thiện.",
      tags: []
    },
    {
      id: 4,
      title: "Samsung Galaxy S23 Ultra",
      name: "Samsung",
      image: "images/galaxys23ultra.jpg",
      price: 1199,
      salePrice: 999,
      description: "Flagship với S-Pen, camera 200MP, Snapdragon 8 Gen 2.",
      tags: ["hot", "sale"]
    },
    {
      id: 5,
      title: "Samsung Galaxy Z Fold 5",
      name: "Samsung",
      image: "images/galaxyzfold5.jpg",
      price: 1799,
      description: "Điện thoại gập 7.6\", đa nhiệm mạnh, thiết kế cao cấp.",
      tags: ["hot"]
    },
    {
      id: 6,
      title: "Samsung Galaxy A54",
      name: "Samsung",
      image: "images/galaxya54.jpg",
      price: 449,
      salePrice: 399,
      description: "Tầm trung nổi bật với màn AMOLED, pin 5000mAh.",
      tags: ["sale"]
    },
    {
      id: 7,
      title: "Xiaomi 13 Pro",
      name: "Xiaomi",
      image: "images/xiaomi13pro.jpg",
      price: 899,
      description: "Camera hợp tác Leica, chip Snapdragon 8 Gen 2, sạc nhanh 120W.",
      tags: ["hot"]
    },
    {
      id: 8,
      title: "Xiaomi Redmi Note 12",
      name: "Xiaomi",
      image: "images/redminote12.jpg",
      price: 299,
      salePrice: 249,
      description: "Phân khúc phổ thông, màn AMOLED 120Hz, pin 5000mAh.",
      tags: ["sale"]
    },
    {
      id: 9,
      title: "Oppo Find X6 Pro",
      name: "Oppo",
      image: "images/oppofindx6pro.jpg",
      price: 1099,
      description: "Camera Hasselblad, màn 2K 120Hz, sạc nhanh 100W.",
      tags: []
    },
    {
      id: 10,
      title: "Vivo X90 Pro+",
      name: "Vivo",
      image: "images/vivox90pro.jpg",
      price: 999,
      description: "Chụp ảnh mạnh mẽ với ZEISS optics, Snapdragon 8 Gen 2.",
      tags: []
    },
    {
      id: 11,
      title: "Google Pixel 7 Pro",
      name: "Google",
      image: "images/pixel7pro.jpg",
      price: 899,
      salePrice: 849,
      description: "Camera AI xuất sắc, Android gốc, chip Tensor G2.",
      tags: ["sale"]
    },
    {
      id: 12,
      title: "OnePlus 11",
      name: "OnePlus",
      image: "images/oneplus11.jpg",
      price: 699,
      description: "Thiết kế đẹp, Snapdragon 8 Gen 2, sạc nhanh 100W.",
      tags: []
    }
  ];

  return (
    <div className={rootClass}>
      <NavBar />

      <main className="content">
        <AppRoutes dishes={dishes} />
      </main>

      <Footer />

      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <SearchProvider>
                <BrowserRouter>
                  <AppContent />
                </BrowserRouter>
              </SearchProvider>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
