package com.ittam.web.controller;


import com.ittam.web.reports.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class ReportsController {

    @Autowired
    @Qualifier("reportsService")
    private ReportsService reportsService;

    @GetMapping("/getCardNum")
    public ResponseEntity<Map<String, Integer>> getCardNum() {
        Map<String, Integer> map = new HashMap<>();
        map.put("allUsersNum", reportsService.allUsersNum());
        map.put("allAssetsNum", reportsService.allAssetsNum());
        map.put("usingAssetsNum", reportsService.usingAssetsNum());

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/getDepartNum")
    public ResponseEntity<Map<String, Integer>> getDepartNum() {
        Map<String, Integer> map = new HashMap<>();
        map.put("design", reportsService.getDesignNum());
        map.put("fin", reportsService.getFinNum());
        map.put("hr", reportsService.getHrNum());
        map.put("dev", reportsService.getDevNum());
        map.put("mark", reportsService.getMarkNum());
        map.put("eng", reportsService.getEngNum());
        map.put("pur", reportsService.getPurNum());
        map.put("prod", reportsService.getProdNum());
        map.put("sales", reportsService.getSalesNum());
        map.put("rnd", reportsService.getRndNum());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/getAssetStickNum")
    public ResponseEntity<Map<String, Integer>> getAssetStickNum() {

        return new ResponseEntity<>(reportsService.getAssetStickNum(), HttpStatus.OK);
    }

    @GetMapping("getCPUNum")
    public ResponseEntity<Map<String, Integer>> getCPUNum() {
        return new ResponseEntity<>(reportsService.getCPUNum(), HttpStatus.OK);
    }
    @GetMapping("getGPUNum")
    public ResponseEntity<Map<String, Integer>> getGPUNum() {
        return new ResponseEntity<>(reportsService.getGPUNum(), HttpStatus.OK);
    }
    @GetMapping("getMFGNum")
    public ResponseEntity<Map<String, Integer>> getMFGNum() {
        return new ResponseEntity<>(reportsService.getMFGNum(), HttpStatus.OK);
    }

    @GetMapping("/getRadialBarNum")
    public ResponseEntity<Map<Object, Object>> getRadialBarNum() {
        Map<Object,Object> map = reportsService.getRadialBarNum();
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/getSWMFGNum")
    public ResponseEntity<Map<String, Integer>> getSWMFGNum() {
        return new ResponseEntity<>(reportsService.getSWMFGNum(), HttpStatus.OK);
    }
    @GetMapping("/getEtcMFGNum")
    public ResponseEntity<Map<String, Integer>> getEtcMFGNum() {

        return new ResponseEntity<>(reportsService.getEtcMFGNum(), HttpStatus.OK);
    }
    @GetMapping("/getServerMFGNum")
    public ResponseEntity<Map<String, Integer>> getServerMFGNum() {

        return new ResponseEntity<>(reportsService.getServerMFGNum(), HttpStatus.OK);
    }
    @GetMapping("/getDepartAsset")
    public ResponseEntity<Map<String, Integer>> getDepartAsset() {
        return new ResponseEntity<>(reportsService.getDepartAsset(), HttpStatus.OK);
    }
}
