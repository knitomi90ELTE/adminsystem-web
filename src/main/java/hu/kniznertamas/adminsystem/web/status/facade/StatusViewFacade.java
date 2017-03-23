package hu.kniznertamas.adminsystem.web.status.facade;

import hu.kniznertamas.adminsystem.web.status.domain.request.StatusRequest;
import hu.kniznertamas.adminsystem.web.status.domain.response.StatusView;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface StatusViewFacade {

    Long createStatus(StatusRequest statusRequest);

    Long editStatus(StatusRequest statusRequest, Long id);

    void deleteStatus(Long id);

    StatusView findStatusById(Long id);

    Set<StatusView> findAll();
}
