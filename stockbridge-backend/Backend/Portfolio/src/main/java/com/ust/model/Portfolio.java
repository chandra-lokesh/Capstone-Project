package com.ust.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Portfolio {
    @Id
    long pid;
    long uid;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "portfolio_stock",
            joinColumns = @JoinColumn(name = "portfolio_id"),
            inverseJoinColumns = @JoinColumn(name = "stock_symbol")
    )
    private List<Stock> totalStocks;
    private List<String> favouriteStocks;
    private double budget;
    private double totalInvestment;
    private double totalProfit;
    private boolean isDeleted;
}
