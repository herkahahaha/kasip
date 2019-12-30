import React from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Select,
  MenuItem
} from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import { FuseAnimate } from "@fuse";
import { useForm } from "@fuse/hooks";
import clsx from "clsx";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    background:
      "linear-gradient(to right, " +
      theme.palette.primary.dark +
      " 0%, " +
      darken(theme.palette.primary.dark, 0.5) +
      " 100%)",
    color: theme.palette.primary.contrastText
  }
}));

const Register = () => {
  const classes = useStyles();

  const { form, handleChange, resetForm } = useForm({
    name: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
    position: "",
    acceptTermsConditions: false
  });

  const isFormValid = () => {
    return (
      form.email.length > 0 &&
      form.phone.length > 0 &&
      form.password.length > 0 &&
      form.password.length > 3 &&
      form.position &&
      form.password === form.passwordConfirm &&
      form.acceptTermsConditions
    );
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    resetForm();
  };

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        <FuseAnimate animation="transition.expandIn">
          <img className="w-128 mb-32" src="" alt="logo" />
        </FuseAnimate>

        <FuseAnimate animation="transition.slideUpIn" delay={300}>
          <Typography variant="h3" color="inherit" className="font-light">
            Welcome to the Thinktive!
          </Typography>
        </FuseAnimate>

        <FuseAnimate delay={400}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className="max-w-512 mt-16"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            ullamcorper nisl erat, vel convallis elit fermentum pellentesque.
            Sed mollis velit facilisis facilisis.
          </Typography>
        </FuseAnimate>
      </div>

      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="md:w-full mb-32">
              CREATE AN ACCOUNT
            </Typography>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit}
            >
              <TextField
                className="mb-16"
                label="Company Name"
                autoFocus
                type="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                className="mb-16"
                label="Phone"
                autoFocus
                type="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />

              <TextField
                className="mb-16"
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />

              <TextField
                className="mb-16"
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />

              <TextField
                className="mb-16"
                label="Password (Confirm)"
                type="password"
                name="passwordConfirm"
                value={form.passwordConfirm}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />

              <Select
                labelId="position"
                id="position"
                label="position"
                name="position"
                type="position"
                value={form.position}
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="">Position</MenuItem>
                <MenuItem value="Karyawan">Karyawan</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Broker">Broker</MenuItem>
              </Select>

              <FormControl className="items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptTermsConditions"
                      checked={form.acceptTermsConditions}
                      onChange={handleChange}
                    />
                  }
                  label="K-Ship terms and conditions"
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                className="w-full mx-auto mt-16"
                aria-label="Register"
                disabled={!isFormValid()}
                type="submit"
              >
                REGISTER
              </Button>
            </form>

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <span className="font-medium">Already have an account?</span>
              <Link className="font-medium" to="/login">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
};

export default Register;
