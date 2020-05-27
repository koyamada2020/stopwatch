// ストップウォッチのON/OFFフラグ
let startFlag = false;
// ラップタイムのナンバー
let lapNumber = 1;
// 合計ラップタイム
let totalLapTime = 0;
// requestAnimationFlameID
let requestId = null;
// 時間を一時的に格納する変数
let tempTime = 0;
// 一時停止するまでの累計時間
let beforeTime = 0;

// タイマーをスタートする
function startTimer() {
    if (!startFlag) {
        startFlag = true;
        
        // スタートボタンを非表示
        const startEl = document.getElementById('start');
        startEl.style.display = 'none';
        // ポーズボタンのstyle属性を削除してボタンを表示
        const pauseEl = document.getElementById('pause');
        pauseEl.removeAttribute('style');

        // 時間を表示する要素を取得
        const mEl = document.getElementById('m');
        const sEl = document.getElementById('s');
        const msEl = document.getElementById('ms');

        const startTime = new Date().getTime(); // 描画開始時刻を取得

        // タイムを測る関数
        const loop = () => {
            requestId = window.requestAnimationFrame(loop);
            let currentTime = new Date().getTime(); // 経過時刻を取得
            let status = currentTime - startTime + beforeTime; // 経過時刻 - 描画開始時刻 + 前回までの累計時刻
            tempTime = status;
            
            let m = parseInt(status / (60 * 1000));
            let s = parseInt((status % (60 * 1000)) / 1000);
            let ms = parseInt(status % 1000);

            // 足りない桁数を0で埋める
            if (m < 10) m = '0' + m;
            if (s < 10) s = '0' + s;
            if (ms < 10) {
                ms = '00' + ms;
            } else if (ms < 100) {
                ms = '0' + ms;
            }
            // ミリセカンドを2ケタ表示するため末尾を削除
            ms = String(ms).slice(0, -1);

            // 表示させる秒数を代入
            mEl.textContent = m;
            sEl.textContent = s;
            msEl.textContent = ms;
        }
        loop();
    }
}

// タイマーを一時停止する
function pauseTimer() {
    if (startFlag) {
        startFlag = false;

        // タイマー描画を停止
        cancelAnimationFrame(requestId);
        // 一時停止した時間を代入
        beforeTime = tempTime;

        // ポーズボタンを非表示
        const pauseEl = document.getElementById('pause');
        pauseEl.style.display = 'none';
        // スタートボタンのstyle属性を削除してボタンを表示
        const startEl = document.getElementById('start');
        startEl.removeAttribute('style');   
    }
}

// ラップタイムを追加する
function addLaptime() {
    if (startFlag && lapNumber < 100) {
        // ラップタイム　＝　経過時間　－　トータルラップタイム
        const lapTime = tempTime - totalLapTime;
        // ラップタイムを合計タップタイムに加算していく
        totalLapTime += lapTime;

        let m = parseInt(lapTime / (60 * 1000));
        let s = parseInt((lapTime % (60 * 1000)) / 1000);
        let ms = parseInt(lapTime % 1000);

        // 足りない桁数を0で埋める
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        if (ms < 10) {
            ms = '00' + ms;
        } else if (ms < 100) {
            ms = '0' + ms;
        }

        // ラップタイムのテキスト
        const lapTimeText = m + ':' + s + '.' + ms;

        // 要素を生成
        const parentLi = document.createElement('li');
        const childLi = document.createElement('li');
        const childLi2 = document.createElement('li');
        // 表示する文字列を代入
        childLi.textContent = '#' + lapNumber + ' ' + lapTimeText;
        childLi2.textContent = document.getElementById('timerText').textContent;
        // 親要素に子要素を加える
        parentLi.appendChild(childLi);
        parentLi.appendChild(childLi2);
        
        const ulEl = document.getElementById('laptimeLog');

        // ulElの子要素が0個以下の場合
        if (ulEl.children.length <= 0) {
            // 末尾に挿入
            ulEl.appendChild(parentLi);
        } else {
            // 最初の子要素の前に挿入
            ulEl.insertBefore(parentLi, ulEl.children[0]);
        }

        lapNumber++;
    }
}

// タイマー及びラップタイムログをリセットする
function reset() {
    // 初期化
    startFlag = false;
    beforeTime = 0;
    lapNumber = 1;
    totalLapTime = 0;

    // タイマー停止
    cancelAnimationFrame(requestId);

    // 時間を表示する要素を取得
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');
    const msEl = document.getElementById('ms');

    // 時間の表示を初期化
    mEl.textContent = '00';
    sEl.textContent = '00';
    msEl.textContent = '00';

    // ラップタイムのログをすべて削除
    const ulEl = document.getElementById('laptimeLog');
    while (ulEl.firstChild) {
        ulEl.removeChild(ulEl.firstChild);
    }

    // ポーズボタンを非表示
    const pauseEl = document.getElementById('pause');
    pauseEl.style.display = 'none';
    // スタートボタンのstyle属性を削除してボタンを表示
    const startEl = document.getElementById('start');
    startEl.removeAttribute('style');   
}

// 初期化
function init() {
    // イベントリスナーの登録
    document.getElementById('start').addEventListener('click', startTimer, false);
    document.getElementById('pause').addEventListener('click', pauseTimer, false);
    document.getElementById('lap').addEventListener('click', addLaptime, false);
    document.getElementById('reset').addEventListener('click', reset, false);
}

// html読み込み時に呼び出される
window.onload = init;