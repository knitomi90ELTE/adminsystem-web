package hu.kniznertamas.adminsystem.service.timereport.facade;

import hu.kniznertamas.adminsystem.service.facade.CrudServiceFacade;
import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;

import java.util.Set;

/**
 * TimeReportServiceFacade
 */
public interface TimeReportServiceFacade extends CrudServiceFacade<TimeReport> {

    Set<TimeReport> findByUserId(Long userId);

    Set<TimeReport> findByProjectId(Long projectId);

    Set<TimeReport> findByDate(String date);

}
