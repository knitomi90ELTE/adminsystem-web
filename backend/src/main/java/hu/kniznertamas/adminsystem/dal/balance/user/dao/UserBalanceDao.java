package hu.kniznertamas.adminsystem.dal.balance.user.dao;

import hu.kniznertamas.adminsystem.dal.balance.dao.BalanceDao;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface UserBalanceDao extends BalanceDao {

    Set<Balance> findAllByUserId(Long userId);

}
