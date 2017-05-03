package hu.kniznertamas.adminsystem.service.status.service;

import hu.kniznertamas.adminsystem.dal.status.dao.StatusDao;
import hu.kniznertamas.adminsystem.service.status.domain.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class StatusService {

    @Autowired
    private StatusDao statusDao;

    public Long createStatus(Status status) {
        return statusDao.save(status);
    }

    public Long editStatus(Status status) {
        return statusDao.save(status);
    }

    public void deleteStatus(Long id) {
        statusDao.delete(id);
    }

    public Status findStatusById(Long id) {
        return statusDao.findById(id);
    }

    public Set<Status> findAllStatuses() {
        return statusDao.findAll();
    }

}
