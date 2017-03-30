package hu.kniznertamas.adminsystem.dal.balance.project.repository;

import hu.kniznertamas.adminsystem.dal.balance.project.entity.ProjectBalanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface ProjectBalanceRepository extends JpaRepository<ProjectBalanceEntity, Long> {

}
