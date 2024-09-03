import { Box, Grid2,  Typography, useTheme } from "@mui/material";

const NotFound = () => {

  const theme = useTheme();

  return (
  <Box
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Grid2
        container
        size={{ xs: 10, sm: 8, lg: 6 }}
        spacing={2}
        p={5}
        justifyContent="center"
        sx={{
          background: theme.palette.common.white,
          borderRadius: theme.shape.borderRadius,
          maxWidth: '680px',
        }}
      >
        <Grid2 
          size={{ xs: 12, sm: 10 }}
          sx={{display: 'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
        <Box
            component="img"
            src="https://i.ibb.co/jV7JrxQ/not.jpg"
            alt="Not Found"
            sx={{
              minWidth: '200px',
              width: '50%',
              borderRadius: theme.shape.borderRadius,
            }}
          />
        </Grid2>
        <Grid2 
          size={{ xs: 12, sm: 10 }}
          sx={{display: 'flex',
            alignItems:'center',
            justifyContent:'center',
            width: '80%'
          }}
        >
        <Typography  fontSize={54} lineHeight={1} fontWeight={900}>
          Page Not Found
        </Typography>
      </Grid2>
    </Grid2>
  </Box>
  )
};

export default NotFound;
