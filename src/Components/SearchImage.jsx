import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, HStack, Img, Input, InputGroup, InputRightAddon, InputRightElement, Modal, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StackGrid from 'react-stack-grid';
import "../index.css"

const SearchImage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState("random");
    const [photos, setPhotos] = useState([]);
    const [main, setMain] = useState("");

    const getResult = (data) => {
        console.log(data)
        axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${data}&per_page=50&format=json&nojsoncallback=1`)
            .then((r) => {
                console.log(r.data)
                setPhotos(r.data.photos.photo);
            }).catch((e) => {
                console.log(e)
            })
    }
    console.log(photos)

    useEffect(() => {
    }, [search])

    useEffect(() => {
        getResult(search)
    }, [])

    return (
        <Box backgroundImage={
            'url("https://random.imagecdn.app/2000/2000")'
        }
            backdropFilter="blur(10px)"
            backdropBlur={"10px"}
            minHeight="300px"
            backgroundSize={'cover'}
            backgroundPosition={'center center'}

        >

            <Center Center py={10} >
                <Heading color={"white"} as={"h2"}>PicsTics</Heading>
            </Center >

            <HStack py={5} width={["95%", "80%", "60%"]} margin={"auto"}>
                <Input onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search for any image' />
                <Button leftIcon={<SearchIcon />} onClick={() => {
                    console.log("clicked")
                    getResult(search)
                }} >Search</Button>
            </HStack>
            <StackGrid
                duration={1000}
                gutterWidth={10}
                gutterHeight={10}
                columnWidth={200} >
                {photos.map((el) => {
                    return <Box key={el.id}>
                        <Img onClick={() => {
                            onOpen()
                            setMain(`https://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`)
                        }
                        } objectFit={"contain"} className={"imageHover"} _hover={{ fill: "" }} src={`https://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`} />
                    </Box>
                })}
            </StackGrid>
            <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Img padding={"5px"} src={main} width={"100%"} />
                </ModalContent>
            </Modal>

        </Box >
    )
}

export default SearchImage