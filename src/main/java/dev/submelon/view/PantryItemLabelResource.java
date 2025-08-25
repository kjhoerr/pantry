package dev.submelon.view;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.eclipse.microprofile.graphql.Description;
import org.eclipse.microprofile.graphql.GraphQLApi;
import org.eclipse.microprofile.graphql.Mutation;
import org.eclipse.microprofile.graphql.Query;

import dev.submelon.model.PantryItemLabel;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GraphQLApi
public class PantryItemLabelResource {

    @Query("allLabels")
    @Description("Get all labels that can be assigned to items")
    public Uni<List<PantryItemLabel>> getItems() {
        return PantryItemLabel.findAll().list();
    }

    @Mutation
    @Description("Create any new labels from list of labels")
    public Uni<List<PantryItemLabel>> syncLabels(PantryItemLabel[] labels) {
        return Multi.createFrom().items(labels)
            .filter(label -> StringUtils.isNotBlank(label.getTitle()))
            .onItem().transformToUniAndMerge(this::getOrCreateLabel)
            .collect().asList();
    }

    private Uni<PantryItemLabel> getOrCreateLabel(PantryItemLabel label) {
        return findByTitle(label.getTitle())
            .onItem().transformToUni(opt -> {
                if (opt.isPresent()) {
                    return Uni.createFrom().item(opt.get());
                } else {
                    return persistNewLabel(label);
                }
            });
    }

    private Uni<Optional<PantryItemLabel>> findByTitle(String title) {
        return PantryItemLabel
            .find(new Document("title", title))
            .firstResultOptional();
    }

    private Uni<PantryItemLabel> persistNewLabel(PantryItemLabel label) {
        return PantryItemLabel.persist(label).replaceWith(label);
    }
}
