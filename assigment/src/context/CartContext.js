import React, { createContext, useEffect, useMemo, useReducer } from "react";

export const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Nếu đã có thì tăng số lượng lên 1
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        };
      } else {
        // Nếu chưa có thì thêm mới với quantity = 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }

    case 'REMOVE_FROM_CART':
      // Giảm số lượng sản phẩm đi 1, nếu = 0 thì xóa khỏi giỏ hàng
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) }
            : item
        ).filter(item => item.quantity > 0) 
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        cartItems: action.payload.cartItems || []
      };

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [] 
  }); 



  const addToCart = (dish) => {
    dispatch({ type: 'ADD_TO_CART', payload: dish });
  };

 
  
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

 
  
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };


  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


  
  const totalValue = useMemo(() => {
    const sum = state.cartItems.reduce(
      (accumulator, item) =>
        accumulator + parseFloat(item.price) * (item.quantity || 1),
      0
    );
    return sum;
  }, [state.cartItems]);

  
  
  const totalCount = useMemo(() => {
    return state.cartItems.reduce((accumulator, item) => accumulator + (item.quantity || 1), 0);
  }, [state.cartItems]);


  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems"));
    if (Array.isArray(saved)) {

      if (saved.length > 0 && saved[0] && saved[0].quantity == null) {
        const map = new Map();
        for (const it of saved) {
          const prev = map.get(it.id);
          if (prev) {
            map.set(it.id, { ...prev, quantity: (prev.quantity || 1) + 1 });
          } else {
            map.set(it.id, { ...it, quantity: 1 });
          }
        }
        dispatch({ type: 'LOAD_CART', payload: { cartItems: Array.from(map.values()) } });
      } else {
        dispatch({ type: 'LOAD_CART', payload: { cartItems: saved } });
      }
    }
  }, []);

  
  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);


  return (
    <CartContext.Provider
      value={{ 
        cartItems: state.cartItems, 
        addToCart, 
        removeFromCart, 
        removeItem, 
        clearCart, 
        totalValue, 
        totalCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
