package hu.kniznertamas.adminsystem.dal.timereport.repository;

import hu.kniznertamas.adminsystem.dal.timereport.entity.TimeReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface TimeReportRepository extends JpaRepository<TimeReportEntity, Long> {

    Set<TimeReportEntity> findByCreated(LocalDate created);

    Set<TimeReportEntity> findByUserEntityId(Long userEntityId);

    Set<TimeReportEntity> findByProjectEntityId(Long projectEntityId);

}
