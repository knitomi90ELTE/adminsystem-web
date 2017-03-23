package hu.kniznertamas.adminsystem.web.user.facade;

import hu.kniznertamas.adminsystem.service.user.facade.UserServiceFacade;
import hu.kniznertamas.adminsystem.web.user.domain.request.UserRequest;
import hu.kniznertamas.adminsystem.web.user.domain.response.UserView;
import hu.kniznertamas.adminsystem.web.user.transformer.UserViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class DefaultUserViewFacade implements UserViewFacade {

    @Autowired
    private UserServiceFacade userServiceFacade;

    @Autowired
    private UserViewTransformer userViewTransformer;

    @Override
    public Long createUser(UserRequest userRequest) {
        return userServiceFacade.create(userViewTransformer.transform(userRequest));
    }

    @Override
    public Long editUser(UserRequest userRequest, Long id) {
        return userServiceFacade.edit(userViewTransformer.transform(userRequest, id));
    }

    @Override
    public void deleteUser(Long id) {
        userServiceFacade.delete(id);
    }

    @Override
    public UserView findUserById(Long id) {
        return userViewTransformer.transform(userServiceFacade.findById(id));
    }

    @Override
    public Set<UserView> findAll() {
        return userViewTransformer.transform(userServiceFacade.findAll());
    }
}
