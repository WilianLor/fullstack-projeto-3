import { Grid2, TextField, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageContainer from "../../components/PageContainer";
import { createDomainFormSchema } from "./schema";
import api, { ApiResponse } from "../../services/api";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { CreateDomainFormData } from "./types";
import { Domain } from "../../types";
import { useNavigate } from "react-router-dom";

const CreateDomain = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
    reset,
  } = useForm({
    resolver: yupResolver(createDomainFormSchema),
  });

  const onSubmit = async ({ domain }: CreateDomainFormData) => {
    const response = await api.post<ApiResponse<Domain>>("/domain", { domain });

    if (response.data.status === "success") {
      navigate("/list-user-domains");
    } else {
      toast(response.data.message, { type: "error" });
    }
  };

  return (
    <PageContainer activePage="create-domain">
      <Grid2
        container
        size={{ xs: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid2
          container
          size={{ xs: 10, sm: 8, lg: 6 }}
          spacing={3}
          p={5}
          justifyContent="flex-start"
          sx={{
            background: theme.palette.common.white,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Grid2 size={{ xs: 12 }}>
            <Typography fontSize={56} lineHeight={1} fontWeight={900}>
              crie seu domínio
            </Typography>
          </Grid2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container size={{ xs: 12 }} spacing={1}>
              <Grid2>
                <TextField
                  placeholder="domínio"
                  size="medium"
                  error={!!errors?.domain}
                  helperText={errors?.domain?.message}
                  {...register("domain")}
                />
              </Grid2>
              <Grid2>
                <LoadingButton
                  sx={{ textTransform: "none", height: "100%" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading || isSubmitting}
                  disabled={!isValid || isSubmitting}
                >
                  criar
                </LoadingButton>
              </Grid2>
            </Grid2>
          </form>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default CreateDomain;
