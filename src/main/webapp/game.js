/*
 * Trump Clicker
 * By: Seth Atkinson, Matthew Brady, Matthew Delosa, Shane Whalen, & Jeremy Wiles
 * For: CIS4470 @ MU
 */
Game = {};

var Trophy = {};
var TrophyText = {};
var TotalTrophies = 10;
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
        hours === 1 ? hr = " hour" : hr = " hours";
    }

    if (minutes >= 0) {
        minutes === 1 ? min = " minute" : min = " minutes";
    }

    if (seconds >= 0) {
        seconds === 1 ? snd = " second" : snd = " seconds";
    }

    if (hours > 0) {
        return hours.toLocaleString() + hr + ", " + minutes + min + ", " + seconds + snd;
    } else if (minutes > 0) {
        return minutes + min + ", " + seconds + snd;
    } else {
        return seconds + snd;
    }
}

function play() {
    var audio = document.getElementById('trophysound');
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
}

function playmini() {
    var audio = document.getElementById('minimesound');
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
}

function playcheat() {
    var audio = document.getElementById('cheatsound');
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0;
    }
}

Game.Launch = function ()
{
    Game.ready = 0;

    Game.Init = function ()
    {
        Game.ready = 1;

        /* Game variables */
        Game.version = 0.3;
        Game.coins = 0;
        Game.coinsPerClick = 1;
        Game.coinsPerSecond = 0;
        Game.clicks = 0;
        Game.seconds = 0;

        /* Trophies */
        Trophy[0] = 0;
        TrophyText[0] = "<strong>Hello, Mr. President</strong>: Earn your first Trump Coin";
        Trophy[1] = 0;
        TrophyText[1] = "<strong>Helping Hand</strong>: Earn your first Loan";
        Trophy[2] = 0;
        TrophyText[2] = "<strong>Sign Here, Initial There</strong>: Earn your first Executive Order";
        Trophy[3] = 0;
        TrophyText[3] = "<strong>You Made America Great Again</strong>: Build the wall";
        Trophy[4] = 0;
        TrophyText[4] = "<strong>Cheaters Never Prosper...wait a doggone minute....</strong>: Use the cheat command successfully";
        Trophy[5] = 0;
        TrophyText[5] = "<strong>Luck Of The Draw</strong>: You Got Lucky";
        Trophy[6] = 0;
        TrophyText[6] = "<strong>Permission Denied</strong>: Deport your first illegal immigrant";
        Trophy[7] = 0;
        TrophyText[7] = "<strong>The Meaning to Life, the Universe, and Everything</strong>: Buy 42 upgrades";
        Trophy[8] = 0;
        TrophyText[8] = "<strong>Hello, Comrade?</strong>: Make your first phone call."
        Trophy[9] = 0;
        TrophyText[9] = "<strong>It's like me, but mini</strong>: Click on minime.";

        /* Upgrades */
        Game.loan = 0;
        Game.loanCost = 10;
        Game.executiveOrder = 0;
        Game.executiveOrderCost = 100;
        Game.deport = 0; // Credit to Ryan Smalley
        Game.deportCost = 250;
        Game.phoneCall = 0; // Seth Atkinson
        Game.phoneCallCost = 350;
        Game.wall = 0;
        Game.wallCost = 20000000000;

        Game.ClickCoin = function ()
        {
            if (Trophy[0] === 0) {
                Trophy[0] = 1;
                TrophyCount++;
                play();
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
                    play();
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You earned A Small Loan of a Million Dollars! (-" + Game.loanCost.toLocaleString() + " Trump Coins)";
                Game.loan++;
                Game.coins -= Game.loanCost;
                Game.loanCost *= 1.05;
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
                    play();
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You earned An Executive Order by Mr. President himself (-" + Game.executiveOrderCost.toLocaleString() + " Trump Coins)";
                Game.executiveOrder++;
                Game.coins -= Game.executiveOrderCost;
                Game.executiveOrderCost *= 1.055;
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
                    play();
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You deported an illegal immigrant (-" + Game.deportCost.toLocaleString() + " Trump Coins)";
                Game.deport++;
                Game.coins -= Game.deportCost;
                Game.deportCost *= 1.060;
                Game.deportCost = Math.round(Game.deportCost);
            }
        };

        Game.ClickPhone = function ()
        {
            if (Game.coins < Game.phoneCallCost)
            {
                document.getElementById("toolTip").innerHTML = "ToolTip: You need " + Game.phoneCallCost.toLocaleString() + " Trump Coins to purchase that upgrade.";
            } else
            {
                if (Trophy[8] === 0) {
                    Trophy[8] = 1;
                    TrophyCount++;
                    play();
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You made an international phone call (-" + Game.phoneCallCost.toLocaleString() + " Trump Coins)";
                Game.phoneCall++;
                Game.coins -= Game.phoneCallCost;
                Game.phoneCallCost *= 1.065;
                Game.phoneCallCost = Math.round(Game.phoneCallCost);
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
                    play();
                }
                Game.wall++;
                Game.coins -= Game.wallCost;
                Game.wallCost *= 2.5;
                Game.wallCost = Math.round(Game.wallCost);
                window.open("winner.html", "_blank", 'height=600,width=600');
            }
        };

        Game.ClickMini = function ()
        {
            if (Trophy[9] === 0) {
                Trophy[9] = 1;
                TrophyCount++;
                play();
            } else {
                playmini();
            }
        };

        Game.Update = function ()
        {
            Game.seconds++;
            Game.coinsPerClick = 1 + Game.loan + (Game.executiveOrder * 3) + (Game.deport * 4) + (Game.phoneCall * 5);
            Game.coinsPerSecond = 0 + (Game.loan * 2) + (Game.executiveOrder * 5) + (Game.deport * 6) + (Game.phoneCall * 7);
            Game.coins += Game.coinsPerSecond;
            document.getElementById("currentCoins").innerHTML = "<strong>Trump Coins</strong>: " + Game.coins.toLocaleString() + " (+" + Game.coinsPerClick.toLocaleString() + " CPC/+" + Game.coinsPerSecond.toLocaleString() + " CPS)";
            document.getElementById("currentLoans").innerHTML = "<strong>Small Loans</strong>: " + Game.loan.toLocaleString() + " (+" + Game.loan.toLocaleString() + " CPC/+" + (Game.loan * 2).toLocaleString() + " CPS)<br/>Price: " + Game.loanCost.toLocaleString() + " TC";
            document.getElementById("currentExecutiveOrders").innerHTML = "<strong>Executive Orders</strong>: " + Game.executiveOrder.toLocaleString() + " (+" + (Game.executiveOrder * 3).toLocaleString() + " CPC/+" + (Game.executiveOrder * 5).toLocaleString() + " CPS)<br/>Price: " + Game.executiveOrderCost.toLocaleString() + " TC";
            document.getElementById("currentDeports").innerHTML = "<strong>Immigrants Deported</strong>: " + Game.deport.toLocaleString() + " (+" + (Game.deport * 4).toLocaleString() + " CPC/+" + (Game.deport * 6).toLocaleString() + " CPS)<br/>Price: " + Game.deportCost.toLocaleString() + " TC";
            document.getElementById("currentPhoneCalls").innerHTML = "<strong>Phone Calls</strong>: " + Game.phoneCall.toLocaleString() + " (+" + (Game.phoneCall * 5).toLocaleString() + " CPC/+" + (Game.phoneCall * 7).toLocaleString() + " CPS)<br/>Price: " + Game.phoneCallCost.toLocaleString() + " TC";
            document.getElementById("currentWalls").innerHTML = "<strong>Walls Built</strong>: " + Game.wall.toLocaleString() + "<br/>Price: " + Game.wallCost.toLocaleString() + " TC";
            document.getElementById("stats").innerHTML = "<strong>Stats</strong><br/><br/><strong>Coin Clicks</strong>: " + Game.clicks.toLocaleString() + "<br/><strong>Upgrades</strong>: " + (Game.loan + Game.executiveOrder + Game.deport + Game.phoneCall) + "<br/><strong>Time</strong>: " + secondsToTime(Game.seconds);
            Trophies();
        };


        Trophies = function ()
        {
            var rand = Math.floor((Math.random() * 5000) + 1);

            if (rand === 42) {
                if (Trophy[5] === 0) {
                    Trophy[5] = 1;
                    TrophyCount++;
                    play();
                }
            }

            if (Trophy[7] === 0) {
                if ((Game.loan + Game.executiveOrder + Game.deport + Game.phoneCall) >= 42) {
                    Trophy[7] = 1;
                    TrophyCount++;
                    play();
                }
            }


            var text = "<strong>Trophies</strong> [" + TrophyCount + "/" + TotalTrophies + "]";
            for (i = 0; i <= TotalTrophies; i++) {
                if (Trophy[i] === 1) {
                    text = text + "<br/>[<img id='minime' src='img/trumpcoinmini.png' width='25' height='19' alt='*'/>] " + TrophyText[i];
                }
            }

            if (TrophyCount > 0) {
                document.getElementById("trophies").innerHTML = text;
                document.getElementById("minime").onclick = Game.ClickMini;
            }
        };

        Game.Cheater = function ()
        {
            var rand = Math.floor((Math.random() * 4) + 1);

            if (rand === 1) {
                document.getElementById("toolTip").innerHTML = "ToolTip: You're Fired! The game has been reset!";
                playcheat();
                setTimeout(function () {
                    window.location.reload();
                }, 2500);
            } else {
                if (Trophy[4] === 0) {
                    Trophy[4] = 1;
                    TrophyCount++;
                    playcheat();
                }
                else {
                    playcheat();
                }

                Game.coins += 20000000000;
                Game.loan += 2500;
                Game.executiveOrder += 2500;
                Game.deport += 2500;
                Game.phoneCall += 2500;
            }
        };

        Game.reload = function () {
            window.location.reload();
        };

        document.getElementById("trumpcoin").onclick = Game.ClickCoin;
        document.getElementById("loan").onclick = Game.ClickLoan;
        document.getElementById("executiveorder").onclick = Game.ClickOrder;
        document.getElementById("deportillegal").onclick = Game.ClickDeport;
        document.getElementById("phonecall").onclick = Game.ClickPhone;
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

