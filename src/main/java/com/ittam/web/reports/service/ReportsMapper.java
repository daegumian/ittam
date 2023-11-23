package com.ittam.web.reports.service;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReportsMapper {

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
    public Integer getAssetStickNum(@Param("n") Integer n, @Param("category_num") Integer category_num);

    public Integer getCPUNum(String cpu);
    public Integer getGPUNum(String gpu);
    public Integer getMFGNum(String mfg);

//////////////////////////////////////////////////
    public List<Map<Object, Object>> getAssetsAllNum();
    public List<Map<Object, Object>> getAssetsUsingNum();
    public Integer getSWMFGNum(String swmfg);
    public Integer getEtcMFGNum(String etcmfg);
    public Integer getServerMFGNum(String servermfg);
    public Integer getDepartAsset(String depart);
}
