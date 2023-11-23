package com.ittam.web.controller;

import com.ittam.web.command.UserVO;
import com.ittam.web.user.service.UserService;
import com.ittam.web.utill.MailSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@Controller
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 사용자 목록
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/userList")
    public ResponseEntity<ArrayList<UserVO>> userList() {
        ArrayList<UserVO> list = userService.userList();
        return ResponseEntity.ok(list);
    }

    // 사용자 등록
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userRegist")
    public ResponseEntity<Integer> userRegist(@RequestBody UserVO userVO) {

        String encode = passwordEncoder.encode(userVO.getPassword());
        userVO.setPassword(encode);

        int data = userService.userRegist(userVO);

        if (data == 1) {
            return new ResponseEntity<>(data, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 상세정보
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userDetail")
    public ResponseEntity<UserVO> userDetail(@RequestBody Map<String, String> requestData) {

        try {
            UserVO vo = userService.userDetail(requestData.get("userId"));
            System.out.println("vo = " + vo);
            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 권한 변경
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userEdit")
    public ResponseEntity<String> userEdit(@RequestBody Map<String, String> requestData) {

        int result = userService.userEdit(requestData.get("targetId"), requestData.get("role"));


        if (result == 1) {
            return ResponseEntity.ok("권한이 변경되었습니다");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("권한 변경 중 오류가 발생하였습니다");
        }
    }

    // 사용자 퇴사 처리
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/userRemove")
    public ResponseEntity<String> userRemove(@RequestBody Map<String, String> requestData) {

        String targetId = requestData.get("targetId");


        try {
            int userAssetCount = userService.userFindAsset(targetId); // 사용 중인 자산 확인
            if (userAssetCount != 0) { // 사용 중인 자산이 있다면
                int changeResult = userService.userAssetChange(targetId); // 자산의 상태를 변경
                if (changeResult == 0) { // 실패시
                    throw new Exception("사용 중인 자산 반환에 실패했습니다");
                }
            }

            // 각 신청 테이블에서 사용자의 신청이 있는지 확인
            int userApprovalCount = userService.userFindApproval(targetId);
            int userRequestCount = userService.userFindRequest(targetId);
            int userReturnCount = userService.userFindReturn(targetId);

            // 각 테이블에 신청 이 있다면
            if(userApprovalCount != 0 ){
                userService.removeFromStockApproval(targetId);
            }

            if(userRequestCount != 0){
                userService.removeFromUserRequest(targetId);
            }

            if(userReturnCount != 0){
                userService.removeFromStockReturn(targetId);
            }
            
            // 마지막 사용자 삭제
            int result = userService.userRemove(targetId); // 사용자 삭제
            if (result != 1) { // 실패시
                throw new Exception("퇴사 처리에 실패했습니다");
            }

            String msg = "퇴사 처리가 완료되었습니다";
            return ResponseEntity.ok(msg);

        } catch (Exception e) {
            String msg = e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
        }
    }

    //////////////검색
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/userSearch")
    public ResponseEntity<ArrayList<UserVO>> userSearch(@RequestParam("value") String value,
                                                        @RequestParam("option") String option) {

        ArrayList<UserVO> search = userService.getSearch(value, option);

        return ResponseEntity.ok(search);
    }


    @PostMapping("/passwordFind")
    public ResponseEntity<ArrayList<UserVO>> PasswordFind(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.toString());

        try {
            ArrayList<UserVO> vo = userService.passwordFind(requestBody.get("emailInput"));

            return ResponseEntity.ok(vo);
        } catch (Exception e) {
            String errorMessage = "자산 사용 반려 중 오류가 발생했습니다.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<UserVO>());
        }

    }

    @PostMapping("/authSend")
    public ResponseEntity<Integer> authSend(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.get("emailInput"));
        MailSend send = new MailSend();
        send.setAuthNum((int) (Math.random() * 899999) + 100000);
        String result = send.welcomeMailSend(requestBody.get("emailInput"), send.getAuthNum());
        System.out.println(result);
        return ResponseEntity.ok(send.getAuthNum());
    }

    @PostMapping("/passwordModify")
    public ResponseEntity<String> passwordModify(@RequestBody Map<String, String> requestBody) {
        System.out.println(requestBody.toString());
        try {
            userService.UserPasswordReset(requestBody.get("passwordReset"), requestBody.get("emailInput"));
            return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("비밀번호 변경 중 오류가 발생했습니다.");
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody Map<String, String> request) {
//        System.out.println(request.toString());
//
//
//        try {
//            return ResponseEntity.ok("비밀번호가 정상적으로 변경되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("비밀번호 변경 중 오류가 발생했습니다.");
//        }
//
//
//    }

}
