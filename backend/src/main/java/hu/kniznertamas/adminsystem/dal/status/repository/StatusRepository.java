package hu.kniznertamas.adminsystem.dal.status.repository;

import hu.kniznertamas.adminsystem.dal.status.entity.StatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface StatusRepository extends JpaRepository<StatusEntity, Long> {

}
