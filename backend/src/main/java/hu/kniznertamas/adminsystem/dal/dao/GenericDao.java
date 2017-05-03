package hu.kniznertamas.adminsystem.dal.dao;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
public interface GenericDao<T> {

    Long save(T dto);

    void delete(Long id);

    T findById(Long id);

    Set<T> findAll();

    boolean exists(Long id);

}
