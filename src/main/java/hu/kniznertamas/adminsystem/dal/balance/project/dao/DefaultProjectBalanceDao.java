package hu.kniznertamas.adminsystem.dal.balance.project.dao;

import hu.kniznertamas.adminsystem.dal.balance.project.entity.ProjectBalanceEntity;
import hu.kniznertamas.adminsystem.dal.balance.project.repository.ProjectBalanceRepository;
import hu.kniznertamas.adminsystem.dal.balance.project.transformer.ProjectBalanceTransformer;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
@Component
public class DefaultProjectBalanceDao implements ProjectBalanceDao {

    @Autowired
    private ProjectBalanceRepository projectBalanceRepository;

    @Autowired
    private ProjectBalanceTransformer projectBalanceTransformer;

    @Override
    public Long save(Balance balance) {
        ProjectBalanceEntity projectBalanceEntity = projectBalanceRepository.saveAndFlush(projectBalanceTransformer.transform(balance));
        return projectBalanceEntity.getId();
    }

    @Override
    public void delete(Long id) {
        projectBalanceRepository.delete(id);
    }

    @Override
    public Balance findById(Long id) {
        ProjectBalanceEntity projectBalanceEntity = projectBalanceRepository.findOne(id);
        return (projectBalanceEntity == null) ? null : projectBalanceTransformer.transform(projectBalanceEntity);
    }

    @Override
    public Set<Balance> findAll() {
        return projectBalanceTransformer.transform(projectBalanceRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return projectBalanceRepository.exists(id);
    }
}
