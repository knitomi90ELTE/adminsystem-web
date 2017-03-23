package hu.kniznertamas.adminsystem.service.user.facade;

import hu.kniznertamas.adminsystem.service.user.domain.User;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultUserServiceFacade implements UserServiceFacade {

    @Override
    public Long create(User user) {
        return null;
    }

    @Override
    public Long edit(User user) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public User findById(Long id) {
        return null;
    }

    @Override
    public Set<User> findAll() {
        return null;
    }
}
