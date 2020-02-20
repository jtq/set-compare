
// Return all elements in sets a|b
const union = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);

    return new Set([ ...a, ...b ]);
};

// Return all elements in sets a&b
const intersection = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);

    return new Set( [ ...a ].filter(v => b.has(v)) );
};

const difference = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);

    return new Set( [ ...a ].filter(v => !b.has(v)) );
}

const disjunctiveUnion = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);

    return difference(union(a, b), intersection(a, b));
}

const equal = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);
    return  a.size === b.size &&
            typeof [ ...a ].find(i => !b.has(i)) === 'undefined';
};

const isStrictSubsetOf = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);
    return b.size > a.size && isSubsetOf(a, b);
};

const isSubsetOf = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);
    return equal(union(b, a), b);
};

const isStrictSupersetOf = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);
    return a.size > b.size && isSupersetOf(a, b);
};

const isSupersetOf = (a, b) => {
    a = a instanceof Set ? a : new Set(a);
    b = b instanceof Set ? b : new Set(b);
    return equal(union(a, b), a);
};


module.exports = {
    union,
    intersection,
    difference,
    disjunctiveUnion,
    equal,
    isSubsetOf,
    isStrictSubsetOf,
    isSupersetOf,
    isStrictSupersetOf
};
