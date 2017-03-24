package hu.kniznertamas.adminsystem.web.timereport.facade;

import hu.kniznertamas.adminsystem.service.timereport.facade.TimeReportServiceFacade;
import hu.kniznertamas.adminsystem.web.timereport.domain.request.TimeReportRequest;
import hu.kniznertamas.adminsystem.web.timereport.domain.response.TimeReportView;
import hu.kniznertamas.adminsystem.web.timereport.transformer.TimeReportViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Component
public class DefaultTimeReportViewFacade implements TimeReportViewFacade {

    @Autowired
    private TimeReportServiceFacade timeReportServiceFacade;

    @Autowired
    private TimeReportViewTransformer timeReportViewTransformer;

    @Override
    public Long createTimeReport(TimeReportRequest timeReportRequest) {
        return timeReportServiceFacade.create(timeReportViewTransformer.transform(timeReportRequest));
    }

    @Override
    public Long editTimeReport(TimeReportRequest timeReportRequest, Long id) {
        return timeReportServiceFacade.edit(timeReportViewTransformer.transform(timeReportRequest, id));
    }

    @Override
    public void deleteTimeReport(Long id) {
        timeReportServiceFacade.delete(id);
    }

    @Override
    public TimeReportView findTimeReportById(Long id) {
        return timeReportViewTransformer.transform(timeReportServiceFacade.findById(id));
    }

    @Override
    public Set<TimeReportView> findAll() {
        return timeReportViewTransformer.transform(timeReportServiceFacade.findAll());
    }
}
