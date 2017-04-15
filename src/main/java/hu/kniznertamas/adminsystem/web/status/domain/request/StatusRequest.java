package hu.kniznertamas.adminsystem.web.status.domain.request;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class StatusRequest {

    private String name;
    private Boolean isIncome;

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
