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
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        const user = userCredential.user;
        // Handle successful login
      })
      .catch((err) => {
        const code = err.code;
        const message = err.message;
        console.error(code, message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // Handle successful Google login
      })
      .catch((err) => {
        const code = err.code;
        const message = err.message;
        console.error(code, message);
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
        onSubmit={handleLogin}
      >
        <Heading as='h2' size='lg' mb={4}>
          Log In
        </Heading>
        <Text>Sign in to access your pantry and favorite recipes!</Text>
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
        <Link href='/pantry'>
          <Button
            onClick={handleLogin}
            size='lg'
            mt='20px'
            color='black'
            _hover={{ bg: "#76ccc9" }}
            bgColor='white'
            border='2px solid #65bbb8'
            borderRadius='10px'
            boxShadow='-4px 4px black'
            _focus={{ boxShadow: "-4px 4px black" }}
          >
            Log In
          </Button>
        </Link>
        <Link href='/pantry'>
          <Button
            onClick={handleGoogleLogin}
            leftIcon={<FcGoogle />}
            size='lg'
            color='black'
            _hover={{ bg: "#76ccc9" }}
            bgColor='white'
            border='2px solid #65bbb8'
            borderRadius='10px'
            boxShadow='-4px 4px black'
            _focus={{ boxShadow: "-4px 4px black" }}
          >
            Log in with Google
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginPage;
