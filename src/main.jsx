
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import GlobalStyles from './GlobalStyle.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ChakraProvider>
    {/* <GlobalStyles> */}
    <App />
    {/* </GlobalStyles> */}
    </ChakraProvider>
  </BrowserRouter>,
)
