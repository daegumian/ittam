package com.ittam.web.user.service;

import com.ittam.web.command.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface UserMapper {

    // 사용자 목록
    ArrayList<UserVO> userList();

    //사용자 등록
    int userRegist(UserVO vo);

    // 사용자 상세정보
    UserVO userDetail(String userId);

    // 사용자 권한 변경
    int userEdit(@Param("targetId") String targetId, @Param("newRole") String newRole);

    // 사용자 퇴사 처리
    int userRemove(String targetId);

    // IT 자산에서 사용 중인 자산이 있는지 확인
    int userFindAsset(String targetId);

    // 사용자 구매, 수리 신청의 개수 확인
    int userFindApproval(String targetId);

    // 사용자 사용 신청 개수 확인
    int userFindRequest(String targetId);

    // 사용자 반환 테이블 개수 확인
    int userFindReturn(String targetId);

    // itAsset 에서 사용자 제거, status 사용 가능으로
    int userAssetChange(String targetId);

    // 각 신청 테이블에서 동일한 id 를 삭제한다
    int removeFromStockApproval(String targetId);
    int removeFromUserRequest(String targetId);
    int removeFromStockReturn(String targetId);

    // 검색
    ArrayList<UserVO> getSearch(@Param("value") String value, @Param("option") String option);

    public ArrayList<UserVO> passwordFind(String email);
    public void UserPasswordReset(@Param("passwordReset")String passwordReset, @Param("emailInput")String emailInput);
    public UserVO login (String username);
}
