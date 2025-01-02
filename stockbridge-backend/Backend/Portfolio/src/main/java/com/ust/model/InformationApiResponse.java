package com.ust.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class InformationApiResponse {
    String symbol;
    double price;
    double beta;
    long volAvg;
    long mktCap;
    double lastDiv;
    String range;
    double changes;
    String companyName;
    String currency;
    String cik;
    String isin;
    String cusip;
    String exchange;
    String exchangeShortName;
    String industry;
    String website;
    String description;
    String ceo;
    String sector;
    String country;
    String fullTimeEmployees;
    String phone;
    String address;
    String city;
    String state;
    String zip;
    double dcfDiff;
    double dcf;
    String image;
    String ipoDate;
    boolean defaultImage;
    boolean isEtf;
    boolean isActivelyTrading;
    boolean isAdr;
    boolean isFund;
}
