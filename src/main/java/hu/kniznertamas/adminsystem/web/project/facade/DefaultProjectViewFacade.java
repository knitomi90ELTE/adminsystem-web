package hu.kniznertamas.adminsystem.web.project.facade;

import hu.kniznertamas.adminsystem.service.project.facade.ProjectServiceFacade;
import hu.kniznertamas.adminsystem.web.project.domain.request.ProjectRequest;
import hu.kniznertamas.adminsystem.web.project.domain.response.ProjectView;
import hu.kniznertamas.adminsystem.web.project.transformer.ProjectViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class DefaultProjectViewFacade implements ProjectViewFacade {

    @Autowired
    private ProjectServiceFacade projectServiceFacade;

    @Autowired
    private ProjectViewTransformer projectViewTransformer;

    @Override
    public Long createProject(ProjectRequest projectRequest) {
        return projectServiceFacade.create(projectViewTransformer.transform(projectRequest));
    }

    @Override
    public Long editProject(ProjectRequest projectRequest, Long id) {
        return projectServiceFacade.edit(projectViewTransformer.transform(projectRequest, id));
    }

    @Override
    public void deleteProject(Long id) {
        projectServiceFacade.delete(id);
    }

    @Override
    public ProjectView findProjectById(Long id) {
        return projectViewTransformer.transform(projectServiceFacade.findById(id));
    }

    @Override
    public Set<ProjectView> findAll() {
        return projectViewTransformer.transform(projectServiceFacade.findAll());
    }
}
