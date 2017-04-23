package hu.kniznertamas.adminsystem.dal.balance.user.repository;

import hu.kniznertamas.adminsystem.dal.balance.user.entity.UserBalanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface UserBalanceRepository extends JpaRepository<UserBalanceEntity, Long> {

    Set<UserBalanceEntity> findAllByCompleted(LocalDate completed);

    Set<UserBalanceEntity> findAllByCompletedIsNull();

    Set<UserBalanceEntity> findAllByCompletedIsNotNull();

    Set<UserBalanceEntity> findAllByUserEntity_IdAndCompletedIsNotNull(Long userEntityId);

}
