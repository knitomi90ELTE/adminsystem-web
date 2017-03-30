package hu.kniznertamas.adminsystem.dal.balance.user.transformer;

import hu.kniznertamas.adminsystem.dal.balance.transformer.BalanceTransformer;
import hu.kniznertamas.adminsystem.dal.balance.user.entity.UserBalanceEntity;
import hu.kniznertamas.adminsystem.dal.user.transformer.UserTransformer;
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
public class UserBalanceTransformer extends BalanceTransformer {

    @Autowired
    private UserTransformer userTransformer;

    public Balance transform(UserBalanceEntity userBalanceEntity) {
        Balance balance = transformCommonProperties(userBalanceEntity);
        balance.setBalanceType(BalanceType.USER);
        balance.setUser(userTransformer.transform(userBalanceEntity.getUserEntity()));
        return balance;
    }

    public UserBalanceEntity transform(Balance balance) {
        UserBalanceEntity balanceEntity = (UserBalanceEntity) transformCommonProperties(new UserBalanceEntity(), balance);
        balanceEntity.setUserEntity(userTransformer.transform(balance.getUser()));
        return balanceEntity;
    }

    public Set<Balance> transform(Collection<UserBalanceEntity> userBalanceEntities) {
        Set<Balance> result;
        if(userBalanceEntities.isEmpty()) {
            result = Collections.emptySet();
        } else {
            result = userBalanceEntities.stream().map(this::transform).collect(Collectors.toSet());
        }
        return result;
    }

}
