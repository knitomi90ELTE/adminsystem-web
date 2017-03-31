package hu.kniznertamas.adminsystem.dal.balance.dao;

import hu.kniznertamas.adminsystem.dal.balance.other.dao.OtherBalanceDao;
import hu.kniznertamas.adminsystem.dal.balance.project.dao.ProjectBalanceDao;
import hu.kniznertamas.adminsystem.dal.balance.user.dao.UserBalanceDao;
import hu.kniznertamas.adminsystem.dal.dao.GenericDao;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
@Component
public class BalanceDaoHolder {

    @Autowired
    private UserBalanceDao userBalanceDao;

    @Autowired
    private ProjectBalanceDao projectBalanceDao;

    @Autowired
    private OtherBalanceDao otherBalanceDao;

    public GenericDao<Balance> getDao(BalanceType balanceType) {
        GenericDao<Balance> dao;
        switch (balanceType) {
            case USER:
                dao = userBalanceDao;
            case PROJECT:
                dao = projectBalanceDao;
            case OTHER:
                dao = otherBalanceDao;
            default:
                dao = null;
        }
        return dao;
    }

    public UserBalanceDao getUserBalanceDao() {
        return userBalanceDao;
    }

    public ProjectBalanceDao getProjectBalanceDao() {
        return projectBalanceDao;
    }

    public OtherBalanceDao getOtherBalanceDao() {
        return otherBalanceDao;
    }

}
