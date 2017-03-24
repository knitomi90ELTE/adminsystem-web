package hu.kniznertamas.adminsystem.service.timereport.domain;

import hu.kniznertamas.adminsystem.service.project.domain.Project;
import hu.kniznertamas.adminsystem.service.user.domain.User;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class TimeReport {

    private Long id;
    private User user;
    private Project project;
    private LocalDate created;
    private BigDecimal hour;
    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public BigDecimal getHour() {
        return hour;
    }

    public void setHour(BigDecimal hour) {
        this.hour = hour;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
