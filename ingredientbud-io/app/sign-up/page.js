"use client";

import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((err) => {
          const code = err.code;
          const message = err.message;

          console.error(code, message);
        });
    }
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((err) => {
        const code = err.code;
        const message = err.message;
        const email = err.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(err);
      });
  };

  return (
    <Box mt={10} p={5}>
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        mr='20%'
        ml='20%'
        spacing={7}
        mb={5}
        border='solid 2px #87ddda'
        bgColor='#98eeeb'
        borderRadius='10px'
        boxShadow='-7px 7px black'
        p={5}
      >
        <Heading as='h2' size='lg' mb={4}>
          Sign Up
        </Heading>
        <Text>Create an account to save your pantry and favorite recipes!</Text>
        <FormControl id='email'>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            value={email}
            size='lg'
            onChange={(e) => setEmail(e.target.value)}
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _hover={{ boxShadow: "-4px 4px black" }}
            _focus={{ boxShadow: "-4px 4px black", borderColor: "#87ddda" }}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={password}
            size='lg'
            onChange={(e) => setPassword(e.target.value)}
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _hover={{ boxShadow: "-4px 4px black" }}
            _focus={{ boxShadow: "-4px 4px black", borderColor: "#87ddda" }}
          />
        </FormControl>
        <FormControl id='confirm-password'>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type='password'
            value={confirmPassword}
            size='lg'
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(e.target.value === password);
            }}
            borderColor={!passwordsMatch ? "red" : "#87ddda"}
            _focus={{
              borderColor: !passwordsMatch ? "red" : "#87ddda",
              boxShadow: "-4px 4px black",
            }}
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _hover={{ boxShadow: "-4px 4px black" }}
          />
        </FormControl>
        <Button
          onClick={handleSignUp}
          size='lg'
          mt='20px'
          color='black'
          _hover={{ bg: "#76ccc9" }}
          bgColor='white'
          border='2px solid #65bbb8'
          borderRadius='10px'
          boxShadow='-4px 4px black'
        >
          Sign Up
        </Button>
        <Button
          onClick={handleGoogleSignUp}
          leftIcon={<FcGoogle />}
          size='lg'
          color='black'
          _hover={{ bg: "#76ccc9" }}
          bgColor='white'
          border='2px solid #65bbb8'
          borderRadius='10px'
          boxShadow='-4px 4px black'
        >
          Sign up with Google
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpPage;
