package com.ittam.web.stock_approval.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import com.ittam.web.command.UserRequestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("stock_ApprovalService")
public class Stock_approvalServiceImp1 implements Stock_approvalService{

    @Autowired
    private Stock_ApprovalMapper stockApprovalMapper;

    @Override
    public List<StockApprovalVO> getStockApprovalList() {
        return stockApprovalMapper.getStockApprovalList();
    }

    @Override
    public int updateITStatus(ITAssetsVO vo) {


        return stockApprovalMapper.updateITStatus(vo);
    }

    @Override
    public void ApprovY(StockApprovalVO vo2) {

        stockApprovalMapper.ApprovY(vo2);
    }

    @Override
    public int statusUpdate(StockApprovalVO vo) {
        return stockApprovalMapper.statusUpdate(vo);
    }

    @Override
    public int finalyn(UserRequestVO vo3) {
        return stockApprovalMapper.finalyn(vo3);
    }

    @Override
    public int finaln(UserRequestVO vo3) {
        return stockApprovalMapper.finaln(vo3);
    }

    @Override
    public int purchaseApproval(StockApprovalVO vo) {
        return stockApprovalMapper.purchaseApproval(vo);
    }

    @Override
    public void insertApproval(UserRequestVO vo3) {
        stockApprovalMapper.insertApproval(vo3);
    }

    @Override
    public void waitYN(ITAssetsVO vo1) {
        stockApprovalMapper.waitYN(vo1);
    }

    @Override
    public void waitN(ITAssetsVO vo1) {
        stockApprovalMapper.waitN(vo1);
    }


}
