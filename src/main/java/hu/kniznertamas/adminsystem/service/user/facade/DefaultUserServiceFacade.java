package hu.kniznertamas.adminsystem.service.user.facade;

import hu.kniznertamas.adminsystem.service.user.domain.User;
import hu.kniznertamas.adminsystem.service.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultUserServiceFacade implements UserServiceFacade {

    @Autowired
    private UserService userService;

    @Override
    public Long create(User user) {
        return userService.createUser(user);
    }

    @Override
    public Long edit(User user) {
        return userService.editUser(user);
    }

    @Override
    public void delete(Long id) {
        userService.deleteUser(id);
    }

    @Override
    public User findById(Long id) {
        return userService.findUserById(id);
    }

    @Override
    public Set<User> findAll() {
        return userService.findAllUsers();
    }
}
