package com.ittam.web.controller;


import com.ittam.web.asset_request.service.AssetRequestService;
import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.UserRequestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/AssetRequest")
public class Asset_RequestController {

    @Autowired
    @Qualifier("assetRequestService")
    private AssetRequestService assetRequestService;

    //자산 목록 조회
    @GetMapping("/AssetRequestList")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<ITAssetsVO>> AssetAllList(){
        List<ITAssetsVO> data = assetRequestService.AssetAllList();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    //자산 목록 검색
    @PostMapping("/AssetRequestSearch")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ArrayList<ITAssetsVO>> AssetRequestSearch(@RequestBody Map<String, String> requestBody,
                                                                    RedirectAttributes ra){
        System.out.println(requestBody.toString());
//        System.out.println("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        try{
                ArrayList<ITAssetsVO> data = assetRequestService.AssetRequestSearch(requestBody.get("inputText"));
                    return ResponseEntity.ok(data);
        } catch (Exception e){
            String errorMessage = "오류가 있습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<ITAssetsVO>());
        }
    }

    //카테고리별 리스트조회
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/AssetRequestListCategory")
    public ResponseEntity<List<ITAssetsVO>> AssetRequestListCategory(@RequestParam String path){
          if(path.equals("/itassets/pc")){
              List<ITAssetsVO> data = assetRequestService.AssetRequestListPC();
              return new ResponseEntity<>(data, HttpStatus.OK);
          }else if (path.equals("/itassets/sw")){
              List<ITAssetsVO> data = assetRequestService.AssetRequestListSW();
              return new ResponseEntity<>(data, HttpStatus.OK);
          }else if (path.equals("/itassets/sv")){
              List<ITAssetsVO> data = assetRequestService.AssetRequestListSV();
              return new ResponseEntity<>(data, HttpStatus.OK);
          }else{
              List<ITAssetsVO> data = assetRequestService.AssetRequestListETC();
              return new ResponseEntity<>(data, HttpStatus.OK);
          }
    }

    //카테고리별 검색 - PC/노트북
    @PostMapping("/AssetRequestSearchPC")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ArrayList<ITAssetsVO>> AssetRequestSearchPC(@RequestBody Map<String, String> requestBody){
//        System.out.println(requestBody.toString());
        System.out.println("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        try {
                ArrayList<ITAssetsVO> data = assetRequestService.AssetRequestSearchPC(requestBody.get("inputText"));
            System.out.println(data + "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
            ///////빈비열 확인하고 alert보내서 일치하는 값이 없습니다 보내고 전체 목록 뿌림
                return ResponseEntity.ok(data);
        } catch (Exception e){
            String errorMessage = "오류가 있습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<ITAssetsVO>());
        }
    }

    //카테고리별 검색 - SW
    @PostMapping("/AssetRequestSearchSW")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ArrayList<ITAssetsVO>> AssetRequestSearchSW(@RequestBody Map<String, String> requestBody){
//        System.out.println(requestBody.toString());
        System.out.println("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        try {
            ArrayList<ITAssetsVO> data = assetRequestService.AssetRequestSearchSW(requestBody.get("inputText"));
            return ResponseEntity.ok(data);
        } catch (Exception e){
            String errorMessage = "오류가 있습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<ITAssetsVO>());
        }
    }
    //카테고리별 검색 - SV
    @PostMapping("/AssetRequestSearchSV")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ArrayList<ITAssetsVO>> AssetRequestSearchSV(@RequestBody Map<String, String> requestBody){
//        System.out.println(requestBody.toString());
        System.out.println("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        try {
            ArrayList<ITAssetsVO> data = assetRequestService.AssetRequestSearchSV(requestBody.get("inputText"));
            return ResponseEntity.ok(data);
        } catch (Exception e){
            String errorMessage = "오류가 있습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<ITAssetsVO>());
        }
    }
    //카테고리별 검색 - ETC
    @PostMapping("/AssetRequestSearchETC")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<ArrayList<ITAssetsVO>> AssetRequestSearchETC(@RequestBody Map<String, String> requestBody){
//        System.out.println(requestBody.toString());
        System.out.println("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        try {
            ArrayList<ITAssetsVO> data = assetRequestService.AssetRequestSearchETC(requestBody.get("inputText"));
            return ResponseEntity.ok(data);
        } catch (Exception e){
            String errorMessage = "오류가 있습니다";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<ITAssetsVO>());
        }
    }

    //사용 신청
    @PostMapping("/AssetUsageRequest")
    public ResponseEntity<Integer> AssetUsageRequest(@RequestBody Map<String, Object> requestBody){
        //System.out.println(requestBody.toString());
        UserRequestVO vo = new UserRequestVO();
        vo.setUserq_kind(String.valueOf(requestBody.get("assets_name")));
        vo.setCategory_num(Integer.valueOf((String)requestBody.get("category_num")));
        vo.setAssets_num(Integer.valueOf((String)requestBody.get("assets_num")));
        vo.setUserq_title(String.valueOf(requestBody.get("userq_title")));
        vo.setUserq_comment(String.valueOf(requestBody.get("userq_comment")));
        vo.setUsername(String.valueOf(requestBody.get("username")));
        int data = assetRequestService.AssetUsageRequest(vo);
        assetRequestService.AssetUsageRequestUpdate(vo);

        return new ResponseEntity<>(data,HttpStatus.OK);
    }

    // 구매 신청
    @PostMapping("/AssetBuyRequest")
    public ResponseEntity<Integer> AssetBuyRequest(@RequestBody Map<String, Object> requestBody){
        //System.out.println(requestBody.toString());
        UserRequestVO vo = new UserRequestVO();
        vo.setUserq_kind(String.valueOf(requestBody.get("assets_name")));
        vo.setUserq_title(String.valueOf(requestBody.get("userq_title")));
        vo.setUserq_comment(String.valueOf(requestBody.get("userq_comment")));
        vo.setUsername(String.valueOf(requestBody.get("username")));
        int data = assetRequestService.AssetBuyRequest(vo);

        return new ResponseEntity<>(data,HttpStatus.OK);
    }



}
