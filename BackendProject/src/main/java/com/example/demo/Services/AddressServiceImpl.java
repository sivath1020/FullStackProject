package com.example.demo.Services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Address;
import com.example.demo.Repossitory.AddressRepository;


@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

 

    @Override
public String saveAddress(Address address) {

    // 🔴 null check
    if (address == null) {
        throw new RuntimeException("Address cannot be null");
    }

    // 🔴 required field checks
    if (address.getUserEmail() == null || address.getUserEmail().isEmpty()) {
        throw new RuntimeException("User email is required");
    }

    if (address.getFullName() == null || address.getFullName().isEmpty()) {
        throw new RuntimeException("Full name is required");
    }

    if (address.getPhone() == null || address.getPhone().isEmpty()) {
        throw new RuntimeException("Phone number is required");
    }

    if (address.getCity() == null || address.getCity().isEmpty()) {
        throw new RuntimeException("City is required");
    }

    if (address.getPincode() == null || address.getPincode().isEmpty()) {
        throw new RuntimeException("Pincode is required");
    }

    // 🔴 phone number length check
    if (address.getPhone().length() != 10) {
        throw new RuntimeException("Phone number must be 10 digits");
    }

    // 🔴 pincode length check
    if (address.getPincode().length() != 6) {
        throw new RuntimeException("Pincode must be 6 digits");
    }

    // ✅ ALL CONDITIONS PASSED → SAVE
    addressRepository.save(address);
     return "Address saved successfully";
}


    @Override
    public List<Address> getAddressByUserEmail(String email) {
        return addressRepository.findByUserEmail(email);
    }
}
