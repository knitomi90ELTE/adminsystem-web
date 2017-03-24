package hu.kniznertamas.adminsystem.service.project.facade;

import hu.kniznertamas.adminsystem.service.project.domain.Project;
import hu.kniznertamas.adminsystem.service.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultProjectServiceFacade implements ProjectServiceFacade {

    @Autowired
    private ProjectService projectService;

    @Override
    public Long create(Project project) {
        return projectService.createProject(project);
    }

    @Override
    public Long edit(Project project) {
        return projectService.editProject(project);
    }

    @Override
    public void delete(Long id) {
        projectService.deleteProject(id);
    }

    @Override
    public Project findById(Long id) {
        return projectService.findProjectById(id);
    }

    @Override
    public Set<Project> findAll() {
        return projectService.findAllProjects();
    }
}
