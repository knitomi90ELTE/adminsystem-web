package hu.kniznertamas.adminsystem.service.status.facade;

import hu.kniznertamas.adminsystem.service.status.domain.Status;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultStatusServiceFacade implements StatusServiceFacade {

    @Override
    public Long create(Status status) {
        return null;
    }

    @Override
    public Long edit(Status status) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Status findById(Long id) {
        return null;
    }

    @Override
    public Set<Status> findAll() {
        return null;
    }
}
