package dev.submelon.rest.json;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "pantryitem")
@Data
@EqualsAndHashCode(callSuper = false)
public class PantryItem extends PanacheEntity {
    
    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private double quantity;

    @Column(nullable = false)
    private String quantityUnitType;

}
