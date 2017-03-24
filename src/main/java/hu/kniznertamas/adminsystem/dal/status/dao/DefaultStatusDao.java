package hu.kniznertamas.adminsystem.dal.status.dao;

import hu.kniznertamas.adminsystem.dal.status.entity.StatusEntity;
import hu.kniznertamas.adminsystem.dal.status.repository.StatusRepository;
import hu.kniznertamas.adminsystem.dal.status.transformer.StatusTransformer;
import hu.kniznertamas.adminsystem.service.status.domain.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class DefaultStatusDao implements StatusDao {

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private StatusTransformer statusTransformer;

    @Override
    public Long save(Status status) {
        StatusEntity created = statusRepository.saveAndFlush(statusTransformer.transform(status));
        return created.getId();
    }

    @Override
    public void delete(Long id) {
        statusRepository.delete(id);
    }

    @Override
    public Status findById(Long id) {
        StatusEntity statusEntity = statusRepository.findOne(id);
        return (statusEntity == null) ? null : statusTransformer.transform(statusEntity);
    }

    @Override
    public Set<Status> findAll() {
        return statusTransformer.transform(statusRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return statusRepository.exists(id);
    }

}
