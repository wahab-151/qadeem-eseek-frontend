import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import useUser from "hooks/useUser";

// CUSTOM UTILS LIBRARY FUNCTIONS
import { currency } from "lib";

// ==============================================================

// ==============================================================

export default function ProductPrice({
  price,
  // If 'discount' is a number, treat that as the effective (tier) price.
  // If 'discount' is an object, treat it as pricing tiers (back-compat: discount={pricing}).
  discount,
  // Optional direct pricing prop (new API). If provided, it takes precedence over object-form discount.
  pricing,
  fontSizeIncrease = false,
  quantity = 1,
  userLoggedIn = false,
}) {
  const { state: userState } = useUser();

  const isUserLoggedIn = Boolean(userLoggedIn || userState?.user?.id);

  // Determine effective price for logged-in users
  const userRole = userState?.user?.role;
  const pricingSource = pricing || (discount && typeof discount === "object" ? discount : undefined);
  const explicitEffective = typeof discount === "number" ? discount : undefined;
  const tierPrice =
    explicitEffective != null
      ? explicitEffective
      : userRole && pricingSource && pricingSource[userRole] && typeof pricingSource[userRole].price === "number"
      ? pricingSource[userRole].price
      : undefined;

  if (isUserLoggedIn) {
    const effectivePrice = typeof tierPrice === "number" ? tierPrice : price;
    const showStrikeThrough = typeof price === "number" && effectivePrice !== price;

    return (
      <FlexBox alignItems="center" gap={1} mt={0.5} ml={0.5}>
        <Typography
          variant="h3"
          color="primary"
          sx={{
            fontWeight: 600,
            fontSize: fontSizeIncrease ? "2rem" : "1.5rem",
          }}
        >
          {currency(Number(effectivePrice) || 0)}
        </Typography>

        {showStrikeThrough ? (
          <Box
            component="del"
            fontSize={fontSizeIncrease ? 18 : 14}
            fontWeight={500}
            color="grey.600"
          >
            {currency(Number(price) || 0)}
          </Box>
        ) : null}
      </FlexBox>
    );
  }

  return (
    <FlexBox alignItems="center" gap={1} mt={0.5} ml={0.5}>
      <Typography
        variant="h3"
        color="primary"
        sx={{
          fontWeight: 600,
          fontSize: fontSizeIncrease ? "2rem" : "1.5rem",
        }}
      >
        {currency(Number(price) || 0)}
      </Typography>
    </FlexBox>
  );
}
