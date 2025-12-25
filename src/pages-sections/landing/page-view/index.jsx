"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Box from "@mui/material/Box";

// CUSTOM COMPONENTS
// import Header from "../header";
// import Footer from "../footer";
// import Section1 from "../section-1";
// import Section2 from "../section-2";
// import Section3 from "../section-3";
// import Section4 from "../section-4";
// import Section5 from "../section-5";
// import Section6 from "../section-6";
import Setting from "components/settings";
import useUser from "hooks/useUser";
export default function IndexPageView() {
  // const [filterDemo, setFilterDemo] = useState("homepage");
  // const handleChangeFilter = value => setFilterDemo(value);
  // console.log("filterDemo=======>>>>", filterDemo)
  const router = useRouter();

  const { state, dispatch } = useUser();

  
  useEffect(() => {
    
    const userDetails = localStorage.getItem("auth-user");
    const token = localStorage.getItem("auth-token");
    const user = localStorage.getItem("auth-user-role");
    // console.log("user in root", user);
    if (token && user && (state.user === null)) {
      const parsedUser = JSON.parse(userDetails);
      // console.log("user in root set", user);
      dispatch({ type: "SET_USER", payload: parsedUser });

    }
  }, []);


  useEffect(() => {
    router.push('/home');
  }, [router]);


  return <Box id="top" overflow="hidden" bgcolor="background.paper">

    {/* <Header /> */}
    {/* <Section1 /> */}
    {/* <Section6 handleChangeFilter={handleChangeFilter} /> */}
    {/* <Section2 /> */}
    {/* <Section5 /> */}
    {/* <Section3 filterDemo={filterDemo} setFilterDemo={handleChangeFilter} /> */}
    {/* <Section4 /> */}
    {/* <Footer /> */}
    {/* <Setting /> */}
  </Box>;
}