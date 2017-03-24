package hu.kniznertamas.adminsystem.web.timereport.facade;

import hu.kniznertamas.adminsystem.web.timereport.domain.request.TimeReportRequest;
import hu.kniznertamas.adminsystem.web.timereport.domain.response.TimeReportView;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface TimeReportViewFacade {

    Long createTimeReport(TimeReportRequest timeReportRequest);

    Long editTimeReport(TimeReportRequest timeReportRequest, Long id);

    void deleteTimeReport(Long id);

    TimeReportView findTimeReportById(Long id);

    Set<TimeReportView> findAll();

}
