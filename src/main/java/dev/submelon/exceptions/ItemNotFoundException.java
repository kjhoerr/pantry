package dev.submelon.exceptions;

import io.smallrye.graphql.api.ErrorCode;

@ErrorCode("item-not-found")
public class ItemNotFoundException extends RuntimeException {

    public ItemNotFoundException(Throwable th) {
        super(th);
    }
}
