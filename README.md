# Common set-theory comparisons and operators

The Set API in javascript is currently rather impoverished, with the ability to define sets but little in the way of common set-theory operations or comparisons we can easily perform on them.

This module exposes a number of useful set-theory operations and comparisons:

* `union(a, b)`: Return everything in set A **or** B
* `intersection(a, b)`: Return everything in set A **and** B
* `difference(a, b)`: Subtract **from** set A everything in B
* `disjunctiveUnion(a, b)`: Return everything in set A **xor** B (everything in set A **or** B *but not both*)
* `equal(a, b)`: Returns true if two sets are equal (sets have no concept of ordering, to this relies purely on the presence/absence of values, not their order)
* `isSubsetOf(a, b)`: Returns true if A is a subset of B (equal sets *are* subsets of each other)
* `isStrictSubsetOf(a, b)`: Returns true if A is a **strict** subset of B (equal sets are *not* strict subsets of each other)
* `isSupersetOf(a, b)`: Returns true if A is a superset of B (equal sets *are* supersets of each other)
* `isStrictSupersetOf(a, b)`: Returns true if A is a **strict** superset of B (equal sets are *not* strict supersets of each other)
