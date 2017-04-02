package hu.kniznertamas.adminsystem.web.balance.facade;

import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.facade.BalanceServiceFacade;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import hu.kniznertamas.adminsystem.web.balance.domain.request.BalanceRequest;
import hu.kniznertamas.adminsystem.web.balance.domain.response.BalanceView;
import hu.kniznertamas.adminsystem.web.balance.transformer.BalanceViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@Component
public class DefaultBalanceViewFacade implements BalanceViewFacade {

    @Autowired
    private BalanceServiceFacade balanceServiceFacade;

    @Autowired
    private BalanceViewTransformer balanceViewTransformer;

    @Override
    public Long createBalance(BalanceRequest balanceRequest) {
        return balanceServiceFacade.create(balanceViewTransformer.transform(balanceRequest));
    }

    @Override
    public Long editBalance(BalanceRequest balanceRequest, Long id) {
        return balanceServiceFacade.edit(balanceViewTransformer.transform(balanceRequest, id));
    }

    @Override
    public void deleteBalance(Long id, String balanceType) {
        Balance balance = new Balance();
        balance.setId(id);
        balance.setBalanceType(BalanceType.valueOf(balanceType.toUpperCase()));
        balanceServiceFacade.delete(balance);
    }

    @Override
    public BalanceView findBalanceById(Long id, String balanceType) {
        Balance balance = new Balance();
        balance.setId(id);
        balance.setBalanceType(BalanceType.valueOf(balanceType.toUpperCase()));
        return balanceViewTransformer.transform(balanceServiceFacade.findById(balance));
    }

    @Override
    public Set<BalanceView> findAll() {
        return balanceViewTransformer.transform(balanceServiceFacade.findAll());
    }

    @Override
    public Set<BalanceView> findAllBalanceByType(String balanceType) {
        return balanceViewTransformer.transform(balanceServiceFacade.findAllByType(balanceType));
    }

    @Override
    public Set<BalanceView> findAllBalanceByDate(String date) {
        return balanceViewTransformer.transform(balanceServiceFacade.findAllByDate(date));
    }

    @Override
    public Set<BalanceView> findAllCompletedBalance() {
        return balanceViewTransformer.transform(balanceServiceFacade.findAllCompleted());
    }

    @Override
    public Set<BalanceView> findAllUncompletedBalance() {
        return balanceViewTransformer.transform(balanceServiceFacade.findAllUncompleted());
    }
}
