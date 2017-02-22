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

        /* Buildings */
        Game.loan = 0;
        Game.loanCost = 250;

        Game.ClickCoin = function ()
        {
            Game.coins += Game.coinsPerClick;
            Game.Update();
        };

        Game.ClickLoan = function ()
        {
            if (Game.coins < Game.loanCost)
            {
                alert("You need " + Game.loanCost.toLocaleString() + " Trump Coins to purchase that building.");
            } else
            {
                alert("You earned A Small Loan of a Million Dollars! (-" + Game.loanCost + " Trump Coins)");
                Game.loan++;
                Game.coins -= Game.loanCost;
                Game.loanCost *= 1.1;
                Game.loanCost = Math.round(Game.loanCost);
                Game.Update();
            }
        };

        Game.Update = function ()
        {
            Game.coinsPerClick = 1 + Game.loan;
            document.getElementById('currentCoins').innerHTML = "Trump Coins: " + Game.coins.toLocaleString() + " (+" + Game.coinsPerClick.toLocaleString() + " CPC)";
            document.getElementById('currentLoans').innerHTML = "Loans: " + Game.loan.toLocaleString() + " (+" + Game.loan.toLocaleString() + " CPC)";
        };

        document.getElementById('trumpcoin').onclick = Game.ClickCoin;
        document.getElementById("loan").onclick = Game.ClickLoan;
        document.getElementById("header").innerHTML = "Trump Clicker<br/>Version: " + Game.version; 
        Game.Update();
    };
};

Game.Launch();

window.onload = function ()
{
    if (!Game.ready)
        Game.Init();
};

