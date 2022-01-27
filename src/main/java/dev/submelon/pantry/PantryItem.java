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
    private Integer id;

    @Column(nullable=false)
    private String name;

    private String description;
    
    @Column(unique=true, nullable=false)
    private String shortid;

    @Column(nullable=false)
    private double quantity;
    
    public PantryItem(String name, String description, String shortid, double quantity) {
        this.name = name;
        this.description = description;
        this.shortid = shortid;
        this.quantity = quantity;
    }

}
