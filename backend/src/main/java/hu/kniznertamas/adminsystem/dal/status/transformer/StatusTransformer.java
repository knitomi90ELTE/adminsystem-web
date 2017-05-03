package hu.kniznertamas.adminsystem.dal.status.transformer;

import hu.kniznertamas.adminsystem.dal.status.entity.StatusEntity;
import hu.kniznertamas.adminsystem.service.status.domain.Status;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
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
        statusEntity.setIsIncome(status.getIsIncome());
        return statusEntity;
    }

    public Status transform(StatusEntity statusEntity) {
        Status status = new Status();
        status.setId(statusEntity.getId());
        status.setName(statusEntity.getName());
        status.setIsIncome(statusEntity.getIsIncome());
        return status;
    }

    public Set<Status> transform(Collection<StatusEntity> statusEntities) {
        Set<Status> result;
        if(statusEntities.isEmpty()) {
            result = Collections.emptySet();
        } else {
            result = statusEntities.stream().map(this::transform).collect(Collectors.toSet());
        }
        return result;
    }

}
