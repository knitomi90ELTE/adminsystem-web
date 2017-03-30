package hu.kniznertamas.adminsystem.dal.balance.transformer;

import hu.kniznertamas.adminsystem.dal.balance.entity.AbstractBalanceEntity;
import hu.kniznertamas.adminsystem.dal.status.transformer.StatusTransformer;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public abstract class BalanceTransformer {

    @Autowired
    private StatusTransformer statusTransformer;

    protected Balance transformCommonProperties(AbstractBalanceEntity balanceEntity) {
        Balance balance = new Balance();
        balance.setId(balanceEntity.getId());
        balance.setNet(balanceEntity.getNet());
        balance.setGross(balanceEntity.getGross());
        balance.setVat(balanceEntity.getVat());
        balance.setVatValue(balanceEntity.getVatValue());
        balance.setCreated(balanceEntity.getCreated());
        balance.setCompleted(balanceEntity.getCompleted());
        balance.setStatus(statusTransformer.transform(balanceEntity.getStatusEntity()));
        balance.setCash(balanceEntity.getCash());
        balance.setNote(balanceEntity.getNote());
        return balance;
    }

    protected AbstractBalanceEntity transformCommonProperties(AbstractBalanceEntity balanceEntity, Balance balance) {
        balanceEntity.setId(balance.getId());
        balanceEntity.setNet(balance.getNet());
        balanceEntity.setGross(balance.getGross());
        balanceEntity.setVat(balance.getVat());
        balanceEntity.setVatValue(balance.getVatValue());
        balanceEntity.setCreated(balance.getCreated());
        balanceEntity.setCompleted(balance.getCompleted());
        balanceEntity.setStatusEntity(statusTransformer.transform(balance.getStatus()));
        balanceEntity.setCash(balance.getCash());
        balanceEntity.setNote(balance.getNote());
        return balanceEntity;
    }

}
