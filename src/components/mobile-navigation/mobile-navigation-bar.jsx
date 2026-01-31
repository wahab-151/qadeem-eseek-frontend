"use client";

import Badge from "@mui/material/Badge";

// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";

// GLOBAL CUSTOM COMPONENT
import IconComponent from "components/IconComponent";

// STYLED COMPONENTS
import { StyledNavLink, Wrapper } from "./styles";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

import { useState, useEffect } from "react";

export default function MobileNavigationBar({ navigation }) {
  const { state } = useCart();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Calculate total quantity like in header cart
  // Use unique items count to match header cart logic
  const itemCount = mounted ? state?.cart?.length || 0 : 0;

  return (
    <Wrapper>
      {navigation.map(({ icon, href, title, badge }) => (
        <StyledNavLink href={href} key={title}>
          {badge ? (
            <Badge badgeContent={itemCount} color="primary">
              <IconComponent icon={icon} fontSize="small" className="icon" />
            </Badge>
          ) : (
            <IconComponent icon={icon} fontSize="small" className="icon" />
          )}

          {title}
        </StyledNavLink>
      ))}
    </Wrapper>
  );
}
