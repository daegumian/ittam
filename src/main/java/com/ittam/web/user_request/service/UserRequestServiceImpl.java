package com.ittam.web.user_request.service;

import com.ittam.web.command.UserRequestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service("userRequestService")
public class UserRequestServiceImpl implements UserRequestService{

    @Autowired
    private UserRequestMapper userRequestMapper;


    @Override
    public ArrayList<UserRequestVO> UserRequestList() {
        return userRequestMapper.UserRequestList();
    }

    @Override
    public int UserRequestApprove(int userq_NUM, String username) {
        System.out.println(userq_NUM);
        return userRequestMapper.UserRequestApprove(userq_NUM, username);
    }

    @Override
    public int UserRequestreturn(int userq_NUM, String username) {
        return userRequestMapper.UserRequestreturn(userq_NUM, username);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestSearch(String inputText) {
        return userRequestMapper.UserRequestSearch(inputText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestHandle() {
        return userRequestMapper.UserRequestHandle();
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestHandleSearch(String inputText, ArrayList<String> pageNav) {
        return userRequestMapper.UserRequestHandleSearch(inputText, pageNav);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestNavSearch(ArrayList<String> navText) {
        return userRequestMapper.UserRequestNavSearch(navText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestCategorySearch(String category_num, ArrayList<String> navText) {
        return userRequestMapper.UserRequestCategorySearch(category_num, navText);
    }


    /////////////////////////////// 관리자 구매 관련
    @Override
    public ArrayList<UserRequestVO> UserRequestBuyList() {
        return userRequestMapper.UserRequestBuyList();
    }

    @Override
    public int UserRequestBuyApprove(UserRequestVO vo, String username) {

        return userRequestMapper.UserRequestBuyApprove(vo, username);
    }

    @Override
    public int UserRequestBuyApproveB(UserRequestVO vo) {
        System.out.println(vo.toString());
        return userRequestMapper.UserRequestBuyApproveB(vo);
    }

    @Override
    public int UserRequestBuyReturn(int userq_NUM, String username) {
        return userRequestMapper.UserRequestBuyReturn(userq_NUM, username);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuySearch(String inputText) {
        return userRequestMapper.UserRequestBuySearch(inputText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyHandlePage() {
        return userRequestMapper.UserRequestBuyHandlePage();
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyHandleSearch(String inputText, ArrayList<String> pageNav) {
        return userRequestMapper.UserRequestBuyHandleSearch(inputText, pageNav);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyNavSearch(ArrayList<String> navText) {
        return userRequestMapper.UserRequestBuyNavSearch(navText);
    }

    @Override
    public ArrayList<UserRequestVO> UserRequestBuyCategorySearch(String category_num, ArrayList<String> navText) {
        return userRequestMapper.UserRequestBuyCategorySearch(category_num, navText);
    }
    ////////////////////////////////////// 최종 관리자
    @Override
    public ArrayList<UserRequestVO> HighUserRequestList() {
        return userRequestMapper.HighUserRequestList();
    }

    @Override
    public int HighUserRequestApprove(int userq_NUM, String req_username) {
        return userRequestMapper.HighUserRequestApprove(userq_NUM, req_username);
    }

    @Override
    public int HighUserRequestApproveB(int assets_num, String username) {
        return userRequestMapper.HighUserRequestApproveB(assets_num,username);
    }

    @Override
    public int HighUserRequestReturn(int userq_NUM, String username) {
        return userRequestMapper.HighUserRequestReturn(userq_NUM, username);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestSearch(String inputText) {
        return userRequestMapper.HighUserRequestSearch(inputText);
    }


    @Override
    public ArrayList<UserRequestVO> HighUserBuyRequestList() {
        return userRequestMapper.HighUserBuyRequestList();
    }

    @Override
    public int HighUserBuyRequestApprove(int userq_NUM, String username) {
        return userRequestMapper.HighUserBuyRequestApprove(userq_NUM, username);
    }

    @Override
    public int HighUserBuyRequestReturn(int userq_NUM, String username) {
        return userRequestMapper.HighUserBuyRequestReturn(userq_NUM, username);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserBuyRequestSearch(String inputText) {
        return userRequestMapper.HighUserBuyRequestSearch(inputText);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestHandlePage() {
        return userRequestMapper.HighUserRequestHandlePage();
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestHandleSearch(String inputText, ArrayList<String> pageNav) {
        return userRequestMapper.HighUserRequestHandleSearch(inputText,pageNav);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestNavSearch(ArrayList<String> navText) {
        return userRequestMapper.HighUserRequestNavSearch(navText);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestCategorySearch(String category_num, ArrayList<String> navText) {
        return userRequestMapper.HighUserRequestCategorySearch(category_num, navText);
    }



    @Override
    public ArrayList<UserRequestVO> HighUserRequestBuyHandlePage() {
        return userRequestMapper.HighUserRequestBuyHandlePage();
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestBuyHandleSearch(String inputText, ArrayList<String> pageNav) {
        return userRequestMapper.HighUserRequestBuyHandleSearch(inputText, pageNav);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestBuyNavSearch(ArrayList<String> navText) {
        return userRequestMapper.HighUserRequestBuyNavSearch(navText);
    }

    @Override
    public ArrayList<UserRequestVO> HighUserRequestBuyCategorySearch(String category_num, ArrayList<String> navText) {
        return userRequestMapper.HighUserRequestBuyCategorySearch(category_num, navText);
    }


}
