package com.ittam.web.mainPage.service;

import com.ittam.web.command.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("mainPageService")
public class MainPageServiceImpl implements MainPageService{

    @Autowired
    private MainPageMapper mainPageMapper;
    @Override
    public Integer getUsereqNum() {
        return mainPageMapper.getUsereqNum();

    }

    @Override
    public Integer getBuyNum() {
        return mainPageMapper.getBuyNum();
    }

    @Override
    public Integer getYetOkNum() {
        return mainPageMapper.getYetOkNum();
    }

    @Override
    public Integer getLeaveReq() {
        return mainPageMapper.getLeaveReq();
    }

    @Override
    public void registReturnReq(StockReturnVO vo) {
        mainPageMapper.registReturnReq(vo);
    }

    @Override
    public List<Map<Object, Object>> getReturnList() {
        List<Map<Object, Object>> list = mainPageMapper.getReturnList();
        return list;
    }

    @Override
    public List<Map<Object, Object>> getSelectAssetList(Integer category_num) {
        List<Map<Object, Object>> map = mainPageMapper.getSelectAssetList(category_num);
        return map;
    }

    @Override
    public UserVO getUserInfo(String username) {
        UserVO vo = mainPageMapper.getUserInfo(username);
        return vo;
    }

    @Override
    public void modifyProfile(UserVO vo) {
        mainPageMapper.modifyProfile(vo);
    }

    @Override
    public Integer getUserCnt_using(String username) {
        return mainPageMapper.getUserCnt_using(username);
    }

    @Override
    public Integer getUserCnt_exchange(String username) {
        return mainPageMapper.getUserCnt_exchange(username);
    }

    @Override
    public Integer getUserCnt_return(String username) {
        return mainPageMapper.getUserCnt_return(username);
    }

    @Override
    public Integer getUserCnt_usingReq(String username) {
        return mainPageMapper.getUserCnt_usingReq(username);
    }

    @Override
    public Integer getUserCnt_buyReq(String username) {
        return mainPageMapper.getUserCnt_buyReq(username);
    }

    @Override
    public List<Map<String, Object>> getMyAssetList(String username) {
        return mainPageMapper.getMyAssetList(username);
    }

    @Override
    public void updateReturn_yn( Map<String, Object> map) {
        System.out.println(00000);
        mainPageMapper.updateReturn_yn(map);
    }

    @Override
    public void updateAssetUsing(Integer assets_num) {
        mainPageMapper.updateAssetUsing(assets_num);
    }

    @Override
    public void deleteCancelReq(Integer return_num) {
        mainPageMapper.deleteCancelReq(return_num);
    }

    @Override
    public Map<Object, Object> getAssetChartAllNum() {

        return mainPageMapper.getAssetChartAllNum();
    }

    @Override
    public Map<Object, Object> getAssetChartUsingNum() {
        return mainPageMapper.getAssetChartUsingNum();
    }

    @Override
    public Map<Object, Object> getAssetChartDisposeNum() {
        return mainPageMapper.getAssetChartDisposeNum();
    }

    @Override
    public void exchangeAsset_exchange(Map<String, Object> map) {
        mainPageMapper.exchangeAsset_exchange(map);
    }

    @Override
    public void exchangeAsset_cancel(Map<String, Object> map) {
        mainPageMapper.exchangeAsset_cancel(map);
    }

    @Override
    public void exchangeAsset_assetlog(Map<String, Object> map) {
        mainPageMapper.exchangeAsset_assetlog(map);
    }



    @Override
    public List<UserRequestVO> getMyRequestList(String username) {
        return mainPageMapper.getMyRequestList(username);

    }

    @Override
    public void deleteUsingPerchaseReq(Integer userq_num) {
        mainPageMapper.deleteUsingPerchaseReq(userq_num);
    }

    @Override
    public void registLeaveReq(String username) {
        mainPageMapper.registLeaveReq(username);
    }

    @Override
    public Integer getMyPcCnt(String username) {
        return mainPageMapper.getMyPcCnt(username);
    }

    @Override
    public Integer getMySwCnt(String username) {
        return mainPageMapper.getMySwCnt(username);
    }

    @Override
    public Integer getMyEtcCnt(String username) {
        return mainPageMapper.getMyEtcCnt(username);
    }

    @Override
    public Integer getMyServerCnt(String username) {
        return mainPageMapper.getMyServerCnt(username);
    }

    @Override
    public List<Map<String, Object>> getRecentAssetsList(Integer nnn) {
        return mainPageMapper.getRecentAssetsList(nnn);
    }

    @Override
    public List<NoticeVO> getNoticeList() {
        return mainPageMapper.getNoticeList();
    }

    @Override
    public UserVO getMyInfo(String username) {
        return mainPageMapper.getMyInfo(username);
    }

    @Override
    public Integer getFinalUsingCnt() {
        return mainPageMapper.getFinalUsingCnt();
    }

    @Override
    public Integer getFinalBuyCnt() {
        return mainPageMapper.getFinalBuyCnt();
    }

    @Override
    public Integer getFinalDisCnt() {
        return mainPageMapper.getFinalDisCnt();
    }

    @Override
    public void registAlarm(Map<String, Object> map) {
        mainPageMapper.registAlarm(map);
    }

    @Override
    public List<Map<String, Object>> getMyAlarmList(String username) {
        List<Map<String, Object>> list1 = mainPageMapper.getMyAlarmList(username);
        List<Map<String, Object>> list2 = mainPageMapper.getMyAlarmList2(username);
        list1.addAll(list2);
        return list1;
    }

    @Override
    public void handleMyAlamConfirm(Integer alarm_num) {
        mainPageMapper.handleMyAlamConfirm(alarm_num);
    }

    @Override
    public void handleMyAlamConfirm2(Integer alarm_num) {
        mainPageMapper.handleMyAlamConfirm2(alarm_num);
    }

    @Override
    public Integer getMyAlarmCnt(String username) {
        System.out.println("개수:"+mainPageMapper.getMyAlarmCnt2(username));
        return mainPageMapper.getMyAlarmCnt(username) + mainPageMapper.getMyAlarmCnt2(username);
    }

    @Override
    public void registAlarm_req(Map<String, Object> map) {
        mainPageMapper.registAlarm_req(map);
    }

    @Override
    public void registAlarm_admin(Map<String, Object> map) {
        mainPageMapper.registAlarm_admin(map);
    }

    @Override
    public List<Map<String, Object>> getMyAlarmAdminList(String username) {
        return mainPageMapper.getMyAlarmAdminList(username);
    }

    @Override
    public void handleMyAlamAdminConfirm(Integer alarm_num) {
        mainPageMapper.handleMyAlamAdminConfirm(alarm_num);
    }

    @Override
    public Integer getMyAlarmAdminCnt(String username) {
        return mainPageMapper.getMyAlarmAdminCnt(username);
    }


}
