package hu.kniznertamas.adminsystem.dal.balance.project.transformer;

import hu.kniznertamas.adminsystem.dal.balance.project.entity.ProjectBalanceEntity;
import hu.kniznertamas.adminsystem.dal.balance.transformer.BalanceTransformer;
import hu.kniznertamas.adminsystem.dal.project.transformer.ProjectTransformer;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
@Component
public class ProjectBalanceTransformer extends BalanceTransformer {

    @Autowired
    private ProjectTransformer projectTransformer;

    public Balance transform(ProjectBalanceEntity projectBalanceEntity) {
        Balance balance = transformCommonProperties(projectBalanceEntity);
        balance.setBalanceType(BalanceType.PROJECT);
        balance.setProject(projectTransformer.transform(projectBalanceEntity.getProjectEntity()));
        return balance;
    }

    public ProjectBalanceEntity transform(Balance balance) {
        ProjectBalanceEntity balanceEntity = (ProjectBalanceEntity) transformCommonProperties(new ProjectBalanceEntity(), balance);
        balanceEntity.setProjectEntity(projectTransformer.transform(balance.getProject()));
        return balanceEntity;
    }

    public Set<Balance> transform(Collection<ProjectBalanceEntity> projectBalanceEntities) {
        Set<Balance> result;
        if(projectBalanceEntities.isEmpty()) {
            result = Collections.emptySet();
        } else {
            result = projectBalanceEntities.stream().map(this::transform).collect(Collectors.toSet());
        }
        return result;
    }

}
