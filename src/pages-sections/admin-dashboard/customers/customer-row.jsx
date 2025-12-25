import Image from "next/image";
import Avatar from "@mui/material/Avatar";


// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  USERTYPE_CHAINSTORE,
  USERTYPE_FRANCHISE,
  USERTYPE_RETAILER,
  USERTYPE_WHOLESALER,
  USERTYPE_SALESPERSON,
} from "utils/constants";
import {
  useApproveCustomerMutation,
  useAssignCustomerToSalesPersonMutation,
  useGetSalesPersonsQuery,
  useRejectCustomerMutation,
  useUpdateUserTypeMutation,
} from "app/store/services";
import { useState } from "react";
import UserForm from "./userForm";
import { useSnackbar } from "notistack";

// ========================================================================
const userTypes = [
  USERTYPE_WHOLESALER,
  USERTYPE_CHAINSTORE,
  USERTYPE_FRANCHISE,
  USERTYPE_RETAILER,
  USERTYPE_SALESPERSON,
];

// ========================================================================

export default function CustomerRow({ customer, refetch }) {
  const { userId, email, name, phone, orders, status, isNew, businessType, assignedSalesPerson } =
    customer;
  const user = {
    isNew: true, // This is just a placeholder, replace with actual logic to determine if the user is new
  };
  const STYLE = {
    fontWeight: 400,
  };
  // console.log("user", customer);
  const [editOpen, setEditOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [approveCustomer] = useApproveCustomerMutation();
  const [rejectCustomer] = useRejectCustomerMutation();
  const [updateUserType] = useUpdateUserTypeMutation();
  const [assignCustomerToSalesPerson] = useAssignCustomerToSalesPersonMutation();
  const { data: salesPersonsData } = useGetSalesPersonsQuery();
  
  // Debug: Log the salespersons data structure
  console.log("SalesPersons Data:", salesPersonsData);
  console.log("Customer assignedSalesPerson:", assignedSalesPerson);
  console.log("Full customer data:", customer);

  const handleApproveCustomer = async () => {
    try {
      const response = await approveCustomer({ userId }).unwrap();
      enqueueSnackbar("Customer approved successfully!", {
        variant: "success",
      });
      await refetch();
      // console.log("Customer approved successfully:", response);
    } catch (error) {
      enqueueSnackbar("Customer update failed", { variant: "error" });
      console.error("Error approving customer:", error);
    }
  };

  const handleRejectCustomer = async () => {
    try {
      const response = await rejectCustomer({ userId }).unwrap();

      enqueueSnackbar("Customer update failed", { variant: "success" });
      await refetch();
      // console.log("Customer update failed", response);
    } catch (error) {
      enqueueSnackbar("Customer update failed", { variant: "error" });
      console.error("Error rejecting customer:", error);
    }
  };

  const onUserTypeChange = async (userId, e) => {
    try {
      const newUserType = e.target.value;
      await updateUserType({ userId, userType: newUserType }).unwrap();
      await refetch();
      enqueueSnackbar("Customer Role Updated Successfully", {
        variant: "success",
      });
      // console.log("Customer Role Updated Successfully", response);
    } catch (error) {
      enqueueSnackbar("Customer role update failed", { variant: "error" });
      console.error("Error changing user type:", error);
    }
  };

  const onSalesPersonChange = async (customerId, e) => {
    try {
      const salesPersonId = e.target.value;
      await assignCustomerToSalesPerson({ customerId, salesPersonId }).unwrap();
      await refetch();
      enqueueSnackbar("Customer assigned to Sales Person successfully!", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to assign customer to sales person", { variant: "error" });
      console.error("Error assigning customer to sales person:", error);
    }
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          {/* <Avatar variant="rounded">
            <Image fill src={avatar} alt={name} sizes="(60px, 60px)" />
          </Avatar> */}

          <Typography variant="h6">{name}</Typography>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {phone}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {email}
      </StyledTableCell>

      {/* <StyledTableCell align="left" sx={STYLE}>
        {currency(balance)}
      </StyledTableCell> */}

      {/* <StyledTableCell align="left" sx={STYLE}>
      {orders}
    </StyledTableCell> */}

      <StyledTableCell align="left" sx={STYLE}>
        <Select
          fullWidth
          value={businessType}
          onChange={(e) => onUserTypeChange(userId, e)}
          variant="outlined"
        >
          {userTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {businessType === "SalesPerson" ? (
          <Typography variant="body2" color="text.secondary">
            Sales Person
          </Typography>
        ) : (
          <Select
            fullWidth
            value={assignedSalesPerson?._id || assignedSalesPerson || ""}
            onChange={(e) => onSalesPersonChange(userId, e)}
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="">
              <em>No Sales Person</em>
            </MenuItem>
            {(salesPersonsData?.message?.salesPersons || salesPersonsData?.data?.salesPersons || salesPersonsData?.salesPersons || []).map((salesPerson) => (
              <MenuItem key={salesPerson._id} value={salesPerson._id}>
                {salesPerson.firstName} {salesPerson.lastName}
              </MenuItem>
            ))}
          </Select>
        )}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {status?.charAt(0)?.toUpperCase() + status.slice(1)}
      </StyledTableCell>

      <StyledTableCell align="center">
        {/* <StyledIconButton>
          <Edit />
        </StyledIconButton> */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {status === "pending" && (
            <Button
              variant="outlined"
              size="small"
              color="success"
              onClick={handleApproveCustomer}
            >
              Approve
            </Button>
          )}
          {(status === "approved" || status === "pending") && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleRejectCustomer}
            >
              {/* {status === "approved" ? "Suspend" :"Reject"} */}
              Reject
            </Button>
          )}
          <StyledIconButton
            onClick={() => {
              setEditOpen(true);
              // console.log("set as edit");
              // setMode("view");
            }}
          >
            <RemoveRedEye />
          </StyledIconButton>
        </Box>

        {/* <StyledIconButton>
        <Delete />
      </StyledIconButton> */}
      </StyledTableCell>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            m: 1,
            p: 2,
            textAlign: "center",
            fontSize: "30px",
            fontWeight: 600,
          }}
        >
          User Details
          <IconButton
            aria-label="close"
            onClick={() => setEditOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.secondary.main,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <UserForm onSuccess={() => setEditOpen(false)} customer={customer} />
        </DialogContent>
      </Dialog>
    </StyledTableRow>
  );
}
