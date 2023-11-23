package com.ittam.web.controller;

import com.ittam.web.command.NoticeImgVO;
import com.ittam.web.command.NoticeSearchVO;
import com.ittam.web.command.NoticeVO;
import com.ittam.web.notice.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/noticelist")
@CrossOrigin(origins = "http://localhost:3000")
public class NoticeController {

    @Autowired
    @Qualifier("noticeService")
    private NoticeService noticeService;

    @RequestMapping("")
    public ResponseEntity<List<NoticeVO>> getNotice() {
        ArrayList<NoticeVO> result = noticeService.getNotice();
        System.out.println(result.toString());
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<NoticeVO> getDetail(@RequestParam String id) {

        NoticeVO vo = noticeService.getDetail(id);
        noticeService.upperNoticeHits(id);
        return ResponseEntity.status(HttpStatus.OK).body(vo);

    }

    @GetMapping("/detailimg/{id}")
    public ResponseEntity<NoticeImgVO> getDetailImg(@RequestParam String id) {

        NoticeImgVO vo = noticeService.getDetailImg(id);
        return ResponseEntity.status(HttpStatus.OK).body(vo);

    }

    @PostMapping("/write")
//    public ResponseEntity<String> postNotice(@ModelAttribute NoticeVO noticeVO , @RequestPart(required = false) List<MultipartFile> multipartFileList) {
    public ResponseEntity<String> postNotice(
//            @ModelAttribute NoticeVO noticeVO,
            @RequestParam String notice_name,
            @RequestParam String notice_title,
            @RequestParam String notice_content,
            @RequestParam String notice_enddate,
//            @RequestPart(required = false) List<MultipartFile> multipartFileList,
            @RequestPart(required = false) MultipartFile multipartFile
    ) throws ParseException {
        List<MultipartFile> multipartFileList = new ArrayList<>();
        if (multipartFile != null){
            multipartFileList.add(multipartFile);
        }
        // 이미지 업로드 때문에 @RequestBody에서 다른 방식으로 변경
        // 프론트에서 form-data 형태로 받아올 것.
        System.out.println("글쓰기 테스트");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        NoticeVO noticeVO = NoticeVO.builder()
                .notice_name(notice_name)
                .notice_title(notice_title)
                .notice_content(notice_content)
                .notice_enddate(new Timestamp(simpleDateFormat.parse(notice_enddate).getTime()))
                .build();
        try {
            noticeVO.setNotice_regdate(Timestamp.valueOf(LocalDateTime.now()));
            noticeVO.setNotice_hits(0);
            noticeService.postNotice(noticeVO, multipartFileList);
            return ResponseEntity.ok("게시글이 작성되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("글 게시중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> postUpdate(
//            @ModelAttribute NoticeVO noticeVO,
            @RequestParam String notice_name,
            @RequestParam String notice_title,
            @RequestParam String notice_content,
            @RequestParam String notice_enddate,
            @RequestParam Long notice_num,
//            @RequestPart(required = false) List<MultipartFile> multipartFileList,
            @RequestPart(required = false) MultipartFile multipartFile
    ) throws ParseException {

        List<MultipartFile> multipartFileList = new ArrayList<>();
        System.out.println(notice_name);


        if (multipartFile != null){
            multipartFileList.add(multipartFile);
        }
        // 이미지 업로드 때문에 @RequestBody에서 다른 방식으로 변경
        // 프론트에서 form-data 형태로 받아올 것.
        System.out.println("글쓰기 테스트");
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        NoticeVO noticeVO = NoticeVO.builder()
                .notice_num(notice_num)
                .notice_name(notice_name)
                .notice_title(notice_title)
                .notice_content(notice_content)
                .notice_enddate(new Timestamp(simpleDateFormat.parse(notice_enddate).getTime()))
                .build();
        try {
            noticeVO.setNotice_regdate(Timestamp.valueOf(LocalDateTime.now()));
            noticeVO.setNotice_hits(0);
            noticeService.updateNotice(noticeVO, multipartFileList);
            return ResponseEntity.ok("게시글이 수정되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("글 게시중 오류가 발생했습니다.");
        }
    }

//    @PostMapping("/updateimg")
//    public ResponseEntity<String> updateNoticeImg(@RequestBody NoticeImgVO noticeimgVO) {
//        System.out.println("update : " + noticeimgVO.toString());
//        try {
//            noticeService.updateNoticeImg(noticeimgVO);
//            return ResponseEntity.ok("게시글이 수정되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("글 수정중 오류가 발생했습니다.");
//        }
//    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteNotice(@RequestBody NoticeVO noticeVO) {
        System.out.println(noticeVO);
        try {
            noticeService.deleteNotice(noticeVO);
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("글 삭제중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/deleteimg")
    public ResponseEntity<String> deleteNoticeImg(@RequestBody NoticeImgVO noticeimgVO) {
        System.out.println(noticeimgVO);
        try {
            noticeService.deleteNoticeImg(noticeimgVO);
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("글 삭제중 오류가 발생했습니다.");
        }
    }


    @GetMapping("/searchTitle")
    public ResponseEntity<List<NoticeVO>> searchNoticeByTitle(@RequestParam String notice_title) {
        List<NoticeVO> result = noticeService.searchNoticeByTitle(notice_title);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/searchContent")
    public ResponseEntity<List<NoticeVO>> searchNoticeByContent(@RequestParam String content) {
        List<NoticeVO> result = noticeService.searchNoticeByContent(content);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/active")
    public ResponseEntity<List<NoticeVO>> searchNoticeIsActive() {
        List<NoticeVO> result = noticeService.searchNoticeIsActive();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/expire")
    public ResponseEntity<List<NoticeVO>> searchNoticeIsExpire() {
        List<NoticeVO> result = noticeService.searchNoticeIsExpire();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/searchDate")
    public ResponseEntity<List<NoticeVO>> searchNoticeByDate(@RequestBody NoticeSearchVO noticeSearchVO) {
        System.out.println(noticeSearchVO);
        List<NoticeVO> result = noticeService.searchNoticeByDate(noticeSearchVO);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}