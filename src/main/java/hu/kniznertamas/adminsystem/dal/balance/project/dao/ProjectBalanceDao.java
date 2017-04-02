package hu.kniznertamas.adminsystem.dal.balance.project.dao;

import hu.kniznertamas.adminsystem.dal.dao.GenericDao;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;

import java.time.LocalDate;
import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface ProjectBalanceDao extends GenericDao<Balance> {

    Set<Balance> findAllByCompleted(LocalDate completed);

    Set<Balance> findAllByCompletedIsNull();

    Set<Balance> findAllByCompletedIsNotNull();

}
