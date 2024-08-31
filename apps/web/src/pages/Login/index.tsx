import { useSession } from "../../hooks/useSession";
import { LoginFormData } from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "./schema";
import { Box, Grid2, TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const { login } = useSession();

  const onSubmit = async ({ password, username }: LoginFormData) => {
    await login(username, password);
  };

  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

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
        spacing={5}
        p={5}
        justifyContent="flex-start"
        sx={{
          background: theme.palette.common.white,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Grid2 size={{ xs: 12, sm: 10 }}>
          <Typography fontSize={56} lineHeight={1} fontWeight={900}>
            consulte domínios de forma fácil e eficiênte
          </Typography>
          <Typography fontSize={16} fontWeight={600}>
            faça o login
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  error={!!errors?.username}
                  helperText={errors?.username?.message}
                  {...register("username")}
                  label="Usuário"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                  {...register("password")}
                  type="password"
                  label="Senha"
                  fullWidth
                />
              </Grid2>
              <Grid2
                size={{ xs: 12 }}
                display="flex"
                justifyContent="flex-end"
                mt={5}
              >
                <LoadingButton
                  size="large"
                  variant="contained"
                  type="submit"
                  loading={isLoading || isSubmitting}
                  disabled={!isValid || isSubmitting}
                  sx={{ textTransform: "none" }}
                >
                  entrar
                </LoadingButton>
              </Grid2>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Login;
