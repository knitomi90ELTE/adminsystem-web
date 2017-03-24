package hu.kniznertamas.adminsystem.dal.project.repository;

import hu.kniznertamas.adminsystem.dal.project.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

}
