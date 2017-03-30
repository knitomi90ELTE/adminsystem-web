package hu.kniznertamas.adminsystem.service.balance.domain;

import hu.kniznertamas.adminsystem.service.balance.type.BalanceType;
import hu.kniznertamas.adminsystem.service.project.domain.Project;
import hu.kniznertamas.adminsystem.service.status.domain.Status;
import hu.kniznertamas.adminsystem.service.user.domain.User;

import java.time.LocalDate;

/**
 * Created by Tamas_Knizner on 2017-03-29.
 */
public class Balance {

    private Long id;
    private Integer net;
    private Integer gross;
    private Integer vat;
    private Integer vatValue;
    private LocalDate created;
    private LocalDate completed;
    private Status status;
    private Project project;
    private User user;
    private BalanceType balanceType;
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

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public LocalDate getCompleted() {
        return completed;
    }

    public void setCompleted(LocalDate completed) {
        this.completed = completed;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BalanceType getBalanceType() {
        return balanceType;
    }

    public void setBalanceType(BalanceType balanceType) {
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
