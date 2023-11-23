package com.ittam.web.asset_request.service;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.UserRequestVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface AssetRequestMapper {

    //IT 자산 목록 조회
    public List<ITAssetsVO> AssetAllList();

    // PC/노트북 자산 목록 조회
    public List<ITAssetsVO> AssetRequestListPC();
    // 소프트웨어 자산 목록 조회
    public List<ITAssetsVO> AssetRequestListSW();
    // 서버 자산 목록 조회
    public List<ITAssetsVO> AssetRequestListSV();
    //기타 자산 목록 조회
    public List<ITAssetsVO> AssetRequestListETC();

    //IT 자산 목록 검색
    public ArrayList<ITAssetsVO> AssetRequestSearch(String inputText);

    // 카테고리별 검색
    public ArrayList<ITAssetsVO> AssetRequestSearchPC(String inputText);
    public ArrayList<ITAssetsVO> AssetRequestSearchSW(String inputText);
    public ArrayList<ITAssetsVO> AssetRequestSearchSV(String inputText);
    public ArrayList<ITAssetsVO> AssetRequestSearchETC(String inputText);

    // 자산 사용 신청
    public int AssetUsageRequest(UserRequestVO vo);
    public int AssetUsageRequestUpdate(UserRequestVO vo);

    // 자산 구매 신청
    public int AssetBuyRequest(UserRequestVO vo);

}
