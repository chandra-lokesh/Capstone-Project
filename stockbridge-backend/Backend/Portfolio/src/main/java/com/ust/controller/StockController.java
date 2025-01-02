package com.ust.controller;

import com.ust.model.InformationApiResponse;
import com.ust.model.Stock;
import com.ust.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stock")
@CrossOrigin(origins = "http://localhost:4200")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping("/get-all")
    public List<Stock> getAllStocks(){
        return stockService.getAllStocks();
    }
    @PostMapping("/save")
    public void saveStock(@RequestBody Stock stock){
        stockService.saveStock(stock);
    }

    @GetMapping("/get-by-symbol/{symbol}")
    public Stock getStockBySymbol(@PathVariable String symbol){
        return stockService.getStockBySymbol(symbol);
    }

    @GetMapping("/stock-info/{symbol}")
    public List<InformationApiResponse> getAllStockDetails(@PathVariable String symbol){
        return stockService.getAllStockDetails(symbol);
    }
}
