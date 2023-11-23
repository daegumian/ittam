package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    // 사용자 목록
    @Override
    public ArrayList<UserVO> userList() {
        return userMapper.userList();
    }
    
    // 사용자 등록
    @Override
    public int userRegist(UserVO vo) {

        return userMapper.userRegist(vo);
    }

    // 사용자 상세 정보
    @Override
    public UserVO userDetail(String userId) {
        return userMapper.userDetail(userId);
    }

    // 사용자 권한 변경
    @Override
    public int userEdit(String targetId, String newRole) {
        return userMapper.userEdit(targetId, newRole);
    }
    
    // 사원 퇴사 처리
    @Override
    public int userRemove(String targetId) {
        return userMapper.userRemove(targetId);
    }
    
    // 사용 중인 자산이 있는지 확인
    @Override
    public int userFindAsset(String targetId) {
        return userMapper.userFindAsset(targetId);
    }

    // itAsset 에서 사용자 제거, status 사용 가능으로
    @Override
    public int userAssetChange(String targetId) {
        return userMapper.userAssetChange(targetId);
    }
    
    // 사용자의 구매, 수리 등 신청 개수
    @Override
    public int userFindApproval(String targetId) {
        return userMapper.userFindApproval(targetId);
    }
    
    // 사용자 사용 신청의 개수
    @Override
    public int userFindRequest(String targetId) {
        return userMapper.userFindRequest(targetId);
    }

    @Override
    public int userFindReturn(String targetId) {
        return userMapper.userFindReturn(targetId);
    }

    // 각 신청 테이블에서 동일한 id 를 삭제한다
    @Override
    public int removeFromStockApproval(String targetId) {
        return userMapper.removeFromStockApproval(targetId);
    }

    @Override
    public int removeFromUserRequest(String targetId) {
        return userMapper.removeFromUserRequest(targetId);
    }

    @Override
    public int removeFromStockReturn(String targetId) {
        return userMapper.removeFromStockReturn(targetId);
    }

    // 검색
    @Override
    public ArrayList<UserVO> getSearch(String value, String option) {
        return userMapper.getSearch(value, option);
    }

    @Override
    public ArrayList<UserVO> passwordFind(String email) {
        return userMapper.passwordFind(email);
    }

    @Override
    public void UserPasswordReset(String passwordReset, String emailInput) {
        String encryptedPassword = passwordEncoder.encode(passwordReset);

        System.out.println("서비스 : " + passwordReset);
        System.out.println("서비스 : " + emailInput);
        userMapper.UserPasswordReset(encryptedPassword, emailInput);
    }


}
