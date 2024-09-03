"use client";

import { useState } from "react";
import {
  Box,
  FormControl,
  Stack,
  Input,
  FormLabel,
  Button,
  Text,
} from "@chakra-ui/react";

const inputStyles = {
  bgColor: "white",
  border: "2px solid #87ddda",
  boxShadow: "-4px 4px black",
};

const stackStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mr: "20%",
  ml: "20%",
  spacing: 7,
  mb: 5,
  border: "2px solid #87ddda",
  bgColor: "#98eeeb",
  borderRadius: "10px",
  boxShadow: "-7px 7px black",
  p: 5,
};

const buttonStyles = {
  mt: "20px",
  color: "#000",
  bgColor: "#fff",
  border: "2px solid #65bbb8",
  borderRadius: "10px",
  boxShadow: "-4px 4px black",
};

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidPassword = () => {
    return password === setPassword;
  };

  const handleSignUp = () => {
    return isValidPassword();
  };

  return (
    <Box p={5}>
      <Stack sx={stackStyles}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            sx={inputStyles}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            sx={inputStyles}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            sx={inputStyles}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
          />
        </FormControl>
        <Button
          sx={buttonStyles}
          size='lg'
          _hover={{ bg: "#76ccc9" }}
          onClick={handleSignUp}
        >
          Register
        </Button>
      </Stack>
      {isValidPassword ? (
        <Text>User {email} registered successfully</Text>
      ) : (
        <Text>Error, user not registered successfully</Text>
      )}
    </Box>
  );
};

export default SignUpPage;
