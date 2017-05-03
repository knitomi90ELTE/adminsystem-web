package hu.kniznertamas.adminsystem.dal.balance.user.entity;

import hu.kniznertamas.adminsystem.dal.balance.entity.AbstractBalanceEntity;
import hu.kniznertamas.adminsystem.dal.user.entity.UserEntity;

/**
 * Created by Tamas_Knizner on 2017-03-30.
 */
@Entity
@Table(name="user_balance")
public class UserBalanceEntity extends AbstractBalanceEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity userEntity;

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }
}
