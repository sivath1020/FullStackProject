package com.example.demo.Services;


import java.util.List;

import com.example.demo.Model.Address;

public interface AddressService {

    String saveAddress(Address address);

    List<Address> getAddressByUserEmail(String email);
}

