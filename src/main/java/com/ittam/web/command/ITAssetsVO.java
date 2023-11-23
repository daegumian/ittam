package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ITAssetsVO {
    //ITASSETS테이블
    private int assets_num;
    private int category_num;
    private String assets_name;
    private String assets_detail_name;
    private String assets_status;
    private int spec_num;
    private String username;
    private Timestamp add_date;
    private Timestamp rent_date;


    //카테고리 네임
    private String category_name;


    //컴퓨터,노트북 SPEC 테이블
    private String spec_cpu;
    private String spec_ram;
    private String spec_mainboard;
    private String spec_power;
    private String spec_gpu;
    private String spec_hdd;
    private String spec_ssd;
    private String spec_ops;
    private String spec_mfg;
    private String spec_seriel;
    private String spec_warranty;
    private String spec_purchase_date;


    //소프트웨어 SPET 테이블
    private String sw_mfg;
    private String sw_spec_warranty;
    private String sw_spec_seriel;
    private String sw_purchase_date;
    private String sw_price;

    //etcspec
    private String etc_mfg;
    private String etc_spec_warranty;
    private String etc_purchase_date;
    private String etc_price;

    //서버스펙
    private String server_mfg;
    private String server_spec_warranty;
    private String server_capa;
    private String server_price;
    private String server_purchase_date;
    private String server_interface;
    private String server_average_life;
    private String server_rpm;
    private String server_datarecovery_life;
    //자산개수
    private Integer itcount;
}
