package hu.kniznertamas.adminsystem.dal.balance.user.dao;

import hu.kniznertamas.adminsystem.dal.balance.user.entity.UserBalanceEntity;
import hu.kniznertamas.adminsystem.dal.balance.user.repository.UserBalanceRepository;
import hu.kniznertamas.adminsystem.dal.balance.user.transformer.UserBalanceTransformer;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
@Component
public class DefaultUserBalanceDao implements UserBalanceDao {

    @Autowired
    private UserBalanceRepository userBalanceRepository;

    @Autowired
    private UserBalanceTransformer userBalanceTransformer;

    @Override
    public Long save(Balance balance) {
        UserBalanceEntity userBalanceEntity = userBalanceRepository.saveAndFlush(userBalanceTransformer.transform(balance));
        return userBalanceEntity.getId();
    }

    @Override
    public void delete(Long id) {
        userBalanceRepository.delete(id);
    }

    @Override
    public Balance findById(Long id) {
        UserBalanceEntity userBalanceEntity = userBalanceRepository.findOne(id);
        return (userBalanceEntity == null) ? null : userBalanceTransformer.transform(userBalanceEntity);
    }

    @Override
    public Set<Balance> findAll() {
        return userBalanceTransformer.transform(userBalanceRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return userBalanceRepository.exists(id);
    }
}
