package hu.kniznertamas.adminsystem.dal.timereport.dao;

import hu.kniznertamas.adminsystem.dal.timereport.entity.TimeReportEntity;
import hu.kniznertamas.adminsystem.dal.timereport.repository.TimeReportRepository;
import hu.kniznertamas.adminsystem.dal.timereport.transformer.TimeReportTransformer;
import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class DefaultTimeReportDao implements TimeReportDao {

    @Autowired
    private TimeReportRepository timeReportRepository;

    @Autowired
    private TimeReportTransformer timeReportTransformer;

    @Override
    public Long save(TimeReport timeReport) {
        TimeReportEntity created = timeReportRepository.saveAndFlush(timeReportTransformer.transform(timeReport));
        return created.getId();
    }

    @Override
    public void delete(Long id) {
        timeReportRepository.delete(id);
    }

    @Override
    public TimeReport findById(Long id) {
        TimeReportEntity timeReportEntity = timeReportRepository.findOne(id);
        return (timeReportEntity == null) ? null : timeReportTransformer.transform(timeReportEntity);
    }

    @Override
    public Set<TimeReport> findAll() {
        return timeReportTransformer.transform(timeReportRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return timeReportRepository.exists(id);
    }

}
