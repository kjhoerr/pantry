package dev.submelon.model;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.types.ObjectId;

import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.mongodb.panache.reactive.ReactivePanacheMongoEntityBase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@MongoEntity(collection = "item")
public class PantryItem extends ReactivePanacheMongoEntityBase {
    
    @BsonId
    @EqualsAndHashCode.Include
    private ObjectId id;

    private String name;

    private String description;

    private Double quantity;

    private String quantityUnitType;

}
