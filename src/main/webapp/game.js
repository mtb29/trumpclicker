/*
 * Trump Clicker
 * By: Seth Atkinson, Matthew Brady, Matthew Delosa, Shane Whalen, & Jeremy Wiles
 * For: CIS4470 @ MU
 */
Game = {};

var Trophy = {};
var TrophyText = {};
var TotalTrophies = 8;
var TrophyCount = 0;

function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var hr;
    var min;
    var snd;

    if (hours > 0) {
        if (hours === 1) {
            hr = " hour";
        } else {
            hr = " hours";
        }
    }

    if (minutes >= 0) {
        if (minutes === 1) {
            min = " minute";
        } else {
            min = " minutes";
        }
    }

    if (seconds >= 0) {
        if (seconds === 1) {
            snd = " second";
        } else {
            snd = " seconds";
        }
    }

    if (hours > 0) {
        return hours.toLocaleString() + hr + ", " + minutes + min + ", " + seconds + snd;
    } else if (minutes > 0) {
        return minutes + min + ", " + seconds + snd;
    } else {
        return seconds + snd;
    }
}

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

        /* Trophies */
        Trophy[0] = 0;
        TrophyText[0] = "Hello, Mr. President: Earn your first Trump Coin";
        Trophy[1] = 0;
        TrophyText[1] = "Helping Hand: Earn your first Loan";
        Trophy[2] = 0;
        TrophyText[2] = "Sign Here, Initial There: Earn your first Executive Order";
        Trophy[3] = 0;
        TrophyText[3] = "You Made America Great Again: Build the wall";
        Trophy[4] = 0;
        TrophyText[4] = "Cheaters Never Prosper...wait a doggone minute....: Use the cheat command successfully";
        Trophy[5] = 0;
        TrophyText[5] = "Luck Of The Draw: You Got Lucky";
        Trophy[6] = 0;
        TrophyText[6] = "Permission Denied: Deport your first illegal immigrant";
        Trophy[7] = 0;
        TrophyText[7] = "The Meaning to Life, the Universe, and Everything: Buy 42 upgrades";

        /* Upgrades */
        Game.loan = 0;
        Game.loanCost = 100;
        Game.executiveOrder = 0;
        Game.executiveOrderCost = 250;
        Game.deport = 0; // Credit to Ryan Smalley
        Game.deportCost = 500;
        Game.wall = 0;
        Game.wallCost = 20000000000;

        Game.ClickCoin = function ()
        {
            if (Trophy[0] === 0) {
                Trophy[0] = 1;
                TrophyCount++;
                document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[0];
            }

            Game.clicks++;
            Game.coins += Game.coinsPerClick;
        };

        Game.ClickLoan = function ()
        {

            if (Game.coins < Game.loanCost)
            {
                document.getElementById("toolTip").innerHTML = "ToolTip: You need " + Game.loanCost.toLocaleString() + " Trump Coins to purchase that upgrade.";
            } else
            {
                if (Trophy[1] === 0) {
                    Trophy[1] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[1];
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You earned A Small Loan of a Million Dollars! (-" + Game.loanCost + " Trump Coins)";
                Game.loan++;
                Game.coins -= Game.loanCost;
                Game.loanCost *= 1.2;
                Game.loanCost = Math.round(Game.loanCost);
            }
        };

        Game.ClickOrder = function ()
        {

            if (Game.coins < Game.executiveOrderCost)
            {
                document.getElementById("toolTip").innerHTML = "ToolTip: You need " + Game.executiveOrderCost.toLocaleString() + " Trump Coins to purchase that upgrade.";
            } else
            {
                if (Trophy[2] === 0) {
                    Trophy[2] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[2];
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You earned An Executive Order by Mr. President himself (-" + Game.executiveOrderCost + " Trump Coins)";
                Game.executiveOrder++;
                Game.coins -= Game.executiveOrderCost;
                Game.executiveOrderCost *= 1.3;
                Game.executiveOrderCost = Math.round(Game.executiveOrderCost);
            }
        };

        Game.ClickDeport = function ()
        {
            if (Game.coins < Game.deportCost)
            {
                document.getElementById("toolTip").innerHTML = "ToolTip: You need " + Game.deportCost.toLocaleString() + " Trump Coins to purchase that upgrade.";
            } else
            {
                if (Trophy[6] === 0) {
                    Trophy[6] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[6];
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You deported an illegal immigrant (-" + Game.deportCost + " Trump Coins)";
                Game.deport++;
                Game.coins -= Game.deportCost;
                Game.deportCost *= 1.4;
                Game.deportCost = Math.round(Game.deportCost);
            }
        };

        Game.ClickWall = function ()
        {

            if (Game.coins < Game.wallCost) {
                document.getElementById("toolTip").innerHTML = "ToolTip: You need " + Game.wallCost.toLocaleString() + " Trump Coins to purchase that upgrade.";
            } else {
                if (Trophy[3] === 0) {
                    Trophy[3] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[3];
                }
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
            Game.coinsPerClick = 1 + Game.loan + (Game.executiveOrder * 3) + (Game.deport * 4);
            Game.coinsPerSecond = 0 + (Game.loan * 2) + (Game.executiveOrder * 5) + (Game.deport * 6);
            Game.coins += Game.coinsPerSecond;
            document.getElementById("currentCoins").innerHTML = "Trump Coins: " + Game.coins.toLocaleString() + " (+" + Game.coinsPerClick.toLocaleString() + " CPC/+" + Game.coinsPerSecond.toLocaleString() + " CPS)";
            document.getElementById("currentLoans").innerHTML = "Small Loans: " + Game.loan.toLocaleString() + " (+" + Game.loan.toLocaleString() + " CPC/+" + (Game.loan * 2).toLocaleString() + " CPS)<br/>Price: " + Game.loanCost.toLocaleString() + " TC";
            document.getElementById("currentExecutiveOrders").innerHTML = "Executive Orders: " + Game.executiveOrder.toLocaleString() + " (+" + (Game.executiveOrder * 3).toLocaleString() + " CPC/+" + (Game.executiveOrder * 5).toLocaleString() + " CPS)<br/>Price: " + Game.executiveOrderCost.toLocaleString() + " TC";
            document.getElementById("currentDeports").innerHTML = "Immigrants Deported: " + Game.deport.toLocaleString() + " (+" + (Game.deport * 4).toLocaleString() + " CPC/+" + (Game.deport * 6).toLocaleString() + " CPS)<br/>Price: " + Game.deportCost.toLocaleString() + " TC";
            document.getElementById("currentWalls").innerHTML = "Build the Wall<br/>Price: " + Game.wallCost.toLocaleString() + " TC";
            document.getElementById("stats").innerHTML = "Stats<br/><br/>Coin Clicks: " + Game.clicks.toLocaleString() + "<br/>Upgrades: " + (Game.loan + Game.executiveOrder + Game.deport) + "<br/>Time: " + secondsToTime(Game.seconds);
            Trophies();
        };


        Trophies = function ()
        {
            var rand = Math.floor((Math.random() * 5000) + 1);

            if (rand === 42) {
                if (Trophy[5] === 0) {
                    Trophy[5] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[5];
                }
            }

            if (Trophy[7] === 0) {
                if ((Game.loan + Game.executiveOrder + Game.deport) >= 42) {
                    Trophy[7] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[7];
                }
            }


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
            var rand = Math.floor((Math.random() * 4) + 1);

            if (rand === 1) {
                document.getElementById("toolTip").innerHTML = "ToolTip: You're Fired! The game has been reset!";
                setTimeout(function () {
                    window.location.reload();
                }, 2500);
            } else {
                if (Trophy[4] === 0) {
                    Trophy[4] = 1;
                    TrophyCount++;
                    document.getElementById("toolTip").innerHTML = "ToolTip: Trophy: " + TrophyText[4];
                }

                Game.coins += 20000000000;
                Game.loan += 2500;
                Game.executiveOrder += 2500;
                Game.deport += 2500;
            }
        };

        Game.reload = function () {
            window.location.reload();
        };

        document.getElementById("trumpcoin").onclick = Game.ClickCoin;
        document.getElementById("loan").onclick = Game.ClickLoan;
        document.getElementById("executiveorder").onclick = Game.ClickOrder;
        document.getElementById("deportillegal").onclick = Game.ClickDeport;
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

