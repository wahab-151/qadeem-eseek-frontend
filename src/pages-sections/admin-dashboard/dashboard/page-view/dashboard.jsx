'use client'

import Grid from "@mui/material/Grid2";

// LOCAL CUSTOM COMPONENTS
import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
import StockOutProducts from "../stock-out-products";

// NEW DASHBOARD COMPONENTS
import DashboardStatsCards from "../dashboard-stats-cards";
import RecentOrdersTable from "../recent-orders-table";
import ReturnReplaceRequestsTable from "../return-replace-requests-table";
import UsersProductOrdersTable from "../users-product-orders-table";
import ProductSellingRankingTable from "../product-selling-ranking-table";
import SalespersonCustomersTable from "../salesperson-customers-table";
import SalespersonOrdersByUserTable from "../salesperson-orders-by-user-table";
import useUser from "hooks/useUser";

// DATA TYPES

export default function DashboardPageView() {
  const { state } = useUser();
  const role = state?.user?.role;
  const isSalesperson = role === 'SalesPerson';
  return <div className="pt-2 pb-2">
      <Grid container spacing={3}>
        {/* WELCOME CARD SECTION */}
        {/* <Grid size={{
        md: 6,
        xs: 12
      }}>
          <WelcomeCard />
        </Grid> */}

        {/* DASHBOARD STATS CARDS */}
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <DashboardStatsCards />
        </Grid>

        {/* SALES AREA */}
        <Grid size={12}>
          <Sales />
        </Grid>

        {/* ANALYTICS AREA */}
        {/* <Grid size={12}>
          <Analytics />
        </Grid> */}

        {/* RECENT ORDERS TABLE (Admin only) */}
        {!isSalesperson && (
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <RecentOrdersTable />
        </Grid>)}

        {/* RETURN/REPLACE REQUESTS TABLE (Admin only) */}
        {!isSalesperson && (
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <ReturnReplaceRequestsTable />
        </Grid>)}

        {/* USERS AND PRODUCTS ORDERED TABLE (Admin only) */}
        {!isSalesperson && (
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <UsersProductOrdersTable />
        </Grid>)}

        {/* PRODUCT SELLING RANKING TABLE (Admin only) */}
        {!isSalesperson && (
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <ProductSellingRankingTable />
        </Grid>)}

        {/* SALESPERSON: CUSTOMERS & ORDERS-BY-USER */}
        {isSalesperson && (
        <>
          <Grid size={{
          md: 12,
          xs: 12
        }}>
            <SalespersonCustomersTable />
          </Grid>
          <Grid size={{
          md: 12,
          xs: 12
        }}>
            <SalespersonOrdersByUserTable />
          </Grid>
        </>)}

        {/* STOCK OUT PRODUCTS */}
        <Grid size={{
        md: 12,
        xs: 12
      }}>
          <StockOutProducts />
        </Grid>
      </Grid>
    </div>;
}