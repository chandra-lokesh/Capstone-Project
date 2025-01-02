package com.ust.service;

import com.ust.model.*;
import com.ust.repository.PortfolioRepo;
import com.ust.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

@Service
public class PortfolioService {

    @Autowired
    PortfolioRepo portfolioRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public void savePortfolio(Portfolio portfolio)
    {
        if(!userRepo.existsById(portfolio.getUid()))
            throw new RuntimeException("Enter Valid User Id");
        List<Stock> stockList = portfolio.getTotalStocks();
        double totalInv = 0;
        double totalPro = 0;

        portfolio.setTotalInvestment(totalInv);
        portfolio.setTotalProfit(totalPro);
        portfolioRepo.save(portfolio);
    }

    public Portfolio getById(long pid)
    {
        Portfolio portfolio = portfolioRepo.findById(pid).get();
        double totalPro = 0;
        double currentPrice = 0;
        for(Stock s: portfolio.getTotalStocks()){
//            String searchUrl = "https://financialmodelingprep.com/api/v3/profile/" + s.getSymbol() + "?apikey=ZODATH6Z10JzsSZxli4IF3g05VCy0cqv";
            String searchUrl = "https://financialmodelingprep.com/api/v3/profile/" + s.getSymbol() + "?apikey=9IXI7KzExc1xmRqOCLLGE83MP2gCGEE5";
                    List<InformationApiResponse> informationData = webClientBuilder.build()
                    .get()
                    .uri(searchUrl)
                    .retrieve()
                    .bodyToFlux(InformationApiResponse.class)
                    .collectList()
                    .block();
            currentPrice = informationData.get(0).getPrice();
            for(Transaction t: s.getTransactions()){
                totalPro = portfolio.getTotalProfit() + (currentPrice - t.getPurchasePrice()) * t.getQuantity();
            }
        }
        portfolio.setTotalProfit(totalPro);
        portfolioRepo.save(portfolio);
        return portfolioRepo.findById(pid).get();
    }

    public List<Portfolio> getAllPortfolios(){
        return portfolioRepo.findAll();
    }

    public Portfolio addStockToPortfolio(long pid, Stock stock){


        Portfolio portfolio = portfolioRepo.findById(pid).get();
        List<Stock> stocks = portfolio.getTotalStocks();
        Transaction transaction = stock.getTransactions().get(0);
        transaction.setTransactionDateTime(LocalDateTime.now());
        String searchUrl = "https://financialmodelingprep.com/api/v3/profile/" + stock.getSymbol() + "?apikey=Az5SbJs9FOZGxCLnMCTL7gtgm7YZLzqg";
        double totalPro = 0;
        List<InformationApiResponse> informationData = webClientBuilder.build()
                .get()
                .uri(searchUrl)
                .retrieve()
                .bodyToFlux(InformationApiResponse.class)
                .collectList()
                .block();
        double currentPrice = informationData.get(0).getPrice();
        transaction.setPurchasePrice(currentPrice);
        if(portfolio.getBudget() < transaction.getPurchasePrice() * transaction.getQuantity())
            throw new RuntimeException("Budget Insufficient!");
        boolean isStockExist = false;
        for(Stock s: stocks){
            if(s.getSymbol().equals(stock.getSymbol())){
                isStockExist = true;
                s.getTransactions().add(stock.getTransactions().get(0));
                break;
            }
        }
        if(!isStockExist)
            portfolio.getTotalStocks().add(stock);
        portfolio.setBudget(portfolio.getBudget() - (transaction.getPurchasePrice() * transaction.getQuantity()));
        portfolio.setTotalInvestment(portfolio.getTotalInvestment() + (transaction.getPurchasePrice()) * transaction.getQuantity());
        portfolio.setTotalProfit(0);
        portfolioRepo.save(portfolio);
        return portfolio;
    }


    public Portfolio removeStockFromPortfolio(long pid, String symbol, int quantity){
        Portfolio portfolio = portfolioRepo.findById(pid).get();
        Stock stock = portfolio.getTotalStocks().stream().filter(i -> i.getSymbol().equals(symbol)).toList().get(0);
        int totalQuantity = stock.getTransactions()
                .stream()
                .mapToInt(Transaction::getQuantity)
                .sum();
        if(quantity > totalQuantity){
            throw new RuntimeException("You don't have enough quantity to sell!");
        }

        String searchUrl = "https://financialmodelingprep.com/api/v3/profile/" + stock.getSymbol() + "?apikey=Az5SbJs9FOZGxCLnMCTL7gtgm7YZLzqg";
        double totalPro = 0;
        List<InformationApiResponse> informationData = webClientBuilder.build()
                .get()
                .uri(searchUrl)
                .retrieve()
                .bodyToFlux(InformationApiResponse.class)
                .collectList()
                .block();
        double currentPrice = informationData.get(0).getPrice();
        double profit = 0;
        double returns = 0;
        double totPurchasedPrice = 0;


        Iterator<Transaction> iterator = stock.getTransactions().iterator();

        while(iterator.hasNext() && quantity > 0){
            Transaction t = iterator.next();
            if(t.getQuantity() > quantity){
                System.out.println("if: quantity: " + quantity);
                profit = (currentPrice - t.getPurchasePrice()) * quantity;
                returns += t.getPurchasePrice() * quantity;
                totPurchasedPrice += t.getPurchasePrice() * quantity;
                t.setQuantity(t.getQuantity()-quantity);
                break;
            }
            else{
                System.out.println("else: quantity: " + quantity);
                profit = (currentPrice - t.getPurchasePrice()) * t.getQuantity();
                returns += t.getPurchasePrice() * t.getQuantity();
                quantity = quantity - t.getQuantity();
                totPurchasedPrice += t.getPurchasePrice() * t.getQuantity();
                iterator.remove();
            }
        }

        System.out.println("Invested Amount: " + returns);
        System.out.println("Profit: " + profit);
        portfolio.setTotalProfit(portfolio.getTotalProfit()-profit);
        portfolio.setTotalInvestment(portfolio.getTotalInvestment()-totPurchasedPrice);
        portfolio.setBudget(portfolio.getBudget() + returns);
        stock.getTransactions()
                .sort(Comparator.comparing(Transaction::getTransactionDateTime));
        portfolioRepo.save(portfolio);
        return portfolio;
    }


    public Portfolio addBudget(long pid, double budget){
        Portfolio portfolio = portfolioRepo.findById(pid).get();
        portfolio.setBudget(portfolio.getBudget() + budget);
        return portfolioRepo.save(portfolio);
    }
}
