import { Button, FormControl, Input, Text, WrapItem, Link, Box, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody, AlertDialog } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/react";

export function SignUp() {
    const navigate = useNavigate();
    const initialAuth = JSON.parse(localStorage.getItem('store'));

    useEffect(() => {
        if (initialAuth && initialAuth.length > 0) {
            navigate('/home');
        }
    }, [navigate]);

    // State for form data
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // State for stored users
    const [store, setStore] = useState(() => {
        const save = localStorage.getItem('store');
        return save ? JSON.parse(save) : [];
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    useEffect(() => {
        localStorage.setItem('store', JSON.stringify(store));
    }, [store]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStore(prev => [...prev, formState]);
        onOpen();
    };

    const handleAlertClose = () => {
        onClose();
        navigate('/login');
    };

    return (<>
      <Text marginTop='-40px' fontSize='65px' fontFamily='fantasy' color='purple'>Shopper Stop</Text>   
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box display="flex" justifyContent="center" alignItems="center"  p="4">
                <FormControl
                    as="form"
                    boxShadow="dark-lg"
                    p="6"
                    rounded="md"
                    bg="white"
                    borderRadius="20px"
                    rowGap="10px"
                    onSubmit={handleSubmit}
                    width={['90%', '70%', '50%', '40%']} // Responsive width
                >
                    <Text fontSize="4xl" color="blue.600" fontWeight="700" mb="6" textAlign="center">
                        Signup
                    </Text>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formState.firstName}
                        onChange={handleChange}
                        my="2"
                        variant="filled"
                        _hover={{ bg: "blue.50" }}
                        _focus={{ borderColor: "blue.400" }}
                    />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formState.lastName}
                        onChange={handleChange}
                        my="2"
                        variant="filled"
                        _hover={{ bg: "blue.50" }}
                        _focus={{ borderColor: "blue.400" }}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                        my="2"
                        variant="filled"
                        _hover={{ bg: "blue.50" }}
                        _focus={{ borderColor: "blue.400" }}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={handleChange}
                        my="2"
                        variant="filled"
                        _hover={{ bg: "blue.50" }}
                        _focus={{ borderColor: "blue.400" }}
                    />
                    <WrapItem display="flex" justifyContent="center" mt="4">
                        <Button type="submit" colorScheme="blue" width="100%">
                            Submit
                        </Button>
                    </WrapItem>
                    <Text mt="4" textAlign="center">
                        <Link href="/login" color="blue.500">
                            Already signed up?
                        </Link>
                    </Text>
                </FormControl>
            </Box>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={handleAlertClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Sign Up Successful
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Thanks for signing up! Now please login.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={handleAlertClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div></>
    );
}
