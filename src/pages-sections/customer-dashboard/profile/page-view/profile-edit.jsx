import { Fragment } from "react";
import Box from "@mui/material/Box";

// LOCAL CUSTOM COMPONENT
import ProfileEditForm from "../edit-form";

// ===========================================================

// ===========================================================

export default function ProfileEditPageView({ user }) {
  return (
    <Fragment>
      <Box>
        {/* PROFILE EDITOR FORM */}
        <ProfileEditForm />
      </Box>
    </Fragment>
  );
}
