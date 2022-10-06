# Microservices With GraphQL Using Schema Stitching(bachelor Thesis)

## Initial Approach
First, I'll start with creating a simple monolith using a schema first approach where I'll have a query/mutation of a product. The mutation can then either be stored in memory (object) or saved in a database such as Mongodb.

Next step, will be to break down this monolith into various subgraphs/microservics that we can then link to a gateway/supergraph using Schema Stitching technique.
