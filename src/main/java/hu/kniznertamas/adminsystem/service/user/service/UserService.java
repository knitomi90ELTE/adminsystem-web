package hu.kniznertamas.adminsystem.service.user.service;

import hu.kniznertamas.adminsystem.dal.user.dao.UserDao;
import hu.kniznertamas.adminsystem.service.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public Long createUser(User user) {
        return userDao.save(user);
    }

    public Long editUser(User user) {
        return userDao.save(user);
    }

    public void deleteUser(Long id) {
        userDao.delete(id);
    }

    public User findUserById(Long id) {
        return userDao.findById(id);
    }

    public Set<User> findAllUsers() {
        return userDao.findAll();
    }

}
