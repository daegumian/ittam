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
public class StockReturnVO {

    private int return_num;
    private int assets_num;
    private String username;
    private String return_kind;
    private String return_title;
    private String return_comment;
    private Timestamp return_date;
    private String return_status;
    private String return_assets_detail_name;

}
