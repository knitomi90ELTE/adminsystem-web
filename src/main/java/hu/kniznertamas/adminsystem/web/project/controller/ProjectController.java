package hu.kniznertamas.adminsystem.web.project.controller;

import hu.kniznertamas.adminsystem.web.project.domain.request.ProjectRequest;
import hu.kniznertamas.adminsystem.web.project.domain.response.ProjectView;
import hu.kniznertamas.adminsystem.web.project.facade.ProjectViewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@RestController
public class ProjectController {

    private static final String CREATE_PROJECT_MAPPING = "/api/project/create";
    private static final String EDIT_PROJECT_MAPPING = "/api/project/edit/{id}";
    private static final String DELETE_PROJECT_MAPPING = "/api/project/delete/{id}";
    private static final String LIST_PROJECT_MAPPING = "/api/project/list";
    private static final String GET_PROJECT_MAPPING = "/api/project/{id}";

    @Autowired
    private ProjectViewFacade projectViewFacade;


    @RequestMapping(value = CREATE_PROJECT_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createProject(@RequestBody ProjectRequest projectRequest) {
        projectViewFacade.createProject(projectRequest);
    }

    @RequestMapping(value = EDIT_PROJECT_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void editProject(@RequestBody ProjectRequest projectRequest, @PathVariable Long id) {
        projectViewFacade.editProject(projectRequest, id);
    }

    @RequestMapping(value = DELETE_PROJECT_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void deleteProject(@PathVariable Long id) {
        projectViewFacade.deleteProject(id);
    }

    @RequestMapping(value = LIST_PROJECT_MAPPING, method = RequestMethod.GET)
    public Set<ProjectView> findAll() {
        return projectViewFacade.findAll();
    }

    @RequestMapping(value = GET_PROJECT_MAPPING, method = RequestMethod.GET)
    public ProjectView getProjectById(@PathVariable Long id) {
        return projectViewFacade.findProjectById(id);
    }
}
