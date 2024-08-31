import { Grid2, IconButton, Typography, useTheme } from "@mui/material";
import PageContainer from "../../components/PageContainer";
import api, { ApiResponse } from "../../services/api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import { Domain } from "../../types";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const ListUserDomains = () => {
  const theme = useTheme();
  const [domains, setDomains] = useState<Domain[]>([]);

  const getUserDomains = async () => {
    const response = await api.get<ApiResponse<Domain[]>>("/domain/list-user");

    if (response.data.status === "success") {
      setDomains(response.data.data || []);
    } else {
      toast(response.data.message, { type: "error" });
    }
  };

  const handleDelete = async (domainId: string) => {
    const response = await api.delete<ApiResponse<Domain>>(
      `/domain/${domainId}`
    );

    if (response.data.status === "success") {
      await getUserDomains();

      toast("Domínio deletado com sucesso!", { type: "success" });
    } else {
      toast(response.data.message, { type: "error" });
    }
  };

  useEffect(() => {
    getUserDomains();
  }, []);

  return (
    <PageContainer activePage="list-user-domains">
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
              seus domínios
            </Typography>
          </Grid2>
          <Grid2
            container
            size={{ xs: 12 }}
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            {!domains.length ? (
              <Typography fontSize={16} fontWeight={600}>
                Você ainda não possui nenhum domínio
              </Typography>
            ) : (
              domains.map((domain) => (
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
                        data da aquisição
                      </Typography>
                    </Grid2>
                    <Grid2>
                      <Typography fontSize={16}>
                        {format(domain.createdAt, "dd/MM/yyyy")}
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
                    <IconButton onClick={() => handleDelete(domain._id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid2>
                </Grid2>
              ))
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </PageContainer>
  );
};

export default ListUserDomains;
