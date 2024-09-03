"use client";

import {
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      window.location.href = "/home";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
        <Link href='/home'>
          <Heading>IngrediBud.io</Heading>
        </Link>
      </HStack>
      <HStack spacing={4} marginRight='10px'>
        <Link href='/about'>
          <Button
            _hover={{ bg: "#87ddda" }}
            textColor='black'
            bg='transparent'
            borderRadius='10px'
          >
            About
          </Button>
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            _hover={{ bg: "#87ddda" }}
            textColor='black'
            bg='transparent'
            borderRadius='10px'
            _focus={{ bg: "#87ddda" }}
          >
            Recipes
          </MenuButton>
          <MenuList>
            <MenuItem _hover={{ bg: "white" }}>
              <Link href='random-recipe'>
                <Button
                  _hover={{ bg: "#87ddda" }}
                  textColor='black'
                  bg='transparent'
                  borderRadius='10px'
                >
                  Random Recipe
                </Button>
              </Link>
            </MenuItem>
            <MenuItem _hover={{ bg: "white" }}>
              <Link href='random-ingredient'>
                <Button
                  _hover={{ bg: "#87ddda" }}
                  textColor='black'
                  bg='transparent'
                  borderRadius='10px'
                >
                  Random Ingredient
                </Button>
              </Link>
            </MenuItem>
            <MenuItem _hover={{ bg: "white" }}>
              <Link href='shopping-list'>
                <Button
                  _hover={{ bg: "#87ddda" }}
                  textColor='black'
                  bg='transparent'
                  borderRadius='10px'
                >
                  Shopping List Generator
                </Button>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
        <Link href='pantry'>
          <Button
            _hover={{ bg: "#87ddda" }}
            textColor='black'
            bg='transparent'
            borderRadius='10px'
          >
            Pantry
          </Button>
        </Link>
        {user ? (
          <Button
            onClick={() => {
              auth.signOut();
              window.location.href = "/home";
            }}
            _hover={{ bg: "#87ddda" }}
            textColor='black'
            bg='transparent'
            borderRadius='10px'
          >
            Sign Out
          </Button>
        ) : (
          <HStack>
            <Link href='sign-up'>
              <Button
                _hover={{ bg: "#87ddda" }}
                textColor='black'
                bg='transparent'
                borderRadius='10px'
              >
                Sign Up
              </Button>
            </Link>
            <Link href='log-in'>
              <Button
                _hover={{ bg: "#87ddda" }}
                textColor='black'
                bg='transparent'
                borderRadius='10px'
              >
                Log In
              </Button>
            </Link>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
}
