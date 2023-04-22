import * as React from "react";
import { useAuth } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";

export const Login = () => {
  const [error, setError] = useState({ username: false, password: false });

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    if (username !== "admin") {
      setError((prevState) => {
        return {
          ...prevState,
          username: true,
        };
      });
      return;
    }

    if (password !== "admin") {
      setError((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
      return;
    }

    auth.signIn(username, () => {
      navigate(from, {
        replace: true,
      });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            error={error.username}
            helperText={error.username && "Логин 'admin'"}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            error={error.password}
            helperText={error.password && "Пароль 'admin'"}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
