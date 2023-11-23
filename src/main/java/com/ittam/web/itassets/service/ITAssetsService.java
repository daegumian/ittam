package com.ittam.web.itassets.service;

import com.ittam.web.command.*;

import java.util.List;
import java.util.Map;

public interface ITAssetsService {
    public List<ITAssetsVO> getITList();
    public int SWSpecInsert(Map<String, Object> requestData);

    public  int ETCSpecInsert(Map<String, Object> requestData);

    public int PCSpecInsert(Map<String, Object> requestData);

    public int ServerSpecInsert(Map<String, Object> requestData);

    public int ITAssetsInsertSW(Map<String, Object> requestData);

    public int ITAssetsInsertETC(Map<String, Object> requestData);

    public int ITAssetsInsertPC(Map<String, Object> requestData);

    public int ITAssetsInsertServer(Map<String, Object> requestData);

    public void createTable();

    public void deleteTable();
//    public int purchaseYN(StockApprovalVO vo2);

    public int yncount();

    public int itcount();
}
