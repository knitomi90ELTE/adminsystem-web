package hu.kniznertamas.adminsystem.web.timereport.controller;

import hu.kniznertamas.adminsystem.web.timereport.domain.request.TimeReportRequest;
import hu.kniznertamas.adminsystem.web.timereport.domain.response.TimeReportView;
import hu.kniznertamas.adminsystem.web.timereport.facade.TimeReportViewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * UserController
 */
@RestController
public class TimeReportController {

    private static final String CREATE_TIME_REPORT_MAPPING = "/api/timereport/create";
    private static final String EDIT_TIME_REPORT_MAPPING = "/api/timereport/edit/{id}";
    private static final String DELETE_TIME_REPORT_MAPPING = "/api/timereport/delete/{id}";
    private static final String LIST_TIME_REPORT_MAPPING = "/api/timereport/list";
    private static final String GET_TIME_REPORT_MAPPING = "/api/timereport/{id}";

    @Autowired
    private TimeReportViewFacade timeReportViewFacade;

    @RequestMapping(value = CREATE_TIME_REPORT_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void createTimeReport(@RequestBody TimeReportRequest timeReportRequest) {
        timeReportViewFacade.createTimeReport(timeReportRequest);
    }

    @RequestMapping(value = EDIT_TIME_REPORT_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void editTimeReport(@RequestBody TimeReportRequest timeReportRequest, @PathVariable Long id) {
        timeReportViewFacade.editTimeReport(timeReportRequest, id);
    }

    @RequestMapping(value = DELETE_TIME_REPORT_MAPPING, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void deleteTimeReport(@PathVariable Long id) {
        timeReportViewFacade.deleteTimeReport(id);
    }

    @RequestMapping(value = LIST_TIME_REPORT_MAPPING, method = RequestMethod.GET)
    public Set<TimeReportView> findAll() {
        return timeReportViewFacade.findAll();
    }

    @RequestMapping(value = GET_TIME_REPORT_MAPPING, method = RequestMethod.GET)
    public TimeReportView getTimeReportById(@PathVariable Long id) {
        return timeReportViewFacade.findTimeReportById(id);
    }

}
