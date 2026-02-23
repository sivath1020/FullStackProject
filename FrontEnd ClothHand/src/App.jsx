import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Mens from "./MainItems/Mens";
import Payment from "./Back/Payment";
import Women from "./MainItems/Women";
import Kids from "./MainItems/Kids";
import Accessories from "./MainItems/Accessories";
import Address from "./Back/Address"
import OrderSuccess from "./Back/OrderSuccess";
import Discount from "./MainItems/Discount"
import Home from "./Main/index";
import Profile from "./Pages/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/index" element={<Home/>} />
        <Route path="/" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Mens" element={<Mens/>} />
        <Route path="/Women" element={<Women/>} />
        <Route path="/Kids" element={<Kids/>} />
        <Route path="/Accessories" element={<Accessories/>} />
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/Address" element={<Address/>}/>
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/Discount"  element={<Discount/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
