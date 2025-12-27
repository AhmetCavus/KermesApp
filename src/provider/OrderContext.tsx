import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Order } from "../types/order";
import { useAuth } from "./DataContext";

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
  const { client, isClientInitialized } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isClientInitialized) return;
        const response = await client
          .rest()
          .fetchCollection({ collectionId: "order" });

        setOrders(response);
      } catch (err: any) {
        setError(err);
      }
    };
    fetchData();
  }, [client, isClientInitialized]);

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
