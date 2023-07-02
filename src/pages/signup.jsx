import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { app, database, storage } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";

const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const auth = getAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createUserWithEmailAndPassword(
      auth,
      data.get("email"),
      data.get("password")
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Store user in local storage
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/table");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-[#022532] h-screen w-screen px-4 md:px-0  flex justify-center items-center overflow-hidden">
        <div className="bg-[#ffffff] h-[80%]  w-full md:w-[40%]  rounded-md ">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="flex flex-row gap-5 items-center">
                  <h1 className="text-xl font-semibold">Sign up</h1>
                  <Avatar sx={{ bgcolor: "#022532" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </div>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} className="">
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                   
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <button
                type="submit"
                className="text-white w-full h-full text-base justify-center flex items-center font-poppins rounded-lg bg-[#022532] p-4 mt-4"
              >
                Signup
              </button>
                  
                      <Link href="/login" variant="body2">
                       <p className="mt-6"> Already have an account? Sign in</p>
                      </Link>
                  
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
