import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar";
import axios from "axios";
import {
  Card,
  CardBody,
  Input,
  Select,
  Image,
  Stack,

  Text,
  Divider,
  CardFooter,
 Alert,
 AlertIcon,
 AlertDescription,
 AlertTitle,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import "../index.css";

export function Products() {
  let [isLoading, setLoading] = useState(false);
  let [isError, setError] = useState(false);
  let [data, setData] = useState([]);
  let [searchInput, setSearchInput] = useState("");
  let [category, setCategory] = useState("");
  let [order, setOrder] = useState("");
  let [cart, setCart] = useState(() => {
    let save = localStorage.getItem("cartItem");
    return save ? JSON.parse(save) : [];
  });
  let toast=useToast()
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cart));
  }, [cart]);

  function handleChange(e) {
    setSearchInput(e.target.value);
  }
  async function getData() {
    setLoading(true);
    try {
      let res = await axios.get(`https://fakestoreapi.com/products`);
      setData(res.data);
      setLoading(false);
      setError(false)
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }
  function handleCategory(e) {
    setCategory(e.target.value);
  }
  function handleOrder(e) {
    setOrder(e.target.value);
  }

  function handleAddCart(ele) {
    setCart([...cart, ele]);
    toast({
      title: 'Item Added to the cart',
      
      status: 'success',
      duration: 9000,
      isClosable: true,

    })
  }

  function filterData() {
    let filterOut = [...data];
    if (searchInput) {
      filterOut = filterOut.filter((ele) =>
        ele.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (order) {
      filterOut = filterOut.sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        }
        if (order === "desc") {
          return b.price - a.price;
        }
      });
    }
    if (category) {
      filterOut = filterOut.filter((ele) => ele.category === category);
    }
    return filterOut;
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchInput, order, category]);
  return (
    <>
      <Navbar />
     
      <br />
      <Input
        placeholder="Search product..."
        onChange={(e) => handleChange(e)}
      />
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <Select
          placeholder="--Select Category--"
          onChange={(e) => handleCategory(e)}>
          <option value="men's clothing">Mens Category</option>
          <option value="women's clothing">Womens Category</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </Select>
        <Select
          placeholder="--Select Price Order--"
          onChange={(e) => handleOrder(e)}
        >
          <option value="asc">Low to High price</option>
          <option value="desc">High to Low Price</option>
        </Select>
      </div>
      <br />
      {
          isLoading?(<Stack>
            <Skeleton height='30px' width='100%'/>
            <Skeleton height='30px' width='100%'/>
            <Skeleton height='30px' width='100%' />
            <Skeleton height='30px' width='100%'/>
            <Skeleton height='30px' width='100%'/>
            <Skeleton height='30px' width='100%' />
            <Skeleton height='30px' width='100%'/>
            <Skeleton height='30px' width='100%'/>
            <Skeleton height='30px' width='100%' />
          </Stack>):(null)
        }
        {
          isError?(<Alert status='error'>
          <AlertIcon />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>Revisit the site sometimes later</AlertDescription>
        </Alert>):(null)
        }
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gridColumnGap: "10px",
          gridGapRow: "20px",
        }}
      >
        
        {filterData().map((ele) => (
          <Card key={ele.id}>
            <CardBody id="card_box">
              <Image
                src={ele.image}
                alt="Green double couch with wooden legs"
                className="image"
              />
              <Stack mt="6" spacing="3">
                <Text size="s">{ele.title}</Text>

                <Text color="blue.600" fontSize="2xl">
                  ${ele.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              {/* <ButtonGroup spacing='1'> */}
              {/* <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button> */}
              <Button
                variant="solid"
                colorScheme="blue"
                w="100%"
                onClick={() => handleAddCart(ele)}
              >
                Add to cart
              </Button>
              {/* </ButtonGroup> */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <></>
    </>
  );
}
