package hu.kniznertamas.adminsystem.web.balance.controller;

import hu.kniznertamas.adminsystem.web.balance.domain.response.BalanceView;
import hu.kniznertamas.adminsystem.web.balance.facade.BalanceViewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@RestController
public class BalanceController {

    private static final String LIST_ALL_BALANCE_MAPPING = "/api/balance/list-all";

    @Autowired
    private BalanceViewFacade balanceViewFacade;

    @RequestMapping(value = LIST_ALL_BALANCE_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> findAll() {
        return balanceViewFacade.findAll();
    }

}
