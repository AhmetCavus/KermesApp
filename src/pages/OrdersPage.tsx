import { Box, Container, Fab, Typography } from "@mui/material"
import Header from "../components/MenuHeader"
import NavigationBar from "../components/NavigationBar"
import PinInput from "../components/PinInput";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import OrdersModal from "../components/OrdersModal";
import { Order } from "../types/order.tmp";
import OrdersSection from "./OrdersSection";
import OrderEditModal from "../components/OrderEditModal";

const OrdersPage: React.FC = () => {

    const [pinUnlocked, setPinUnlocked] = useState(true)
    const [openCreateOrder, setOpenCreateOrder] = useState(false)
    const [openEditOrder, setOpenEditOrder] = useState(false)
    const [editOrder, setEditOrder] = useState<Order | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    
    const validateInput = (input: string) => {
        console.log(input)
        if (input === 'hiz25') {
            setPinUnlocked(true)
        } else {
            setPinUnlocked(false)
        }
    }

    const handleCreateNewOrder = (order: Order) => {
        setOrders((prev) => [...prev, order])
    }
    
    return (
      <>
        <NavigationBar />

        <Container style={{ paddingBottom: "100px" }}>
          <Header />

          {!pinUnlocked && <PinInput onComplete={validateInput} />}
          {pinUnlocked && <OrdersSection orders={orders} onEditOrder={(order) => {
            setEditOrder(order)
            setOpenEditOrder(true)
          }} />}

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
            order={editOrder}
            onClose={() => setOpenEditOrder(false)}
            onSave={(updatedOrder) => {
              setOrders((prev) =>
                prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
              );
              setOpenEditOrder(false);
            }}
        />
      </>
    );
}

export default OrdersPage