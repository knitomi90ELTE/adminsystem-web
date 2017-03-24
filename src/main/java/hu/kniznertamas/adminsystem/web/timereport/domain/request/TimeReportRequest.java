package hu.kniznertamas.adminsystem.web.timereport.domain.request;

import java.math.BigDecimal;

/**
 * TimeReportRequest
 */
public class TimeReportRequest {

    private Long userId;
    private Long projectId;
    private String created;
    private BigDecimal hour;
    private String note;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
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
