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
    >
      <Heading size='xl'>Welcome to IngrediBud.io!</Heading>
      <Text>Your personal cooking assistant!</Text>
      <Link href='/random-recipe'>
        <Button
          size='lg'
          marginTop='20px'
          color='black'
          colorScheme='cyan'
          bgColor='#98eeeb'
        >
          Get Started!
        </Button>
      </Link>
    </Stack>
  );
};

export default LandingPage;
