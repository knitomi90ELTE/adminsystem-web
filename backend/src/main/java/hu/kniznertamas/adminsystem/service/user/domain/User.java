package hu.kniznertamas.adminsystem.service.user.domain;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class User {

    private Long id;
    private String name;
    private Integer wage;
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

    public Integer getWage() {
        return wage;
    }

    public void setWage(Integer wage) {
        this.wage = wage;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", wage=" + wage +
                ", note='" + note + '\'' +
                '}';
    }
}
