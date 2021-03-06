package hu.kniznertamas.adminsystem.web.timereport.transformer;

import hu.kniznertamas.adminsystem.service.project.domain.Project;
import hu.kniznertamas.adminsystem.service.timereport.domain.TimeReport;
import hu.kniznertamas.adminsystem.service.user.domain.User;
import hu.kniznertamas.adminsystem.web.project.transformer.ProjectViewTransformer;
import hu.kniznertamas.adminsystem.web.timereport.domain.request.TimeReportRequest;
import hu.kniznertamas.adminsystem.web.timereport.domain.response.TimeReportView;
import hu.kniznertamas.adminsystem.web.user.transformer.UserViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Component
public class TimeReportViewTransformer {

    @Autowired
    private UserViewTransformer userViewTransformer;

    @Autowired
    private ProjectViewTransformer projectViewTransformer;

    public TimeReport transform(TimeReportRequest timeReportRequest) {
        TimeReport timeReport = new TimeReport();
        timeReport.setCreated(LocalDate.parse(timeReportRequest.getCreated()));
        timeReport.setHour(timeReportRequest.getHour());
        timeReport.setNote(timeReportRequest.getNote());
        User user = new User();
        user.setId(timeReportRequest.getUserId());
        Project project = new Project();
        project.setId(timeReportRequest.getProjectId());
        timeReport.setUser(user);
        timeReport.setProject(project);
        return timeReport;
    }

    public TimeReport transform(TimeReportRequest timeReportRequest, Long id) {
        TimeReport timeReport = transform(timeReportRequest);
        timeReport.setId(id);
        return timeReport;
    }

    public TimeReportView transform(TimeReport timeReport) {
        TimeReportView timeReportView = new TimeReportView();
        timeReportView.setId(timeReport.getId());
        timeReportView.setCreated(timeReport.getCreated().toString());
        timeReportView.setHour(timeReport.getHour());
        timeReportView.setNote(timeReport.getNote());
        timeReportView.setProject(projectViewTransformer.transform(timeReport.getProject()));
        timeReportView.setUser(userViewTransformer.transform(timeReport.getUser()));
        return timeReportView;
    }

    public Set<TimeReportView> transform(Set<TimeReport> users) {
        return users.stream().map(this::transform).collect(Collectors.toSet());
    }

}
