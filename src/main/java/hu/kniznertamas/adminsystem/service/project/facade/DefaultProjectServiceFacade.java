package hu.kniznertamas.adminsystem.service.project.facade;

import hu.kniznertamas.adminsystem.service.project.domain.Project;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultProjectServiceFacade implements ProjectServiceFacade {
    @Override
    public Long create(Project project) {
        return null;
    }

    @Override
    public Long edit(Project project) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Project findById(Long id) {
        return null;
    }

    @Override
    public Set<Project> findAll() {
        return null;
    }
}
