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
public class AlarmRequestVO {

    private Integer alarmreq_num;
    private Integer userq_num;
    private String username;
    private String alarm_type;
    private String alarm_status;
    private String alarm_yn;
    private Timestamp alarm_regdate;
}
