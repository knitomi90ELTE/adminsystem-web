package hu.kniznertamas.adminsystem.web.status.domain.response;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
public class StatusView {

    private Long id;
    private String name;

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
}
