import { Grid2, TextField, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageContainer from "../../components/PageContainer";
import { verifyDomainFormSchema } from "./schema";
import { useState } from "react";
import { VefifyDomainFormData } from "./types";
import api, { ApiResponse } from "../../services/api";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { format } from "date-fns";
import { Domain } from "../../types";

const Home = () => {
  const theme = useTheme();
  const [domain, setDomain] = useState<Domain>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isLoading },
    reset,
  } = useForm({
    resolver: yupResolver(verifyDomainFormSchema),
  });

  const onSubmit = async ({ domain }: VefifyDomainFormData) => {
    const response = await api.post<ApiResponse<Domain>>(
      "/domain/verify-domain",
      { domain }
    );

    if (response.data.status === "success") {
      setDomain(response.data.data || ({ domain } as Domain));
    } else {
      toast(response.data.message, { type: "error" });
    }

    reset();
  };

  return (
    <PageContainer activePage="home">
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
              verifique se seu domínio já foi registrado no Brasil
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Typography fontSize={16} fontWeight={600}>
              digite o domínio para consultar suas informações
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
                  consultar
                </LoadingButton>
              </Grid2>
            </Grid2>
          </form>
          {domain && (
            <Grid2
              container
              size={{ xs: 12 }}
              alignItems="center"
              justifyContent="center"
              spacing={5}
              mt={5}
            >
              <Grid2
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={0}
              >
                <Grid2>
                  <Typography fontSize={16} fontWeight={600}>
                    domínio
                  </Typography>
                </Grid2>
                <Grid2>
                  <Typography fontSize={16}>{domain.domain}</Typography>
                </Grid2>
              </Grid2>
              <Grid2
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={0}
              >
                <Grid2>
                  <Typography fontSize={16} fontWeight={600}>
                    status
                  </Typography>
                </Grid2>
                <Grid2>
                  <Typography
                    color={
                      domain._id
                        ? theme.palette.error.main
                        : theme.palette.success.main
                    }
                    fontSize={16}
                  >
                    {domain._id ? "indisponível" : "disponível"}
                  </Typography>
                </Grid2>
              </Grid2>
              <Grid2
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={0}
              >
                <Grid2>
                  <Typography fontSize={16} fontWeight={600}>
                    data da aquisição
                  </Typography>
                </Grid2>
                <Grid2>
                  <Typography fontSize={16}>
                    {domain.createdAt
                      ? format(domain.createdAt, "dd/MM/yyyy")
                      : "-"}
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default Home;
