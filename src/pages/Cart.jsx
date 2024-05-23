import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import {Input,Box, Card,CardBody,Image,Stack,Heading,Text,Divider,CardFooter,Button,Modal,ModalBody,ModalOverlay,ModalContent,ModalFooter,ModalCloseButton,ModalHeader } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import '../index.css'
import { useNavigate } from "react-router-dom";
export function Cart(){
    let[data,setData]=useState([]);
    let[coupon,setCoupon]=useState();
    let[discount,setDiscount]=useState(0);
    let [total,setTotal]=useState(0);
    let[address,setAddress]=useState({
        name:'',
        email:'',
        mobile:'',
        street:'',
        city:'',
        state:'',
        pincode:''
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    let navigate=useNavigate()

    function getData(){
        let cartItem=JSON.parse(localStorage.getItem('cartItem'));
       setData(cartItem)
    }

    function handleCoupon(e){
setCoupon(e.target.value)
    }
    function handleCouponSubmit(e){
e.preventDefault()
if(coupon==='Cap_06'){
    let total=data.reduce((acc,curr)=>acc+curr.price,0);
 let discounted=total-(total*discount/100);
 let dis=20
 setTotal(discounted)
      setDiscount(dis)
}
else{
    alert('Invalid Coupon')
}

    }

    function handleOrderChange(e){
let{name,value}=e.target;
setAddress({...address,[name]:value})
    }

    function handlePlaceOrder(e){
e.preventDefault();
let match=JSON.parse(localStorage.getItem('user'))
if(match!==null){
  if(address.name==''&&address.email===''&&address.mobile===''&&address.pincode===''&&address.state===''&&address.street==''){
    alert('provide complete information')
}
else{
onOpen()
}
}
else{
  alert('Please login');
  navigate('/login')
}
    }

function handleRemove(index){

let update=data.filter((ele,i)=>i!==index)
setData(update)
 localStorage.setItem('cartItem',JSON.stringify(update))
}

    useEffect(()=>{
        getData()
    },[])
    return(
        <>
       <Navbar/>
     <div id="paymentPage">
        <div className="Cart">
      {
        data.map((ele,i)=>(
            <Card mt={0}  key={i}>
            <CardBody>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                id="image"
                src={ele.image}
                alt={ele.title}
                borderRadius="lg"
              />
            </Box>
              <Stack mt='0' spacing='3'>
                <Heading size='md'>{ele.title}</Heading>
                
                <Text color='blue.600' fontSize='2xl'>
                 ${ele.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              {/* <ButtonGroup spacing='2'> */}
                <Button variant='solid' colorScheme='blue' w='100%' onClick={()=>handleRemove(i)}>
                  Remove
                </Button>
                
              {/* </ButtonGroup> */}
            </CardFooter>
          </Card>
        ))
      } </div> 
      <div>

        <div>
      <Box p={5} mt={5} borderWidth={1} borderRadius="lg" boxShadow="md">
          <Box bg='tomato' w='100%' p={4} color='white' borderTopRadius="lg">
            <Text fontSize='25px' fontWeight='500'>Order Details</Text>
          </Box>
          <Box p={4} display='flex' justifyContent='space-between' alignItems='center'>
            <Text fontSize='20px'>Product Cost</Text>
            <Text fontSize='20px' fontWeight='bold'>${total!==0?(Math.floor(total)):(data.reduce((acc, cur) => acc + Math.floor(cur.price), 0))}</Text>
          </Box>
          <Box p={4} display='flex' justifyContent='space-between' alignItems='center'>
            <Text fontSize='20px'>Product Item</Text>
            <Text fontSize='20px' fontWeight='bold'>{data.length}</Text>
          </Box>
          <Box p={4} display='flex' justifyContent='space-between' alignItems='center'>
            <Text fontSize='20px'>Shipping Charges</Text>
            <Text fontSize='20px' fontWeight='bold'>${0}</Text>
          </Box>
          <Box p={4} display='flex' justifyContent='space-between' alignItems='center'>
            <Text fontSize='20px'>Discount</Text>
            <Text fontSize='20px' fontWeight='bold'>{discount}%</Text>
          </Box>
          <Box>
            <Input placeholder="Enter coupon Code" onChange={(e)=>handleCoupon(e)}></Input>
          </Box><br />
          <Box>
            <Button variant='ghost' colorScheme="teal" width='100%' onClick={(e)=>handleCouponSubmit(e)}>Apply Coupon</Button>
          </Box>
          
        </Box>
         
       </div>
      <div>
  <Box  p={5} mt={5} borderWidth={1} borderRadius="lg" boxShadow="md">
            <Input name="name" value={address.name} type="text" placeholder="Name" onChange={(e)=>handleOrderChange(e)}/><br />
            <Input name="email" value={address.email} type="email" placeholder="Email" onChange={(e)=>handleOrderChange(e)}/><br />
            <Input name="mobile" value={address.mobile} type="number" placeholder="Mobile" onChange={(e)=>handleOrderChange(e)}/><br />
            <Box display='flex'>
                <Input name="street" value={address.street} type="text" placeholder="Street" onChange={(e)=>handleOrderChange(e)}/>
            <Input name="city" value={address.city} type="text" placeholder="City" onChange={(e)=>handleOrderChange(e)}/>
            </Box>
                  <Box display='flex'>
                    <Input name='state' value={address.state} type="text" placeholder="State" onChange={(e)=>handleOrderChange(e)}/>
                    <Input name="pincode" value={address.pincode} type="number" placeholder="Pincode" onChange={(e)=>handleOrderChange(e)}/>

                    </Box>  <br />
                    <Button colorScheme="green" width='100%' onClick={(e)=>handlePlaceOrder(e)}>Place your order</Button>
            </Box></div>
      </div>
      <>
     

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your order has placed 🎉</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Text>You will get your order soon</Text>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' mr={3} onClick={()=>navigate('/products')}>
              Go back to products page
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
     </div>
        </>
    )
}