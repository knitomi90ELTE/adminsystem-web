package hu.kniznertamas.adminsystem.web.balance.domain.response;

import hu.kniznertamas.adminsystem.web.project.domain.response.ProjectView;
import hu.kniznertamas.adminsystem.web.status.domain.response.StatusView;
import hu.kniznertamas.adminsystem.web.user.domain.response.UserView;

/**
 * Created by Tamas_Knizner on 2017-03-31.
 */
public class BalanceView {

    private Long id;
    private Integer net;
    private Integer gross;
    private Integer vat;
    private Integer vatValue;
    private String created;
    private String completed;
    private StatusView statusView;
    private ProjectView projectView;
    private UserView userView;
    private String balanceType;
    private Boolean cash;
    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNet() {
        return net;
    }

    public void setNet(Integer net) {
        this.net = net;
    }

    public Integer getGross() {
        return gross;
    }

    public void setGross(Integer gross) {
        this.gross = gross;
    }

    public Integer getVat() {
        return vat;
    }

    public void setVat(Integer vat) {
        this.vat = vat;
    }

    public Integer getVatValue() {
        return vatValue;
    }

    public void setVatValue(Integer vatValue) {
        this.vatValue = vatValue;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public StatusView getStatusView() {
        return statusView;
    }

    public void setStatusView(StatusView statusView) {
        this.statusView = statusView;
    }

    public ProjectView getProjectView() {
        return projectView;
    }

    public void setProjectView(ProjectView projectView) {
        this.projectView = projectView;
    }

    public UserView getUserView() {
        return userView;
    }

    public void setUserView(UserView userView) {
        this.userView = userView;
    }

    public String getBalanceType() {
        return balanceType;
    }

    public void setBalanceType(String balanceType) {
        this.balanceType = balanceType;
    }

    public Boolean getCash() {
        return cash;
    }

    public void setCash(Boolean cash) {
        this.cash = cash;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
