package hu.kniznertamas.adminsystem.web.project.facade;

import hu.kniznertamas.adminsystem.web.project.domain.request.ProjectRequest;
import hu.kniznertamas.adminsystem.web.project.domain.response.ProjectView;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface ProjectViewFacade {

    Long createProject(ProjectRequest projectRequest);

    Long editProject(ProjectRequest projectRequest, Long id);

    void deleteProject(Long id);

    ProjectView findProjectById(Long id);

    Set<ProjectView> findAll();
}
