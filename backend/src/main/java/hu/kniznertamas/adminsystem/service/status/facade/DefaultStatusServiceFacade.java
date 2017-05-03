package hu.kniznertamas.adminsystem.service.status.facade;

import hu.kniznertamas.adminsystem.service.status.domain.Status;
import hu.kniznertamas.adminsystem.service.status.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultStatusServiceFacade implements StatusServiceFacade {

    @Autowired
    private StatusService statusService;

    @Override
    public Long create(Status status) {
        return statusService.createStatus(status);
    }

    @Override
    public Long edit(Status status) {
        return statusService.editStatus(status);
    }

    @Override
    public void delete(Long id) {
        statusService.deleteStatus(id);
    }

    @Override
    public Status findById(Long id) {
        return statusService.findStatusById(id);
    }

    @Override
    public Set<Status> findAll() {
        return statusService.findAllStatuses();
    }
}
