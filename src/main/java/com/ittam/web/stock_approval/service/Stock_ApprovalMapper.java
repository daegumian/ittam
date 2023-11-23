package com.ittam.web.stock_approval.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import com.ittam.web.command.UserRequestVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Stock_ApprovalMapper {
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
