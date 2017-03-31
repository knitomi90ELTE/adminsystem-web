package hu.kniznertamas.adminsystem.dal.balance.other.transformer;

import hu.kniznertamas.adminsystem.dal.balance.other.entity.OtherBalanceEntity;
import hu.kniznertamas.adminsystem.dal.balance.transformer.BalanceTransformer;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@Component
public class OtherBalanceTransformer extends BalanceTransformer {

    public Balance transform(OtherBalanceEntity otherBalanceEntity) {
        Balance balance = transformCommonProperties(otherBalanceEntity);
        balance.setBalanceType(BalanceType.OTHER);
        return balance;
    }

    public OtherBalanceEntity transform(Balance balance) {
        return (OtherBalanceEntity) transformCommonProperties(new OtherBalanceEntity(), balance);
    }

    public Set<Balance> transform(Collection<OtherBalanceEntity> otherBalanceEntities) {
        Set<Balance> result;
        if(otherBalanceEntities.isEmpty()) {
            result = Collections.emptySet();
        } else {
            result = otherBalanceEntities.stream().map(this::transform).collect(Collectors.toSet());
        }
        return result;
    }

}
