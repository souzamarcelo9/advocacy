! function(e, t) {
    "use strict";
    ({
        customID: "spintechScript",
        $document: e(document),
        $window: e(window),
        $body: e("body"),
        classes: {
            overlayActive: "overlay-enabled",
            collapsed: "collapsed",
            mainHeaderMenuActive: "header-menu-active",
            searchPopUpActive: "header-search-active"
        },
        init: function() {
            this.$document.on("ready", this.documentIsReady.bind(this)), this.$document.on("ready", this.mobileMainMenuRightClone.bind(this)), this.$document.on("ready", this.mobileMainMenuClone.bind(this)), this.$document.on("ready", this.autoHeightSetOnHeader.bind(this)), this.$document.on("ready", this.autoHeightBreadcrumbMenu.bind(this)), this.$window.on("ready", this.documentIsReady.bind(this))
        },
        documentIsReady: function() {
            this.$document.on("click." + this.customID, ".menu-collapsed", this.mainMenuCollapse.bind(this)).on("click." + this.customID, ".header-close-menu", this.mainMenuCollapse.bind(this)).on("click." + this.customID, this.mainMenuHideMobilePopup.bind(this)).on("click." + this.customID, ".mobile-collapsed", this.mobileSubMenuCollapse.bind(this)).on("click." + this.customID, ".header-close-menu", this.resetMobileMenuCollapse.bind(this)).on("mainMenuHideMobilePopup." + this.customID, this.resetMobileMenuCollapse.bind(this)).on("resize." + this.customID, this.autoHeightSetOnHeader.bind(this)).on("resize." + this.customID, this.autoHeightBreadcrumbMenu.bind(this)).on("click." + this.customID, ".header-search-toggle", this.searchPopUpToggle.bind(this)).on("click." + this.customID, ".header-search-close", this.searchPopUpToggle.bind(this)).on("click." + this.customID, this.hideSearchBar.bind(this)), this.$window.on("load." + this.customID, this.MainMenuFocusAccessibility.bind(this)).on("load." + this.customID, this.headerAboveBarMobile.bind(this)).on("load." + this.customID, this.breadcrumbMenuMobile.bind(this)).on("resize." + this.customID, this.autoHeightSetOnHeader.bind(this)).on("resize." + this.customID, this.autoHeightBreadcrumbMenu.bind(this))
        },
        autoHeightSetOnHeader: function(t) {
            var i = e(".navigation-wrapper"),
                s = e(".navigation-wrapper > .main-mobile-nav"),
                a = e(".navigation-wrapper > .main-navigation-area *:not(.logo):not(.header_btn):not(.cart-icon-wrap *):not(.dropdown-menu):not(.search-button *)"),
                n = 0;
            e("body").find("div").hasClass("is-sticky-on") && ("block" == e("div.main-mobile-nav").css("display") ? (s.each(function() {
                var t = e(this).outerHeight(!0);
                t > n && (n = t)
            }), i.css("min-height", n), e(".breadcrumb-nav").hasClass("breadcrumb-sticky-on") && e(".main-navigation").hasClass("is-sticky-on") && e(".main-mobile-nav").hasClass("is-sticky-on") && e(".breadcrumb-sticky-on").css("top", n - 1)) : (a.each(function() {
                var t = e(this).outerHeight(!0);
                t > n && (n = t)
            }), i.css("min-height", n), e(".breadcrumb-nav").hasClass("breadcrumb-sticky-on") && e(".main-navigation").hasClass("is-sticky-on") && e(".main-mobile-nav").hasClass("is-sticky-on") && e(".breadcrumb-sticky-on").css("top", n - 1)))
        },
        autoHeightBreadcrumbMenu: function(t) {
            var i = e(".breadcrumb-navbar"),
                s = e(".breadcrumb-navbar .breadcrumb-navbar-mobile"),
                a = e(".breadcrumb-navbar .breadcrumb-menu"),
                n = 0;
            e("body").find("div").hasClass("breadcrumb-sticky-on") && ("block" == e("div.breadcrumb-navbar-mobile").css("display") ? (s.each(function() {
                var t = e(this).outerHeight(!0);
                t > n && (n = t)
            }), i.css("min-height", n)) : (a.each(function() {
                var t = e(this).outerHeight(!0);
                t > n && (n = t)
            }), i.css("min-height", n)))
        },
        mobileMainMenuRightClone: function(t) {
            e(".header-wrap-right").clone().appendTo(".mobile-menu-right")
        },
        mobileMainMenuClone: function(t) {
            e(".main-navbar:not(.breadcrumb-menu) .main-menu").clone().appendTo(".main-mobile-build")
        },
        MainMenuFocusAccessibility: function(t) {
            e(".main-navbar, .widget_nav_menu").find("a").on("focus blur", function() {
                e(this).parents("ul, li").toggleClass("focus")
            })
        },
        mainMenuCollapse: function(t) {
            var i = e(".menu-collapsed");
            this.$body.toggleClass(this.classes.mainHeaderMenuActive), this.$body.toggleClass(this.classes.overlayActive), i.toggleClass(this.classes.collapsed), this.$body.hasClass(this.classes.mainHeaderMenuActive) ? e(".header-close-menu").focus() : i.focus(), this.mainMenuAccessibility()
        },
        mainMenuAccessibility: function() {
            var e, t, i, s = document.querySelector(".main-mobile-build");
            let a = document.querySelector(".header-close-menu"),
                n = s.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
                o = n[n.length - 1];
            if (!s) return !1;
            for (t = 0, i = (e = s.getElementsByTagName("a")).length; t < i; t++) e[t].addEventListener("focus", c, !0), e[t].addEventListener("blur", c, !0);

            function c() {
                for (var e = this; - 1 === e.className.indexOf("main-mobile-build");) "li" === e.tagName.toLowerCase() && (-1 !== e.className.indexOf("focus") ? e.className = e.className.replace(" focus", "") : e.className += " focus"), e = e.parentElement
            }
            document.addEventListener("keydown", function(e) {
                ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? document.activeElement === a && (o.focus(), e.preventDefault()) : document.activeElement === o && (a.focus(), e.preventDefault()))
            })
        },
        mainMenuHideMobilePopup: function(t) {
            var i = e(".menu-collapsed"),
                s = e(".main-mobile-build");
            e(t.target).closest(i).length || e(t.target).closest(s).length || this.$body.hasClass(this.classes.mainHeaderMenuActive) && (this.$body.removeClass(this.classes.mainHeaderMenuActive), this.$body.removeClass(this.classes.overlayActive), i.removeClass(this.classes.collapsed), this.$document.trigger("mainMenuHideMobilePopup." + this.customID), t.stopPropagation())
        },
        mobileSubMenuCollapse: function(t) {
            t.preventDefault();
            var i = e(t.currentTarget);
            i.closest(".main-mobile-build .main-menu"), i.parents(".dropdown-menu").length;
            this.isRTL, setTimeout(function() {
                i.parent().toggleClass("current"), i.next().slideToggle()
            }, 250)
        },
        resetMobileMenuCollapse: function(t) {
            e(".main-mobile-build .main-menu");
            var i = e(".main-mobile-build  .menu-item"),
                s = e(".main-mobile-build .dropdown-menu");
            setTimeout(function() {
                i.removeClass("current"), s.hide()
            }, 250)
        },
        searchPopUpToggle: function(t) {
            var i = e(".header-search-toggle"),
                s = e(".header-search-field");
            this.$body.toggleClass(this.classes.searchPopUpActive), this.$body.hasClass(this.classes.searchPopUpActive) ? s.focus() : i.focus(), this.searchPopupAccessibility()
        },
        hideSearchBar: function(t) {
            var i = e(".header-search-toggle"),
                s = e(".header-search-popup");
            e(t.target).closest(i).length || e(t.target).closest(s).length || this.$body.hasClass(this.classes.searchPopUpActive) && (this.$body.removeClass(this.classes.searchPopUpActive), i.focus(), t.stopPropagation())
        },
       searchPopupAccessibility: function () {
            var e,
                t,
                i,
                s = document.querySelector(".header-search-popup");
            let n = document.querySelector(".header-search-field"),
                a = s.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
                o = a[a.length - 1];
            if (!s) return !1;
            for (t = 0, i = (e = s.getElementsByTagName("button")).length; t < i; t++) e[t].addEventListener("focus", c, !0), e[t].addEventListener("blur", c, !0);
            function c() {
                for (var e = this; -1 === e.className.indexOf("header-search-popup"); )
                    "input" === e.tagName.toLowerCase() && (-1 !== e.className.indexOf("focus") ? (e.className = e.className.replace(" focus", "")) : (e.className += " focus")), (e = e.parentElement);
            }
            document.addEventListener("keydown", function (e) {
                ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? document.activeElement === n && (o.focus(), e.preventDefault()) : document.activeElement === o && (n.focus(), e.preventDefault()));
            });
        },
        headerAboveAccessibility: function() {
            if (e(".above-header").length > 0) {
                var t, i, s, a = document.querySelector(".header-above-bar");
                let e = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                    o = document.querySelector(".header-above-collapse"),
                    c = a.querySelectorAll(e),
                    r = c[c.length - 1];
                if (!a) return !1;
                for (i = 0, s = (t = a.getElementsByTagName("a")).length; i < s; i++) t[i].addEventListener("focus", n, !0), t[i].addEventListener("blur", n, !0);

                function n() {
                    for (var e = this; - 1 === e.className.indexOf("header-above-bar");) "li" === e.tagName.toLowerCase() && (-1 !== e.className.indexOf("focus") ? e.className = e.className.replace(" focus", "") : e.className += " focus"), e = e.parentElement
                }
                document.addEventListener("keydown", function(e) {
                    ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? document.activeElement === o && (r.focus(), e.preventDefault()) : document.activeElement === r && (o.focus(), e.preventDefault()))
                })
            }
        },
        headerAboveBarMobile: function() {
            if (e(".above-header").length > 0) {
                var t = e(".header-above-wrapper"),
                    i = e(".header-widget"),
                    s = e(".header-above-btn"),
                    a = e(".header-above-collapse");
                !t.children().length > 0 ? (i.hide(), s.hide()) : (s.show(), i.clone().appendTo(".header-above-bar"), a.on("click", function(e) {
                    t.toggleClass("is-active"), a.toggleClass("is-active"), e.preventDefault()
                })), this.headerAboveAccessibility()
            } //else $(".header-above-wrapper").length > 0 ? $(".header-above-btn").hide() : $(".header-above-btn").show()
        },
        breadcrumbMenuAccessibility: function() {
            if (e(".breadcrumb-mobile-menu").length > 0) {
                var t, i, s, a = document.querySelector(".breadcrumb-mobile-menu");
                let e = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                    o = document.querySelector(".breadcrumb-collapsed"),
                    c = a.querySelectorAll(e),
                    r = c[c.length - 1];
                if (!a) return !1;
                for (i = 0, s = (t = a.getElementsByTagName("a")).length; i < s; i++) t[i].addEventListener("focus", n, !0), t[i].addEventListener("blur", n, !0);

                function n() {
                    for (var e = this; - 1 === e.className.indexOf("breadcrumb-mobile-menu");) "li" === e.tagName.toLowerCase() && (-1 !== e.className.indexOf("focus") ? e.className = e.className.replace(" focus", "") : e.className += " focus"), e = e.parentElement
                }
                document.addEventListener("keydown", function(e) {
                    ("Tab" === e.key || 9 === e.keyCode) && (e.shiftKey ? document.activeElement === o && (r.focus(), e.preventDefault()) : document.activeElement === r && (o.focus(), e.preventDefault()))
                })
            }
        },
        breadcrumbMenuMobile: function() {
            if (e(".breadcrumb-mobile-menu").length > 0) {
                var t = e(".breadcrumb-mobile-menu"),
                    i = e(".breadcrumb-menu .main-menu"),
                    s = e(".breadcrumb-button"),
                    a = e(".breadcrumb-collapsed");
                !i.children().length > 0 ? (i.hide(), s.hide()) : (s.show(), i.clone().appendTo(".breadcrumb-mobile-menu"), a.on("click", function(e) {
                    t.slideToggle(), a.toggleClass("is-active"), e.preventDefault()
                })), this.breadcrumbMenuAccessibility()
            }
        }
    }).init()
}(jQuery, window.spintechCustomize);