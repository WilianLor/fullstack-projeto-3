import { Button, Grid2, useTheme } from "@mui/material";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  activePage: "home" | "create-domain" | "list-user-domains";
}

const Navbar = ({ activePage }: NavbarProps) => {
  const { logout } = useSession();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="space-between"
      direction="row"
    >
      <Grid2
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid2>
          <Button
            sx={{
              textTransform: "none",
              background: "white",
              borderRadius: `${theme.shape.borderRadius * 3}px 0 0 ${theme.shape.borderRadius * 3}px`,
              color: theme.palette.text.primary,
              fontWeight: 600,
              ...(activePage === "home" && { filter: "brightness(.9)" }),

              "&:hover": {
                filter: "brightness(.9)",
              },
            }}
            onClick={() => navigate("/")}
          >
            consultar
          </Button>
        </Grid2>
        <Grid2>
          <Button
            sx={{
              textTransform: "none",
              background: "white",
              color: theme.palette.text.primary,
              borderRadius: 0,
              fontWeight: 600,
              ...(activePage === "create-domain" && {
                filter: "brightness(.9)",
              }),

              "&:hover": {
                filter: "brightness(.9)",
              },
            }}
            onClick={() => navigate("/create-domain")}
          >
            adiquirir
          </Button>
        </Grid2>
        <Grid2>
          <Button
            sx={{
              textTransform: "none",
              background: "white",
              borderRadius: `0 ${theme.shape.borderRadius * 3}px ${theme.shape.borderRadius * 3}px 0`,
              color: theme.palette.text.primary,
              fontWeight: 600,
              ...(activePage === "list-user-domains" && {
                filter: "brightness(.9)",
              }),

              "&:hover": {
                filter: "brightness(.9)",
              },
            }}
            onClick={() => navigate("/list-user-domains")}
          >
            meus domínios
          </Button>
        </Grid2>
      </Grid2>
      <Grid2>
        <Button
          onClick={logout}
          sx={{
            textTransform: "none",
            background: "white",
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.text.primary,
            fontWeight: 600,

            "&:hover": {
              filter: "brightness(.9)",
            },
          }}
        >
          sair
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Navbar;
