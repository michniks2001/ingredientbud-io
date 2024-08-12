"use client";

import { Stack, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <Stack
      marginTop='10%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgColor='#98eeeb'
      ml='30%'
      mr='30%'
      p={5}
      border='2px solid #87ddda'
      boxShadow='-7px 7px black'
      borderRadius='10px'
    >
      <Heading size='xl'>Welcome to IngrediBud.io!</Heading>
      <Text>Your personal cooking assistant!</Text>
      <Link href='/random-recipe'>
        <Button
          size='lg'
          marginTop='20px'
          color='black'
          _hover={{ bg: "#76ccc9" }}
          bgColor='white'
          border='2px solid #65bbb8'
          borderRadius='10px'
          boxShadow='-4px 4px black'
        >
          Get Started!
        </Button>
      </Link>
    </Stack>
  );
};

export default LandingPage;
