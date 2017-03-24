package hu.kniznertamas.adminsystem.dal.status.transformer;

import hu.kniznertamas.adminsystem.dal.status.entity.StatusEntity;
import hu.kniznertamas.adminsystem.service.status.domain.Status;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Tamas_Knizner on 2017-03-24.
 */
@Component
public class StatusTransformer {

    public StatusEntity transform(Status status) {
        StatusEntity statusEntity = new StatusEntity();
        statusEntity.setId(status.getId());
        statusEntity.setName(status.getName());
        return statusEntity;
    }

    public Status transform(StatusEntity statusEntity) {
        Status status = new Status();
        status.setId(statusEntity.getId());
        status.setName(statusEntity.getName());
        return status;
    }

    public Set<Status> transform(List<StatusEntity> statusEntities) {
        return statusEntities.stream().map(this::transform).collect(Collectors.toSet());
    }

}
