package hu.kniznertamas.adminsystem.service.status.domain;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class Status {

    private Long id;
    private String name;
    private Boolean isIncome;

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

    public Boolean getIsIncome() {
        return isIncome;
    }

    public void setIsIncome(Boolean isIncome) {
        this.isIncome = isIncome;
    }
}
