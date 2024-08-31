import { ReactNode } from "react";
import { Box, Grid2 } from "@mui/material";
import { useSession } from "../hooks/useSession";
import Navbar from "./Navbar";

interface PageContainerProps {
  children: ReactNode;
  activePage: "home" | "create-domain" | "list-user-domains";
}

const PageContainer = ({ children, activePage }: PageContainerProps) => {
  const { isLogged } = useSession();

  return (
    <Box height="100vh">
      <Grid2
        container
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        {isLogged && (
          <Grid2 size={{ xs: 12 }} p={3}>
            <Navbar activePage={activePage} />
          </Grid2>
        )}
        <Grid2 container size={{ xs: 12 }} p={3}>
          {children}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PageContainer;
