package com.ittam.web.notice.service;

import com.ittam.web.command.NoticeImgVO;
import com.ittam.web.command.NoticeSearchVO;
import com.ittam.web.command.NoticeVO;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

public interface NoticeService {

    public ArrayList<NoticeVO> getNotice();
    public NoticeVO getDetail(String id);
    public NoticeImgVO getDetailImg(String id);
    public void postNotice(NoticeVO noticeVO, List<MultipartFile> multipartFileList);

    void updateNotice(NoticeVO noticeVO, List<MultipartFile> multipartFiles);

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
