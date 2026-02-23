package com.example.demo.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Model.Address;
import com.example.demo.Services.AddressServiceImpl;


@RestController
@RequestMapping("/api/address")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {

    @Autowired
    private AddressServiceImpl addressService;

    // 🔥 SAVE ADDRESS
    @PostMapping
    public String saveAddress(@RequestBody Address address) {
        return addressService.saveAddress(address);
    }

    // 🔥 GET ADDRESS BY USER EMAIL
    @GetMapping
    public List<Address> getAddress(@RequestParam String email) {
        return addressService.getAddressByUserEmail(email);
    }
}
