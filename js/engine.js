var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 460;
    canvas.height = 552;
    doc.body.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    // function checkCollisions(){
    //   allEnemies.forEach(function (enemy) {
    //     let p = enemy.update(dt);
    //     p.colide();
    //   });
    //   player.update();
    // }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {

        var rowImages = [
                'images/gray-water-block.png',
                'images/yellow-stone-block.png',
                'images/yellow-stone-block.png',
                'images/yellow-stone-block.png',
                'images/pink-grass-block.png',
                'images/pink-grass-block.png',


            ],
            numRows = 6,
            numCols = 5,
            row, col;

        ctx.clearRect(0,0,canvas.width,canvas.height)

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 92, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/yellow-stone-block.png',
        'images/gray-water-block.png',
        'images/pink-grass-block.png',
        'images/enemy-bug.png',
        'images/red-char-horn-girl.png',
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
