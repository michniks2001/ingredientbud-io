"use client";

import Groq from "groq-sdk";
import {
  Box,
  Heading,
  List,
  ListItem,
  OrderedList,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const RecipePage = () => {
  const [recipeSections, setRecipeSections] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [include, setInclude] = useState("");
  const [exclude, setExclude] = useState("");

  const handleGetRecipe = async () => {
    const recipe = await getRecipe();
    const recipeContent =
      recipe.choices[0]?.message?.content || "Generating Recipe";
    setRecipeSections(parseRecipe(recipeContent));
  };

  const getRecipe = () => {
    // Construct the prompt based on user inputs
    const prompt = `
      Give me a recipe.
      Cuisine: ${cuisine || "Any"}
      Diet: ${diet || "Any"}
      Include: ${include || "No specific ingredients"}
      Exclude: ${exclude || "No exclusions"}
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

  const parseRecipe = (recipeContent) => {
    const lines = recipeContent.split("\n");
    const sections = [];
    let currentSection = null;

    lines.forEach((line) => {
      const lowerLine = line.toLowerCase().trim().replaceAll("*", "");
      if (lowerLine.includes("ingredients:")) {
        if (currentSection) sections.push(currentSection);
        currentSection = { type: "ingredients", content: [] };
      } else if (lowerLine.includes("instructions:")) {
        if (currentSection) sections.push(currentSection);
        currentSection = { type: "instructions", content: [] };
      } else if (line.trim()) {
        if (!currentSection) {
          currentSection = {
            type: "title",
            content: line.replaceAll("*", "").trim(),
          };
        } else {
          if (currentSection.type === "title") {
            currentSection.content += " " + line.replaceAll("*", "").trim();
          } else {
            if (currentSection.type === "instructions") {
              const strippedLine = line.replace(/^\d+\.\s*/, "").trim(); // Remove existing numbers
              currentSection.content.push(strippedLine);
            } else {
              currentSection.content.push(line.trim());
            }
          }
        }
      }
    });

    if (currentSection) sections.push(currentSection);
    return sections;
  };

  const renderSection = (section) => {
    switch (section.type) {
      case "title":
        return (
          <Heading as='h2' size='lg' mb={4}>
            {section.content}
          </Heading>
        );
      case "ingredients":
        return (
          <Box mb={4}>
            <Heading as='h3' size='md' mb={2}>
              Ingredients:
            </Heading>
            <List spacing={2}>
              {section.content.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </List>
          </Box>
        );
      case "instructions":
        return (
          <Box>
            <Heading as='h3' size='md' mb={2}>
              Instructions:
            </Heading>
            <OrderedList spacing={2}>
              {section.content.map((instruction, index) => (
                <ListItem key={index}>{instruction}</ListItem>
              ))}
            </OrderedList>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      p={5}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Stack spacing={4} mb={5}>
        <FormControl>
          <FormLabel>Cuisine</FormLabel>
          <Input
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder='e.g., Italian, Mexican'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Diet</FormLabel>
          <Input
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder='e.g., Vegetarian, Keto'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Include</FormLabel>
          <Input
            value={include}
            onChange={(e) => setInclude(e.target.value)}
            placeholder='e.g., Chicken, Tomatoes'
          />
        </FormControl>
        <FormControl>
          <FormLabel>Exclude</FormLabel>
          <Input
            value={exclude}
            onChange={(e) => setExclude(e.target.value)}
            placeholder='e.g., Peanuts, Gluten'
          />
        </FormControl>
        <Button onClick={handleGetRecipe}>Submit</Button>
      </Stack>

      {recipeSections.map((section, index) => (
        <Box key={index}>{renderSection(section)}</Box>
      ))}
    </Box>
  );
};

export default RecipePage;
