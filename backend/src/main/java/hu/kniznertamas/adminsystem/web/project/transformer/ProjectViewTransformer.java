package hu.kniznertamas.adminsystem.web.project.transformer;

import hu.kniznertamas.adminsystem.service.project.domain.Project;
import hu.kniznertamas.adminsystem.web.project.domain.request.ProjectRequest;
import hu.kniznertamas.adminsystem.web.project.domain.response.ProjectView;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Component
public class ProjectViewTransformer {

    public Project transform(ProjectRequest projectRequest) {
        Project project = new Project();
        project.setName(projectRequest.getName());
        project.setRetention(projectRequest.getRetention());
        project.setNote(projectRequest.getNote());
        return project;
    }

    public Project transform(ProjectRequest projectRequest, Long id) {
        Project project = transform(projectRequest);
        project.setId(id);
        return project;
    }

    public ProjectView transform(Project project) {
        ProjectView projectView = new ProjectView();
        projectView.setId(project.getId());
        projectView.setName(project.getName());
        projectView.setRetention(project.getRetention());
        projectView.setNote(project.getNote());
        return projectView;
    }

    public Set<ProjectView> transform(Set<Project> projects) {
        return projects.stream().map(this::transform).collect(Collectors.toSet());
    }

}
