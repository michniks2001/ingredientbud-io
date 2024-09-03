"use client";

import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const PantryPage = () => {
  const [pantry, setPantry] = useState([]);
  const [pantryItem, setPantryItem] = useState("");
  const [currentItem, setCurrentItem] = useState(""); // State to hold the current item for editing
  const [editIndex, setEditIndex] = useState(null); // State to hold the index of the item being edited

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const addItemToPantry = () => {
    setPantry([...pantry, pantryItem]);
    setPantryItem("");
    onAddClose();
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setCurrentItem(pantry[index]);
    onEditOpen();
  };

  const saveEditedItem = () => {
    const updatedPantry = [...pantry];
    updatedPantry[editIndex] = currentItem;
    setPantry(updatedPantry);
    setEditIndex(null);
    setCurrentItem("");
    onEditClose();
  };

  const removeFromPantry = (index) => {
    const updatedPantry = pantry.filter((_, i) => i !== index);
    setPantry(updatedPantry);
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
        <Heading>Your Pantry</Heading>
        <Stack spacing={5}>
          {pantry.map((item, index) => (
            <Stack
              border='2px solid #76ccc9'
              borderRadius='10px'
              bgColor='#fff'
              boxShadow='-4px 4px black'
              p={3}
              key={index}
              direction='row'
              justifyContent='space-between'
              w='40vw'
              spacing={2}
            >
              <Stack direction='row'>
                <Text as='h2'>{index + 1}.</Text>
                <Text as='h2'>{item}</Text>
              </Stack>
              <Stack direction='row'>
                <Button
                  border='solid 2px #87ddda'
                  bgColor='white'
                  onClick={() => openEditModal(index)}
                  boxShadow='-2px 2px black'
                >
                  Edit
                </Button>
                <Button
                  border='solid 2px #65bbb8'
                  bgColor='white'
                  boxShadow='-2px 2px black'
                  onClick={() => removeFromPantry(index)}
                >
                  Remove
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Button
          size='lg'
          mt='20px'
          color='black'
          _hover={{ bg: "#76ccc9" }}
          bg='white'
          border='2px solid #65bbb8'
          borderRadius='10px'
          boxShadow='-4px 4px black'
          onClick={onAddOpen}
        >
          Add Item
        </Button>

        {/* Add Item Modal */}
        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay />
          <ModalContent
            border='2px solid #76ccc9'
            boxShadow='-7px 7px black'
            borderRadius='10px'
            bgColor='#98eeeb'
          >
            <ModalHeader textAlign='center' fontSize='36px' fontWeight='bold'>
              Add Item
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Input
                  type='text'
                  bgColor='white'
                  mb={5}
                  boxShadow='-4px 4px black'
                  border='solid 2px #76ccc9'
                  _hover={{
                    border: "solid 2px #76ccc9",
                    boxShadow: "-4px 4px black",
                  }}
                  _focus={{
                    boxShadow: "-4px 4px black",
                    border: "solid 2px #76ccc9",
                  }}
                  placeholder='Apple, Orange, Water, etc...'
                  onChange={(e) => setPantryItem(e.target.value)}
                  value={pantryItem}
                />
              </FormControl>
              <Button
                bgColor='white'
                boxShadow='-4px 4px black'
                border='solid 2px #76ccc9'
                mb={5}
                onClick={addItemToPantry}
              >
                Add
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Edit Item Modal */}
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent
            border='2px solid #76ccc9'
            boxShadow='-7px 7px black'
            borderRadius='10px'
            bgColor='#98eeeb'
          >
            <ModalHeader textAlign='center' fontSize='36px' fontWeight='bold'>
              Edit Item
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Edit Item Name</FormLabel>
                <Input
                  type='text'
                  bgColor='white'
                  mb={5}
                  boxShadow='-4px 4px black'
                  border='solid 2px #76ccc9'
                  _hover={{
                    border: "solid 2px #76ccc9",
                    boxShadow: "-4px 4px black",
                  }}
                  _focus={{
                    boxShadow: "-4px 4px black",
                    border: "solid 2px #76ccc9",
                  }}
                  value={currentItem}
                  onChange={(e) => setCurrentItem(e.target.value)}
                />
              </FormControl>
              <Button
                bgColor='white'
                boxShadow='-4px 4px black'
                border='solid 2px #76ccc9'
                mb={5}
                onClick={saveEditedItem}
              >
                Save Changes
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  );
};

export default PantryPage;
