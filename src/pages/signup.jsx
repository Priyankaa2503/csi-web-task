import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { app, database, storage } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const theme = createTheme();

export default function SignUp() {
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
        // // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        console.log(data.get("firstName") + " " + data.get("lastName"));
        updateProfile(user, {
          displayName: data.get("firstName") + " " + data.get("lastName"),
        });
        setDoc(doc(database, "users", user.uid), {
          uid: user.uid,
          name: data.get("firstName") + " " + data.get("lastName"),
          email: data.get("email"),
        });
       
        // navigate("/explore");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-[#022532] h-screen w-screen z-[10000] flex justify-center items-center">
        <div className="bg-[#ffffff]  h-[80%] w-[35%] p-5 pt-7 rounded-md z-[10000]">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                // marginTop: 8,
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      className="h-[20px]"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
               
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
