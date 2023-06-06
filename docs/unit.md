# Api Tests

- Time: 0.778 seconds
- Total tests: 16
- Failures: 0

## parent_child_api

- File: [index.spec.js](../test/index.spec.js)
- Total tests: 16
- Time: 0.768 seconds
- Failures: 0

### should create a new parent

- Time: 0.070 seconds

### should not create a new parent with fields missing

- Time: 0.013 seconds

### should not create a new parent if it already exists

- Time: 0.034 seconds

### should fetch all the parents

- Time: 0.037 seconds

### should fetch no parents if there are no parents stored

- Time: 0.007 seconds

### should fetch parent with given parent id

- Time: 0.023 seconds

### should update parent data

- Time: 0.029 seconds

### should not update if parent not found in the database

- Time: 0.019 seconds

### should delete parent

- Time: 0.036 seconds

### should delete associated child data while deleting parent

- Time: 0.056 seconds

### should not create a child if parent not found

- Time: 0.006 seconds

### should create a child

- Time: 0.025 seconds

### should fetch all the child with parent info

- Time: 0.053 seconds

### should fetch all the child data associated with the given parent id

- Time: 0.044 seconds

### should update child data

- Time: 0.033 seconds

### should delete child

- Time: 0.034 seconds
