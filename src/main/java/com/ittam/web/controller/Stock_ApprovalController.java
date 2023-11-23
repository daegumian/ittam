package com.ittam.web.controller;

import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.StockApprovalVO;
import com.ittam.web.command.UserRequestVO;
import com.ittam.web.mainPage.service.MainPageService;
import com.ittam.web.stock_approval.service.Stock_approvalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "http://localhost:3000")
public class  Stock_ApprovalController {

    @Autowired
    private Stock_approvalService stock_approvalService;

    @Autowired
    @Qualifier("mainPageService")
    private MainPageService mainPageService;

//    private String randomString(int length) {
//        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//        StringBuilder sb = new StringBuilder(length);
//        Random rd = new Random();
//
//        for(int i = 0; i< length; i++) {
//            sb.append(characters.charAt(rd.nextInt(characters.length())));
//        }
//
//        return sb.toString();
//    }

    @GetMapping("/getStockApprovalList")
    public ResponseEntity<List<StockApprovalVO>> getStockApprovalList() {
        List<StockApprovalVO> data = stock_approvalService.getStockApprovalList();

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/updateITStatus")
    public ResponseEntity<Integer> updateITStatus(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> itemData = (Map<String, Object>) requestData.get("item");


        System.out.println(itemData.toString());
        ITAssetsVO vo = new ITAssetsVO();
        StockApprovalVO vo2 = new StockApprovalVO();
        UserRequestVO vo3 = new UserRequestVO();
        int data = 0;
        if("폐기".equals((String) itemData.get("appro_kind")) || "수리".equals((String) itemData.get("appro_kind"))) {
            ////////////////알람관련추가사항/////////////////////
            Map<String, Object> map = new HashMap<>();
            map.put("alarm_status", "승인");
            map.put("alarm_type", itemData.get("appro_kind"));
            map.put("username", itemData.get("username"));
            map.put("assets_num", itemData.get("assets_num"));
            map.put("category_num", itemData.get("category_num"));
            mainPageService.registAlarm_admin(map);
            ///////////////////////////////////////////////////
            vo2.setAppro_num((int)itemData.get("appro_num"));
            stock_approvalService.ApprovY(vo2);
            vo.setAssets_status((String) itemData.get("appro_kind"));
            vo.setAssets_num((int) itemData.get("assets_num"));
            data = stock_approvalService.updateITStatus(vo);
        }else if("구매".equals((String) itemData.get("appro_kind"))) {
            /////알람관련 추가사항/////
            System.out.println("구매신청!!!!!!");
            Map<String, Object> map = new HashMap<>();
            map.put("username", itemData.get("username"));
            map.put("userq_num", itemData.get("userq_num"));
            map.put("alarm_type", "구매신청");
            map.put("alarm_status", "승인");
            mainPageService.registAlarm_req(map);
            ////////////////////////
//            if((Integer)itemData.get("assest_num") != 0) {
                vo2.setAppro_num((int)itemData.get("appro_num"));
                stock_approvalService.ApprovY(vo2);
    //            stock_approvalService.updateList(vo);
                vo3.setUserq_num((int)itemData.get("userq_num"));
                stock_approvalService.finalyn(vo3);
//            }else {
//                vo2.setAppro_num((int)itemData.get("appro_num"));
//                stock_approvalService.ApprovY(vo2);
//                vo3.setUserq_num((int)itemData.get("userq_num"));
//                stock_approvalService.finalyn(vo3);
//            }
        }


        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/statusUpdate")
    public ResponseEntity<Integer> statusUpdate(@RequestBody Map<String, Object> requestData ) {
        System.out.println(requestData.toString());
        StockApprovalVO vo = new StockApprovalVO();
        vo.setUsername((String) requestData.get("username"));
        vo.setAssets_num((int) requestData.get("assets_num"));
        vo.setCategory_num((int) requestData.get("category_num"));
        vo.setAppro_title((String) requestData.get("appro_title"));
//        vo.setAsset_seriel(randomString(4) + "-" + randomString(4) + "-" + randomString(4));
        vo.setAppro_comment((String) requestData.get("appro_comment"));
        vo.setAppro_kind((String) requestData.get("assets_status"));
        int data = stock_approvalService.statusUpdate(vo);
        ITAssetsVO vo1 = new ITAssetsVO();
        vo1.setAssets_num((int) requestData.get("assets_num"));
        stock_approvalService.waitYN(vo1);

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping("/approvalN")
    public ResponseEntity<Integer> approvalN(@RequestBody Map<String, Object> requestData) {
        Map<String, Object> itemData = (Map<String, Object>) requestData.get("item");

        ////////////////알람관련추가사항/////////////////////
        Map<String, Object> map = new HashMap<>();
        map.put("alarm_status", "반려");
        map.put("alarm_type", itemData.get("appro_kind"));
        map.put("username", itemData.get("username"));
        map.put("assets_num", itemData.get("assets_num"));
        map.put("category_num", itemData.get("category_num"));
        mainPageService.registAlarm_admin(map);
        ///////////////////////////////////////////////////


        StockApprovalVO vo = new StockApprovalVO();
        UserRequestVO vo3 = new UserRequestVO();
        ITAssetsVO vo1 = new ITAssetsVO();
        int data = 0;
        vo.setAppro_num((int)itemData.get("appro_num"));
        stock_approvalService.ApprovY(vo);

        vo3.setUserq_num((int)itemData.get("userq_num"));
        stock_approvalService.finaln(vo3);

        vo1.setAssets_num((int) itemData.get("assets_num"));
        stock_approvalService.waitN(vo1);


        return new ResponseEntity<>(data, HttpStatus.OK);
    }


    @PostMapping("/purchaseApproval")
    public ResponseEntity<Integer> purchaseApproval(@RequestBody Map<String, Object> requestData) {
        StockApprovalVO vo = new StockApprovalVO();
        UserRequestVO vo3 = new UserRequestVO();

        vo3.setUsername(String.valueOf(requestData.get("username")) );
        vo3.setCategory_num(Integer.valueOf((String)requestData.get("category_num") ));
        vo3.setUserq_title(String.valueOf(requestData.get("appro_title")) );
        vo3.setUserq_comment(String.valueOf(requestData.get("appro_comment")) );
        stock_approvalService.insertApproval(vo3);


        vo.setUsername(String.valueOf(requestData.get("username")) );
        vo.setCategory_num(Integer.valueOf((String) requestData.get("category_num")));
        vo.setAppro_title(String.valueOf(requestData.get("appro_title")) );
        vo.setAppro_comment(String.valueOf(requestData.get("appro_comment")) );
        int data = stock_approvalService.purchaseApproval(vo);

        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
