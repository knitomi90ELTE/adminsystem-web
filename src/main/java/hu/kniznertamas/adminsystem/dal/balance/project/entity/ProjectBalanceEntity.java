package hu.kniznertamas.adminsystem.dal.balance.project.entity;

import hu.kniznertamas.adminsystem.dal.balance.entity.AbstractBalanceEntity;
import hu.kniznertamas.adminsystem.dal.project.entity.ProjectEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
@Entity
@Table(name="project_balance")
public class ProjectBalanceEntity extends AbstractBalanceEntity {

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private ProjectEntity projectEntity;

    public ProjectEntity getProjectEntity() {
        return projectEntity;
    }

    public void setProjectEntity(ProjectEntity projectEntity) {
        this.projectEntity = projectEntity;
    }
}
