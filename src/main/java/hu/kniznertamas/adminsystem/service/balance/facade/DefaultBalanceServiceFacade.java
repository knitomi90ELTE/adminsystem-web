package hu.kniznertamas.adminsystem.service.balance.facade;

import hu.kniznertamas.adminsystem.service.balance.domain.Balance;
import hu.kniznertamas.adminsystem.service.balance.service.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class DefaultProjectServiceFacade implements ProjectServiceFacade {

    @Autowired
    private BalanceService projectService;

    @Override
    public Long create(Balance project) {
        return projectService.createProject(project);
    }

    @Override
    public Long edit(Balance project) {
        return projectService.editProject(project);
    }

    @Override
    public void delete(Long id) {
        projectService.deleteProject(id);
    }

    @Override
    public Balance findById(Long id) {
        return projectService.findProjectById(id);
    }

    @Override
    public Set<Balance> findAll() {
        return projectService.findAllProjects();
    }
}
