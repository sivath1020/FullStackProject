package com.example.demo.Security;

import java.sql.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

   private static final String SECRET_KEY =
        "sivath@1020sivath@1020sivath@1020sivath@1020";

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(0))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000) )
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()),SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
