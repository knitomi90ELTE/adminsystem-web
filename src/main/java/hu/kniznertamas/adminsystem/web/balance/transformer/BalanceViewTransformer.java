package hu.kniznertamas.adminsystem.web.balance.transformer;

import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import hu.kniznertamas.adminsystem.service.project.domain.Project;
import hu.kniznertamas.adminsystem.service.status.domain.Status;
import hu.kniznertamas.adminsystem.service.user.domain.User;
import hu.kniznertamas.adminsystem.web.balance.domain.request.BalanceRequest;
import hu.kniznertamas.adminsystem.web.balance.domain.response.BalanceView;
import hu.kniznertamas.adminsystem.web.project.transformer.ProjectViewTransformer;
import hu.kniznertamas.adminsystem.web.status.transformer.StatusViewTransformer;
import hu.kniznertamas.adminsystem.web.user.transformer.UserViewTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@Component
public class BalanceViewTransformer {

    @Autowired
    private UserViewTransformer userViewTransformer;

    @Autowired
    private ProjectViewTransformer projectViewTransformer;

    @Autowired
    private StatusViewTransformer statusViewTransformer;

    public Balance transform(BalanceRequest balanceRequest) {
        Balance balance = transformCommonProperties(balanceRequest);
        if(BalanceType.USER.getValue().equals(balanceRequest.getBalanceType())) {
            User balanceUser = new User();
            balanceUser.setId(balanceRequest.getUserId());
            balance.setUser(balanceUser);
        } else if(BalanceType.PROJECT.getValue().equals(balanceRequest.getBalanceType())) {
            Project balanceProject = new Project();
            balanceProject.setId(balanceRequest.getProjectId());
            balance.setProject(balanceProject);
        }
        balance.setBalanceType(BalanceType.valueOf(balanceRequest.getBalanceType().toUpperCase()));
        return balance;
    }

    public Balance transform(BalanceRequest balanceRequest, Long id) {
        Balance balance = transform(balanceRequest);
        balance.setId(id);
        return balance;
    }

    private Balance transformCommonProperties(BalanceRequest balanceRequest) {
        Balance balance = new Balance();
        balance.setNet(balanceRequest.getNet());
        balance.setGross(balanceRequest.getGross());
        balance.setVat(balanceRequest.getVat());
        balance.setVatValue(balanceRequest.getVatValue());
        balance.setCreated(LocalDate.parse(balanceRequest.getCreated()));
        Status balanceStatus = new Status();
        balanceStatus.setId(balanceRequest.getStatusId());
        balance.setStatus(balanceStatus);
        balance.setCash(balanceRequest.getCash());
        balance.setNote(balanceRequest.getNote());
        if(!"".equals(balanceRequest.getCompleted())) {
            balance.setCompleted(LocalDate.parse(balanceRequest.getCompleted()));
        }
        return balance;
    }

    public BalanceView transform(Balance balance) {
        BalanceView balanceView = transformCommonProperties(balance);
        switch (balance.getBalanceType()) {
            case USER:
                balanceView.setUser(userViewTransformer.transform(balance.getUser()));
                break;
            case PROJECT:
                balanceView.setProject(projectViewTransformer.transform(balance.getProject()));
                break;
        }
        balanceView.setBalanceType(balance.getBalanceType().getValue());
        return balanceView;
    }

    private BalanceView transformCommonProperties(Balance balance) {
        BalanceView balanceView = new BalanceView();
        balanceView.setId(balance.getId());
        balanceView.setNet(balance.getNet());
        balanceView.setGross(balance.getGross());
        balanceView.setVat(balance.getVat());
        balanceView.setVatValue(balance.getVatValue());
        balanceView.setCreated(balance.getCreated().toString());
        balanceView.setStatus(statusViewTransformer.transform(balance.getStatus()));
        balanceView.setCash(balance.getCash());
        balanceView.setNote(balance.getNote());
        if(balance.getCompleted() != null) {
            balanceView.setCompleted(balance.getCompleted().toString());
        }
        return balanceView;
    }

    public Set<BalanceView> transform(Set<Balance> balances) {
        return balances.stream().map(this::transform).collect(Collectors.toSet());
    }

}
