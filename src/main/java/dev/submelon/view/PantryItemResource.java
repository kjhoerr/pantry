package dev.submelon.view;

import java.util.List;

import javax.transaction.Transactional;

import org.bson.types.ObjectId;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Name;
import org.eclipse.microprofile.graphql.Query;

import dev.submelon.exceptions.ItemNotFoundException;
import dev.submelon.model.PantryItem;
import io.smallrye.mutiny.Uni;

@GraphQLApi
public class PantryItemResource {

    @Query("allItems")
    @Description("Get all items stored in the pantry")
    public Uni<List<PantryItem>> getItems() {
        return PantryItem.findAll().list();
    }

    @Query
    @Description("Get an item stored in the pantry")
    public Uni<PantryItem> getItem(@Name("itemId") String id) {
        ObjectId _id = new ObjectId(id);
        return PantryItem.findById(_id);
    }

    @Transactional
    @Mutation
    public Uni<PantryItem> postItem(PantryItem item) {
        return PantryItem.persist(item).replaceWith(item);
    }

    @Transactional
    @Mutation
    public Uni<Void> deleteItem(String id) {
        ObjectId _id = new ObjectId(id);
        return PantryItem.deleteById(_id)
        .replaceWithVoid()
        .onFailure().transform(ItemNotFoundException::new);
    }
}
