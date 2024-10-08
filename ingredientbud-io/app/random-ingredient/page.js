"use client";

import Groq from "groq-sdk";
import {
  Box,
  Text,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const IngredientPage = () => {
  const [ingredient, setIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [classification, setClassification] = useState("");

  const classifications = [
    "Any",
    "Staple",
    "Herb",
    "Spice",
    "Protein",
    "Dairy",
    "Fruit",
    "Vegetable",
    "Grain",
    "Legume",
    "Nut/Seed",
    "Fat/Oil",
    "Sweetener",
    "Flavor Enhancer",
    "Baking Ingredient",
    "Leavener",
    "Condiment",
    "Alcoholic Beverage",
    "Non-Alcoholic Beverage",
    "Thickener",
    "Gelling Agent",
    "Preservative",
  ];

  const handleGetIngredient = async () => {
    const ingredientResponse = await getIngredient();
    const ingredientContent =
      ingredientResponse.choices[0]?.message?.content ||
      "Generating Ingredient";
    setIngredient(parseIngredient(ingredientContent));
  };

  const getIngredient = () => {
    // Construct the prompt based on user inputs
    const prompt = `
      Give me a random ingredient.
      Cuisine: ${cuisine || "Any"}
      Diet: ${diet || "Any"}
      Classification (Staple, Herb, Spice, Protein, Dairy, Fruit, Vegetable, Grain, Legume, Nut/Seed, Fat/Oil, Sweetener, Flavor Enhancer, Baking Ingredient, Leavener, Condiment, Beverage, Thickener, Gelling Agent, Preservative): ${classification || "Any"}
      
    `;
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
      model: "llama3-8b-8192",
    });
  };

  const parseIngredient = (ingredientContent) => {
    // Trim and remove any extraneous characters or formatting
    return ingredientContent
      .split("\n")
      .map((line) => line.trim()) // Trim each line
      .filter((line) => line) // Remove empty lines
      .join(", "); // Join all lines into a single string with commas
  };

  return (
    <Box p={5}>
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        mr='20%'
        ml='20%'
        spacing={7}
        mb={5}
        border='2px solid #87ddda'
        bgColor='#98eeeb'
        borderRadius='10px'
        boxShadow='-7px 7px black'
        p={5}
      >
        <Heading>Random Ingredient Generator</Heading>
        <Text>
          Want to challenge yourself? What can you cook with this ingredient?
        </Text>
        <FormControl>
          <FormLabel>Cuisine</FormLabel>
          <Input
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder='e.g., Italian, Mexican'
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _focus={{ boxShadow: "-4px 4px black" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Diet</FormLabel>
          <Input
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder='e.g., Vegetarian, Keto'
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _focus={{ boxShadow: "-4px 4px black" }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type of Ingredient</FormLabel>
          <Select
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _focus={{boxShadow: '-4px 4px black'}}
          >
            {classifications.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          size='lg'
          marginTop='20px'
          color='black'
          _hover={{ bg: "#76ccc9" }}
          bgColor='white'
          border='2px solid #65bbb8'
          borderRadius='10px'
          boxShadow='-4px 4px black'
          onClick={handleGetIngredient}
        >
          Generate Ingredient
        </Button>
      </Stack>

      {ingredient && (
        <Box>
          <Heading as='h3' size='md' mb={2}>
            Ingredient:
          </Heading>
          <Text>
            {ingredient.replaceAll("*", "").replace(",", "").replace(",", ".")}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default IngredientPage;
