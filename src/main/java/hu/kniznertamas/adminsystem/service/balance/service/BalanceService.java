package hu.kniznertamas.adminsystem.service.project.service;

import hu.kniznertamas.adminsystem.dal.project.dao.ProjectDao;
import hu.kniznertamas.adminsystem.service.project.domain.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectDao projectDao;

    public Long createProject(Project project) {
        return projectDao.save(project);
    }

    public Long editProject(Project project) {
        return projectDao.save(project);
    }

    public void deleteProject(Long id) {
        projectDao.delete(id);
    }

    public Project findProjectById(Long id) {
        return projectDao.findById(id);
    }

    public Set<Project> findAllProjects() {
        return projectDao.findAll();
    }

}
