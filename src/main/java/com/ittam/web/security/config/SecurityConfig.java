package com.ittam.web.security.config;


import com.ittam.web.security.filter.CustomLoginFilter;
import com.ittam.web.security.filter.JwtAuthorizationFilter;
import com.ittam.web.user.service.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 비밀번호 암호화객체
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // 나를기억해에서 사용할 UserDetailService
    @Autowired
    private MyUserDetailService myUserDetailService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // 1. 기본 로그인 방식, 세션, 베이직인증, csrf토큰 전부 사용하지 않음
        http.csrf().disable();
        http.cors();
        http.formLogin().disable(); // form기반으로 로그인을 사용하지 않음
        http.httpBasic().disable(); // Authorization : 아이디 형식으로 넘어오는 basic인증을 사용하지 않음
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // 세션인증 기반을 사용하지 않고, JWT사용해서 인증

        http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // 모든 요청은 전부 허용

        // 1. 크로스오리진 필터 생성 cors
        http.cors(Customizer.withDefaults() );


        // 3. 로그인 시도에 AuthenticationManager가 필요합니다.
        // ++UserDetailService객체 and PasswordEncoder가 반드시 필요
        AuthenticationManager authenticationManager = authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));


        // 6. 요청별로 필터 실행시키기
        // login요청에만 CustomLoginFilter가 실행됩니다.
        http.requestMatchers()
                .antMatchers("/login")
                .antMatchers("/")
                .and()
                .addFilter(new CustomLoginFilter(authenticationManager));


        http.requestMatchers()
                .antMatchers("/admin/**")
                .antMatchers("/AssetRequest/**")
                .antMatchers("/UserRequest/**")
                .antMatchers("/categories/**")
                .antMatchers("/itassets/**")
                .antMatchers("/stock/**")
                .antMatchers("/mainPage/**")
                .antMatchers("/reports/**")
                .antMatchers("/noticelist/**")
                .antMatchers("/noticeUser/**")
                .antMatchers("/user/**")
                .and()
                .addFilter(new JwtAuthorizationFilter(authenticationManager));


        return http.build();
    }

    // 로그인 시도에 필요한 AuthenticationManager객체
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    ///////// remember me


    // 크로스 오리진 필터
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 모든 요청주소를 허용함
        // configuration.setAllowedOrigins(Arrays.asList("http://localhost:9191")); // 모든 요청주소를 허용함
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT", "DELETE", "OPTIONS")); // 모든 요청메서드를 허용함
        configuration.addAllowedHeader("Authorization");
        configuration.addAllowedHeader("Content-Type");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 요청에 대해서
        return source;
    }

}
