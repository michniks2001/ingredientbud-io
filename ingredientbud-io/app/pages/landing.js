"use client"

import { useState } from "react"
import Navbar from "../components/navbar"
import { Modal, ModalOverlay, ModalContent, FormControl, Stack, Heading, Text, Button, useDisclosure, ModalHeader, ModalBody, ModalCloseButton, FormLabel, Input, ModalFooter } from "@chakra-ui/react"

const LandingPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        user = {
            name: name,
            email: email
        }

        console.log(user)
    }

    return (
        <Stack>
            <Navbar />
            <Stack padding={10} display="flex" justifyContent="center" alignItems="center">
                <Heading>Welcome to IngredientBud</Heading>
                <Text>Join our waitlist!</Text>
                <Text textAlign="center">Enjoy new recipes daily!<br />Participate in our weekly ingredient challenge!</Text>
                <Button onClick={onOpen} colorScheme="cyan" bg="#98eeeb">Join our waitlist now!</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Join our waitlist!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl padding={5}>
                                <FormLabel>Email Address</FormLabel>
                                <Input type="email" value="email" onChange={handleEmailChange} placeholder="Email Address" />
                            </FormControl>
                            <FormControl padding={5}>
                                <FormLabel>Full Name</FormLabel>
                                <Input type="text" value={name} onChange={handleNameChange} placeholder="Full Name" />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleSubmit} colorScheme="cyan" bg="#98eeeb" mr={3}>Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Stack>
        </Stack>
    )
}

export default LandingPage