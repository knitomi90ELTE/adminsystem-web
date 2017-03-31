package hu.kniznertamas.adminsystem.service.balance.service;

import hu.kniznertamas.adminsystem.dal.balance.dao.BalanceDaoHolder;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class BalanceService {

    @Autowired
    private BalanceDaoHolder balanceDaoHolder;

    public Long createBalance(Balance balance) {
        return balanceDaoHolder.getDao(balance.getBalanceType()).save(balance);
    }

    public Long editBalance(Balance balance) {
        return balanceDaoHolder.getDao(balance.getBalanceType()).save(balance);
    }

    public void deleteBalance(Long id, BalanceType balanceType) {
        balanceDaoHolder.getDao(balanceType).delete(id);
    }

    public Balance findBalanceById(Long id, BalanceType balanceType) {
        return balanceDaoHolder.getDao(balanceType).findById(id);
    }

    public Set<Balance> findAllBalance() {
        Stream<Balance> userBalances = balanceDaoHolder.getUserBalanceDao().findAll().stream();
        Stream<Balance> projectBalances = balanceDaoHolder.getProjectBalanceDao().findAll().stream();
        Stream<Balance> otherBalances = balanceDaoHolder.getOtherBalanceDao().findAll().stream();
        return Stream.concat(Stream.concat(userBalances, projectBalances), otherBalances).collect(Collectors.toSet());
    }

    public Set<Balance> findAllByType(BalanceType balanceType) {
        return balanceDaoHolder.getDao(balanceType).findAll();
    }
}
