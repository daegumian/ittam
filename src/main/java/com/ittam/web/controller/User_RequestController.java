package com.ittam.web.controller;

import com.ittam.web.command.UserRequestVO;
import com.ittam.web.mainPage.service.MainPageService;
import com.ittam.web.user_request.service.UserRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class User_RequestController {

    @Autowired
    @Qualifier("userRequestService")
    private UserRequestService userRequestService;

    @Autowired
    @Qualifier("mainPageService")
    private MainPageService mainPageService;


    @GetMapping("/UserRequestList") // (관리자 페이지) 신청 조회 페이지 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestList(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestList();
        return ResponseEntity.ok(list);
    }

    int count = 0;
    @PostMapping("/UserRequestApprove") // (관리자 페이지) 신청 승인 처리
    public ResponseEntity<String> UserRequestApprove(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        System.out.println(requestBody.get("username"));
        try {
            userRequestService.UserRequestApprove(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            count++;
            return ResponseEntity.ok("자산 사용 승인이 완료되었습니다." + count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 승인 중 오류가 발생했습니다.");
        }

    }

    int count1 = 0;
    @PostMapping("/UserRequestReturn") // (관리자 페이지) 신청 반려 처리
    public ResponseEntity<String> UserRequestReturn(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            /////알람관련 추가사항/////
            Map<String, Object> map = new HashMap<>();
            map.put("username", requestBody.get("req_username"));
            map.put("userq_num", requestBody.get("userq_NUM"));
            map.put("alarm_type", "사용신청");
            map.put("alarm_status", "반려");
            mainPageService.registAlarm_req(map);
            ////////////////////////
            userRequestService.UserRequestreturn(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            count1++;
            return ResponseEntity.ok("자산 사용 승인이 반려되었습니다." + count1);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 반려 중 오류가 발생했습니다.");
        }

    }

    @PostMapping("/UserRequestSearch") // (관리자 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestSearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestSearch(requestBody.get("inputText"));
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    //
    @GetMapping("/UserRequestHandlePage") // (관리자 처리 페이지) 목록 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestHandle(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestHandle();
        return ResponseEntity.ok(list);

    }

    @PostMapping("/UserRequestHandleSearch") // (관리자 신청 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestHandleSearch(@RequestBody Map<String, String> requestBody){
        ArrayList pageNav = new ArrayList();
        if (requestBody.get("pageNav").equals("관리자전체")){
            pageNav.add("관리자사용승인");
            pageNav.add("관리자사용반려");
        } else if (requestBody.get("pageNav").equals("관리자승인")){
            pageNav.add("관리자사용승인");
        } else if (requestBody.get("pageNav").equals("관리자반려")){
            pageNav.add("관리자사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestHandleSearch(requestBody.get("inputText"), pageNav);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestNavSearch") // (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestNavSearch(@RequestBody Map<String, String> requestBody){
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("관리자전체")){
            navText.add("관리자사용승인");
            navText.add("관리자사용반려");
        } else if (requestBody.get("navText").equals("관리자승인")){
            navText.add("관리자사용승인");
        } else if (requestBody.get("navText").equals("관리자반려")){
            navText.add("관리자사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestNavSearch(navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestCategorySearch") // (관리자) 자산별 검색 select
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestCategorySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("전체")){
            navText.add("관리자사용승인");
            navText.add("관리자사용반려");
        } else if (requestBody.get("navText").equals("승인")){
            navText.add("관리자사용승인");
        } else if (requestBody.get("navText").equals("반려")){
            navText.add("관리자사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestCategorySearch(requestBody.get("category_num"),navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    /////////////////////////////// 관리자 구매 관련
    @GetMapping("/UserRequestBuyList") // (관리자 페이지) 신청 조회 페이지 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyList(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestBuyList();
        return ResponseEntity.ok(list);
    }

    int count2 = 0;
    @PostMapping("/UserRequestBuyApprove") // (관리자 페이지) 신청 승인 처리
    public ResponseEntity<String> UserRequestBuyApprove(@RequestBody Map<String, String> requestBody){
        UserRequestVO vo = new UserRequestVO();
        vo.setUsername(requestBody.get("userq_username"));
        vo.setCount(Integer.valueOf(requestBody.get("userq_count")));
        vo.setCategory_num(Integer.valueOf(requestBody.get("category_num")));
        vo.setUserq_comment(requestBody.get("userq_comment"));
        vo.setUserq_title(requestBody.get("userq_title"));
        vo.setUserq_num(Integer.valueOf(requestBody.get("userq_num")));
        System.out.println(requestBody.toString());
        try {
            userRequestService.UserRequestBuyApprove(vo, requestBody.get("username"));
            userRequestService.UserRequestBuyApproveB(vo);
            count2++;
            return ResponseEntity.ok("자산 구매 승인이 완료되었습니다." + count2);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 구매 승인 중 오류가 발생했습니다.");
        }

    }

    int count3 = 0;
    @PostMapping("/UserRequestBuyReturn") // (관리자 페이지) 신청 반려 처리
    public ResponseEntity<String> UserRequestBuyReturn(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            /////알람관련 추가사항/////
            Map<String, Object> map = new HashMap<>();
            map.put("username", requestBody.get("req_username"));
            map.put("userq_num", requestBody.get("userq_NUM"));
            map.put("alarm_type", "구매신청");
            map.put("alarm_status", "반려");
            mainPageService.registAlarm_req(map);
            ////////////////////////
            userRequestService.UserRequestBuyReturn(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            count3++;
            return ResponseEntity.ok("자산 사용 승인이 반려되었습니다." + count3);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 반려 중 오류가 발생했습니다.");
        }

    }

    @PostMapping("/UserRequestBuySearch") // (관리자 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuySearch(requestBody.get("inputText"));
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @GetMapping("/UserRequestBuyHandlePage") // (관리자 처리 페이지) 목록 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyHandlePage(){
        ArrayList<UserRequestVO> list = userRequestService.UserRequestBuyHandlePage();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/UserRequestBuyHandleSearch") // (관리자 신청 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyHandleSearch(@RequestBody Map<String, String> requestBody){
        ArrayList pageNav = new ArrayList();
        if (requestBody.get("pageNav").equals("관리자전체")){
            pageNav.add("관리자구매승인");
            pageNav.add("관리자구매반려");
        } else if (requestBody.get("pageNav").equals("관리자승인")){
            pageNav.add("관리자구매승인");
        } else if (requestBody.get("pageNav").equals("관리자반려")){
            pageNav.add("관리자구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuyHandleSearch(requestBody.get("inputText"), pageNav);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 구매 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestBuyNavSearch") // (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyNavSearch(@RequestBody Map<String, String> requestBody){
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("관리자전체")){
            navText.add("관리자구매승인");
            navText.add("관리자구매반려");
        } else if (requestBody.get("navText").equals("관리자승인")){
            navText.add("관리자구매승인");
        } else if (requestBody.get("navText").equals("관리자반려")){
            navText.add("관리자구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuyNavSearch(navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/UserRequestBuyCategorySearch") // (관리자) 자산별 검색 select
    public ResponseEntity<ArrayList<UserRequestVO>> UserRequestBuyCategorySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("전체")){
            navText.add("관리자구매승인");
            navText.add("관리자구매반려");
        } else if (requestBody.get("navText").equals("승인")){
            navText.add("관리자구매승인");
        } else if (requestBody.get("navText").equals("반려")){
            navText.add("관리자구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.UserRequestBuyCategorySearch(requestBody.get("category_num"),navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }


    ////////////////////////////////////// 최종 관리자
    @GetMapping("/high/UserRequestList") // (최종 관리자 페이지) 신청 조회 페이지 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestList(){
        ArrayList<UserRequestVO> list = userRequestService.HighUserRequestList();
        return ResponseEntity.ok(list);
    }


    int count4 = 0;
    @PostMapping("/high/UserRequestApprove") // (최종 관리자 페이지) 신청 승인 처리
    public ResponseEntity<String> HighUserRequestApprove(@RequestBody Map<String, String> requestBody){

        System.out.println(requestBody.get("username"));
        try {
            /////알람관련 추가사항/////
            Map<String, Object> map = new HashMap<>();
            map.put("username", requestBody.get("req_username"));
            map.put("userq_num", requestBody.get("userq_NUM"));
            map.put("alarm_type", "사용신청");
            map.put("alarm_status", "승인");
            mainPageService.registAlarm_req(map);
            ////////////////////////
            userRequestService.HighUserRequestApprove(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            userRequestService.HighUserRequestApproveB(Integer.parseInt(requestBody.get("assets_num")), requestBody.get("req_username"));
            count4++;
            return ResponseEntity.ok("자산 사용 승인이 완료되었습니다." + count4);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 승인 중 오류가 발생했습니다.");
        }

    }

    int count5 = 0;
    @PostMapping("/high/UserRequestReturn") // (최종관리자 페이지) 신청 반려 처리
    public ResponseEntity<String> HighUserRequestReturn(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            /////알람관련 추가사항/////
            Map<String, Object> map = new HashMap<>();
            map.put("username", requestBody.get("req_username"));
            map.put("userq_num", requestBody.get("userq_NUM"));
            map.put("alarm_type", "사용신청");
            map.put("alarm_status", "반려");
            mainPageService.registAlarm_req(map);
            ////////////////////////
            userRequestService.HighUserRequestReturn(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            count5++;
            return ResponseEntity.ok("자산 사용 승인이 반려되었습니다." + count5);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 반려 중 오류가 발생했습니다.");
        }

    }
    @PostMapping("/high/UserRequestSearch") // (최종관리자 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestSearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestSearch(requestBody.get("inputText"));
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    //
    @GetMapping("/high/UserBuyRequestList") // (최종 관리자 페이지) 신청 조회 페이지 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserBuyRequestList(){
        ArrayList<UserRequestVO> list = userRequestService.HighUserBuyRequestList();
        return ResponseEntity.ok(list);
    }


    int count6 = 0;
    @PostMapping("/high/UserBuyRequestApprove") // (최종 관리자 페이지) 신청 승인 처리
    public ResponseEntity<String> HighUserBuyRequestApprove(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            /////알람관련 추가사항/////
            System.out.println("구매신청!!!!!!");
            Map<String, Object> map = new HashMap<>();
            map.put("username", requestBody.get("req_username"));
            map.put("userq_num", requestBody.get("userq_NUM"));
            map.put("alarm_type", "구매신청");
            map.put("alarm_status", "승인");
            mainPageService.registAlarm_req(map);
            ////////////////////////
            userRequestService.HighUserBuyRequestApprove(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            count4++;
            return ResponseEntity.ok("자산 사용 승인이 완료되었습니다." + count4);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 승인 중 오류가 발생했습니다.");
        }

    }

    int count7 = 0;
    @PostMapping("/high/UserBuyRequestReturn") // (최종관리자 페이지) 신청 반려 처리
    public ResponseEntity<String> HighUserBuyRequestReturn(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());

        try {
            /////알람관련 추가사항/////
            Map<String, Object> map = new HashMap<>();
            map.put("username", requestBody.get("req_username"));
            map.put("userq_num", requestBody.get("userq_NUM"));
            map.put("alarm_type", "구매신청");
            map.put("alarm_status", "반려");
            mainPageService.registAlarm_req(map);
            ////////////////////////
            userRequestService.HighUserBuyRequestReturn(Integer.parseInt(requestBody.get("userq_NUM")), requestBody.get("username"));
            count5++;
            return ResponseEntity.ok("자산 사용 승인이 반려되었습니다." + count5);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("자산 사용 반려 중 오류가 발생했습니다.");
        }

    }
    @PostMapping("/high/UserBuyRequestSearch") // (최종관리자 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserBuyRequestSearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserBuyRequestSearch(requestBody.get("inputText"));
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }



    @GetMapping("/high/UserRequestHandlePage") // (최종 관리자 처리 페이지) 목록 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestHandlePage(){
        ArrayList<UserRequestVO> list = userRequestService.HighUserRequestHandlePage();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/high/UserRequestHandleSearch") // (최종 관리자 신청 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestHandleSearch(@RequestBody Map<String, String> requestBody){
        ArrayList pageNav = new ArrayList();
        if (requestBody.get("pageNav").equals("관리자전체")){
            pageNav.add("최종사용승인");
            pageNav.add("최종사용반려");
        } else if (requestBody.get("pageNav").equals("관리자승인")){
            pageNav.add("최종사용승인");
        } else if (requestBody.get("pageNav").equals("관리자반려")){
            pageNav.add("최종사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestHandleSearch(requestBody.get("inputText"), pageNav);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 구매 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/high/UserRequestNavSearch") // (최종 관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestNavSearch(@RequestBody Map<String, String> requestBody){
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("관리자전체")){
            navText.add("최종사용승인");
            navText.add("최종사용반려");
        } else if (requestBody.get("navText").equals("관리자승인")){
            navText.add("최종사용승인");
        } else if (requestBody.get("navText").equals("관리자반려")){
            navText.add("최종사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestNavSearch(navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/high/UserRequestCategorySearch") // (최종 관리자) 자산별 검색 select
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestCategorySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("전체")){
            navText.add("최종사용승인");
            navText.add("최종사용반려");
        } else if (requestBody.get("navText").equals("승인")){
            navText.add("최종사용승인");
        } else if (requestBody.get("navText").equals("반려")){
            navText.add("최종사용반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestCategorySearch(requestBody.get("category_num"),navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }



    @GetMapping("/high/UserRequestBuyHandlePage") // (최종 관리자 처리 페이지) 목록 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestBuyHandlePage(){
        ArrayList<UserRequestVO> list = userRequestService.HighUserRequestBuyHandlePage();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/high/UserRequestBuyHandleSearch") // (최종 관리자 신청 페이지) 검색 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestBuyHandleSearch(@RequestBody Map<String, String> requestBody){
        ArrayList pageNav = new ArrayList();
        if (requestBody.get("pageNav").equals("관리자전체")){
            pageNav.add("최종구매승인");
            pageNav.add("최종구매반려");
        } else if (requestBody.get("pageNav").equals("관리자승인")){
            pageNav.add("최종구매승인");
        } else if (requestBody.get("pageNav").equals("관리자반려")){
            pageNav.add("최종구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestBuyHandleSearch(requestBody.get("inputText"), pageNav);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 구매 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/high/UserRequestBuyNavSearch") // (최종 관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestBuyNavSearch(@RequestBody Map<String, String> requestBody){
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("관리자전체")){
            navText.add("최종구매승인");
            navText.add("최종구매반려");
        } else if (requestBody.get("navText").equals("관리자승인")){
            navText.add("최종구매승인");
        } else if (requestBody.get("navText").equals("관리자반려")){
            navText.add("최종구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestBuyNavSearch(navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

    @PostMapping("/high/UserRequestBuyCategorySearch") // (최종 관리자) 자산별 검색 select
    public ResponseEntity<ArrayList<UserRequestVO>> HighUserRequestBuyCategorySearch(@RequestBody Map<String, String> requestBody){
        System.out.println(requestBody.toString());
        ArrayList navText = new ArrayList();
        if (requestBody.get("navText").equals("전체")){
            navText.add("최종구매승인");
            navText.add("최종구매반려");
        } else if (requestBody.get("navText").equals("승인")){
            navText.add("최종구매승인");
        } else if (requestBody.get("navText").equals("반려")){
            navText.add("최종구매반려");
        }

        try {
            ArrayList<UserRequestVO> vo = userRequestService.HighUserRequestBuyCategorySearch(requestBody.get("category_num"),navText);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 목록 조회 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserRequestVO>());
        }
    }

}
