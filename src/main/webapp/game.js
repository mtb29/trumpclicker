Game = {};

Game.Launch = function ()
{
    Game.ready = 0;

    Game.Init = function ()
    {
        Game.ready = 1;

        /* Game variables */
        Game.version = 0.1;
        Game.totalCoins = 0;
        Game.coinClicks = 0;
        Game.coins = 0;

        Game.ClickCoin = function ()
        {
            Game.coins++;
            Game.coinClicks++;
            Game.Update();
        };
        
        Game.Update = function () 
        {
            document.getElementById('currentCoins').innerHTML = "Trump Coins: " + Game.coins;
        };
        
        document.getElementById('trumpcoin').onclick = Game.ClickCoin;
    };
};

Game.Launch();

window.onload = function ()
{
    if (!Game.ready)
        Game.Init();
};

