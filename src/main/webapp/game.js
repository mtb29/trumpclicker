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
var TrophyClick = 0;
var TrophySecond = 0;

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

function playSound(id) {
    
    switch(id) {
        case 1: var audio = document.getElementById('trophysound'); break;
        case 2: var audio = document.getElementById('minimesound'); break;
        case 3: var audio = document.getElementById('cheatsound'); break;
        case 4: var audio = document.getElementById('firedsound'); break;
        case 5: var audio = document.getElementById('americasound'); break;
    }

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
        TrophyText[8] = "<strong>Hello, Comrade?</strong>: Make your first phone call.";
        Trophy[9] = 0;
        TrophyText[9] = "<strong>It's like me, but mini</strong>: Click on minime.";

        /* Upgrades */
        Game.loan = 0;
        Game.loanBase = 10;
        Game.loanCost = 10;
        Game.loanClick = 0;
        Game.loanSecond = 0;
        Game.executiveOrder = 0;
        Game.excutiveOrderBase = 50;
        Game.executiveOrderCost = 50;
        Game.executiveOrderClick = 0;
        Game.executiveOrderSecond = 0;
        Game.deport = 0; // Credit to Ryan Smalley
        Game.deportBase = 75;
        Game.deportCost = 75;
        Game.deportClick = 0;
        Game.deportSecond = 0;
        Game.phoneCall = 0; // Seth Atkinson
        Game.phoneCallBase = 100;
        Game.phoneCallCost = 100;
        Game.phoneCallClick = 0;
        Game.phoneCallSecond = 0;
        Game.wall = 0;
        Game.wallBase = 20000000000;
        Game.wallCost = 20000000000;

        Game.ClickCoin = function ()
        {
            if (Trophy[0] === 0) {
                Trophy[0] = 1;
                TrophyCount++;
                playSound(1);
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
                    playSound(1);
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You earned A Small Loan of a Million Dollars! (-" + Game.loanCost.toLocaleString() + " Trump Coins)";
                Game.loan++;
                Game.coins -= Game.loanCost;
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
                    playSound(1);
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You earned An Executive Order by Mr. President himself (-" + Game.executiveOrderCost.toLocaleString() + " Trump Coins)";
                Game.executiveOrder++;
                Game.coins -= Game.executiveOrderCost;
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
                    playSound(1);
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You deported an illegal immigrant (-" + Game.deportCost.toLocaleString() + " Trump Coins)";
                Game.deport++;
                Game.coins -= Game.deportCost;
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
                    playSound(1);
                }
                document.getElementById("toolTip").innerHTML = "ToolTip: You made an international phone call (-" + Game.phoneCallCost.toLocaleString() + " Trump Coins)";
                Game.phoneCall++;
                Game.coins -= Game.phoneCallCost;
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
                    playSound(1);
                }
                Game.wall++;
                Game.coins -= Game.wallCost;
                window.open("winner.html", "_blank", 'height=375,width=550');
            }
        };

        Game.ClickMini = function ()
        {
            if (Trophy[9] === 0) {
                Trophy[9] = 1;
                TrophyCount++;
                playSound(1);
            } else {
                playSound(2);
            }
        };

        Game.Update = function ()
        {
            Game.seconds++;
            Game.loanCost = Math.round(Game.loanBase + (Math.pow(Game.loan, 2.15)));
            Game.executiveOrderCost = Math.round(Game.excutiveOrderBase + (Math.pow(Game.executiveOrder, 2.20)));
            Game.deportCost = Math.round(Game.deportBase + (Math.pow(Game.deport, 2.25)));
            Game.phoneCallCost = Math.round(Game.phoneCallBase + (Math.pow(Game.phoneCall, 2.30)));
            Game.wallCost = Math.round(Game.wallBase + (Math.pow(Game.wall, 25.25)));
            Game.loanClick = Math.round(Math.pow(Game.loan, 1.15));
            Game.loanSecond = Math.round(Math.pow(Game.loan, 1.20));
            Game.executiveOrderClick = Math.round(Math.pow(Game.executiveOrder, 1.21));
            Game.executiveOrderSecond = Math.round(Math.pow(Game.executiveOrder, 1.25));
            Game.deportClick = Math.round(Math.pow(Game.deport, 1.26));
            Game.deportSecond = Math.round(Math.pow(Game.deport, 1.30));
            Game.phoneCallClick = Math.round(Math.pow(Game.phoneCall, 1.30));
            Game.phoneCallSecond = Math.round(Math.pow(Game.phoneCall, 1.35));
            TrophyClick = Math.round(Math.pow(TrophyCount, 1.70));
            TrophySecond = Math.round(Math.pow(TrophyCount, 1.76));
            Game.coinsPerClick = 1 + Game.loanClick + Game.executiveOrderClick + Game.deportClick + Game.phoneCallClick + TrophyClick;
            Game.coinsPerSecond = 0 + Game.loanSecond + Game.executiveOrderSecond + Game.deportSecond + Game.phoneCallSecond + TrophySecond;
            Game.coins += Game.coinsPerSecond;
            document.getElementById("currentCoins").innerHTML = "<strong>Trump Coins</strong>: " + Game.coins.toLocaleString() + " (+" + Game.coinsPerClick.toLocaleString() + " CPC/+" + Game.coinsPerSecond.toLocaleString() + " CPS)";
            document.getElementById("currentLoans").innerHTML = "<strong>Small Loans</strong>: " + Game.loan.toLocaleString() + " (+" + Game.loanClick.toLocaleString() + " CPC/+" + Game.loanSecond.toLocaleString() + " CPS)<br/>Price: " + Game.loanCost.toLocaleString() + " TC";
            document.getElementById("currentExecutiveOrders").innerHTML = "<strong>Executive Orders</strong>: " + Game.executiveOrder.toLocaleString() + " (+" + Game.executiveOrderClick.toLocaleString() + " CPC/+" + Game.executiveOrderSecond.toLocaleString() + " CPS)<br/>Price: " + Game.executiveOrderCost.toLocaleString() + " TC";
            document.getElementById("currentDeports").innerHTML = "<strong>Immigrants Deported</strong>: " + Game.deport.toLocaleString() + " (+" + Game.deportClick.toLocaleString() + " CPC/+" + Game.deportSecond.toLocaleString() + " CPS)<br/>Price: " + Game.deportCost.toLocaleString() + " TC";
            document.getElementById("currentPhoneCalls").innerHTML = "<strong>Phone Calls</strong>: " + Game.phoneCall.toLocaleString() + " (+" + Game.phoneCallClick.toLocaleString() + " CPC/+" + Game.phoneCallSecond.toLocaleString() + " CPS)<br/>Price: " + Game.phoneCallCost.toLocaleString() + " TC";
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
                    playSound(1);
                }
            }

            if (Trophy[7] === 0) {
                if ((Game.loan + Game.executiveOrder + Game.deport + Game.phoneCall) >= 42) {
                    Trophy[7] = 1;
                    TrophyCount++;
                    playSound(1);
                }
            }


            var text = "<strong>Trophies</strong> [" + TrophyCount + "/" + TotalTrophies + "] (+" + TrophyClick + " CPC /+" + TrophySecond + " CPS)";
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
                playSound(4);
                setTimeout(function () {
                    window.location.reload();
                }, 2500);
            } else {
                if (Trophy[4] === 0) {
                    Trophy[4] = 1;
                    TrophyCount++;
                    playSound(3);
                } else {
                    playSound(3);
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
        document.getElementById("header").innerHTML = "Trump Clicker Version: " + Game.version;
        Game.Update();
        setInterval(Game.Update, 1000);
        playSound(5);
    };
};

Game.Launch();

window.onload = function ()
{
    if (!Game.ready)
        Game.Init();
};

