"use client";

import { Button, HStack, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
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
      </HStack>
    </HStack>
  );
};

export default Navbar;
