package hu.kniznertamas.adminsystem.service.timereport.service;

import hu.kniznertamas.adminsystem.dal.timereport.dao.TimeReportDao;
import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * TimeReportService
 */
@Service
public class TimeReportService {

    @Autowired
    private TimeReportDao timeReportDao;

    public Long createTimeReport(TimeReport timeReport) {
        return timeReportDao.save(timeReport);
    }

    public Long editTimeReport(TimeReport timeReport) {
        return timeReportDao.save(timeReport);
    }

    public void deleteTimeReport(Long id) {
        timeReportDao.delete(id);
    }

    public TimeReport findTimeReportById(Long id) {
        return timeReportDao.findById(id);
    }

    public Set<TimeReport> findAllTimeReports() {
        return timeReportDao.findAll();
    }
}
