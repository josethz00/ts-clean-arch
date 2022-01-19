# Business

## Business is not a layer of clean architecture, normally, accordingly to the classic literature, this layer is just a part of the domain layer, but in my opinion we must have a layer with the implementation of the business rules.

&nbsp;

This layer can be considered as the extension of the domain layer, here you give meaning and life to the entities. The business layer is responsible for implementing all the use cases of the application.

## Folders

### `errors`

Folder to store the error classes related to its respective entities

### `repositories`

Folder to store the types, interfaces and abstract classes of the repositories. This will be used later in the repositories implementation.

### `services`

Folder to store service classes to be used in the usecases. Services are like adapters that allow the integration of external packages/libraries in our application.
Eg.: HasherService, MailService, CacheService

### `types`

Folder to store DTOs and Enums

### `usecases`

Folder to store the usecases of the application separated by entity/module
