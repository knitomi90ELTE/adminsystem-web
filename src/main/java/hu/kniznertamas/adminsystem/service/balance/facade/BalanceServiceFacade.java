package hu.kniznertamas.adminsystem.service.balance.facade;

import hu.kniznertamas.adminsystem.service.balance.domain.Balance;

import java.util.Set;

/**
 * BalanceServiceFacade
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface BalanceServiceFacade {

    Long create(Balance balance);

    Long edit(Balance balance);

    void delete(Balance balance);

    Balance findById(Balance balance);

    Set<Balance> findAll();

    Set<Balance> findAllByType(String balanceType);

    Set<Balance> findAllByDate(String date);

    Set<Balance> findAllCompleted();

    Set<Balance> findAllUncompleted();

    void doPayment(Balance balance);

    Set<Balance> listBalanceByUserId(Long userId);

    Set<Balance> listBalanceByProjectId(Long projectId);
}
