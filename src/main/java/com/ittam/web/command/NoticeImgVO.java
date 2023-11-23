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
public class NoticeImgVO {

    private Long noticeimg_num;
    private Long notice_num2;
    private String noticeimg_name;
    private String noticeimg_uuid;
    private String noticeimg_path;
    private Timestamp noticeimg_regdate;

}
