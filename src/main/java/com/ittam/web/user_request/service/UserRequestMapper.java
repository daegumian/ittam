package com.ittam.web.user_request.service;

import com.ittam.web.command.UserRequestVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface UserRequestMapper {
    public ArrayList<UserRequestVO> UserRequestList();
    public int UserRequestApprove(@Param("userq_num") int userq_num, @Param("username") String username);
    public int UserRequestreturn(@Param("userq_num") int userq_num, @Param("username")String username);
    public ArrayList<UserRequestVO> UserRequestSearch (String inputText);
    public ArrayList<UserRequestVO> UserRequestHandle();
    public ArrayList<UserRequestVO> UserRequestHandleSearch(@Param("inputText") String inputText, @Param("pageNav") ArrayList<String> pageNav);
    public ArrayList<UserRequestVO> UserRequestNavSearch(ArrayList<String> navText);
    public ArrayList<UserRequestVO> UserRequestCategorySearch(@Param("category_num")String category_num, @Param("navText") ArrayList<String> navText); // (관리자) 자산별 검색 select
    /////////////////////////////// 관리자 구매 관련
    public ArrayList<UserRequestVO> UserRequestBuyList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int UserRequestBuyApprove(@Param("userRequestVO")UserRequestVO userRequestVO, @Param("username") String username); // (관리자 페이지) 신청 승인 처리
    public int UserRequestBuyApproveB(@Param("vo")UserRequestVO vo);

    public int UserRequestBuyReturn(@Param("userq_num") int userq_num, @Param("username") String username); // (관리자 페이지) 신청 반려 처리
    public ArrayList<UserRequestVO> UserRequestBuySearch (String inputText); // (관리자 페이지) 검색 리스트
    public ArrayList<UserRequestVO> UserRequestBuyHandlePage(); // (관리자 처리 페이지) 목록 리스트
    public ArrayList<UserRequestVO> UserRequestBuyHandleSearch(String inputText, ArrayList<String> pageNav); // (관리자 신청 페이지) 검색 리스트
    public ArrayList<UserRequestVO> UserRequestBuyNavSearch(ArrayList<String> navText);// (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ArrayList<UserRequestVO> UserRequestBuyCategorySearch(String category_num, ArrayList<String> navText); // (관리자) 자산별 검색 select
    ////////////////////////////////////// 최종 관리자
    public ArrayList<UserRequestVO> HighUserRequestList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int HighUserRequestApprove(@Param("userq_num") int userq_num, @Param("username") String username); // (관리자 페이지) 신청 승인 처리
    public int HighUserRequestApproveB(@Param("assets_num") int userq_num, @Param("req_username") String req_username); // (관리자 페이지) 신청 승인 처리
    public int HighUserRequestReturn(@Param("userq_num")int userq_num, @Param("username")String username); // (관리자 페이지) 신청 반려 처리
    public ArrayList<UserRequestVO> HighUserRequestSearch (String inputText); // (관리자 페이지) 검색 리스트

    public ArrayList<UserRequestVO> HighUserBuyRequestList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int HighUserBuyRequestApprove(@Param("userq_num") int userq_num, @Param("username") String username); // (관리자 페이지) 신청 승인 처리
    public int HighUserBuyRequestReturn(@Param("userq_num") int userq_num, @Param("username") String username); // (관리자 페이지) 신청 반려 처리
    public ArrayList<UserRequestVO> HighUserBuyRequestSearch (String inputText); // (관리자 페이지) 검색 리스트

    public ArrayList<UserRequestVO> HighUserRequestHandlePage(); // (관리자 처리 페이지) 목록 리스트
    public ArrayList<UserRequestVO> HighUserRequestHandleSearch(String inputText, ArrayList<String> pageNav); // (관리자 신청 페이지) 검색 리스트
    public ArrayList<UserRequestVO> HighUserRequestNavSearch(ArrayList<String> navText);// (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ArrayList<UserRequestVO> HighUserRequestCategorySearch(String category_num, ArrayList<String> navText); // (관리자) 자산별 검색 select


    public ArrayList<UserRequestVO> HighUserRequestBuyHandlePage(); // (관리자 처리 페이지) 목록 리스트
    public ArrayList<UserRequestVO> HighUserRequestBuyHandleSearch(String inputText, ArrayList<String> pageNav); // (관리자 신청 페이지) 검색 리스트
    public ArrayList<UserRequestVO> HighUserRequestBuyNavSearch(ArrayList<String> navText);// (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ArrayList<UserRequestVO> HighUserRequestBuyCategorySearch(String category_num, ArrayList<String> navText); // (관리자) 자산별 검색 select


}
