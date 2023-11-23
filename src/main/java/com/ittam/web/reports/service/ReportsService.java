package com.ittam.web.reports.service;

import java.util.List;
import java.util.Map;

public interface ReportsService {

    public Integer allUsersNum(); //총사원수
    public Integer allAssetsNum(); //총자산수
    public Integer usingAssetsNum(); //사용중인 자산수


////////////////////////////////////////////////////////
    public Integer getDesignNum(); //디자인부서
    public Integer getDevNum(); //개발
    public Integer getEngNum(); //엔지니어링
    public Integer getFinNum(); //재무
    public Integer getRndNum();//연구개발
    public Integer getPurNum(); //구매
    public Integer getSalesNum(); //영업
    public Integer getMarkNum(); //마케팅
    public Integer getHrNum(); //인사
    public Integer getProdNum(); //생산
///////////////////////////////////////////////////

//////////////////////////////////////////////////
    public Map<String, Integer> getAssetStickNum();

//////////////////////////////////////////////////
    public Map<String, Integer> getCPUNum();
    public Map<String, Integer> getGPUNum();
    public Map<String, Integer> getMFGNum();

//////////////////////////////////////////////////
//////////////////////////////////////////////////
    public Map<Object, Object> getRadialBarNum();
/////////////////////////////////////////////////
    public Map<String, Integer> getSWMFGNum();
    public Map<String, Integer> getEtcMFGNum();
    public Map<String, Integer> getServerMFGNum();

//////////////////////////////////////////////
    public Map<String, Integer> getDepartAsset();
}
