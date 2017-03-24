package hu.kniznertamas.adminsystem.dal.user.dao;

import hu.kniznertamas.adminsystem.dal.user.entity.UserEntity;
import hu.kniznertamas.adminsystem.dal.user.repository.UserRepository;
import hu.kniznertamas.adminsystem.dal.user.transformer.UserTransformer;
import hu.kniznertamas.adminsystem.service.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class DefaultUserDao implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTransformer userTransformer;

    @Override
    public Long save(User user) {
        UserEntity created = userRepository.saveAndFlush(userTransformer.transform(user));
        return created.getId();
    }

    @Override
    public void delete(Long id) {
        userRepository.delete(id);
    }

    @Override
    public User findById(Long id) {
        UserEntity userEntity = userRepository.findOne(id);
        return (userEntity == null) ? null : userTransformer.transform(userEntity);
    }

    @Override
    public Set<User> findAll() {
        return userTransformer.transform(userRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return userRepository.exists(id);
    }
}
