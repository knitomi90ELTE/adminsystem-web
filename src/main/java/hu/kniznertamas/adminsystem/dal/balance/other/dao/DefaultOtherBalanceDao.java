package hu.kniznertamas.adminsystem.dal.balance.other.dao;

import hu.kniznertamas.adminsystem.dal.balance.other.entity.OtherBalanceEntity;
import hu.kniznertamas.adminsystem.dal.balance.other.repository.OtherBalanceRepository;
import hu.kniznertamas.adminsystem.dal.balance.other.transformer.OtherBalanceTransformer;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@Component
public class DefaultOtherBalanceDao implements OtherBalanceDao {

    @Autowired
    private OtherBalanceRepository otherBalanceRepository;

    @Autowired
    private OtherBalanceTransformer otherBalanceTransformer;

    @Override
    public Long save(Balance balance) {
        OtherBalanceEntity projectBalanceEntity = otherBalanceRepository.saveAndFlush(otherBalanceTransformer.transform(balance));
        return projectBalanceEntity.getId();
    }

    @Override
    public void delete(Long id) {
        otherBalanceRepository.delete(id);
    }

    @Override
    public Balance findById(Long id) {
        OtherBalanceEntity projectBalanceEntity = otherBalanceRepository.findOne(id);
        return (projectBalanceEntity == null) ? null : otherBalanceTransformer.transform(projectBalanceEntity);
    }

    @Override
    public Set<Balance> findAll() {
        return otherBalanceTransformer.transform(otherBalanceRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return otherBalanceRepository.exists(id);
    }

    @Override
    public Set<Balance> findAllByCompleted(LocalDate completed) {
        return otherBalanceTransformer.transform(otherBalanceRepository.findAllByCompleted(completed));
    }

    @Override
    public Set<Balance> findAllByCompletedIsNull() {
        return otherBalanceTransformer.transform(otherBalanceRepository.findAllByCompletedIsNull());
    }

    @Override
    public Set<Balance> findAllByCompletedIsNotNull() {
        return otherBalanceTransformer.transform(otherBalanceRepository.findAllByCompletedIsNotNull());
    }
}
