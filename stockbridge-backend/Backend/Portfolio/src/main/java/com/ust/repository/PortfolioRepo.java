package com.ust.repository;

import com.ust.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepo extends JpaRepository<Portfolio, Long> {
}
