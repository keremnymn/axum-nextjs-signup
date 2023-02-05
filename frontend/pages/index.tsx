import React from "react";
import {
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Button,
  TextField
} from "@mui/material/";
import Head from 'next/head';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { UpdatedProps } from "../src/types";

function SignUp(props: UpdatedProps) {
  const [checkBoxVal, setCheckBoxVal] = React.useState("false");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    props.setbackDropOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let formData = Object.fromEntries(data.entries());
    formData = {
      ...formData,
      email_subscription: checkBoxVal,
      account_type: "normal"
    }

    props.axios
      .post("/api/users/sign-up", formData)
      .then((response) => {
        props.setbackDropOpen(false);
        switch (response.status) {
          case 200:
            props.setDialog({
              title: "Congratulations!",
              text: "We have sent you a confirmation email about your account. <br>Please confirm your email, <b>don't forget to check your spam folder.</b>",
              dialogOpen: true,
            });
            break;
          default:
            console.log("Success!")
            break;
        }
      })
      .catch((error) => {
        props.setbackDropOpen(false);
        switch (error.response.status) {
          case 400:
            props.setDialog({
              title: "Can you already be a member?",
              text: "It's possible that you already signed up with this email. Would you like to try signing in?",
              dialogOpen: true,
              defaultButton: {
                buttonText: "Sign In",
              },
            });
            break;
          default:
            props.setDialog({
              title: "An error occurred",
              text: "We encountered with an unknown problem. To help us fix this, please get in touch with us.",
              dialogOpen: true,
            });
            break;
        }
      });
  };

  return (
    <>
      <Head>
        <title>{"Rust-NextJS-SignUp"}</title>
      </Head>

      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {"Sign Up"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label={"First Name"}
                  autoFocus
                  inputProps={{ maxLength: 30 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label={"Last Name"}
                  name="lastname"
                  autoComplete="family-name"
                  inputProps={{ maxLength: 30, minLength: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={"Email Address"}
                  name="email"
                  autoComplete="email"
                  type="email"
                  inputProps={{ maxLength: 30, minLength: 5 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={"Password"}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputProps={{ maxLength: 30, minLength: 6 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={checkBoxVal}
                      name="email_subscription"
                      id="email_subscription"
                      color="primary"
                      onChange={(e) => {
                        setCheckBoxVal(e.target.checked.toString());
                      }}
                    />
                  }
                  label={"I want to receive inspiration, marketing promotions and updates via email."}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {"Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    alert("not implemented");
                  }}
                  variant="body2"
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;