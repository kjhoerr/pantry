package dev.submelon.pantry;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PantryItem {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(nullable=false)
    private String name;

    private String description;
    
    @Column(nullable=false)
    private double quantity;

    @Column(nullable=false)
    private String quantityUnitType;
    
    public PantryItem(String name, String description, double quantity, String quantityUnitType) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.quantityUnitType = quantityUnitType;
    }

}
