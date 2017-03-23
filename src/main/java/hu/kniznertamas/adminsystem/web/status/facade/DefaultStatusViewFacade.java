package hu.kniznertamas.adminsystem.web.status.facade;

import hu.kniznertamas.adminsystem.service.status.facade.StatusServiceFacade;
import hu.kniznertamas.adminsystem.web.status.domain.request.StatusRequest;
import hu.kniznertamas.adminsystem.web.status.domain.response.StatusView;
import hu.kniznertamas.adminsystem.web.status.transformer.StatusViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Component
public class DefaultStatusViewFacade implements StatusViewFacade {

    @Autowired
    private StatusServiceFacade statusServiceFacade;

    @Autowired
    private StatusViewTransformer statusViewTransformer;

    @Override
    public Long createStatus(StatusRequest statusRequest) {
        return statusServiceFacade.create(statusViewTransformer.transform(statusRequest));
    }

    @Override
    public Long editStatus(StatusRequest statusRequest, Long id) {
        return statusServiceFacade.edit(statusViewTransformer.transform(statusRequest, id));
    }

    @Override
    public void deleteStatus(Long id) {
        statusServiceFacade.delete(id);
    }

    @Override
    public StatusView findStatusById(Long id) {
        return statusViewTransformer.transform(statusServiceFacade.findById(id));
    }

    @Override
    public Set<StatusView> findAll() {
        return statusViewTransformer.transform(statusServiceFacade.findAll());
    }
}
