package hu.kniznertamas.adminsystem.dal.timereport.dao;

import hu.kniznertamas.adminsystem.dal.dao.GenericDao;
import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface TimeReportDao extends GenericDao<TimeReport> {

    Set<TimeReport> findByUserId(Long userId);

    Set<TimeReport> findByProjectId(Long projectId);

    Set<TimeReport> findByDate(LocalDate date);

}
