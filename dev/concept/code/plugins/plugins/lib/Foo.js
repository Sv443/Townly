class Foo {
    constructor()
    {
        this.bar = "X_TEST";
    }

    getBar()
    {
        return this.bar;
    }

    setBar(newBar)
    {
        this.bar = newBar;
    }
}

module.exports = Foo;