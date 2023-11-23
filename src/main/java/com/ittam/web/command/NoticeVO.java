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
public class NoticeVO {

    private Long notice_num;
    private String notice_name;
    private String notice_title;
    private String notice_content;
    private Timestamp notice_regdate;
    private Timestamp notice_enddate;
    private Integer notice_hits;

}