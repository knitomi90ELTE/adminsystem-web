package hu.kniznertamas.adminsystem.web.status.controller;

import hu.kniznertamas.adminsystem.web.status.domain.request.StatusRequest;
import hu.kniznertamas.adminsystem.web.status.domain.response.StatusView;
import hu.kniznertamas.adminsystem.web.status.facade.StatusViewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@RestController
public class StatusController {

    private static final String CREATE_STATUS_MAPPING = "/api/status/create";
    private static final String EDIT_STATUS_MAPPING = "/api/status/edit/{id}";
    private static final String DELETE_STATUS_MAPPING = "/api/status/delete/{id}";
    private static final String LIST_STATUS_MAPPING = "/api/status/list";
    private static final String GET_STATUS_MAPPING = "/api/status/{id}";

    @Autowired
    private StatusViewFacade statusViewFacade;


    @RequestMapping(value = CREATE_STATUS_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createStatus(@RequestBody StatusRequest statusRequest) {
        statusViewFacade.createStatus(statusRequest);
    }

    @RequestMapping(value = EDIT_STATUS_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void editStatus(@RequestBody StatusRequest statusRequest, @PathVariable Long id) {
        statusViewFacade.editStatus(statusRequest, id);
    }

    @RequestMapping(value = DELETE_STATUS_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void deleteStatus(@PathVariable Long id) {
        statusViewFacade.deleteStatus(id);
    }

    @RequestMapping(value = LIST_STATUS_MAPPING, method = RequestMethod.GET)
    public Set<StatusView> findAll() {
        return statusViewFacade.findAll();
    }

    @RequestMapping(value = GET_STATUS_MAPPING, method = RequestMethod.GET)
    public StatusView getStatusById(@PathVariable Long id) {
        return statusViewFacade.findStatusById(id);
    }
}
