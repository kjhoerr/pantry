package dev.submelon.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@MongoEntity(collection = "label")
public class PantryItemLabel extends ReactivePanacheMongoEntity {

    private String title;

    private String color;

}
