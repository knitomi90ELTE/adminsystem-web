package hu.kniznertamas.adminsystem.dal.user.repository;

import hu.kniznertamas.adminsystem.dal.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
