package hu.kniznertamas.adminsystem.dal.balance.project.repository;

import hu.kniznertamas.adminsystem.dal.balance.project.entity.ProjectBalanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface ProjectBalanceRepository extends JpaRepository<ProjectBalanceEntity, Long> {

    Set<ProjectBalanceEntity> findAllByCompleted(LocalDate completed);

    Set<ProjectBalanceEntity> findAllByCompletedIsNull();

    Set<ProjectBalanceEntity> findAllByCompletedIsNotNull();

    Set<ProjectBalanceEntity> findAllByProjectEntity_IdAndCompletedIsNotNull(Long projectEntityId);

}
