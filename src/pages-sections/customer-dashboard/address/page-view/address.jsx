import { Fragment } from "react";
import Place from "@mui/icons-material/Place";

// LOCAL CUSTOM COMPONENT
import Pagination from "../../pagination";
import AddressListItem from "../address-item";
import DashboardHeader from "../../dashboard-header";

// CUSTOM DATA MODEL


// =======================================================


// =======================================================

export default function AddressPageView({
  addressList,
  totalPages
}) {
  return <Fragment>
      {/* TITLE HEADER AREA */}
      <DashboardHeader Icon={Place} title="My Addresses" />

      {/* ALL ADDRESS LIST AREA */}
      {addressList.map(address => <AddressListItem key={address.id} address={address} />)}

      {/* PAGINATION AREA */}
      <Pagination count={totalPages} />
    </Fragment>;
}