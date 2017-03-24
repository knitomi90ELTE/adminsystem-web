package hu.kniznertamas.adminsystem.dal.project.dao;

import hu.kniznertamas.adminsystem.dal.project.entity.ProjectEntity;
import hu.kniznertamas.adminsystem.dal.project.repository.ProjectRepository;
import hu.kniznertamas.adminsystem.dal.project.transformer.ProjectTransformer;
import hu.kniznertamas.adminsystem.service.project.domain.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class DefaultProjectDao implements ProjectDao {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectTransformer projectTransformer;

    @Override
    public Long save(Project project) {
        ProjectEntity created = projectRepository.saveAndFlush(projectTransformer.transform(project));
        return created.getId();
    }

    @Override
    public void delete(Long id) {
        projectRepository.delete(id);
    }

    @Override
    public Project findById(Long id) {
        ProjectEntity projectEntity = projectRepository.findOne(id);
        return (projectEntity == null) ? null : projectTransformer.transform(projectEntity);
    }

    @Override
    public Set<Project> findAll() {
        return projectTransformer.transform(projectRepository.findAll());
    }

    @Override
    public boolean exists(Long id) {
        return projectRepository.exists(id);
    }
}
