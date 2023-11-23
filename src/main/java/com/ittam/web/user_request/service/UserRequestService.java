package com.ittam.web.user_request.service;

import com.ittam.web.command.UserRequestVO;

import java.util.ArrayList;
import java.util.Map;

public interface UserRequestService {

    public ArrayList<UserRequestVO> UserRequestList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int UserRequestApprove(int userq_NUM, String username); // (관리자 페이지) 신청 승인 처리
    public int UserRequestreturn(int userq_NUM, String username); // (관리자 페이지) 신청 반려 처리
    public ArrayList<UserRequestVO> UserRequestSearch (String inputText); // (관리자 페이지) 검색 리스트
    public ArrayList<UserRequestVO> UserRequestHandle(); // (관리자 처리 페이지) 목록 리스트
    public ArrayList<UserRequestVO> UserRequestHandleSearch(String inputText, ArrayList<String> pageNav); // (관리자 신청 페이지) 검색 리스트
    public ArrayList<UserRequestVO> UserRequestNavSearch(ArrayList<String> navText);// (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ArrayList<UserRequestVO> UserRequestCategorySearch(String category_num, ArrayList<String> navText); // (관리자) 자산별 검색 select
    /////////////////////////////// 관리자 구매 관련
    public ArrayList<UserRequestVO> UserRequestBuyList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int UserRequestBuyApprove(UserRequestVO vo, String username); // (관리자 페이지) 신청 승인 처리
    public int UserRequestBuyApproveB(UserRequestVO vo);
    public int UserRequestBuyReturn(int userq_NUM, String username); // (관리자 페이지) 신청 반려 처리
    public ArrayList<UserRequestVO> UserRequestBuySearch (String inputText); // (관리자 페이지) 검색 리스트
    public ArrayList<UserRequestVO> UserRequestBuyHandlePage(); // (관리자 처리 페이지) 목록 리스트
    public ArrayList<UserRequestVO> UserRequestBuyHandleSearch(String inputText, ArrayList<String> pageNav); // (관리자 신청 페이지) 검색 리스트
    public ArrayList<UserRequestVO> UserRequestBuyNavSearch(ArrayList<String> navText);// (관리자 목록 페이지) 전체,승인,반려 버튼 리스트
    public ArrayList<UserRequestVO> UserRequestBuyCategorySearch(String category_num, ArrayList<String> navText); // (관리자) 자산별 검색 select
    ////////////////////////////////////// 최종 관리자
    public ArrayList<UserRequestVO> HighUserRequestList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int HighUserRequestApprove(int userq_NUM, String username); // (관리자 페이지) 신청 승인 처리
    public int HighUserRequestApproveB(int assets_num, String req_username); // (관리자 페이지) 신청 승인 처리
    public int HighUserRequestReturn(int userq_NUM, String username); // (관리자 페이지) 신청 반려 처리
    public ArrayList<UserRequestVO> HighUserRequestSearch (String inputText); // (관리자 페이지) 검색 리스트

    public ArrayList<UserRequestVO> HighUserBuyRequestList(); // (관리자 페이지) 신청 조회 페이지 리스트
    public int HighUserBuyRequestApprove(int userq_NUM, String username); // (관리자 페이지) 신청 승인 처리
    public int HighUserBuyRequestReturn(int userq_NUM, String username); // (관리자 페이지) 신청 반려 처리
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
