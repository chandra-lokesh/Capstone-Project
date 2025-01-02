package com.ust.service;

import com.ust.model.Portfolio;
import com.ust.model.Stock;
import com.ust.model.Transaction;
import com.ust.repository.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    TransactionRepo transactionRepo;

    @Autowired
    PortfolioService portfolioService;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    StockService stockService;

    public List<Transaction> getAllTransactions(){
        return transactionRepo.findAll();
    }

    public void addTransaction(long pid, String symbol, Transaction transaction){
        Portfolio portfolio = portfolioService.getById(pid);

        Stock stock = portfolio.getTotalStocks().stream().filter(i->i.getSymbol().equals(symbol)).findFirst().get();
        stock.getTransactions().add(transaction);

        portfolio.setTotalInvestment(portfolio.getTotalInvestment() + (transaction.getPurchasePrice() * transaction.getQuantity()));
        portfolioService.savePortfolio(portfolio);
        stockService.saveStock(stock);
        transactionRepo.save(transaction);

        portfolioService.savePortfolio(portfolio);

    }


    public void removeTransaction(long pid, String symbol, long tid){
        Portfolio portfolio = portfolioService.getById(pid);
        Stock stock = portfolio.getTotalStocks().stream().filter(i->i.getSymbol().equals(symbol)).findFirst().get();

        Transaction transaction = stock.getTransactions().stream().filter(i -> i.getTid() == tid).findFirst().get();

        stock.getTransactions().remove(transaction);

        portfolioService.savePortfolio(portfolio);
    }

    public void removeTransactionByQuantity(long pid, String symbol, long tid, int quantity){
        Portfolio portfolio = portfolioService.getById(pid);
        Stock stock = portfolio.getTotalStocks().stream().filter(i->i.getSymbol().equals(symbol)).findFirst().get();

        Transaction transaction = stock.getTransactions().stream().filter(i -> i.getTid() == tid).findFirst().get();

        transaction.setQuantity(quantity);

        portfolioService.savePortfolio(portfolio);
    }
}
