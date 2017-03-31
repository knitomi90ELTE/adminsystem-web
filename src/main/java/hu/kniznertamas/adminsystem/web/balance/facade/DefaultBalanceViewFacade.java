package hu.kniznertamas.adminsystem.web.balance.facade;

import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.facade.BalanceServiceFacade;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import hu.kniznertamas.adminsystem.web.balance.domain.request.BalanceRequest;
import hu.kniznertamas.adminsystem.web.balance.domain.response.BalanceView;
import hu.kniznertamas.adminsystem.web.balance.transformer.BalanceViewTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@Component
public class DefaultBalanceViewFacade implements BalanceViewFacade {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultBalanceViewFacade.class);

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
        return balanceServiceFacade.edit(balanceViewTransformer.transform(balanceRequest));
    }

    @Override
    public void deleteBalance(Long id, String balanceType) {
        Balance balance = new Balance();
        balance.setId(id);
        balance.setBalanceType(BalanceType.valueOf(balanceType));
        balanceServiceFacade.delete(balance);
    }

    @Override
    public BalanceView findBalanceById(Long id, String balanceType) {
        Balance balance = new Balance();
        balance.setId(id);
        balance.setBalanceType(BalanceType.valueOf(balanceType));
        return balanceViewTransformer.transform(balanceServiceFacade.findById(balance));
    }

    @Override
    public Set<BalanceView> findAll() {
        Set<Balance> balances = balanceServiceFacade.findAll();
        LOGGER.info("FINDALL: {}", balances);
        return balanceViewTransformer.transform(balances);
    }

    @Override
    public Set<BalanceView> findAllBalanceByType(String balanceType) {
        return balanceViewTransformer.transform(balanceServiceFacade.findAllByType(balanceType));
    }
}
