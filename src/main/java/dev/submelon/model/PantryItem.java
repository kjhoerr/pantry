package dev.submelon.model;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntityBase;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@MongoEntity(collection = "item")
public class PantryItem extends ReactivePanacheMongoEntityBase {
    
    @BsonId
    @EqualsAndHashCode.Include
    private ObjectId id;

    private String name;

    private String description;

    private double quantity;

    private String quantityUnitType;

}
