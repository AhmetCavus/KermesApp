import { Box, Container, Fab, Typography } from "@mui/material";
import Header from "../components/MenuHeader";
import NavigationBar from "../components/NavigationBar";
import PinInput from "../components/PinInput";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import OrdersModal from "../components/OrdersModal";
import { Order } from "../types/order";
import OrdersSection from "./OrdersSection";
import OrderEditModal from "../components/OrderEditModal";
import { useOrders } from "../provider/OrderContext";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { useAuth } from "../provider/DataContext";

const OrdersPage: React.FC = () => {
  const [pinUnlocked, setPinUnlocked] = useState(true);
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [openDeleteOrder, setOpenDeleteOrder] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const { orders: remoteOrders } = useOrders();
  const [localOrders, setLocalOrders] = useState<Order[]>(() => {
    return remoteOrders;
  });

  const { client } = useAuth();

  useEffect(() => {
    setLocalOrders(remoteOrders);
  }, [remoteOrders]);

  const validateInput = (input: string) => {
    console.log(input);
    if (input === "hiz25") {
      setPinUnlocked(true);
    } else {
      setPinUnlocked(false);
    }
  };

  const handleCreateNewOrder = async (order: Order) => {
    try {
      await client.rest().addItemToCollection("order", order);
      setLocalOrders((prev) => [...prev, order]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleUpdateOrder = async (updatedOrder: Order) => {
    try {
      await client.rest().updateItem("order", updatedOrder._id.toString(), updatedOrder);
      setLocalOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      setOpenEditOrder(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    try {
      await client.rest().deleteItemFromCollection("order", order._id.toString());
      setLocalOrders((prev) =>
        prev.filter((o) => o._id !== order._id)
      );
      setOpenDeleteOrder(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  return (
    <>
      <NavigationBar />

      <Container style={{ paddingBottom: "100px" }}>
        {!pinUnlocked && <PinInput onComplete={validateInput} />}
        {pinUnlocked && (
          <OrdersSection
            orders={localOrders}
            onEditOrder={(order) => {
              setOrderToEdit(order);
              setOpenEditOrder(true);
            }}
            onDeleteOrder={(order) => {
              setOrderToDelete(order);
              setOpenDeleteOrder(true);
            }}
          />
        )}

        {pinUnlocked && (
          <Box
            sx={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1201,
            }}
          >
            <Fab
              variant="circular"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setOpenCreateOrder(true);
              }}
            >
              <Add />
            </Fab>
          </Box>
        )}
      </Container>

      <OrdersModal
        open={openCreateOrder}
        setOpen={setOpenCreateOrder}
        createNewOrder={handleCreateNewOrder}
      />

      <OrderEditModal
        open={openEditOrder}
        order={orderToEdit}
        onClose={() => setOpenEditOrder(false)}
        onSave={(o) => handleUpdateOrder(o)}
      />

      <ConfirmDeleteModal
        open={openDeleteOrder}
        setOpen={setOpenDeleteOrder}
        deleteOrder={handleDeleteOrder}
        order={orderToDelete}
      />
    </>
  );
};

export default OrdersPage;
