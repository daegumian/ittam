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
public class AlarmVO {

    private Integer alarm_num;
    private String username;
    private String assets_name;
    private String assets_detail_name;
    private String alarm_type;
    private String alarm_status;
    private String alarm_yn;
    private Timestamp alarm_regdate;
}
