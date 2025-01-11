package com.portfolio.service;

import com.portfolio.model.Stock;
import com.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock);
    }

    // Additional methods for updating and deleting stocks
}