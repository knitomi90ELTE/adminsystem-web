package hu.kniznertamas.adminsystem.web.project.domain.response;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class ProjectView {

    private Long id;
    private String name;
    private Integer retention;
    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
