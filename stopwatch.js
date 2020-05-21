// 継続時間
let sec = 0;
// 経過時間の文字列型
let timerText = '00:00.00'
// ストップウォッチのON/OFFフラグ
let startFlag = false;
// intervalのid
let timerId;
//
let lapNumber = 1;
//
let totalLapTime = 0;

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
        const timerTextEl = document.getElementById('timerText');

        // 0.01秒ごとに画面に表示
        timerId = setInterval(() => {
            sec++;
            // 秒数を60*100で割って分を求める
            let m = Math.floor(sec / (60 * 100));
            // 秒数を60*100で割って余りを出して、更に100で割って秒を求める。
            let s = Math.floor((sec % (60 * 100)) / 100);
            // 秒数を1*100で割って余りをだしてミリ秒を求める
            let milli = sec % (1 * 100);

            // 値が1ケタの場合2ケタに0埋め
            if (m < 10) {
                m = '0' + m;
            }
            if (s < 10) {
                s = '0' + s;
            }
            if (milli < 10) {
                milli = '0' + milli;
            }

            // 計測時間
            timerText = m + ':' + s + '.' + milli;
            // 画面に表示する時間を代入
            timerTextEl.textContent = timerText;

            console.log('minutes=',m,'seconds=',s,'milli=',milli,'total=',sec);
        }, 10);
    }
}

function pauseTimer() {
    if (startFlag) {
        startFlag = false;

        // タイマーを停止
        clearInterval(timerId);

        // ポーズボタンを非表示
        const pauseEl = document.getElementById('pause');
        pauseEl.style.display = 'none';
        // スタートボタンのstyle属性を削除してボタンを表示
        const startEl = document.getElementById('start');
        startEl.removeAttribute('style');   
    }
}

function addLaptime() {
    if (startFlag && lapNumber < 100) {
        // 今までの経過時間＋ラップタイムの合計＝ラップタイム
        const lapTime = sec - totalLapTime;
        // ラップタイムを合計タップタイムに加算していく
        totalLapTime += lapTime;

        // 秒数を60*100で割って分を求める
        let m = Math.floor(lapTime / (60 * 100));
        // 秒数を60*100で割って余りを出して、更に100で割って秒を求める。
        let s = Math.floor((lapTime % (60 * 100)) / 100);
        // 秒数を1*100で割って余りをだしてミリ秒を求める
        let milli = lapTime % (1 * 100);

        // 値が1ケタの場合2ケタに0埋め
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        if (milli < 10) {
            milli = '0' + milli;
        }

        // ラップタイムの文字型
        const lapTimeText = m + ':' + s + '.' + milli;

        //
        const parentLi = document.createElement('li');
        //
        const childLi = document.createElement('li');
        //
        const childLi2 = document.createElement('li');
        //
        childLi.textContent = '#' + lapNumber + ' ' + lapTimeText;
        //
        childLi2.textContent = timerText;
        //
        parentLi.appendChild(childLi);
        parentLi.appendChild(childLi2);

        document.getElementById('laptimeLog').appendChild(parentLi);

        lapNumber++;
    }
}

function reset() {

    // 初期化
    startFlag = false;
    sec = 0;
    timerText = '00:00.00'
    lapNumber = 1;
    totalLapTime = 0;
    //

    // タイマー停止
    clearInterval(timerId);

    // 時間の表示を初期化
    const timerTextEl = document.getElementById('timerText').textContent = timerText;

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

function init() {
    // イベントリスナーの登録
    document.getElementById('start').addEventListener('click', startTimer, false);
    document.getElementById('pause').addEventListener('click', pauseTimer, false);
    document.getElementById('lap').addEventListener('click', addLaptime, false);
    document.getElementById('reset').addEventListener('click', reset, false);
}
window.onload = init;