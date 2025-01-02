package com.ust.client;

import com.ust.dto.UserModelDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "PORTFOLIO", path = "/api/v1/user")
public interface UserModelClient {
    @PostMapping("/save")
    UserModelDto saveUser(UserModelDto userModelDto);
}
