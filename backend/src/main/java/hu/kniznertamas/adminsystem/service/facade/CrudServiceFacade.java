package hu.kniznertamas.adminsystem.service.facade;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface CrudServiceFacade<T> {

    Long create(T dto);

    Long edit(T dto);

    void delete(Long id);

    T findById(Long id);

    Set<T> findAll();

}
