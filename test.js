const test = require('ava');
const sc = require('./index');

test.beforeEach('', (t) => {
    t.context.data = {
        a:                  new Set([1,2,3,4,5]),
        aCopy:              new Set([1,2,3,4,5]),
        aReversed:          new Set([5,4,3,2,1]),
        aPartialOverlap:    new Set([7,6,3,2,1]),
        aDisjoint:          new Set([6,7]),
        aSubset:            new Set([3,2,1])
    };
});

test('equal', t => {
    const f = t.context.data;
    t.true(sc.equal(f.a, f.a), 'same object');

    t.true(sc.equal(f.a, f.aCopy), 'identical order');
    t.true(sc.equal(f.aCopy, f.a), 'identical order (reversed params)');

    t.true(sc.equal(f.a, f.aReversed), 'reversed order');
    t.true(sc.equal(f.aReversed, f.a), 'reversed order (reversed params)');

    t.false(sc.equal(f.a, f.aPartialOverlap), 'not partial overlap');
    t.false(sc.equal(f.aPartialOverlap, f.a), 'not partial overlap (reversed params)');

    t.false(sc.equal(f.a, f.aDisjoint), 'not disjoint');
    t.false(sc.equal(f.aDisjoint, f.a), 'not disjoint (reversed params)');

    t.false(sc.equal(f.a, f.aSubset), 'not subset');
    t.false(sc.equal(f.aSubset, f.a), 'not subset (reversed params)');
});

test('union', t => {
    const f = t.context.data;
    t.deepEqual(sc.union(f.a, f.aCopy), f.a, 'complete overlap');
    t.deepEqual(sc.union(f.aCopy, f.a), f.aCopy, 'complete overlap (reversed params)');

    t.deepEqual(sc.union(f.a, f.aSubset), f.a, 'subset');
    t.deepEqual(sc.union(f.aSubset, f.a), new Set([3,2,1,4,5]), 'subset (reversed params)');

    t.deepEqual(sc.union(f.a, f.aPartialOverlap), new Set([1,2,3,4,5,7,6]), 'partial overlap');
    t.deepEqual(sc.union(f.aPartialOverlap, f.a), new Set([7,6,3,2,1,4,5]), 'partial overlap (reversed params)');

    t.deepEqual(sc.union(f.a, f.aDisjoint), new Set([1,2,3,4,5,6,7]), 'disjoint sets');
    t.deepEqual(sc.union(f.aDisjoint, f.a), new Set([6,7,1,2,3,4,5]), 'disjoint sets (reversed params)');
});

test('intersection', t => {
    const f = t.context.data;
    t.deepEqual(sc.intersection(f.a, f.aCopy), f.a, 'complete overlap');
    t.deepEqual(sc.intersection(f.aCopy, f.a), f.aCopy, 'complete overlap (reversed params)');

    t.deepEqual(sc.intersection(f.a, f.aSubset), new Set([1,2,3]), 'subset');
    t.deepEqual(sc.intersection(f.aSubset, f.a), f.aSubset, 'subset (reverse params)');

    t.deepEqual(sc.intersection(f.a, f.aPartialOverlap), new Set([1,2,3]), 'partial overlap');
    t.deepEqual(sc.intersection(f.aPartialOverlap, f.a), new Set([3,2,1]), 'partial overlap (reversed params)');

    t.deepEqual(sc.intersection(f.a, f.aDisjoint), new Set(), 'disjoint sets');
    t.deepEqual(sc.intersection(f.aDisjoint, f.a), new Set(), 'disjoint sets (reversed params)');
});

test('difference', t => {
    const f = t.context.data;
    t.deepEqual(sc.difference(f.a, f.aCopy), new Set(), 'complete overlap -> empty');
    t.deepEqual(sc.difference(f.aCopy, f.a), new Set(), 'complete overlap -> empty (reversed params)');

    t.deepEqual(sc.difference(f.a, f.aSubset), new Set([4,5]), 'subset');

    t.deepEqual(sc.difference(f.a, f.aPartialOverlap), new Set([4,5]), 'partial overlap');

    t.deepEqual(sc.difference(f.a, f.aDisjoint), f.a, 'disjoint sets');
});

test('disjunctiveUnion', t => {
    const f = t.context.data;
    t.deepEqual(sc.disjunctiveUnion(f.a, f.aCopy), new Set(), 'complete overlap -> empty');
    t.deepEqual(sc.disjunctiveUnion(f.aCopy, f.a), new Set(), 'complete overlap -> empty (reversed params)');

    t.deepEqual(sc.disjunctiveUnion(f.a, f.aSubset), new Set([4,5]), 'subset');
    t.deepEqual(sc.disjunctiveUnion(f.aSubset, f.a), new Set([4,5]), 'subset (reversed params)');
    
    t.deepEqual(sc.disjunctiveUnion(f.a, f.aPartialOverlap), new Set([4,5,7,6]), 'partial overlap');
    t.deepEqual(sc.disjunctiveUnion(f.aPartialOverlap, f.a), new Set([7,6,4,5]), 'partial overlap (reversed params)');

    t.deepEqual(sc.disjunctiveUnion(f.a, f.aDisjoint), new Set([...f.a, ...f.aDisjoint]), 'disjoint sets');
});

test('isStrictSubsetOf', t => {
    const f = t.context.data;
    t.true(sc.isStrictSubsetOf(f.aSubset, f.a), 'strict subset');
    
    t.false(sc.isStrictSubsetOf(f.a, f.a), 'not same object');
    t.false(sc.isStrictSubsetOf(f.aCopy, f.a), 'not complete overlap');
});

test('isSubsetOf', t => {
    const f = t.context.data;
    t.true(sc.isSubsetOf(f.aSubset, f.a), 'strict subset');
    t.true(sc.isSubsetOf(f.a, f.a), 'same object');
    t.true(sc.isSubsetOf(f.aCopy, f.a), 'complete overlap');
});

test('isStrictSupersetOf', t => {
    const f = t.context.data;
    t.true(sc.isStrictSupersetOf(f.a, f.aSubset), 'strict superset');
    
    t.false(sc.isStrictSupersetOf(f.a, f.a), 'not same object');
    t.false(sc.isStrictSupersetOf(f.a, f.aCopy), 'not complete overlap');
});

test('isSupersetOf', t => {
    const f = t.context.data;
    t.true(sc.isSupersetOf(f.a, f.aSubset), 'strict superset');
    t.true(sc.isSupersetOf(f.a, f.a), 'same object');
    t.true(sc.isSupersetOf(f.a, f.aCopy), 'complete overlap');
});