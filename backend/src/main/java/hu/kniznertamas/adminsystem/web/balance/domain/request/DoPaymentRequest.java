package hu.kniznertamas.adminsystem.web.balance.domain.request;

/**
 * DoPaymentRequest
 */
public class DoPaymentRequest {

    private Long id;
    private String balanceType;
    private String completionDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBalanceType() {
        return balanceType;
    }

    public void setBalanceType(String balanceType) {
        this.balanceType = balanceType;
    }

    public String getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(String completionDate) {
        this.completionDate = completionDate;
    }
}
