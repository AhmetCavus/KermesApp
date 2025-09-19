import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab, Chip, Stack, Typography } from "@mui/material";
import OrderItemCard from "../components/OrderItemCard";
import { Order } from "../types/order"; // ensure path/casing matches

interface OrdersSectionProps {
  orders: Order[];
  onEditOrder?: (order: Order) => void;
  onDeleteOrder?: (order: Order) => void;
  onCardClick?: (order: Order) => void;
}

type StatusKey = Order["status"];

const STATUS_TABS: Array<{ key: StatusKey; label: string }> = [
  { key: "idle", label: "Nicht bearbeitet" },
  { key: "pending", label: "In Bearbeitung" },
  { key: "ready", label: "Bereit" },
  { key: "completed", label: "Fertiggestellt" },
  { key: "canceled", label: "Abgebrochen" },
];

const OrdersSection: React.FC<OrdersSectionProps> = ({
  orders,
  onEditOrder,
  onDeleteOrder,
  onCardClick,
}) => {
  const countsByStatus = useMemo<Record<StatusKey, number>>(() => {
    const acc = { idle: 0, pending: 0, ready: 0, completed: 0, canceled: 0 } as Record<
      StatusKey,
      number
    >;
    for (const o of orders) acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, [orders]);

  const firstNonEmpty: StatusKey =
    STATUS_TABS.find((t) => countsByStatus[t.key] > 0)?.key ?? "idle";

  const [active, setActive] = useState<StatusKey>(firstNonEmpty);

  const grouped = useMemo<Record<StatusKey, Order[]>>(
    () => ({
      idle: orders.filter((o) => o.status === "idle"),
      pending: orders.filter((o) => o.status === "pending"),
      ready: orders.filter((o) => o.status === "ready"),
      completed: orders.filter((o) => o.status === "completed"),
      canceled: orders.filter((o) => o.status === "canceled"),
    }),
    [orders]
  );

  // ---- FIX: include children in the props type
  interface TabPanelProps {
    value: StatusKey;
    current: StatusKey;
    children?: React.ReactNode;
  }
  const TabPanel: React.FC<TabPanelProps> = ({ value, current, children }) => {
    if (value !== current) return null;
    return (
      <Box role="tabpanel" sx={{ pt: 2 }}>
        {children}
      </Box>
    );
  };

  return (
    <Box>
      <Tabs
        value={active}
        onChange={(_e, v) => setActive(v as StatusKey)} // cast to your union type
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Order status tabs"
      >
        {STATUS_TABS.map(({ key, label }) => (
          <Tab
            key={key}
            value={key}
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>{label}</span>
                <Chip size="small" label={countsByStatus[key] ?? 0} />
              </Stack>
            }
          />
        ))}
      </Tabs>

      {STATUS_TABS.map(({ key }) => (
        <TabPanel key={key} value={key} current={active}>
          {grouped[key].length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Keine Bestellungen in diesem Status.
            </Typography>
          ) : (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {grouped[key].map((order) => (
                <OrderItemCard
                  key={order._id}
                  order={order}
                  onEdit={onEditOrder}
                  onDelete={onDeleteOrder}
                  onClick={onCardClick}
                />
              ))}
            </Stack>
          )}
        </TabPanel>
      ))}
    </Box>
  );
};

export default OrdersSection;
