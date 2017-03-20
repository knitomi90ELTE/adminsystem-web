package hu.kniznertamas.adminsystem.web.controller;

import hu.kniznertamas.adminsystem.web.domain.request.UserRequest;
import hu.kniznertamas.adminsystem.web.domain.response.UserView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

/**
 * UserController
 */
@RestController
public class UserController {

    private static final String CREATE_USER_MAPPING = "/api/users/create";
    private static final String EDIT_USER_MAPPING = "/api/users/edit/{id}";
    private static final String DELETE_USER_MAPPING = "/api/users/delete/{id}";
    private static final String LIST_USER_MAPPING = "/api/users/list";
    private static final String GET_USER_MAPPING = "/api/users/{id}";

    @RequestMapping(value = CREATE_USER_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody final UserRequest userRequest) {

    }

    @RequestMapping(value = EDIT_USER_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void editUser(@RequestBody final UserRequest userRequest, @PathVariable Long id) {

    }

    @RequestMapping(value = DELETE_USER_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable Long id) {

    }

    @RequestMapping(value = LIST_USER_MAPPING, method = RequestMethod.GET)
    public List<UserView> listUsers() {
        return Collections.emptyList();
    }

    @RequestMapping(value = GET_USER_MAPPING, method = RequestMethod.GET)
    public UserView getUserById(@PathVariable Long id) {
        return null;
    }

}
