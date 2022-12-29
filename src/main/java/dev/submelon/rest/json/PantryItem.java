package dev.submelon.rest.json;

import java.util.UUID;

import org.bson.codecs.pojo.annotations.BsonId;

import io.quarkus.mongodb.panache.PanacheMongoEntityBase;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@MongoEntity(collection = "item")
public class PantryItem extends PanacheMongoEntityBase {
    
    @BsonId
    @EqualsAndHashCode.Include
    private UUID id;

    private String name;

    private String description;

    private double quantity;

    private String quantityUnitType;

}
