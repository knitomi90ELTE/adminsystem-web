package hu.kniznertamas.adminsystem.web.balance.controller;

import hu.kniznertamas.adminsystem.web.balance.domain.request.BalanceRequest;
import hu.kniznertamas.adminsystem.web.balance.domain.request.DoPaymentRequest;
import hu.kniznertamas.adminsystem.web.balance.domain.response.BalanceView;
import hu.kniznertamas.adminsystem.web.balance.facade.BalanceViewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * Controller to handle balance related requests.
 * Created by Tamas_Knizner on 2017-03-31.
 */
@RestController
public class BalanceController {

    private static final String LIST_ALL_BALANCE_MAPPING = "/api/balance/list";
    private static final String CREATE_BALANCE_MAPPING = "/api/balance/create";
    private static final String EDIT_BALANCE_MAPPING = "/api/balance/edit/{id}";
    private static final String DELETE_BALANCE_MAPPING = "/api/balance/delete/{type}/{id}";
    private static final String FIND_BALANCE_BY_ID_MAPPING = "/api/balance/{type}/{id}";
    private static final String LIST_ALL_BALANCE_BY_TYPE_MAPPING = "/api/balance/list/{type}";
    private static final String LIST_ALL_BALANCE_BY_DATE_MAPPING = "/api/balance/list/date/{date}";
    private static final String LIST_ALL_COMPLETED_BALANCE_MAPPING = "/api/balance/list/completed";
    private static final String LIST_ALL_UNCOMPLETED_BALANCE_MAPPING = "/api/balance/list/uncompleted";
    private static final String DO_PAY_BALANCE_MAPPING = "/api/balance/pay";
    private static final String LIST_BALANCE_BY_USER_ID_MAPPING = "/api/balance/list/user/{userId}";
    private static final String LIST_BALANCE_BY_PROJECT_ID_MAPPING = "/api/balance/list/project/{projectId}";

    @Autowired
    private BalanceViewFacade balanceViewFacade;

    @RequestMapping(value = LIST_ALL_BALANCE_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> findAll() {
        return balanceViewFacade.findAll();
    }

    @RequestMapping(value = CREATE_BALANCE_MAPPING, method = RequestMethod.POST)
    public void createBalance(@RequestBody BalanceRequest balanceRequest) {
        balanceViewFacade.createBalance(balanceRequest);
    }

    @RequestMapping(value = EDIT_BALANCE_MAPPING, method = RequestMethod.POST)
    public void editBalance(@RequestBody BalanceRequest balanceRequest, @PathVariable Long id) {
        balanceViewFacade.editBalance(balanceRequest, id);
    }

    @RequestMapping(value = DELETE_BALANCE_MAPPING, method = RequestMethod.POST)
    public void deleteBalance(@PathVariable String type, @PathVariable Long id) {
        balanceViewFacade.deleteBalance(id, type);
    }

    @RequestMapping(value = LIST_ALL_BALANCE_BY_TYPE_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> findAllByType(@PathVariable String type) {
        return balanceViewFacade.findAllBalanceByType(type);
    }

    @RequestMapping(value = FIND_BALANCE_BY_ID_MAPPING, method = RequestMethod.GET)
    public BalanceView findBalanceById(@PathVariable String type, @PathVariable Long id) {
        return balanceViewFacade.findBalanceById(id, type);
    }

    @RequestMapping(value = LIST_ALL_BALANCE_BY_DATE_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> findAllByDate(@PathVariable String date) {
        return balanceViewFacade.findAllBalanceByDate(date);
    }

    @RequestMapping(value = LIST_ALL_COMPLETED_BALANCE_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> findAllCompletedBalance() {
        return balanceViewFacade.findAllCompletedBalance();
    }

    @RequestMapping(value = LIST_ALL_UNCOMPLETED_BALANCE_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> findAllUncompletedBalance() {
        return balanceViewFacade.findAllUncompletedBalance();
    }

    @RequestMapping(value = DO_PAY_BALANCE_MAPPING, method = RequestMethod.POST)
    public void doPayment(@RequestBody DoPaymentRequest doPaymentRequest) {
        balanceViewFacade.doPayment(doPaymentRequest);
    }

    @RequestMapping(value = LIST_BALANCE_BY_USER_ID_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> listBalanceByUserId(@PathVariable Long userId) {
        return balanceViewFacade.listBalanceByUserId(userId);
    }

    @RequestMapping(value = LIST_BALANCE_BY_PROJECT_ID_MAPPING, method = RequestMethod.GET)
    public Set<BalanceView> listBalanceByProjectId(@PathVariable Long projectId) {
        return balanceViewFacade.listBalanceByProjectId(projectId);
    }

}
