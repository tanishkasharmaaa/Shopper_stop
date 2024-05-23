import { Box ,Text,Menu,MenuButton,MenuList,MenuItem,Button} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from '@chakra-ui/icons'
 function Navbar(){
  let navigate=useNavigate();
  let user=JSON.parse( localStorage.getItem('user'))

  function handleLogout(){
    
    
    localStorage.removeItem('user');
alert('Logout Successful')
localStorage.removeItem('user')
  

  }
    return(
        <>
          <Text marginTop='-40px' fontSize='65px' fontFamily='fantasy' color='purple'>Shopper Stop</Text>   
        <Box id="navbar" bg='teal' w='100%' marginTop='0%' p={4} color='white'>
           
        <Link to='/home'><Text fontSize='18px' marginTop='4px' fontWeight='500'>Home</Text></Link>
     
        <Link to='/products' ><Text marginTop='4px'  fontSize='18px' fontWeight='500'>Products</Text></Link>
        <Link to='/cart'><Text marginTop='4px' fontSize='18px' fontWeight='500'>Cart</Text></Link>
        <Menu>
  <MenuButton colorScheme="teal" as={Button} rightIcon={<ChevronDownIcon />}>
    {user?user.email:'Login'}
  </MenuButton>
  <MenuList>
    <MenuItem color='black' onClick={()=>navigate('/cart')}>Cart</MenuItem>
    <MenuItem color='black' onClick={()=>navigate('/products')}>Products</MenuItem>
    <MenuItem color='black' onClick={()=>handleLogout()}>Logout</MenuItem>

  </MenuList>
</Menu>
        </Box></>
    )
}
export {Navbar}