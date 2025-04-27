import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

function Layout() {
  return (
    <>
      <Header />
      <Container component="main" sx={{ mt: 4, minHeight: "80vh" }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
