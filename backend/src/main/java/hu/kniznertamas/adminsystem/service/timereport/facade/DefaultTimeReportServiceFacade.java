package hu.kniznertamas.adminsystem.service.timereport.facade;

import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;
import hu.kniznertamas.adminsystem.service.timereport.service.TimeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * DefaultTimeReportServiceFacade
 */
@Service
public class DefaultTimeReportServiceFacade implements TimeReportServiceFacade {

    @Autowired
    private TimeReportService timeReportService;

    @Override
    public Long create(TimeReport timeReport) {
        return timeReportService.createTimeReport(timeReport);
    }

    @Override
    public Long edit(TimeReport timeReport) {
        return timeReportService.editTimeReport(timeReport);
    }

    @Override
    public void delete(Long id) {
        timeReportService.deleteTimeReport(id);
    }

    @Override
    public TimeReport findById(Long id) {
        return timeReportService.findTimeReportById(id);
    }

    @Override
    public Set<TimeReport> findAll() {
        return timeReportService.findAllTimeReports();
    }

    @Override
    public Set<TimeReport> findByUserId(Long userId) {
        return timeReportService.findByUserId(userId);
    }

    @Override
    public Set<TimeReport> findByProjectId(Long projectId) {
        return timeReportService.findByProjectId(projectId);
    }

    @Override
    public Set<TimeReport> findByDate(String date) {
        return timeReportService.findByDate(date);
    }
}
