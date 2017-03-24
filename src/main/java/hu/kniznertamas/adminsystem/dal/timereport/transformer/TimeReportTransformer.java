package hu.kniznertamas.adminsystem.dal.timereport.transformer;

import hu.kniznertamas.adminsystem.dal.project.transformer.ProjectTransformer;
import hu.kniznertamas.adminsystem.dal.timereport.entity.TimeReportEntity;
import hu.kniznertamas.adminsystem.dal.user.transformer.UserTransformer;
import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class TimeReportTransformer {

    @Autowired
    private ProjectTransformer projectTransformer;

    @Autowired
    private UserTransformer userTransformer;

    public TimeReportEntity transform(TimeReport timeReport) {
        TimeReportEntity timeReportEntity = new TimeReportEntity();
        timeReportEntity.setId(timeReport.getId());
        timeReportEntity.setHour(timeReport.getHour());
        timeReportEntity.setCreated(timeReport.getCreated());
        timeReportEntity.setNote(timeReport.getNote());
        timeReportEntity.setProjectEntity(projectTransformer.transform(timeReport.getProject()));
        timeReportEntity.setUserEntity(userTransformer.transform(timeReport.getUser()));
        return timeReportEntity;
    }

    public TimeReport transform(TimeReportEntity timeReportEntity) {
        TimeReport timeReport = new TimeReport();
        timeReport.setId(timeReportEntity.getId());
        timeReport.setHour(timeReportEntity.getHour());
        timeReport.setCreated(timeReportEntity.getCreated());
        timeReport.setNote(timeReportEntity.getNote());
        timeReport.setProject(projectTransformer.transform(timeReportEntity.getProjectEntity()));
        timeReport.setUser(userTransformer.transform(timeReportEntity.getUserEntity()));
        return timeReport;
    }

    public Set<TimeReport> transform(List<TimeReportEntity> timeReportEntities) {
        return timeReportEntities.stream().map(this::transform).collect(Collectors.toSet());
    }

}
