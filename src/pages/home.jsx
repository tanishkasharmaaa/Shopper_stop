import { Navbar}  from "../components/Navbar"
import { Box,Text ,Button} from "@chakra-ui/react"
import '../index.css'

import { useNavigate } from "react-router-dom";

export function Home(){
let navigate=useNavigate()
    return (
        <>
        <Navbar/>
        <Box>
        <Text fontSize='80px' fontWeight='500' style={{color:'#dbdad7'}}>Heavenly place for shopaholics like you</Text>
        </Box>
        <br />
        <Box>
        <Button fontSize='25px' p={10} colorScheme="teal" onClick={()=>navigate('/products')}>Come and Explore</Button>
        </Box>
        </>
    )
}