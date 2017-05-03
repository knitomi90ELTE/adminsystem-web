package hu.kniznertamas.adminsystem.web.user.facade;

import hu.kniznertamas.adminsystem.web.user.domain.request.UserRequest;
import hu.kniznertamas.adminsystem.web.user.domain.response.UserView;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface UserViewFacade {

    Long createUser(UserRequest userRequest);

    Long editUser(UserRequest userRequest, Long id);

    void deleteUser(Long id);

    UserView findUserById(Long id);

    Set<UserView> findAll();

}
