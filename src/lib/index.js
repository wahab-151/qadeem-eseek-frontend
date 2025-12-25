"use client";

import useGuardedRouter from "hooks/useGuardedRouter";

/**
 * Enhanced navigation hook with route guarding to prevent duplicate calls
 * This hook wraps useGuardedRouter and provides a consistent API
 */
export function useNavigate() {
  const guardedRouter = useGuardedRouter();

  const navigate = (href, options) => {
    return guardedRouter.push(href, options);
  };

  const replace = (href, options) => {
    return guardedRouter.replace(href, options);
  };

  const back = () => {
    guardedRouter.back();
  };

  return { 
    navigate, 
    replace, 
    back, 
    router: guardedRouter.router, // Expose original router if needed
    guardedRouter, // Expose guarded router for advanced use cases
  };
}

import { formatDistanceStrict } from "date-fns";

/**
 * GET THE DIFFERENCE DATE FORMAT
 * @param  DATE | NUMBER | STRING
 * @returns FORMATTED DATE STRING
 */

export function getDateDifference(date) {
  const distance = formatDistanceStrict(new Date(), new Date(date));
  return distance + " ago";
}

/**
 * RENDER THE PRODUCT PAGINATION INFO
 * @param page - CURRENT PAGE NUMBER
 * @param perPageProduct - PER PAGE PRODUCT LIST
 * @param totalProduct - TOTAL PRODUCT NUMBER
 * @returns
 */

export function renderProductCount(page, perPageProduct, totalProduct) {
  let startNumber = (page - 1) * perPageProduct;
  let endNumber = page * perPageProduct;
  if (endNumber > totalProduct) {
    endNumber = totalProduct;
  }
  return `Showing ${startNumber + 1}-${endNumber} of ${totalProduct} products`;
}

/**
 * CALCULATE PRICE WITH PRODUCT DISCOUNT THEN RETURN NEW PRODUCT PRICES
 * @param  price - PRODUCT PRICE
 * @param  discount - DISCOUNT PERCENT
 * @returns - RETURN NEW PRICE
 */

export function calculateDiscount(price, discount) {
  const afterDiscount = Number((price - price * (discount / 100)).toFixed(2));
  return currency(afterDiscount);
}

/**
 * CHANGE THE CURRENCY FORMAT
 * @param  price - PRODUCT PRICE
 * @param  fraction - HOW MANY FRACTION WANT TO SHOW
 * @returns - RETURN PRICE WITH CURRENCY
 */

export function currency(price, fraction = 2) {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    maximumFractionDigits: fraction
  }).format(price);
}