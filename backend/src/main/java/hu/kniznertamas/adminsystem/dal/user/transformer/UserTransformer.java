package hu.kniznertamas.adminsystem.dal.user.transformer;

import hu.kniznertamas.adminsystem.dal.user.entity.UserEntity;
import hu.kniznertamas.adminsystem.service.user.domain.User;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class UserTransformer {

    public UserEntity transform(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(user.getId());
        userEntity.setName(user.getName());
        userEntity.setWage(user.getWage());
        userEntity.setNote(user.getNote());
        return userEntity;
    }

    public User transform(UserEntity userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.setName(userEntity.getName());
        user.setWage(userEntity.getWage());
        user.setNote(userEntity.getNote());
        return user;
    }

    public Set<User> transform(Collection<UserEntity> userEntities) {
        Set<User> result;
        if(userEntities.isEmpty()) {
            result = Collections.emptySet();
        } else {
            result = userEntities.stream().map(this::transform).collect(Collectors.toSet());
        }
        return result;
    }
}
