package hu.kniznertamas.adminsystem.dal.timereport.entity;

import hu.kniznertamas.adminsystem.dal.converter.LocalDateConverter;
import hu.kniznertamas.adminsystem.dal.project.entity.ProjectEntity;
import hu.kniznertamas.adminsystem.dal.user.entity.UserEntity;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Entity
@Table(name = "upload")
public class TimeReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity userEntity;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private ProjectEntity projectEntity;

    @Column(name = "created")
    @Convert(converter = LocalDateConverter.class)
    private LocalDate created;

    @Column(name = "hour")
    private BigDecimal hour;

    @Column(name = "note")
    private String note;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public ProjectEntity getProjectEntity() {
        return projectEntity;
    }

    public void setProjectEntity(ProjectEntity projectEntity) {
        this.projectEntity = projectEntity;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

    public BigDecimal getHour() {
        return hour;
    }

    public void setHour(BigDecimal hour) {
        this.hour = hour;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
