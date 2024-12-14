# Microservices With GraphQL Using Schema Stitching (bachelor Thesis)

## Approach
First, I started with creating a simple monolith using a schema first approach where I'll had a query/mutation of the product. The mutation can then either be stored in memory (object) or saved in a database such as Mongodb.

Next, I broke down this monolith into various subgraphs/microservics that were linked to a gateway/supergraph using the schema stitching technique.

This repo is the working prototype of my bachelor thesis.
