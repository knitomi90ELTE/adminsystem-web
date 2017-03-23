package hu.kniznertamas.adminsystem.web.user.controller;

import hu.kniznertamas.adminsystem.web.user.domain.request.UserRequest;
import hu.kniznertamas.adminsystem.web.user.domain.response.UserView;
import hu.kniznertamas.adminsystem.web.user.facade.UserViewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * UserController
 */
@RestController
public class UserController {

    private static final String CREATE_USER_MAPPING = "/api/user/create";
    private static final String EDIT_USER_MAPPING = "/api/user/edit/{id}";
    private static final String DELETE_USER_MAPPING = "/api/user/delete/{id}";
    private static final String LIST_USER_MAPPING = "/api/user/list";
    private static final String GET_USER_MAPPING = "/api/user/{id}";

    @Autowired
    private UserViewFacade userViewFacade;

    @RequestMapping(value = CREATE_USER_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@RequestBody UserRequest userRequest) {
        userViewFacade.createUser(userRequest);
    }

    @RequestMapping(value = EDIT_USER_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void editUser(@RequestBody UserRequest userRequest, @PathVariable Long id) {
        userViewFacade.editUser(userRequest, id);
    }

    @RequestMapping(value = DELETE_USER_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable Long id) {
        userViewFacade.deleteUser(id);
    }

    @RequestMapping(value = LIST_USER_MAPPING, method = RequestMethod.GET)
    public Set<UserView> findAll() {
        return userViewFacade.findAll();
    }

    @RequestMapping(value = GET_USER_MAPPING, method = RequestMethod.GET)
    public UserView getUserById(@PathVariable Long id) {
        return userViewFacade.findUserById(id);
    }

}
