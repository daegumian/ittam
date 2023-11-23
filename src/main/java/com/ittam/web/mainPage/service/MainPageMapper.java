package com.ittam.web.mainPage.service;

import com.ittam.web.command.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MainPageMapper {
    public Integer getUsereqNum(); //사용요청건수
    public Integer getBuyNum();//관리자의 사용승인완료건수
    public Integer getYetOkNum(); //교환반납요청미승인건수
    public Integer getLeaveReq(); //퇴사요청건수
    public void registReturnReq(StockReturnVO vo); //교환반품 요청 등록하기
    public List<Map<Object, Object>> getReturnList(); //교환반품 요청 리스트 가져오기
    public List<Map<Object, Object>> getSelectAssetList(Integer category_num); // 교환해줄 자산 리스트 가져오기
    public UserVO getUserInfo(String username); //로그인한 유저 정보가져오기(Mypage)
    public void modifyProfile(UserVO vo); //회원정보 수정
    public Integer getUserCnt_using(String username); // 사원이 사용 중인 자산개수
    public Integer getUserCnt_exchange(String username); //사원이 교환신청한 자산개수
    public Integer getUserCnt_return(String username); //사원이 반품신청한 자산개수
    public Integer getUserCnt_usingReq(String username); //사원의 사용신청건수
    public Integer getUserCnt_buyReq(String username); //사원의 구매요청건수
    public List<Map<String, Object>> getMyAssetList(String username); //사원이 사용 중인 자산목록
    public void updateReturn_yn( Map<String, Object> map); //반납요청에 대한 승인처리
    public void updateAssetUsing(Integer assets_num);//반납 교환처리된 자산은 사용보류처리
    public void deleteCancelReq(Integer return_num); //교환반납 요청 취소하기
    public Map<Object, Object> getAssetChartAllNum(); //날짜별로 전체 자산 개수 가져오기
    public Map<Object, Object> getAssetChartUsingNum(); //날짜별로 전체 사용중인 자산 개수 가져오기
    public Map<Object, Object> getAssetChartDisposeNum(); //날짜별로 전체 사용중인 자산 개수 가져오기
    public void exchangeAsset_exchange(Map<String, Object> map); //교환할 제품 사용중 처리하기
    public void exchangeAsset_cancel(Map<String, Object> map); //교환된 제품 사용가능 처리하기
    public void exchangeAsset_assetlog(Map<String, Object> map); //교환할 제품 기록하기


    public List<UserRequestVO> getMyRequestList(String username); //내가 사용 구매 요청한 리스트 가져오기
    public void deleteUsingPerchaseReq(Integer userq_num); //사용 구매 신청 취소
    public void registLeaveReq(String username); //퇴사요청
    public Integer getMyPcCnt(String username); //내가 사용하는 pc 개수
    public Integer getMySwCnt(String username); //내가 사용하는 sw 개수
    public Integer getMyEtcCnt(String username); //내가 사용한느 주변기기 개수
    public Integer getMyServerCnt(String usrname); //내가 사용하는 서버 개수
    public List<Map<String, Object>> getRecentAssetsList(Integer nnn); //최근 nnn개의 자산 리스트 가져오기
    public List<NoticeVO> getNoticeList(); //최근 공지사항 목록
    public UserVO getMyInfo(String username); //헤더 내 정보가져오기
    public Integer getFinalUsingCnt(); //상위 관리자가 최종사용승인해야 할 건수
    public Integer getFinalBuyCnt(); //상위 관리자가 최종구매승인해야 할 건수
    public Integer getFinalDisCnt(); //상위 관리자가 최종 수리/폐기해야 할 건수
    ////////////////////////
    public void registAlarm(Map<String, Object> map); //알람등록하기
    public List<Map<String, Object>> getMyAlarmList(String username); //내 알람가져오기
    public List<Map<String, Object>> getMyAlarmList2(String username); //내 알람가져오기
    public void handleMyAlamConfirm(Integer alarm_num); //알람읽음처리하기
    public void handleMyAlamConfirm2(Integer alarm_num); //알람읽음처리하기
    public Integer getMyAlarmCnt(String username); //알림개수세기
    public Integer getMyAlarmCnt2(String username); //알림개수세기2


    public void registAlarm_req(Map<String, Object> map);
    public void registAlarm_admin(Map<String, Object> map);

    public List<Map<String, Object>> getMyAlarmAdminList(String username); //내 알람가져오기
    public void handleMyAlamAdminConfirm(Integer alarm_num);
    public Integer getMyAlarmAdminCnt(String username); //알림개수세기
}
