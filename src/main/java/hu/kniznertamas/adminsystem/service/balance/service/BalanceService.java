package hu.kniznertamas.adminsystem.service.balance.service;

import hu.kniznertamas.adminsystem.dal.balance.other.dao.OtherBalanceDao;
import hu.kniznertamas.adminsystem.dal.balance.project.dao.ProjectBalanceDao;
import hu.kniznertamas.adminsystem.dal.balance.user.dao.UserBalanceDao;
import hu.kniznertamas.adminsystem.dal.dao.GenericDao;
import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class BalanceService {

    @Autowired
    private UserBalanceDao userBalanceDao;

    @Autowired
    private ProjectBalanceDao projectBalanceDao;

    @Autowired
    private OtherBalanceDao otherBalanceDao;

    public Long createBalance(Balance balance) {
        return getDao(balance.getBalanceType()).save(balance);
    }

    public Long editBalance(Balance balance) {
        return getDao(balance.getBalanceType()).save(balance);
    }

    public void deleteBalance(Long id, BalanceType balanceType) {
        getDao(balanceType).delete(id);
    }

    public Balance findBalanceById(Long id, BalanceType balanceType) {
        return getDao(balanceType).findById(id);
    }

    public Set<Balance> findAllBalance() {
        Stream<Balance> userBalances = userBalanceDao.findAll().stream();
        Stream<Balance> projectBalances = projectBalanceDao.findAll().stream();
        Stream<Balance> otherBalances = otherBalanceDao.findAll().stream();
        return Stream.concat(Stream.concat(userBalances, projectBalances), otherBalances).collect(Collectors.toSet());
    }

    public Set<Balance> findAllByType(BalanceType balanceType) {
        return getDao(balanceType).findAll();
    }

    private GenericDao<Balance> getDao(BalanceType balanceType) {
        GenericDao<Balance> dao;
        switch (balanceType) {
            case USER:
                dao = userBalanceDao;
                break;
            case PROJECT:
                dao = projectBalanceDao;
                break;
            case OTHER:
                dao = otherBalanceDao;
                break;
            default:
                dao = null;
        }
        return dao;
    }
}
