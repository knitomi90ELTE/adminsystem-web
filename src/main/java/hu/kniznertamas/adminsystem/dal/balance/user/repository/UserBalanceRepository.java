package hu.kniznertamas.adminsystem.dal.balance.user.repository;

import hu.kniznertamas.adminsystem.dal.balance.user.entity.UserBalanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface UserBalanceRepository extends JpaRepository<UserBalanceEntity, Long> {
}
