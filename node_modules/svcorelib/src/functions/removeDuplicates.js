function removeDuplicates(array)
{
    return array.filter((a, b) => array.indexOf(a) === b);
}

module.exports = removeDuplicates;
