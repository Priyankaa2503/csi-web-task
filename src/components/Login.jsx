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
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";

const theme = createTheme();

export default function SignInSide() {
  const router = useRouter();
  const auth = getAuth();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
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
                <div className="flex flex-row gap-5 justify-center items-center">
                  <h1 className="text-xl font-semibold">Sign in</h1>
                  <Avatar sx={{ bgcolor: "#022532" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </div>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                   <button
                type="submit"
                className="text-white w-full h-full text-base justify-center flex items-center font-poppins rounded-lg bg-[#022532] p-4 mt-4"
              >
                Login
              </button>
                
                    
                    
                      <Link href="/signup" variant="body2">
                        <p className="mt-4">{"Don't have an account? Sign Up"}</p>
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
