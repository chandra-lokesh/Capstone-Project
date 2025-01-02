package com.ust.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    long sid;
    String symbol;
    @OneToMany(cascade = CascadeType.ALL)
    List<Transaction> transactions;
    private boolean isDeleted;
}
