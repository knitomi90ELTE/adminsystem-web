package hu.kniznertamas.adminsystem.web.status.transformer;

import hu.kniznertamas.adminsystem.service.status.domain.Status;
import hu.kniznertamas.adminsystem.web.status.domain.request.StatusRequest;
import hu.kniznertamas.adminsystem.web.status.domain.response.StatusView;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-23.
 */
@Component
public class StatusViewTransformer {

    public Status transform(StatusRequest statusRequest) {
        Status status = new Status();
        status.setName(statusRequest.getName());
        return status;
    }

    public Status transform(StatusRequest statusRequest, Long id) {
        Status status = transform(statusRequest);
        status.setId(id);
        return status;
    }

    public StatusView transform(Status status) {
        StatusView statusView = new StatusView();
        statusView.setId(status.getId());
        statusView.setName(status.getName());
        return statusView;
    }

    public Set<StatusView> transform(Set<Status> statuses) {
        return statuses.stream().map(this::transform).collect(Collectors.toSet());
    }

}
