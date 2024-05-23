import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Alert,
  AlertIcon,
  Text
} from "@chakra-ui/react";

export function Login() {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem('store')) || [];
    const user = auth.find((ele) => ele.email === formState.email && ele.password === formState.password);

    if (user) {
      navigate('/home');
      localStorage.setItem('user',JSON.stringify(formState))
    } else {
      setError('Invalid credentials. Please try again.');
    }
  }

  return (<>
    <Text marginTop='-40px' fontSize='65px' fontFamily='fantasy' color='purple'>Shopper Stop</Text>   
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={handleChange}
            />
          </FormControl>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button type="submit" colorScheme="teal" width="full">
            Login
          </Button>
        </VStack>
      </form>
    </Box></>
  );
}
