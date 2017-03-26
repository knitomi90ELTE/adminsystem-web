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
    private static final String GET_TIME_REPORT_BY_DATE_MAPPING = "/api/timereport/date/{date}";
    private static final String GET_TIME_REPORT_BY_PROJECT_ID_MAPPING = "/api/timereport/project/{projectId}";
    private static final String GET_TIME_REPORT_BY_USER_ID_MAPPING = "/api/timereport/user/{userId}";

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

    @RequestMapping(value = GET_TIME_REPORT_BY_DATE_MAPPING, method = RequestMethod.GET)
    public Set<TimeReportView> getTimeReportsByDate(@PathVariable String date) {
        return timeReportViewFacade.findTimeReportsByDate(date);
    }

    @RequestMapping(value = GET_TIME_REPORT_BY_USER_ID_MAPPING, method = RequestMethod.GET)
    public Set<TimeReportView> getTimeReportsByUserId(@PathVariable Long userId) {
        return timeReportViewFacade.findTimeReportsByUserId(userId);
    }

    @RequestMapping(value = GET_TIME_REPORT_BY_PROJECT_ID_MAPPING, method = RequestMethod.GET)
    public Set<TimeReportView> getTimeReportsByProjectId(@PathVariable Long projectId) {
        return timeReportViewFacade.findTimeReportsByProjectId(projectId);
    }

}
