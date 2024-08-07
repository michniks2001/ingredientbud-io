"use client"

import { ChakraProvider } from "@chakra-ui/react"
import LandingPage from "./pages/landing"

const Home = () => {
  return (
    <ChakraProvider>
      <LandingPage />
    </ChakraProvider>
  )
}

export default Home