package hu.kniznertamas.adminsystem.web.user.transformer;

import hu.kniznertamas.adminsystem.service.user.domain.User;
import hu.kniznertamas.adminsystem.web.user.domain.request.UserRequest;
import hu.kniznertamas.adminsystem.web.user.domain.response.UserView;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Component
public class UserViewTransformer {

    public User transform(UserRequest userRequest) {
       User user = new User();
       user.setName(userRequest.getName());
       user.setWage(userRequest.getWage());
       user.setNote(userRequest.getNote());
       return user;
    }

    public User transform(UserRequest userRequest, Long id) {
        User user = transform(userRequest);
        user.setId(id);
        return user;
    }

    public UserView transform(User user) {
        UserView userView = new UserView();
        userView.setId(user.getId());
        userView.setName(user.getName());
        userView.setWage(user.getWage());
        userView.setNote(user.getNote());
        return userView;
    }

    public Set<UserView> transform(Set<User> users) {
        return users.stream().map(this::transform).collect(Collectors.toSet());
    }

}
