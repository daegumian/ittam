package com.ittam.web.notice.service;

import com.ittam.web.command.NoticeImgVO;
import com.ittam.web.command.NoticeSearchVO;
import com.ittam.web.command.NoticeVO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Mapper
public interface NoticeMapper {
    public ArrayList<NoticeVO> getNotice();
    public NoticeVO getDetail(String id);
    public NoticeImgVO getDetailImg(String id);
    public void postNotice(Map<String, Object> params);
    public void postNoticeSingle(NoticeVO noticeVO);
    public void postNoticeImgList(List<NoticeImgVO> noticeImgVOList);
    public void updateNotice(NoticeVO noticeVO);
    public void updateNoticeImg(NoticeImgVO noticeImgVO);
    public void deleteNotice(NoticeVO noticeVO);
    public void deleteNoticeImg(NoticeImgVO noticeimgVO);
    public NoticeVO getNoticeOne(Long notice_num);
    public List<NoticeVO> searchNoticeByTitle(String title);
    public List<NoticeVO> searchNoticeByContent(String content);
    public List<NoticeVO> searchNoticeIsActive();
    public List<NoticeVO> searchNoticeIsExpire();
    public List<NoticeVO> searchNoticeByDate(NoticeSearchVO noticeSearchVO);
    public void upperNoticeHits(String notice_num);

}
