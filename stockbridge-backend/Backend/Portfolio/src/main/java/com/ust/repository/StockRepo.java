package com.ust.repository;

import com.ust.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepo extends JpaRepository<Stock, Long> {
    public Stock findBySymbol(String symbol);
}
