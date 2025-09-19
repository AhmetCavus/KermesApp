import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { Order } from "../types/order";

interface ConfirmDeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteOrder: (order: Order) => void;
  order: Order | null;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  setOpen,
  deleteOrder,
  order: orderToDelete,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Bestellung löschen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sind Sie sicher, dass Sie diese Bestellung löschen möchten? Dieser
            Vorgang kann nicht rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              if (orderToDelete == null) return;
              deleteOrder(orderToDelete);
              setOpen(false);
            }}
            color="error"
          >
            Bestätigen
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteModal;
