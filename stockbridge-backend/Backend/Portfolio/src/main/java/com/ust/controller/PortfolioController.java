package com.ust.controller;

import com.ust.model.Portfolio;
import com.ust.model.Stock;
import com.ust.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/v1/portfolio")
@CrossOrigin(origins = "http://localhost:4200")
public class PortfolioController {

    @Autowired
    PortfolioService portfolioService;

    @GetMapping("/get/{pid}")
    public Portfolio getById(@PathVariable int pid)
    {
        return portfolioService.getById(pid);
    }

    @PostMapping("/save-portfolio")
    public void savePortfolio(@RequestBody Portfolio portfolio)
    {
        portfolioService.savePortfolio(portfolio);

    }

    @GetMapping("/get-all")
    public List<Portfolio> getAllPortfolios(){
        return portfolioService.getAllPortfolios();
    }

    @PutMapping("/add-stock/{pid}")
    public Portfolio addStockToPortfolio(@PathVariable long pid, @RequestBody Stock stock){
        return portfolioService.addStockToPortfolio(pid, stock);
    }

    @PostMapping("/add-favourite-stock/{pid}/{symbol}")
    public Portfolio addFavouriteStock(@PathVariable long pid, @PathVariable String symbol){
        Portfolio portfolio = portfolioService.getById(pid);
        portfolio.getFavouriteStocks().add(symbol);
        portfolioService.savePortfolio(portfolio);
        return portfolio;
    }

    @DeleteMapping("/remove-favourite-stock/{pid}/{symbol}")
    public void removeFavouriteStock(@PathVariable long pid, @PathVariable String symbol){
        Portfolio portfolio = portfolioService.getById(pid);
        portfolio.getFavouriteStocks().removeIf(s -> s.equals(symbol));
        portfolioService.savePortfolio(portfolio);
    }

    @PutMapping("/remove-stock/{pid}/{symbol}/{quantity}")
    public Portfolio removeStockFromPortfolio(@PathVariable long pid, @PathVariable String symbol, @PathVariable int quantity){
        return portfolioService.removeStockFromPortfolio(pid, symbol, quantity);
    }

    @PostMapping("/add-budget/{pid}/{budget}")
    public Portfolio addBudget(@PathVariable long pid, @PathVariable double budget){
        return portfolioService.addBudget(pid, budget);
    }
}
