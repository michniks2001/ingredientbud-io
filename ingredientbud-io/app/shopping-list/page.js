"use client";

import {
  Heading,
  Text,
  Stack,
  FormControl,
  Input,
  FormLabel,
  Button,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ShoppingList = () => {
  const [dishName, setDishName] = useState("");
  const [shoppingList, setShoppingList] = useState({
    ingredients: [],
    totalPrice: 0,
    notes: "",
  });

  const handleGetShoppingList = async () => {
    const shoppingListResponse = await generateShoppingList();
    const content =
      shoppingListResponse.choices[0]?.message?.content ||
      "Generating Shopping List";
    console.log(content);
    // Parse the content to extract sections
    const sections = parseShoppingList(content);
    setShoppingList(sections);
  };

  const generateShoppingList = () => {
    const prompt = `
    Provide for me a shopping list for the following dish: ${dishName}
    Be sure to provide prices for each item in the list and a total price for the shopping list
    Format should be the following: Ingredient: Price, after you list all the ingredients, Total Cost: cost, Underneath that, Notes: whatever notes you wish to provide
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

  const parseShoppingList = (content) => {
    const lines = content
      .replaceAll("*", "")
      .split("\n")
      .filter((line) => line.trim() !== "");
    const ingredients = [];
    let totalPrice = 0;
    let notes = "";
    let inNotes = false;

    lines.forEach((line) => {
      if (
        line.toLowerCase().startsWith("ingredients:") ||
        line.toLowerCase().startsWith("here")
      ) {
        // Ignore the "Ingredients:" line
      } else if (line.toLowerCase().startsWith("total cost:")) {
        totalPrice = parseFloat(line.split(":")[1].trim().replace("$", ""));
      } else if (line.toLowerCase().startsWith("notes:")) {
        inNotes = true;
      } else if (inNotes) {
        notes += `${line} `;
      } else {
        const [ingredient, price] = line.split(": ");
        if (ingredient && price) {
          ingredients.push({ name: ingredient.trim(), price: price.trim() });
        }
      }
    });

    return { ingredients, totalPrice, notes: notes.trim() };
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
        <Heading>Shopping List Generator</Heading>
        <Text>Provide a dish, we provide your shopping list!</Text>
        <FormControl>
          <FormLabel>Dish Name</FormLabel>
          <Input
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder='e.g., Carbonara, Tacos'
            bgColor='white'
            border='2px solid #87ddda'
            boxShadow='-4px 4px black'
            _focus={{ boxShadow: "-4px 4px black" }}
          />
        </FormControl>
        <Button
          size='lg'
          mt='20px'
          color='black'
          _hover={{ bg: "#76ccc9" }}
          bgColor='white'
          border='2px solid #65bbb8'
          borderRadius='10px'
          boxShadow='-4px 4px black'
          onClick={handleGetShoppingList}
          _focus={{ boxShadow: "-4px 4px black" }}
        >
          Generate Shopping List
        </Button>
      </Stack>
      {shoppingList.ingredients.length > 0 && (
        <Box>
          <Heading as='h3' size='md' mb={2}>
            Shopping List:
          </Heading>
          <UnorderedList>
            {shoppingList.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                {ingredient.name} - {ingredient.price}
              </ListItem>
            ))}
          </UnorderedList>
          <Text mt={3}>
            <strong>Total Cost:</strong> ${shoppingList.totalPrice.toFixed(2)}
          </Text>
          <Text mt={2}>
            <strong>Notes:</strong> {shoppingList.notes}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;
