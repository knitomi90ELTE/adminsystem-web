package hu.kniznertamas.adminsystem.dal.project.transformer;

import hu.kniznertamas.adminsystem.dal.project.entity.ProjectEntity;
import hu.kniznertamas.adminsystem.service.project.domain.Project;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class ProjectTransformer {

    public ProjectEntity transform(Project project) {
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId(project.getId());
        projectEntity.setName(project.getName());
        projectEntity.setRetention(project.getRetention());
        projectEntity.setNote(project.getNote());
        return projectEntity;
    }

    public Project transform(ProjectEntity projectEntity) {
        Project project = new Project();
        project.setId(projectEntity.getId());
        project.setName(projectEntity.getName());
        project.setRetention(projectEntity.getRetention());
        project.setNote(projectEntity.getNote());
        return project;
    }

    public Set<Project> transform(Collection<ProjectEntity> projectEntities) {
        Set<Project> result;
        if(projectEntities.isEmpty()) {
            result = Collections.emptySet();
        } else {
            result = projectEntities.stream().map(this::transform).collect(Collectors.toSet());
        }
        return result;
    }

}
