package com.ittam.web.itassets.service;

import com.ittam.web.command.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ITAssetsMapper {
    public List<ITAssetsVO> getITList();
    public int SWSpecInsert(SWSpecVO vo);

    public int ETCSpecInsert(ETCSpecVO vo);

    public int PCSpecInsert(PCSpecVO vo);

    public int ServerSpecInsert(ServerSpecVO vo);

    public int ITAssetsInsertSW(ITAssetsVO vo);

    public int ITAssetsInsertETC(ITAssetsVO vo);

    public int ITAssetsInsertPC(ITAssetsVO vo);

    public int ITAssetsInsertServer(ITAssetsVO vo);

    public void createTable();

    public void deleteTable();

//    public int purchaseYN(StockApprovalVO vo2);

    public int yncount();

    public int itcount();

}
