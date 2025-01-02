package com.ust.service;

import com.ust.model.InformationApiResponse;
import com.ust.model.Stock;
import com.ust.repository.StockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepo stockRepo;

    @Autowired
    private WebClient.Builder webClientBuilder;

    public void saveStock(Stock stock){
        stockRepo.save(stock);
    }
    public List<Stock> getAllStocks(){
        return stockRepo.findAll();
    }
    public Stock getStockBySymbol(String symbol){
        return stockRepo.findBySymbol(symbol);
    }

    public List<InformationApiResponse> getAllStockDetails(String symbol){
        String searchUrl = "https://financialmodelingprep.com/api/v3/profile/" + symbol + "?apikey=3llTujA8PkxBmnSZ8x1HCGKQxXDkSRKE";

        List<InformationApiResponse> informationData = webClientBuilder.build()
                .get()
                .uri(searchUrl)
                .retrieve()
                .bodyToFlux(InformationApiResponse.class)
                .collectList()
                .block();

        return informationData;
    }
}
