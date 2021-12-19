function mapRange(value, range_1_min, range_1_max, range_2_min, range_2_max)
{
    [value, range_1_min, range_1_max, range_2_min, range_2_max].forEach(arg => {
        if(isNaN(parseInt(arg)) || typeof arg != "number")
            throw new Error("Wrong argument(s) provided for mapRange() - (expected: \"Number\", got: \"" + typeof arg + "\")");
    });

    if(parseFloat(range_1_max) === 0.0 || parseFloat(range_2_max) === 0.0)
        throw new Error("Division by zero error in mapRange() - make sure the \"range_1_max\" and \"range_2_max\" arguments are not 0");

    if(parseFloat(range_1_min) === 0.0 && parseFloat(range_2_min) === 0.0)
        return value * (range_2_max / range_1_max);

    return ((value - range_1_min) * ((range_2_max - range_2_min) / (range_1_max - range_1_min)) + range_2_min);
}

module.exports = mapRange;
