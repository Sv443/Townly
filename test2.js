class Foo
{
    constructor()
    {
        this.bar = 1;
    }

    static getBar()
    {
        return this.bar;
    }

    setBar(bar)
    {
        this.bar = bar;
    }
}

let f = new Foo();

console.log(`Static Bar: ${Foo.getBar()}`);
