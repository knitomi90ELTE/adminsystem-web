package hu.kniznertamas.adminsystem.web.user.domain.request;

/**
 * TimeReportRequest
 */
public class UserRequest {

    private String name;
    private Integer wage;
    private String note;

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
}
