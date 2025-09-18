import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Order } from "../types/order";
import { fetchCollection } from "../api/api";

type OrderContextType = {
  orders: Order[];
  error: String | null;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
         try {
           const response = await fetchCollection("order");

           setOrders(response.items);
         } catch (err: any) {
          setError(err);
      } 
    }

    setInterval(fetchData, 5000);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, error }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook
export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};
