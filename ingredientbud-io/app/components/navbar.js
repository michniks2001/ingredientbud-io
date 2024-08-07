"use client"

import { Button, HStack, Heading } from "@chakra-ui/react"

const Navbar = () => {
    return (
        <HStack bg="#98eeeb" width="100vw" justifyContent="space-between" padding={2}>
            <HStack>
                <Heading>
                    IngredientBud.io
                </Heading>
            </HStack>
            <HStack spacing={4}>
                <Button colorScheme="cyan" textColor="black" bg="transparent">
                    About
                </Button>
                <Button colorScheme="cyan" textColor="black" bg="transparent">
                    Sign Up
                </Button>
                <Button colorScheme="cyan" textColor="black" bg="transparent">
                    Log In         
                </Button>
            </HStack>
        </HStack>
    )
}

export default Navbar