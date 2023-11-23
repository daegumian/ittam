package com.ittam.web;

import com.ittam.web.command.UserVO;
import com.ittam.web.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootTest
public class DummyDataGenerator {

//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private UserService userService;
//
//    @Test
//    public void generateAndSaveDummyData() {
//        List<UserVO> dummyUsers = generateDummyUsers(15);
//
//        // 생성된 더미 데이터를 데이터베이스에 저장
//        for (UserVO user : dummyUsers) {
//            userService.userRegist(user);
//        }
//    }
//
//    private List<UserVO> generateDummyUsers(int count) {
//        List<UserVO> userList = new ArrayList<>();
//        Random random = new Random();
//
//        String[] lastNames = {
//                "김", "이", "박", "최", "정", "강", "조", "윤", "임", "한"
//        };
//        String[] firstNames = {
//                "철수", "지영", "민수", "영희", "호준", "은지", "승민", "지민", "석호", "수진"
//        };
//
//
//        String[] departments = {
//                "디자인", "개발", "재무", "엔지니어링", "마케팅",
//                "생산", "인사", "구매", "연구개발", "영업"
//        };
//
//        for (int i = 0; i < count; i++) {
//            String username = generateRandomUsername(random);
//            String password = "password" + i;
//            String user_name = generateRandomName(random, firstNames, lastNames);
//            String user_email = generateRandomEmail(random);
//            String user_depart = departments[random.nextInt(departments.length)];
//            String user_phone = "010-" + generateRandomPhoneNumber(random);
//            String user_address = generateRandomAddress(random);
//            String role = "ROLE_USER";
//            LocalDate user_joindate = generateRandomJoinDate(random);
//
//            String encode = passwordEncoder.encode(password);
//
//            UserVO user = UserVO.builder()
//                    .username(username)
//                    .password(encode)
//                    .user_name(user_name)
//                    .user_email(user_email)
//                    .user_depart("영업")
//                    .user_phone(user_phone)
//                    .user_address(user_address)
//                    .role(role)
//                    .user_joindate(user_joindate)
//                    .build();
//            userList.add(user);
//        }
//
//        return userList;
//    }
//    private static String generateRandomUsername(Random random) {
//        // 영어 대문자 2개와 랜덤한 숫자 10개로 구성된 userName 생성
//        StringBuilder userNameBuilder = new StringBuilder("SA");
//
//        for (int i = 0; i < 10; i++) {
//            int randomNumber = random.nextInt(10); // 0부터 9까지의 숫자
//            userNameBuilder.append(randomNumber);
//        }
//
//        return userNameBuilder.toString();
//    }
//
//    private static String generateRandomName(Random random, String[] lastNames, String[] firstNames) {
//        String lastName = lastNames[random.nextInt(lastNames.length)];
//        String firstName = firstNames[random.nextInt(firstNames.length)];
//        return lastName + firstName;
//    }
//
//    private static String generateRandomPhoneNumber(Random random) {
//        StringBuilder phoneNumberBuilder = new StringBuilder();
//        // 4자리 숫자 생성
//        for (int i = 0; i < 4; i++) {
//            int randomNumber = random.nextInt(10); // 0부터 9까지의 숫자
//            phoneNumberBuilder.append(randomNumber);
//        }
//
//        phoneNumberBuilder.append("-");
//
//        // 4자리 숫자 생성
//        for (int i = 0; i < 4; i++) {
//            int randomNumber = random.nextInt(10); // 0부터 9까지의 숫자
//            phoneNumberBuilder.append(randomNumber);
//        }
//        return phoneNumberBuilder.toString();
//    }
//
//    private static String generateRandomAddress(Random random) {
//        // 임의의 주소 생성 (예: "서울특별시 강남구 신사동 123-45")
//        String[] cities = {"서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시"};
//        String[] districts = {"강남구", "서초구", "송파구", "마포구", "영등포구"};
//        String[] neighborhoods = {"신사동", "잠실동", "역삼동", "논현동", "청담동"};
//        String streetNumber = (random.nextInt(100) + 1) + "-" + (random.nextInt(50) + 1);
//
//        String city = cities[random.nextInt(cities.length)];
//        String district = districts[random.nextInt(districts.length)];
//        String neighborhood = neighborhoods[random.nextInt(neighborhoods.length)];
//
//        return city + " " + district + " " + neighborhood + " " + streetNumber;
//    }
//
//    private static LocalDate generateRandomJoinDate(Random random) {
//        // 2020년부터 2023년 사이의 임의의 입사일 생성
//        int year = random.nextInt(4) + 2020;
//        int month = random.nextInt(12) + 1;
//        int day = random.nextInt(28) + 1; // 간단하게 처리하기 위해 최대 28일로 설정
//        return LocalDate.of(year, month, day);
//    }
//
//    private static String generateRandomEmail(Random random) {
//        int length = random.nextInt(10) + 1; // 1에서 10 사이의 랜덤한 길이의 영문자열 생성
//        StringBuilder emailBuilder = new StringBuilder();
//
//        String allowedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//        for (int i = 0; i < length; i++) {
//            char randomChar = allowedCharacters.charAt(random.nextInt(allowedCharacters.length()));
//            emailBuilder.append(randomChar);
//        }
//
//        emailBuilder.append("@gmail.com");
//        return emailBuilder.toString();
//    }
}
