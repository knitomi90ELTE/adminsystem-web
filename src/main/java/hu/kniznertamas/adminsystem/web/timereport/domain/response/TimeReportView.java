package hu.kniznertamas.adminsystem.web.timereport.domain.response;

import hu.kniznertamas.adminsystem.web.project.domain.response.ProjectView;
import hu.kniznertamas.adminsystem.web.user.domain.response.UserView;

import java.math.BigDecimal;

/**
 * TimeReportView
 */
public class TimeReportView {

    private Long id;
    private UserView user;
    private ProjectView project;
    private String created;
    private BigDecimal hour;
    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserView getUser() {
        return user;
    }

    public void setUser(UserView user) {
        this.user = user;
    }

    public ProjectView getProject() {
        return project;
    }

    public void setProject(ProjectView project) {
        this.project = project;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
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
