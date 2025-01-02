package com.ust.controller;

import com.ust.model.Transaction;
import com.ust.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping
    public List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }

    @PostMapping("/save/{pid}/{symbol}")
    public void addTranscations(@PathVariable int pid, @PathVariable String symbol, @RequestBody Transaction transaction)
    {
        transactionService.addTransaction(pid, symbol, transaction);
    }

    @DeleteMapping("/delete/{pid}/{symbol}/{tid}")
    public void removeTransaction(@PathVariable int pid, @PathVariable String symbol, @PathVariable int tid){
        transactionService.removeTransaction(pid, symbol, tid);
    }

    @DeleteMapping("/remove/{pid}/{symbol}/{tid}/{quantity}")
    public void removeTransactionByQuantity(@PathVariable int pid, @PathVariable String symbol, @PathVariable int tid, @PathVariable int quantity){
        transactionService.removeTransactionByQuantity(pid, symbol, tid, quantity);
    }
}
