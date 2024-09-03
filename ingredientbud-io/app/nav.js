"use client";

import {
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "./firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <HStack
      bg='#98eeeb'
      width='100vw'
      justifyContent='space-between'
      padding={2}
      border='2px solid #87ddda'
      borderEndEndRadius='10px'
      borderEndStartRadius='10px'
      boxShadow='-7px 7px black'
    >
      <HStack>
        <Link href='home'>
          <Heading>Ingredibud</Heading>
        </Link>
      </HStack>
      <HStack spacing={4} mr='10px'>
        {!user ? (
          <HStack>
            <Link href='sign-up'>
              <Button>Sign Up</Button>
            </Link>
            <Link href='log-in'>
              <Button>Log In</Button>
            </Link>
          </HStack>
        ) : (
          <Button
            onClick={() => {
              auth.signOut();
              location.reload();
            }}
          >
            Sign Out
          </Button>
        )}
      </HStack>
    </HStack>
  );
}
