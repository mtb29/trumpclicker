Game = {};

Game.Launch = function ()
{
    Game.ready = 0;

    Game.Init = function ()
    {
        Game.ready = 1;

        /* Game variables */
        Game.version = 0.1;
        Game.coins = 0;
        Game.coinsPerClick = 1;
        Game.coinsPerSecond = 0;
        Game.clicks = 0;
        Game.seconds = 0;

        /* Upgrades */
        Game.loan = 0;
        Game.loanCost = 250;
        Game.executiveOrder = 0;
        Game.executiveOrderCost = 1000;
        Game.wall = 0;
        Game.wallCost = 20000000000;

        Game.ClickCoin = function ()
        {
            Game.clicks++;
            Game.coins += Game.coinsPerClick;
        };

        Game.ClickLoan = function ()
        {
            if (Game.coins < Game.loanCost)
            {
                alert("You need " + Game.loanCost.toLocaleString() + " Trump Coins to purchase that upgrade.");
            } else
            {
                alert("You earned A Small Loan of a Million Dollars! (-" + Game.loanCost + " Trump Coins)");
                Game.loan++;
                Game.coins -= Game.loanCost;
                Game.loanCost *= 1.1;
                Game.loanCost = Math.round(Game.loanCost);
            }
        };

        Game.ClickOrder = function ()
        {
            if (Game.coins < Game.executiveOrderCost)
            {
                alert("You need " + Game.executiveOrderCost.toLocaleString() + " Trump Coins to purchase that upgrade.");
            } else
            {
                alert("You earned An Executive Order by Mr. President himself (-" + Game.executiveOrderCost + " Trump Coins)");
                Game.executiveOrder++;
                Game.coins -= Game.executiveOrderCost;
                Game.executiveOrderCost *= 1.5;
                Game.executiveOrderCost = Math.round(Game.executiveOrderCost);
            }
        };

        Game.ClickWall = function ()
        {
            if (Game.coins < Game.wallCost) {
                alert("You need " + Game.wallCost.toLocaleString() + " Trump Coins to purchase that upgrade.");
            } else {
                Game.wall++;
                Game.coins -= Game.wallCost;
                Game.wallCost *= 2.5;
                Game.wallCost = Math.round(Game.wallOrderCost);
                window.open("winner.html", "_blank");
            }
        };

        Game.Update = function ()
        {
            Game.seconds++;
            Game.coinsPerClick = 1 + Game.loan + (Game.executiveOrder * 3);
            Game.coinsPerSecond = 0 + (Game.loan * 2) + (Game.executiveOrder * 5);
            Game.coins += Game.coinsPerSecond;
            document.getElementById("currentCoins").innerHTML = "Trump Coins: " + Game.coins.toLocaleString() + " (+" + Game.coinsPerClick.toLocaleString() + " CPC/+" + Game.coinsPerSecond.toLocaleString() + " CPS)";
            document.getElementById("currentLoans").innerHTML = "Loans: " + Game.loan.toLocaleString() + " (+" + Game.loan.toLocaleString() + " CPC/+" + (Game.loan * 2).toLocaleString() + " CPS)<br/>Price: " + Game.loanCost.toLocaleString() + " TC";
            document.getElementById("currentExecutiveOrders").innerHTML = "Executive Orders: " + Game.executiveOrder.toLocaleString() + " (+" + (Game.executiveOrder * 3).toLocaleString() + " CPC/+" + (Game.executiveOrder * 5).toLocaleString() + " CPS)<br/>Price: " + Game.executiveOrderCost.toLocaleString() + " TC";
            document.getElementById("currentWalls").innerHTML = "Build the Wall<br/>Price: " + Game.wallCost.toLocaleString() + " TC";
            document.getElementById("stats").innerHTML = "Stats<br/><br/>Coin Clicks: " + Game.clicks.toLocaleString() + "<br/>Upgrades: " + (Game.loan + Game.executiveOrder) + "<br/>Seconds: " + Game.seconds.toLocaleString();
        };

        document.getElementById("trumpcoin").onclick = Game.ClickCoin;
        document.getElementById("loan").onclick = Game.ClickLoan;
        document.getElementById("executiveorder").onclick = Game.ClickOrder;
        document.getElementById("thewall").onclick = Game.ClickWall;
        document.getElementById("header").innerHTML = "Trump Clicker<br/>Version: " + Game.version;
        Game.Update();
        setInterval(Game.Update, 1000);
    };
};

Game.Launch();

window.onload = function ()
{
    if (!Game.ready)
        Game.Init();
};

