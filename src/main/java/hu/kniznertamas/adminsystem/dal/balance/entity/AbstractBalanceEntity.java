package hu.kniznertamas.adminsystem.dal.balance.entity;

import hu.kniznertamas.adminsystem.dal.converter.LocalDateConverter;
import hu.kniznertamas.adminsystem.dal.status.entity.StatusEntity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
@MappedSuperclass
public abstract class AbstractBalanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(name = "netto")
    protected Integer net;

    @Column(name = "brutto")
    protected Integer gross;

    @Column(name = "afa")
    protected Integer vat;

    @Column(name = "afa_value")
    protected Integer vatValue;

    @Column(name = "created")
    @Convert(converter = LocalDateConverter.class)
    protected LocalDate created;

    @Column(name = "completed")
    @Convert(converter = LocalDateConverter.class)
    protected LocalDate completed;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    protected StatusEntity statusEntity;

    @Column(name = "cash")
    protected Boolean cash;

    @Column(name = "note")
    protected String note;

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

    public StatusEntity getStatusEntity() {
        return statusEntity;
    }

    public void setStatusEntity(StatusEntity statusEntity) {
        this.statusEntity = statusEntity;
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
