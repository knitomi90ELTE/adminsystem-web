package hu.kniznertamas.adminsystem.web.project.domain.request;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class ProjectRequest {

    private String name;
    private Integer retention;
    private String note;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRetention() {
        return retention;
    }

    public void setRetention(Integer retention) {
        this.retention = retention;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
