package hu.kniznertamas.adminsystem.web.root.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RootController {

    @RequestMapping({
            "/",
            "/user/**",
            "/project/**",
            "/status/**",
            "/today"
    })
    public String index() {
        return "forward:/index.html";
    }

}
