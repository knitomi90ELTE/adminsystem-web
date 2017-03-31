package hu.kniznertamas.adminsystem.web.balance.facade;

import hu.kniznertamas.adminsystem.web.balance.domain.request.BalanceRequest;
import hu.kniznertamas.adminsystem.web.balance.domain.response.BalanceView;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
public interface BalanceViewFacade {


    Long createBalance(BalanceRequest balanceRequest);

    Long editBalance(BalanceRequest balanceRequest, Long id);

    void deleteBalance(Long id, String balanceType);

    BalanceView findBalanceById(Long id, String balanceType);

    Set<BalanceView> findAll();

    Set<BalanceView> findAllBalanceByType(String balanceType);

}
