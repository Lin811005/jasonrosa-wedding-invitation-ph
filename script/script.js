document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // 💡 核心功能 A：開場全覆蓋歡迎畫面 (Welcome Popup) 鎖定滾動與自動解鎖
    // ==========================================================================
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const welcomePopup = document.querySelector(".welcome-popup");

    // 1. 網頁一載入，立刻鎖死 Y 軸滾動（配合您的 CSS 鎖 X 軸，達到全方位無死角鎖定）
    htmlEl.style.overflowY = "hidden";
    bodyEl.style.overflowY = "hidden";

    // 2. 建立「解鎖網頁捲動」的共用函式
    function unlockPageScroll() {
        htmlEl.style.overflowY = "";
        bodyEl.style.overflowY = "";
        
        // 貼心優化：完全解鎖後，將 Popup 從網頁 DOM 結構中徹底移除，釋放手機記憶體
        setTimeout(() => {
            if (welcomePopup) {
                welcomePopup.remove();
            }
        }, 500); 
    }

    if (welcomePopup) {
        // 3. 自動讀取您在 CSS 裡設定的 welcome-popup 動畫總長度（您設定的是 7s）
        const computedStyle = window.getComputedStyle(welcomePopup);
        const animationDuration = parseFloat(computedStyle.animationDuration) || 7; // 抓不到則預設 7 秒
        
        // 4. 精準倒數計時：當 7 秒的淡出動畫完全結束、畫面徹底變透明時，立刻放開滾動權限
        setTimeout(function() {
            unlockPageScroll();
        }, animationDuration * 1000);

        // 5. 安全防護機制：如果有賓客等不及 7 秒，允許他們「點擊螢幕任意處」提早淡出並解鎖進入網頁
        welcomePopup.addEventListener("click", function () {
            welcomePopup.style.animation = "none"; // 取消原本的 7 秒長定時
            welcomePopup.style.transition = "opacity 0.6s ease, visibility 0.6s ease";
            welcomePopup.style.opacity = "0";
            welcomePopup.style.visibility = "hidden";
            unlockPageScroll(); // 點擊後立刻放開滾動
        });
    } else {
        // 安全保險：如果網頁上找不到這個 Popup，直接解除鎖定，避免網頁掛掉
        unlockPageScroll();
    }


    // ==========================================================================
    // 💡 核心功能 B：您原創的 IntersectionObserver 圖片滑入偵測器（完美保留與整合）
    // ==========================================================================
    const targetElements = document.querySelectorAll(".kv-fade-in, .pure-fade-in");

    if (targetElements.length > 0) {
        
        // 精準控制：將觸發點設定在 55%
        const observerOptions = {
            root: null,        /* 以手機螢幕視窗為基準 */
            threshold: 0.55    /* 當元素有 55% 進入畫面時才正式觸發 */
        };

        // 建立偵測器
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 【滑入觸發】加上 Class，執行進場動畫（由您的 CSS 排隊時差決定）
                    entry.target.classList.add("is-active");
                    
                    // 僅播一次的靈魂：觸發後立刻「解除監控」，讓動畫永久定格！
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 同時監控網頁中的每一個動畫元素
        targetElements.forEach(element => {
            observer.observe(element);
        });
    }
});
