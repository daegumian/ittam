package com.ittam.web.controller;

import com.ittam.web.command.*;
import com.ittam.web.mainPage.service.MainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mainPage")
@CrossOrigin(origins = "http://localhost:3000")
public class MainPageController {

    @Autowired
    @Qualifier("mainPageService")
    private MainPageService mainPageService;


    //요청및미승인건수가져오기
    @GetMapping("/adminMainCnt")
    public ResponseEntity<Map<String, Integer>> getUsereqNum() {
        Integer num = mainPageService.getUsereqNum();
        Integer num2 = mainPageService.getBuyNum();
        Integer num3 = mainPageService.getYetOkNum();
        Integer num4 = mainPageService.getLeaveReq();
        Map<String, Integer> map = new HashMap<>();
        map.put("userReq", num);
        map.put("buyReq", num2);
        map.put("yetok", num3);
        map.put("leaveReq", num4);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    //교환반품 요청서 보내기(user페이지)
    @PostMapping("/returnForm")
    public ResponseEntity<String> registReturnReq(@RequestBody StockReturnVO vo) {
        mainPageService.registReturnReq(vo);
        return new ResponseEntity<>("요청등록성공", HttpStatus.OK);
    }
    //교환반품 요청 리스트 가져오기(admin페이지)
    @GetMapping("/returnList")
    public ResponseEntity<List<Map<Object, Object>>> getReturnList() {
        List<Map<Object, Object>> list = mainPageService.getReturnList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //마이페이지 정보 가져오기
    @GetMapping("/getUserInfo")
    public ResponseEntity<UserVO> getUserInfo(@RequestParam String username) {
        System.out.println("유저아이디:"+username);
        UserVO vo = mainPageService.getUserInfo(username);
        return new ResponseEntity<>(vo, HttpStatus.OK);
    }
    //마이페이지 수정하기
    @PostMapping("/modifyProfile")
    public ResponseEntity<String> modifyProfile(@RequestBody UserVO vo) {
        mainPageService.modifyProfile(vo);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    //유저 자산 사용정보 가져오기
    @GetMapping("/getUserCnt")
    public ResponseEntity<Map<String, Integer>> getUserCnt(@RequestParam String username) {
        Map<String, Integer> map = new HashMap<>();
        map.put("using", mainPageService.getUserCnt_using(username));
        map.put("exchange", mainPageService.getUserCnt_exchange(username));
        map.put("return", mainPageService.getUserCnt_return(username));
        map.put("usingReq", mainPageService.getUserCnt_usingReq(username));
        map.put("buyReq", mainPageService.getUserCnt_buyReq(username));
        return new ResponseEntity<>(map , HttpStatus.OK);
    }

    //내 사용중인 자산 리스트 가져오기
    @GetMapping("/getMyAssetList")
    public ResponseEntity<List<Map<String, Object>>> getMyAssetList(@RequestParam String username) {
        List<Map<String, Object>> list = mainPageService.getMyAssetList(username);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //반납하기
    @PostMapping("/updateReturn_yn")
    public ResponseEntity<String> updateReturn_yn(@RequestBody Map<String, Object> map) {
        map.put("alarm_type", "반납");
        mainPageService.updateReturn_yn(map);
        mainPageService.updateAssetUsing((Integer) map.get("assets_num"));
        mainPageService.registAlarm(map); //알람
        return new ResponseEntity<>("승인처리",HttpStatus.OK);
    }

    @DeleteMapping("/deleteCancelReq")
    public ResponseEntity<String> deleteCancelReq(@RequestParam Integer return_num) {
        mainPageService.deleteCancelReq(return_num);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

////////////////////////관리자 페이지 차트 데이터 불러오기///////////////////////////////////
    @GetMapping("/getAssetChartAllNum")
    public ResponseEntity<Map<Object, Object>> getAssetChartAllNum() {
        Map<Object, Object> map = mainPageService.getAssetChartAllNum();
        System.out.println(map.toString());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/getAssetChartUsingNum")
    public ResponseEntity<Map<Object, Object>> getAssetChartUsingNum() {
        Map<Object, Object> map = mainPageService.getAssetChartUsingNum();
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    @GetMapping("/getAssetChartDisposeNum")
    public ResponseEntity<Map<Object, Object>> getAssetChartDisposeNum() {
        Map<Object, Object> map = mainPageService.getAssetChartDisposeNum();
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

///////////////////////////////////////////////////////////////////////////////////////

    //교환가능한 자산 리스트 가져오기
    @GetMapping("/getSelectAssetList")
    public ResponseEntity<List<Map<Object, Object>>> getSelectAssetList(Integer category_num) {
        List<Map<Object, Object>> map = mainPageService.getSelectAssetList(category_num);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //교환신청 승인처리하기
    @PostMapping ("/exchangeAsset")
    public ResponseEntity<String> exchangeAsset(@RequestBody Map<String, Object> map) {
        map.put("alarm_type", "교환");
        mainPageService.exchangeAsset_exchange(map);
        mainPageService.exchangeAsset_cancel(map);
        mainPageService.updateReturn_yn(map);
        mainPageService.exchangeAsset_assetlog(map);
        mainPageService.registAlarm(map); //알람
        return new ResponseEntity<>("승인처리되었습니다", HttpStatus.OK);
    }

    //교환신청 반려처리하기
    @PostMapping("/cancelExchange")
    public ResponseEntity<String> cancelExchange(@RequestBody Map<String, Object> map) {
        map.put("alarm_type", "교환");
        mainPageService.updateReturn_yn(map);
        mainPageService.registAlarm(map); //알람
        return new ResponseEntity<>("반려처리되었습니다", HttpStatus.OK);
    }

    //내가 사용 및 구매 요청한 리스트 가져오기
    @GetMapping("/getMyRequestList")
    public ResponseEntity<List<UserRequestVO>> getMyRequestList(@RequestParam String username) {
        List<UserRequestVO> list = mainPageService.getMyRequestList(username);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //사용 구매신청 취소
    @DeleteMapping("/deleteUsingPerchaseReq")
    public ResponseEntity<String> deleteUsingPerchaseReq(@RequestParam Integer userq_num) {
        mainPageService.deleteUsingPerchaseReq(userq_num);
        return new ResponseEntity<>("요청취소완료", HttpStatus.OK);
    }


    //퇴사신청
    @GetMapping("/registLeaveReq")
    public ResponseEntity<String> registLeaveReq(@RequestParam String username) {
        mainPageService.registLeaveReq(username);
        return new ResponseEntity<>("퇴사요청완료", HttpStatus.OK);
    }

    //userMain에 들어가는 차트 숫자 가져오기
    @GetMapping("/getMyAssetChartCnt")
    public ResponseEntity<Map<String, Integer>> getMyAssetChartCnt(@RequestParam String username) {
        Map<String, Integer> map = new HashMap<>();
        map.put("pcCnt", mainPageService.getMyPcCnt(username));
        map.put("swCnt", mainPageService.getMySwCnt(username));
        map.put("etcCnt", mainPageService.getMyEtcCnt(username));
        map.put("serverCnt", mainPageService.getMyServerCnt(username));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //최근자산 목록 불러오기
    @GetMapping("/getRecentAssetsList")
    public ResponseEntity<List<Map<String, Object>>> getRecentAssetsList(@RequestParam Integer nnn) {
        List<Map<String, Object>> map = mainPageService.getRecentAssetsList(nnn);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //최근 공지사항 목록 불러오기
    @GetMapping("/getNoticeList")
    public ResponseEntity<List<NoticeVO>> getNoticeList() {
        List<NoticeVO> list = mainPageService.getNoticeList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //헤더 내 정보 가져오기
    @GetMapping("/getMyInfo")
    public ResponseEntity<UserVO> getMyInfo(@RequestParam String username) {
        UserVO vo = mainPageService.getMyInfo(username);
        return new ResponseEntity<>(vo, HttpStatus.OK);
    }

    //상위관리자 카드 정보
    @GetMapping("/highadminMainCnt")
    public ResponseEntity<Map<String, Integer>> highadminMainCnt() {
        Integer num = mainPageService.getFinalUsingCnt();
        Integer num2 = mainPageService.getFinalBuyCnt();
        Integer num3 = mainPageService.getFinalDisCnt();
        Integer num4 = mainPageService.getLeaveReq();
        Map<String, Integer> map = new HashMap<>();
        map.put("finalUsing", num);
        map.put("finalBuy", num2);
        map.put("finalDis", num3);
        map.put("leaveReq", num4);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    //내 알람리스트 가져오기
    @GetMapping("/getMyAlarmList")
    public ResponseEntity<List<Map<String, Object>>> getMyAlarmList(@RequestParam String username){
        List<Map<String, Object>> list = mainPageService.getMyAlarmList(username);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //알람읽음처리하기
    @PutMapping("/handleMyAlamConfirm")
    public ResponseEntity<String> handleMyAlamConfirm(@RequestParam Integer alarm_num, @RequestParam String alarm_type) {
        if(alarm_type.equals("교환") || alarm_type.equals("반납")) {

        mainPageService.handleMyAlamConfirm(alarm_num);
        } else {
            mainPageService.handleMyAlamConfirm2(alarm_num);
        }
        return new ResponseEntity<>("알람을 읽음", HttpStatus.OK);
    }

    //알림개수
    @GetMapping("/getMyAlarmCnt")
    public ResponseEntity<Integer> getMyAlarmCnt(@RequestParam String username) {
        Integer cnt = mainPageService.getMyAlarmCnt(username);
        return new ResponseEntity<>(cnt, HttpStatus.OK);
    }


    ///////////////////////////////////////////////////////
    @GetMapping("/getMyAlarmAdminList")
    public ResponseEntity<List<Map<String, Object>>> getMyAlarmAdminList(@RequestParam String username){
        List<Map<String, Object>> list = mainPageService.getMyAlarmAdminList(username);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/handleMyAlamAdminConfirm")
    public ResponseEntity<String> handleMyAlamAdminConfirm(@RequestParam Integer alarm_num) {
        mainPageService.handleMyAlamAdminConfirm(alarm_num);
        return new ResponseEntity<>("읽음처리", HttpStatus.OK);
    }

    @GetMapping("/getMyAlarmAdminCnt")
    public ResponseEntity<Integer> getMyAlarmAdminCnt(@RequestParam String username) {
        Integer cnt = mainPageService.getMyAlarmAdminCnt(username);
        return new ResponseEntity<>(cnt, HttpStatus.OK);
    }

}
