package hu.kniznertamas.adminsystem.dal.balance.other.repository;

import hu.kniznertamas.adminsystem.dal.balance.other.entity.OtherBalanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
public interface OtherBalanceRepository extends JpaRepository<OtherBalanceEntity, Long> {

    Set<OtherBalanceEntity> findAllByCompleted(LocalDate completed);

    Set<OtherBalanceEntity> findAllByCompletedIsNull();

    Set<OtherBalanceEntity> findAllByCompletedIsNotNull();

}
