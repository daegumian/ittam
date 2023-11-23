package com.ittam.web.stock_approval.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import com.ittam.web.command.UserRequestVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface Stock_approvalService {
    public List<StockApprovalVO> getStockApprovalList();

    public int updateITStatus(ITAssetsVO vo);

    public void ApprovY(StockApprovalVO vo2);

    public int statusUpdate(StockApprovalVO vo);

    public int finalyn(UserRequestVO vo3);

    public int finaln(UserRequestVO vo3);

    public int purchaseApproval(StockApprovalVO vo);

    public void insertApproval(UserRequestVO vo3);

    public void waitYN(ITAssetsVO vo1);

    public void waitN(ITAssetsVO vo1);
}
