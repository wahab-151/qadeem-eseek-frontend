"use client";
import { Fragment, useEffect, useState } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { useSearchParams } from "next/navigation";

// LOCAL CUSTOM COMPONENTS
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
import { useGetAllOrdersQuery } from "app/store/services";
import { Box, CircularProgress, Typography, Card } from "@mui/material";
import useUser from "hooks/useUser";
import { OrdersSkeleton } from "components/loaders/DashboardSkeletons";

export default function OrdersPageView() {
  const [orders, setOrdersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const { state: userState } = useUser();

  // Get current page from URL
  useEffect(() => {
    const page = searchParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [searchParams]);

  const { data, isLoading, error } = useGetAllOrdersQuery(
    {
      page: currentPage,
      limit: 10,
    },
    {
      skip: !userState?.user?.id,
    },
  );

  useEffect(() => {
    if (data?.data?.orders) {
      setOrdersData(data.data.orders || []);
      setTotalPages(data.data.totalPages || 1);
    }
    if (error) {
      console.error("Error fetching orders:", error);
    }
  }, [data, error]);
  // console.log("data", data);
  return (
    <Fragment>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "700",
          color: "#2C2416",
          mb: { xs: 3, sm: 5 },
          fontSize: { xs: "20px", sm: "24px" },
          fontFamily: "Inter, sans-serif",
        }}
      >
        Orders History
      </Typography>

      {isLoading ? (
        <OrdersSkeleton />
      ) : error ? (
        <Box
          p={4}
          sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="error">Failed to load orders.</Typography>
        </Box>
      ) : (
        <Card
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: "0px",
            boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
            border: "none",
            bgcolor: "#fff",
          }}
        >
          {/* TABLE HEADER - HIDDEN ON XS */}
          <Box
            sx={{
              display: { xs: "none", sm: "grid" },
              gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr",
              pb: 2,
              borderBottom: "1px solid #E0D6C1",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "grey.600", fontWeight: "400", fontSize: "14px" }}
            >
              Number ID
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey.600", fontWeight: "400", fontSize: "14px" }}
            >
              Dates
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey.600", fontWeight: "400", fontSize: "14px" }}
            >
              Status
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "grey.600", fontWeight: "500" }}
            >
              Price
            </Typography>
          </Box>

          {orders?.length > 0 ? (
            <>
              {orders.map((order) => (
                <OrderRow order={order} key={order._id} />
              ))}
              <Box mt={4} display="flex" justifyContent="center">
                <Pagination count={totalPages} page={currentPage} />
              </Box>
            </>
          ) : (
            <Box p={4}>
              <Typography>No orders found.</Typography>
            </Box>
          )}
        </Card>
      )}
    </Fragment>
  );
}
