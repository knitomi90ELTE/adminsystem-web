package hu.kniznertamas.adminsystem.service.project.domain;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class Project {

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

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", retention=" + retention +
                ", note='" + note + '\'' +
                '}';
    }
}
