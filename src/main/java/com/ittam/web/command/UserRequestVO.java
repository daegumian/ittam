package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequestVO {

    private Integer userq_num;
    private String username;
    private Integer category_num;
    private String userq_title;
    private LocalDate userq_regdate;
    private String userq_kind;
    private String userq_comment;
    private String userq_yn;
    private String userq_grantor;
    private LocalDate userq_okdate;
    private Integer userq_count;

    //최종구매승인카운트
    private Integer count;
    private Integer assets_num;


}
