Game = {};

var Trophy = {};
var TrophyText = {};
var TotalTrophies = 5;
var TrophyCount = 0;

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

        Trophy[0] = 0;
        TrophyText[0] = "Hello, Mr. President: Earn your first Trump Coin";
        Trophy[1] = 0;
        TrophyText[1] = "Helping Hand: Earn your first Loan";
        Trophy[2] = 0;
        TrophyText[2] = "Sign Here, Initial There: Earn your first Executive Order";
        Trophy[3] = 0;
        TrophyText[3] = "You Made America Great Again: Build the wall";
        Trophy[4] = 0;
        TrophyText[4] = "Cheaters Never Prosper...wait a doggone minute....: Use the cheat command";

        /* Upgrades */
        Game.loan = 0;
        Game.loanCost = 250;
        Game.executiveOrder = 0;
        Game.executiveOrderCost = 1000;
        Game.wall = 0;
        Game.wallCost = 20000000000;

        Game.ClickCoin = function ()
        {
            if (Trophy[0] === 0) {
                Trophy[0] = 1;
                TrophyCount++;
                alert(TrophyText[0]);
            }

            Game.clicks++;
            Game.coins += Game.coinsPerClick;
        };

        Game.ClickLoan = function ()
        {
            if (Trophy[1] === 0) {
                Trophy[1] = 1;
                TrophyCount++;
                alert(TrophyText[1]);
            }

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
            if (Trophy[2] === 0) {
                Trophy[2] = 1;
                TrophyCount++;
                alert(TrophyText[2]);
            }

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
            if (Trophy[3] === 0) {
                Trophy[3] = 1;
                TrophyCount++;
                alert(TrophyText[3]);
            }

            if (Game.coins < Game.wallCost) {
                alert("You need " + Game.wallCost.toLocaleString() + " Trump Coins to purchase that upgrade.");
            } else {
                Game.wall++;
                Game.coins -= Game.wallCost;
                Game.wallCost *= 2.5;
                Game.wallCost = Math.round(Game.wallCost);
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
            Trophies();
        };

        Trophies = function ()
        {
            var text = "Trophies [" + TrophyCount + "/" + TotalTrophies + "]";
            for (i = 0; i <= TotalTrophies; i++) {
                if (Trophy[i] === 1) {
                    text = text + "<br/>[*] " + TrophyText[i];
                }
            }

            if (TrophyCount > 0) {
                document.getElementById("trophies").innerHTML = text;
            }
        };

        Game.Cheater = function ()
        {
            if (Trophy[4] === 0) {
                Trophy[4] = 1;
                TrophyCount++;
                alert(TrophyText[4]);
            }

            var rand = Math.floor((Math.random() * 4) + 1);

            if (rand === 1) {
                alert("You're Fired! The game has been reset!");
                window.location.reload();
            }
            Game.coins += 20000000000;
            Game.loan += 2500;
            Game.executiveOrder += 2500;
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

