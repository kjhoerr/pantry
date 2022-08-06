package dev.submelon.rest.json;

import java.util.List;

import javax.transaction.Transactional;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/items")
public class PantryItemResource {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<PantryItem> getItems() {
        return PantryItem.findAll().list();
    }

    @Transactional
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public PantryItem postItem(PantryItem item) {
        PantryItem.persist(item);

        return item;
    }

    @Transactional
    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public PantryItem putItem(@PathParam("id") Long id, PantryItem item) {
        if (item.id.equals(id)) {
            PantryItem.persist(item);
        } else {
            throw new WebApplicationException(Response.status(400).entity("ID does not match body").build());
        }

        return item;
    }

    @Transactional
    @DELETE
    @Path("/{id}")
    public void deleteItem(@PathParam("id") Long id) {
        boolean result = PantryItem.deleteById(id);

        if (!result) {
            throw new WebApplicationException(Response.status(404).entity("Could not find item").build());
        }
    }
}
