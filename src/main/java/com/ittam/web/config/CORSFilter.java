package com.ittam.web.config;

import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class CORSFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletResponse res = (HttpServletResponse) response;
        res.setHeader("Access-control-Allow-Origin", "*");
        res.setHeader("Access-control-Allow-Credentials", "true");
        res.setHeader("Access-control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        res.setHeader("Access-control-Allow-Credentials", "true");
        res.setHeader("Access-control-Allow-Max-Age", "3600");
        res.setHeader("Access-control-Allow-Headers", "X-Requested-With, Content-Type, "
                    + "Authorization, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }


}
