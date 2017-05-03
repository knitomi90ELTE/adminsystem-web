package hu.kniznertamas.adminsystem.dal.balance.project.dao;

import hu.kniznertamas.adminsystem.dal.balance.dao.BalanceDao;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
public interface ProjectBalanceDao extends BalanceDao {

    Set<Balance> findAllByProjectId(Long projectId);

}
