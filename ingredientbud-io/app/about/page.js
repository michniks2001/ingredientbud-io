"use client";

import {
  Stack,
  Heading,
  Text,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Image,
  CardBody,
  CardFooter,
  Box,
} from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Stack>
      <Stack
        padding='10px'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Heading marginTop='40px' size='xl'>
          About
        </Heading>
        <Text fontSize='x-large' marginTop='1%'>
          We are IngredientBud.io! It{`'`}s a pleasure to meet you!
        </Text>
      </Stack>
      <Card
        border='solid 2px #98eeeb'
        boxShadow='-7px 7px black'
        maxW='lg'
        padding='10px'
        marginTop='30px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        alignSelf='center'
        marginBottom='30px'
      >
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar
                size='xl'
                name='Samuel Michnik'
                src='https://media.licdn.com/dms/image/D4D03AQH2g5aknyRJ4Q/profile-displayphoto-shrink_400_400/0/1704221938216?e=1728518400&v=beta&t=E-pD_3TDKV-1pnmBh0hTBRSPZPajTAGnUmfoz7SxJyI'
              />
              <Box>
                <Heading size='sm'>Samuel Michnik - Founder</Heading>
                <Text>Founder of IngrediBud</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            As someone who enjoys cooking, I find myself struggling to find new
            dishes to cook and new and exciting ingredients to work with. Here
            at IngrediBud, I hope to take you on a journey around the world one
            ingredient at a time.
          </Text>
        </CardBody>
        <Image
          objectFit='cover'
          src='https://as2.ftcdn.net/v2/jpg/02/54/93/61/1000_F_254936166_5MFxlGv7PNPw4VmpuNNQxlU0K2D4f7Ya.jpg'
          alt='Cooking'
          margin='5px'
          borderRadius='5px'
        />
      </Card>
    </Stack>
  );
};

export default AboutPage;
