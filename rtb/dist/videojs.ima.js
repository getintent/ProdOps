! function(a) {
  "use strict";
  var b = function(a) {
      var b, c, d;
      for (c = 1; c < arguments.length; c++) {
        b = arguments[c];
        for (d in b) b.hasOwnProperty(d) && (a[d] = b[d])
      }
      return a
    },
    c = {
      debug: !1,
      timeout: 5e3,
      prerollTimeout: 100,
      adLabel: "Advertisement"
    },
    d = function(a, d) {
      var e = this;
      e.ima.createAdContainer_ = function() {
        k = e.getChild("controlBar"), l = k.el().parentNode.appendChild(document.createElement("div")), l.id = "ima-ad-container", l.style.position = "absolute", l.style.zIndex = 1111, l.addEventListener("mouseover", e.ima.showAdControls_, !1), l.addEventListener("mouseout", e.ima.hideAdControls_, !1), e.ima.createControls_(), v = new google.ima.AdDisplayContainer(l, h)
      }, e.ima.createControls_ = function() {
        m = document.createElement("div"), m.id = "ima-controls-div", m.style.width = "100%", n = document.createElement("div"), n.id = "ima-countdown-div", n.innerHTML = g.adLabel, n.style.display = i ? "block" : "none", o = document.createElement("div"), o.id = "ima-seek-bar-div", o.style.width = "100%", p = document.createElement("div"), p.id = "ima-progress-div", q = document.createElement("div"), q.id = "ima-play-pause-div", q.className = "ima-playing", q.addEventListener("click", e.ima.onAdPlayPauseClick_, !1), r = document.createElement("div"), r.id = "ima-mute-div", r.className = "ima-non-muted", r.addEventListener("click", e.ima.onAdMuteClick_, !1), s = document.createElement("div"), s.id = "ima-slider-div", s.addEventListener("mousedown", e.ima.onAdVolumeSliderMouseDown_, !1), t = document.createElement("div"), t.id = "ima-slider-level-div", u = document.createElement("div"), u.id = "ima-fullscreen-div", u.className = "ima-non-fullscreen", u.addEventListener("click", e.ima.onAdFullscreenClick_, !1), l.appendChild(m), m.appendChild(n), m.appendChild(o), m.appendChild(q), m.appendChild(r), m.appendChild(s), m.appendChild(u), o.appendChild(p), s.appendChild(t)
      }, e.ima.initializeAdDisplayContainer = function() {
        w = !0, v.initialize()
      }, e.ima.requestAds = function() {
        w || v.initialize();
        var a = new google.ima.AdsRequest;
        a.adTagUrl = g.adTagUrl, g.forceNonLinearFullSlot && (a.forceNonLinearFullSlot = !0), a.linearAdSlotWidth = e.ima.getPlayerWidth(), a.linearAdSlotHeight = e.ima.getPlayerHeight(), a.nonLinearAdSlotWidth = g.nonLinearWidth || e.ima.getPlayerWidth(), a.nonLinearAdSlotHeight = g.nonLinearHeight || e.ima.getPlayerHeight() / 3, x.requestAds(a)
      }, e.ima.onAdsManagerLoaded_ = function(a) {
        if (y = a.getAdsManager(P, z), y.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e.ima.onAdError_), y.addEventListener(google.ima.AdEvent.Type.AD_BREAK_READY, e.ima.onAdBreakReady_), y.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, e.ima.onContentPauseRequested_), y.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, e.ima.onContentResumeRequested_), y.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, e.ima.onAllAdsCompleted_), y.addEventListener(google.ima.AdEvent.Type.LOADED, e.ima.onAdLoaded_), y.addEventListener(google.ima.AdEvent.Type.STARTED, e.ima.onAdStarted_), y.addEventListener(google.ima.AdEvent.Type.CLICK, e.ima.onAdPlayPauseClick_), y.addEventListener(google.ima.AdEvent.Type.COMPLETE, e.ima.onAdComplete_), y.addEventListener(google.ima.AdEvent.Type.SKIPPED, e.ima.onAdComplete_), !j) try {
          var b = e.ima.getPlayerWidth(),
            c = e.ima.getPlayerHeight();
          R.width = b, R.height = c, y.init(b, c, google.ima.ViewMode.NORMAL), y.setVolume(e.muted() ? 0 : e.volume())
        } catch (a) {
          e.ima.onAdError_(a)
        }
        e.trigger("adsready")
      }, e.ima.start = function() {
        if (j) try {
          y.init(e.ima.getPlayerWidth(), e.ima.getPlayerHeight(), google.ima.ViewMode.NORMAL), y.setVolume(e.muted() ? 0 : e.volume()), y.start()
        } catch (a) {
          e.ima.onAdError_(a)
        }
      }, e.ima.onAdsLoaderError_ = function(a) {
        window.console.log("AdsLoader error: " + a.getError()), y && y.destroy(), e.trigger("adserror")
      }, e.ima.onAdError_ = function(a) {
        window.console.log("Ad error: " + a.getError()), k.show(), y.destroy(), l.style.display = "none", e.trigger("adserror")
      }, e.ima.onAdBreakReady_ = function(a) {
        U(a)
      }, e.ima.playAdBreak = function() {
        j || y.start()
      }, e.ima.onContentPauseRequested_ = function(a) {
        E = !0, F = !0, e.off("ended", V), a.getAd().getAdPodInfo().getPodIndex() != -1 && e.ads.startLinearAdMode(), l.style.display = "block", m.style.display = "block", k.hide(), e.pause()
      }, e.ima.onContentResumeRequested_ = function(a) {
        E = !1, F = !1, e.on("ended", V), B && B.isLinear() && (l.style.display = "none"), k.show(), B ? H || B.getAdPodInfo().getPodIndex() == -1 || e.ads.endLinearAdMode() : e.ads.endLinearAdMode(), n.innerHTML = ""
      }, e.ima.onAllAdsCompleted_ = function(a) {
        if (I = !0, 1 == H)
          for (var b in T) T[b]()
      }, e.ima.onAdLoaded_ = function(a) {
        a.getAd().isLinear() || e.play()
      }, e.ima.onAdStarted_ = function(a) {
        B = a.getAd(), B.isLinear() ? (D = setInterval(e.ima.onAdPlayheadTrackerInterval_, 250), l.className = "") : l.className = "bumpable-ima-ad-container"
      }, e.ima.onAdComplete_ = function(a) {
        B.isLinear() && clearInterval(D)
      }, e.ima.onAdPlayheadTrackerInterval_ = function() {
        var a = y.getRemainingTime(),
          b = B.getDuration(),
          c = b - a;
        c = c > 0 ? c : 0;
        var e, f, d = !1;
        B.getAdPodInfo() && (d = !0, e = B.getAdPodInfo().getAdPosition(), f = B.getAdPodInfo().getTotalAds());
        var h = Math.floor(a / 60),
          i = Math.floor(a % 60);
        i.toString().length < 2 && (i = "0" + i);
        var j = ": ";
        d && (j = " (" + e + " of " + f + "): "), n.innerHTML = g.adLabel + j + h + ":" + i;
        var k = c / b,
          l = 100 * k;
        p.style.width = l + "%"
      }, e.ima.getPlayerWidth = function() {
        var a = parseInt(getComputedStyle(e.el()).width, 10) || e.width();
        return a
      }, e.ima.getPlayerHeight = function() {
        var a = parseInt(getComputedStyle(e.el()).height, 10) || e.height();
        return a
      }, e.ima.hideAdControls_ = function() {
        q.style.display = "none", r.style.display = "none", u.style.display = "none", m.style.height = "14px"
      }, e.ima.showAdControls_ = function() {
        m.style.height = "37px", q.style.display = "block", r.style.display = "block", s.style.display = "block", u.style.display = "block"
      }, e.ima.onAdPlayPauseClick_ = function() {
        F ? (q.className = "ima-paused", y.pause(), F = !1) : (q.className = "ima-playing", y.resume(), F = !0)
      }, e.ima.onAdMuteClick_ = function() {
        G ? (r.className = "ima-non-muted", y.setVolume(1), e.muted(!1), G = !1, t.style.width = 100 * e.volume() + "%") : (r.className = "ima-muted", y.setVolume(0), e.muted(!0), G = !0, t.style.width = "0%")
      }, e.ima.onAdVolumeSliderMouseDown_ = function() {
        document.addEventListener("mouseup", e.ima.onMouseUp_, !1), document.addEventListener("mousemove", e.ima.onMouseMove_, !1)
      }, e.ima.onMouseMove_ = function(a) {
        e.ima.setVolumeSlider_(a)
      }, e.ima.onMouseUp_ = function(a) {
        e.ima.setVolumeSlider_(a), document.removeEventListener("mousemove", e.ima.onMouseMove_), document.removeEventListener("mouseup", e.ima.onMouseUp_)
      }, e.ima.setVolumeSlider_ = function(a) {
        var b = (a.clientX - s.getBoundingClientRect().left) / s.offsetWidth;
        b *= 100, b = Math.min(Math.max(b, 0), 100), t.style.width = b + "%", e.volume(b / 100), y.setVolume(b / 100), 0 == e.volume() ? (r.className = "ima-muted", e.muted(!0), G = !0) : (r.className = "ima-non-muted", e.muted(!1), G = !1)
      }, e.ima.onAdFullscreenClick_ = function() {
        e.isFullscreen() ? e.exitFullscreen() : e.requestFullscreen()
      }, e.ima.onFullscreenChange_ = function() {
        e.isFullscreen() ? (u.className = "ima-fullscreen", y && y.resize(window.screen.width, window.screen.height, google.ima.ViewMode.FULLSCREEN)) : (u.className = "ima-non-fullscreen", y && y.resize(e.ima.getPlayerWidth(), e.ima.getPlayerHeight(), google.ima.ViewMode.NORMAL))
      }, e.ima.onVolumeChange_ = function() {
        var a = e.muted() ? 0 : e.volume();
        y && y.setVolume(a), 0 == a ? (G = !0, r.className = "ima-muted", t.style.width = "0%") : (G = !1, r.className = "ima-non-muted", t.style.width = 100 * a + "%")
      }, e.ima.seekContentToZero_ = function() {
        e.off("loadedmetadata", e.ima.seekContentToZero_), e.currentTime(0)
      }, e.ima.playContentFromZero_ = function() {
        e.off("loadedmetadata", e.ima.playContentFromZero_), e.currentTime(0), e.play()
      }, e.ima.resetIMA_ = function() {
        E = !1, F = !1, e.on("ended", V), B && B.isLinear() && (l.style.display = "none"), k.show(), e.ads.endLinearAdMode(), D && clearInterval(D), y && (y.destroy(), y = null), x && !H && x.contentComplete(), H = !1, I = !1
      }, e.ima.addEventListener = function(a, b) {
        y && y.addEventListener(a, b)
      }, e.ima.getAdsManager = function() {
        return y
      }, e.ima.setContent = function(a, b, c) {
        e.ima.resetIMA_(), g.adTagUrl = b ? b : g.adTagUrl, e.currentSrc() && (e.currentTime(0), e.pause()), a && e.src(a), c ? e.on("loadedmetadata", e.ima.playContentFromZero_) : e.on("loadedmetadata", e.ima.seekContentToZero_)
      }, e.ima.addContentEndedListener = function(a) {
        S.push(a)
      }, e.ima.addContentAndAdsEndedListener = function(a) {
        T.push(a)
      }, e.ima.setAdBreakReadyListener = function(a) {
        U = a
      }, e.ima.pauseAd = function() {
        E && F && (q.className = "ima-paused", y.pause(), F = !1)
      }, e.ima.resumeAd = function() {
        E && !F && (q.className = "ima-playing", y.resume(), F = !0)
      }, e.ima.setUpPlayerIntervals_ = function() {
        J = setInterval(e.ima.updateCurrentTime_, L), K = setInterval(e.ima.checkForSeeking_, L), M = setInterval(e.ima.checkForResize_, N)
      }, e.ima.updateCurrentTime_ = function() {
        P.seeking || (P.currentTime = e.currentTime())
      }, e.ima.checkForSeeking_ = function() {
        var a = e.currentTime(),
          b = 1e3 * (a - P.previousTime);
        Math.abs(b) > L + O ? P.seeking = !0 : P.seeking = !1, P.previousTime = e.currentTime()
      }, e.ima.checkForResize_ = function() {
        var a = e.ima.getPlayerWidth(),
          b = e.ima.getPlayerHeight();
        !y || a == R.width && b == R.height || (R.width = a, R.height = b, y.resize(a, b, google.ima.ViewMode.NORMAL))
      }, e.ima.setShowCountdown = function(a) {
        i = a, n.style.display = i ? "block" : "none"
      };
      var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, x, y, B, D, J, K, M, f = "0.2.0",
        w = !1,
        z = null,
        E = !1,
        F = !1,
        G = !1,
        H = !1,
        I = !1,
        L = 1e3,
        N = 250,
        O = 100,
        P = {
          currentTime: 0,
          previousTime: 0,
          seeking: !1,
          duration: 0
        },
        R = {
          width: 0,
          height: 0
        },
        S = [],
        T = [],
        U = void 0,
        V = function() {
          x && !H && (x.contentComplete(), H = !0);
          for (var a in S) S[a]();
          if (I)
            for (var a in T) T[a]();
          clearInterval(J), clearInterval(K), clearInterval(M), e.one("play", e.ima.setUpPlayerIntervals_)
        };
      if (g = b({}, c, a || {}), !g.id) return void window.console.log("Error: must provide id of video.js div");
      h = document.getElementById(g.id + "_html5_api"), i = !0, 0 == g.showCountdown && (i = !1), j = !0, 0 == g.autoPlayAdBreaks && (j = !1), e.one("play", e.ima.setUpPlayerIntervals_), e.on("ended", V);
      var W = {
          debug: g.debug,
          timeout: g.timeout,
          prerollTimeout: g.prerollTimeout
        },
        X = b({}, W, a.contribAdsSettings || {});
      if (e.ads(X), z = new google.ima.AdsRenderingSettings, z.restoreCustomPlaybackStateOnAdBreakComplete = !0, g.adsRenderingSettings)
        for (var Y in g.adsRenderingSettings) z[Y] = g.adsRenderingSettings[Y];
      g.locale && google.ima.settings.setLocale(g.locale), e.ima.createAdContainer_(), x = new google.ima.AdsLoader(v), x.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), 0 == g.vpaidAllowed && x.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.DISABLED), g.vpaidMode && x.getSettings().setVpaidMode(g.vpaidMode), g.locale && x.getSettings().setLocale(g.locale), g.numRedirects && x.getSettings().setNumRedirects(g.numRedirects), x.getSettings().setPlayerType("videojs-ima"), x.getSettings().setPlayerVersion(f), x.getSettings().setAutoPlayAdBreaks(j), x.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, e.ima.onAdsManagerLoaded_, !1), x.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, e.ima.onAdsLoaderError_, !1), d || (d = e.ima.start), e.on("readyforpreroll", d), e.ready(function() {
        e.on("fullscreenchange", e.ima.onFullscreenChange_), e.on("volumechange", e.ima.onVolumeChange_)
      })
    };
  videojs.plugin("ima", d)
}(window.videojs);
