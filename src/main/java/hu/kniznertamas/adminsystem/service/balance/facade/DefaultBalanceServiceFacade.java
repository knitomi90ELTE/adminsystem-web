package hu.kniznertamas.adminsystem.service.balance.facade;

import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.service.BalanceService;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Default BalanceServiceFacade implementation.
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultBalanceServiceFacade implements BalanceServiceFacade {

    @Autowired
    private BalanceService balanceService;

    @Override
    public Long create(Balance balance) {
        return balanceService.createBalance(balance);
    }

    @Override
    public Long edit(Balance balance) {
        return balanceService.editBalance(balance);
    }

    @Override
    public void delete(Balance balance) {
        balanceService.deleteBalance(balance.getId(), balance.getBalanceType());
    }

    @Override
    public Balance findById(Balance balance) {
        return balanceService.findBalanceById(balance.getId(), balance.getBalanceType());
    }

    @Override
    public Set<Balance> findAll() {
        return balanceService.findAllBalance();
    }

    @Override
    public Set<Balance> findAllByType(String balanceType) {
        return balanceService.findAllByType(BalanceType.valueOf(balanceType.toUpperCase()));
    }

    @Override
    public Set<Balance> findAllByDate(String date) {
        return balanceService.findAllBalanceByDate(date);
    }

    @Override
    public Set<Balance> findAllCompleted() {
        return balanceService.findAllCompletedBalance();
    }

    @Override
    public Set<Balance> findAllUncompleted() {
        return balanceService.findAllUncompletedBalance();
    }

    @Override
    public void doPayment(Balance balance) {
        balanceService.doPayment(balance);
    }

    @Override
    public Set<Balance> listBalanceByUserId(Long userId) {
        return balanceService.listBalanceByUserId(userId);
    }

    @Override
    public Set<Balance> listBalanceByProjectId(Long projectId) {
        return balanceService.listBalanceByProjectId(projectId);
    }

}
