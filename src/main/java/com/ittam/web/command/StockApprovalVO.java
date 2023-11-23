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
public class StockApprovalVO {
    private int appro_num;
    private String username;
    private int assets_num;
    private int category_num;
    private String appro_title;
    private Timestamp appro_date;
    //    private int appro_count;
//    private String asset_seriel;
    private String appro_comment;
    private String appro_kind;
    private String appro_yn;
    private Timestamp appro_okdate;
    private int userq_num;

}
