package hu.kniznertamas.adminsystem.service.balance.type;

/**
 * Created by Tamas_Knizner on 2017-03-29.
 */
public enum BalanceType {

    USER("user"), PROJECT("project"), OTHER("other");

    private String value;

    BalanceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
