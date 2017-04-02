package hu.kniznertamas.adminsystem.dal.balance.other.dao;

import hu.kniznertamas.adminsystem.dal.dao.GenericDao;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
public interface OtherBalanceDao extends GenericDao<Balance> {

    Set<Balance> findAllByCompleted(LocalDate completed);

    Set<Balance> findAllByCompletedIsNull();

    Set<Balance> findAllByCompletedIsNotNull();
    
}
