/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var gs = u(() => {
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let c = window.getComputedStyle(a, null),
            d = c.getPropertyValue("position"),
            _ = c.getPropertyValue("overflow"),
            h = c.getPropertyValue("display");
          (!d || d === "static") && (a.style.position = "relative"),
            _ !== "hidden" && (a.style.overflow = "hidden"),
            (!h || h === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let c = window.getComputedStyle(a, null),
            d = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let _ in d)
            c.getPropertyValue(_) !== d[_] && (a.style[_] = d[_]);
        },
        o = function (a) {
          let c = a.parentNode;
          n(c),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > c.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let c = 0; c < a.length; c++) {
            if (!a[c].nodeName) continue;
            let d = a[c].nodeName.toLowerCase();
            if (d === "img") {
              if (t) continue;
              a[c].complete
                ? o(a[c])
                : a[c].addEventListener("load", function () {
                    o(this);
                  });
            } else
              d === "video"
                ? a[c].readyState > 0
                  ? o(a[c])
                  : a[c].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[c]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var _s = u(() => {
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Pi = u(() => {
    window.tram = (function (e) {
      function t(l, g) {
        var m = new v.Bare();
        return m.init(l, g);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (g) {
          return "-" + g.toLowerCase();
        });
      }
      function n(l) {
        var g = parseInt(l.slice(1), 16),
          m = (g >> 16) & 255,
          O = (g >> 8) & 255,
          I = 255 & g;
        return [m, O, I];
      }
      function i(l, g, m) {
        return (
          "#" + ((1 << 24) | (l << 16) | (g << 8) | m).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, g) {
        d("Type warning: Expected: [" + l + "] Got: [" + typeof g + "] " + g);
      }
      function a(l, g, m) {
        d("Units do not match [" + l + "]: " + g + ", " + m);
      }
      function c(l, g, m) {
        if ((g !== void 0 && (m = g), l === void 0)) return m;
        var O = m;
        return (
          ht.test(l) || !kt.test(l)
            ? (O = parseInt(l, 10))
            : kt.test(l) && (O = 1e3 * parseFloat(l)),
          0 > O && (O = 0),
          O === O ? O : m
        );
      }
      function d(l) {
        le.debug && window && window.console.warn(l);
      }
      function _(l) {
        for (var g = -1, m = l ? l.length : 0, O = []; ++g < m; ) {
          var I = l[g];
          I && O.push(I);
        }
        return O;
      }
      var h = (function (l, g, m) {
          function O(te) {
            return typeof te == "object";
          }
          function I(te) {
            return typeof te == "function";
          }
          function S() {}
          function K(te, pe) {
            function W() {
              var qe = new ae();
              return I(qe.init) && qe.init.apply(qe, arguments), qe;
            }
            function ae() {}
            pe === m && ((pe = te), (te = Object)), (W.Bare = ae);
            var se,
              Te = (S[l] = te[l]),
              rt = (ae[l] = W[l] = new S());
            return (
              (rt.constructor = W),
              (W.mixin = function (qe) {
                return (ae[l] = W[l] = K(W, qe)[l]), W;
              }),
              (W.open = function (qe) {
                if (
                  ((se = {}),
                  I(qe) ? (se = qe.call(W, rt, Te, W, te)) : O(qe) && (se = qe),
                  O(se))
                )
                  for (var Or in se) g.call(se, Or) && (rt[Or] = se[Or]);
                return I(rt.init) || (rt.init = te), W;
              }),
              W.open(pe)
            );
          }
          return K;
        })("prototype", {}.hasOwnProperty),
        y = {
          ease: [
            "ease",
            function (l, g, m, O) {
              var I = (l /= O) * l,
                S = I * l;
              return (
                g +
                m * (-2.75 * S * I + 11 * I * I + -15.5 * S + 8 * I + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, g, m, O) {
              var I = (l /= O) * l,
                S = I * l;
              return g + m * (-1 * S * I + 3 * I * I + -3 * S + 2 * I);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, g, m, O) {
              var I = (l /= O) * l,
                S = I * l;
              return (
                g +
                m * (0.3 * S * I + -1.6 * I * I + 2.2 * S + -1.8 * I + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, g, m, O) {
              var I = (l /= O) * l,
                S = I * l;
              return g + m * (2 * S * I + -5 * I * I + 2 * S + 2 * I);
            },
          ],
          linear: [
            "linear",
            function (l, g, m, O) {
              return (m * l) / O + g;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, g, m, O) {
              return m * (l /= O) * l + g;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, g, m, O) {
              return -m * (l /= O) * (l - 2) + g;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, g, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l + g
                : (-m / 2) * (--l * (l - 2) - 1) + g;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, g, m, O) {
              return m * (l /= O) * l * l + g;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, g, m, O) {
              return m * ((l = l / O - 1) * l * l + 1) + g;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, g, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l * l + g
                : (m / 2) * ((l -= 2) * l * l + 2) + g;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, g, m, O) {
              return m * (l /= O) * l * l * l + g;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, g, m, O) {
              return -m * ((l = l / O - 1) * l * l * l - 1) + g;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, g, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l * l * l + g
                : (-m / 2) * ((l -= 2) * l * l * l - 2) + g;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, g, m, O) {
              return m * (l /= O) * l * l * l * l + g;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, g, m, O) {
              return m * ((l = l / O - 1) * l * l * l * l + 1) + g;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, g, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l * l * l * l + g
                : (m / 2) * ((l -= 2) * l * l * l * l + 2) + g;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, g, m, O) {
              return -m * Math.cos((l / O) * (Math.PI / 2)) + m + g;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, g, m, O) {
              return m * Math.sin((l / O) * (Math.PI / 2)) + g;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, g, m, O) {
              return (-m / 2) * (Math.cos((Math.PI * l) / O) - 1) + g;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, g, m, O) {
              return l === 0 ? g : m * Math.pow(2, 10 * (l / O - 1)) + g;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, g, m, O) {
              return l === O
                ? g + m
                : m * (-Math.pow(2, (-10 * l) / O) + 1) + g;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, g, m, O) {
              return l === 0
                ? g
                : l === O
                ? g + m
                : (l /= O / 2) < 1
                ? (m / 2) * Math.pow(2, 10 * (l - 1)) + g
                : (m / 2) * (-Math.pow(2, -10 * --l) + 2) + g;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, g, m, O) {
              return -m * (Math.sqrt(1 - (l /= O) * l) - 1) + g;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, g, m, O) {
              return m * Math.sqrt(1 - (l = l / O - 1) * l) + g;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, g, m, O) {
              return (l /= O / 2) < 1
                ? (-m / 2) * (Math.sqrt(1 - l * l) - 1) + g
                : (m / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + g;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, g, m, O, I) {
              return (
                I === void 0 && (I = 1.70158),
                m * (l /= O) * l * ((I + 1) * l - I) + g
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, g, m, O, I) {
              return (
                I === void 0 && (I = 1.70158),
                m * ((l = l / O - 1) * l * ((I + 1) * l + I) + 1) + g
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, g, m, O, I) {
              return (
                I === void 0 && (I = 1.70158),
                (l /= O / 2) < 1
                  ? (m / 2) * l * l * (((I *= 1.525) + 1) * l - I) + g
                  : (m / 2) *
                      ((l -= 2) * l * (((I *= 1.525) + 1) * l + I) + 2) +
                    g
              );
            },
          ],
        },
        A = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        C = document,
        w = window,
        L = "bkwld-tram",
        N = /[\-\.0-9]/g,
        x = /[A-Z]/,
        b = "number",
        X = /^(rgb|#)/,
        D = /(em|cm|mm|in|pt|pc|px)$/,
        q = /(em|cm|mm|in|pt|pc|px|%)$/,
        V = /(deg|rad|turn)$/,
        j = "unitless",
        k = /(all|none) 0s ease 0s/,
        oe = /^(width|height)$/,
        J = " ",
        F = C.createElement("a"),
        T = ["Webkit", "Moz", "O", "ms"],
        P = ["-webkit-", "-moz-", "-o-", "-ms-"],
        G = function (l) {
          if (l in F.style) return { dom: l, css: l };
          var g,
            m,
            O = "",
            I = l.split("-");
          for (g = 0; g < I.length; g++)
            O += I[g].charAt(0).toUpperCase() + I[g].slice(1);
          for (g = 0; g < T.length; g++)
            if (((m = T[g] + O), m in F.style))
              return { dom: m, css: P[g] + l };
        },
        U = (t.support = {
          bind: Function.prototype.bind,
          transform: G("transform"),
          transition: G("transition"),
          backface: G("backface-visibility"),
          timing: G("transition-timing-function"),
        });
      if (U.transition) {
        var Q = U.timing.dom;
        if (((F.style[Q] = y["ease-in-back"][0]), !F.style[Q]))
          for (var ee in A) y[ee][0] = A[ee];
      }
      var M = (t.frame = (function () {
          var l =
            w.requestAnimationFrame ||
            w.webkitRequestAnimationFrame ||
            w.mozRequestAnimationFrame ||
            w.oRequestAnimationFrame ||
            w.msRequestAnimationFrame;
          return l && U.bind
            ? l.bind(w)
            : function (g) {
                w.setTimeout(g, 16);
              };
        })()),
        H = (t.now = (function () {
          var l = w.performance,
            g = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return g && U.bind
            ? g.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        f = h(function (l) {
          function g(Z, ue) {
            var _e = _(("" + Z).split(J)),
              fe = _e[0];
            ue = ue || {};
            var Le = tt[fe];
            if (!Le) return d("Unsupported property: " + fe);
            if (!ue.weak || !this.props[fe]) {
              var je = Le[0],
                Fe = this.props[fe];
              return (
                Fe || (Fe = this.props[fe] = new je.Bare()),
                Fe.init(this.$el, _e, Le, ue),
                Fe
              );
            }
          }
          function m(Z, ue, _e) {
            if (Z) {
              var fe = typeof Z;
              if (
                (ue ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                fe == "number" && ue)
              )
                return (
                  (this.timer = new ce({
                    duration: Z,
                    context: this,
                    complete: S,
                  })),
                  void (this.active = !0)
                );
              if (fe == "string" && ue) {
                switch (Z) {
                  case "hide":
                    W.call(this);
                    break;
                  case "stop":
                    K.call(this);
                    break;
                  case "redraw":
                    ae.call(this);
                    break;
                  default:
                    g.call(this, Z, _e && _e[1]);
                }
                return S.call(this);
              }
              if (fe == "function") return void Z.call(this, this);
              if (fe == "object") {
                var Le = 0;
                rt.call(
                  this,
                  Z,
                  function (me, aI) {
                    me.span > Le && (Le = me.span), me.stop(), me.animate(aI);
                  },
                  function (me) {
                    "wait" in me && (Le = c(me.wait, 0));
                  }
                ),
                  Te.call(this),
                  Le > 0 &&
                    ((this.timer = new ce({ duration: Le, context: this })),
                    (this.active = !0),
                    ue && (this.timer.complete = S));
                var je = this,
                  Fe = !1,
                  sn = {};
                M(function () {
                  rt.call(je, Z, function (me) {
                    me.active && ((Fe = !0), (sn[me.name] = me.nextStyle));
                  }),
                    Fe && je.$el.css(sn);
                });
              }
            }
          }
          function O(Z) {
            (Z = c(Z, 0)),
              this.active
                ? this.queue.push({ options: Z })
                : ((this.timer = new ce({
                    duration: Z,
                    context: this,
                    complete: S,
                  })),
                  (this.active = !0));
          }
          function I(Z) {
            return this.active
              ? (this.queue.push({ options: Z, args: arguments }),
                void (this.timer.complete = S))
              : d(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function S() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var Z = this.queue.shift();
              m.call(this, Z.options, !0, Z.args);
            }
          }
          function K(Z) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var ue;
            typeof Z == "string"
              ? ((ue = {}), (ue[Z] = 1))
              : (ue = typeof Z == "object" && Z != null ? Z : this.props),
              rt.call(this, ue, qe),
              Te.call(this);
          }
          function te(Z) {
            K.call(this, Z), rt.call(this, Z, Or, iI);
          }
          function pe(Z) {
            typeof Z != "string" && (Z = "block"), (this.el.style.display = Z);
          }
          function W() {
            K.call(this), (this.el.style.display = "none");
          }
          function ae() {
            this.el.offsetHeight;
          }
          function se() {
            K.call(this), e.removeData(this.el, L), (this.$el = this.el = null);
          }
          function Te() {
            var Z,
              ue,
              _e = [];
            this.upstream && _e.push(this.upstream);
            for (Z in this.props)
              (ue = this.props[Z]), ue.active && _e.push(ue.string);
            (_e = _e.join(",")),
              this.style !== _e &&
                ((this.style = _e), (this.el.style[U.transition.dom] = _e));
          }
          function rt(Z, ue, _e) {
            var fe,
              Le,
              je,
              Fe,
              sn = ue !== qe,
              me = {};
            for (fe in Z)
              (je = Z[fe]),
                fe in xe
                  ? (me.transform || (me.transform = {}),
                    (me.transform[fe] = je))
                  : (x.test(fe) && (fe = r(fe)),
                    fe in tt
                      ? (me[fe] = je)
                      : (Fe || (Fe = {}), (Fe[fe] = je)));
            for (fe in me) {
              if (((je = me[fe]), (Le = this.props[fe]), !Le)) {
                if (!sn) continue;
                Le = g.call(this, fe);
              }
              ue.call(this, Le, je);
            }
            _e && Fe && _e.call(this, Fe);
          }
          function qe(Z) {
            Z.stop();
          }
          function Or(Z, ue) {
            Z.set(ue);
          }
          function iI(Z) {
            this.$el.css(Z);
          }
          function ke(Z, ue) {
            l[Z] = function () {
              return this.children
                ? oI.call(this, ue, arguments)
                : (this.el && ue.apply(this, arguments), this);
            };
          }
          function oI(Z, ue) {
            var _e,
              fe = this.children.length;
            for (_e = 0; fe > _e; _e++) Z.apply(this.children[_e], ue);
            return this;
          }
          (l.init = function (Z) {
            if (
              ((this.$el = e(Z)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              le.keepInherited && !le.fallback)
            ) {
              var ue = Ve(this.el, "transition");
              ue && !k.test(ue) && (this.upstream = ue);
            }
            U.backface &&
              le.hideBackface &&
              Ee(this.el, U.backface.css, "hidden");
          }),
            ke("add", g),
            ke("start", m),
            ke("wait", O),
            ke("then", I),
            ke("next", S),
            ke("stop", K),
            ke("set", te),
            ke("show", pe),
            ke("hide", W),
            ke("redraw", ae),
            ke("destroy", se);
        }),
        v = h(f, function (l) {
          function g(m, O) {
            var I = e.data(m, L) || e.data(m, L, new f.Bare());
            return I.el || I.init(m), O ? I.start(O) : I;
          }
          l.init = function (m, O) {
            var I = e(m);
            if (!I.length) return this;
            if (I.length === 1) return g(I[0], O);
            var S = [];
            return (
              I.each(function (K, te) {
                S.push(g(te, O));
              }),
              (this.children = S),
              this
            );
          };
        }),
        E = h(function (l) {
          function g() {
            var S = this.get();
            this.update("auto");
            var K = this.get();
            return this.update(S), K;
          }
          function m(S, K, te) {
            return K !== void 0 && (te = K), S in y ? S : te;
          }
          function O(S) {
            var K = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(S);
            return (K ? i(K[1], K[2], K[3]) : S).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var I = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (S, K, te, pe) {
            (this.$el = S), (this.el = S[0]);
            var W = K[0];
            te[2] && (W = te[2]),
              We[W] && (W = We[W]),
              (this.name = W),
              (this.type = te[1]),
              (this.duration = c(K[1], this.duration, I.duration)),
              (this.ease = m(K[2], this.ease, I.ease)),
              (this.delay = c(K[3], this.delay, I.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = oe.test(this.name)),
              (this.unit = pe.unit || this.unit || le.defaultUnit),
              (this.angle = pe.angle || this.angle || le.defaultAngle),
              le.fallback || pe.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    J +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? J + y[this.ease][0] : "") +
                    (this.delay ? J + this.delay + "ms" : "")));
          }),
            (l.set = function (S) {
              (S = this.convert(S, this.type)), this.update(S), this.redraw();
            }),
            (l.transition = function (S) {
              (this.active = !0),
                (S = this.convert(S, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  S == "auto" && (S = g.call(this))),
                (this.nextStyle = S);
            }),
            (l.fallback = function (S) {
              var K =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (S = this.convert(S, this.type)),
                this.auto &&
                  (K == "auto" && (K = this.convert(this.get(), this.type)),
                  S == "auto" && (S = g.call(this))),
                (this.tween = new z({
                  from: K,
                  to: S,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return Ve(this.el, this.name);
            }),
            (l.update = function (S) {
              Ee(this.el, this.name, S);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                Ee(this.el, this.name, this.get()));
              var S = this.tween;
              S && S.context && S.destroy();
            }),
            (l.convert = function (S, K) {
              if (S == "auto" && this.auto) return S;
              var te,
                pe = typeof S == "number",
                W = typeof S == "string";
              switch (K) {
                case b:
                  if (pe) return S;
                  if (W && S.replace(N, "") === "") return +S;
                  te = "number(unitless)";
                  break;
                case X:
                  if (W) {
                    if (S === "" && this.original) return this.original;
                    if (K.test(S))
                      return S.charAt(0) == "#" && S.length == 7 ? S : O(S);
                  }
                  te = "hex or rgb string";
                  break;
                case D:
                  if (pe) return S + this.unit;
                  if (W && K.test(S)) return S;
                  te = "number(px) or string(unit)";
                  break;
                case q:
                  if (pe) return S + this.unit;
                  if (W && K.test(S)) return S;
                  te = "number(px) or string(unit or %)";
                  break;
                case V:
                  if (pe) return S + this.angle;
                  if (W && K.test(S)) return S;
                  te = "number(deg) or string(angle)";
                  break;
                case j:
                  if (pe || (W && q.test(S))) return S;
                  te = "number(unitless) or string(unit or %)";
              }
              return s(te, S), S;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        p = h(E, function (l, g) {
          l.init = function () {
            g.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), X));
          };
        }),
        B = h(E, function (l, g) {
          (l.init = function () {
            g.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (m) {
              this.$el[this.name](m);
            });
        }),
        Y = h(E, function (l, g) {
          function m(O, I) {
            var S, K, te, pe, W;
            for (S in O)
              (pe = xe[S]),
                (te = pe[0]),
                (K = pe[1] || S),
                (W = this.convert(O[S], te)),
                I.call(this, K, W, te);
          }
          (l.init = function () {
            g.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                xe.perspective &&
                  le.perspective &&
                  ((this.current.perspective = le.perspective),
                  Ee(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (O) {
              m.call(this, O, function (I, S) {
                this.current[I] = S;
              }),
                Ee(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (O) {
              var I = this.values(O);
              this.tween = new Ae({
                current: this.current,
                values: I,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var S,
                K = {};
              for (S in this.current) K[S] = S in I ? I[S] : this.current[S];
              (this.active = !0), (this.nextStyle = this.style(K));
            }),
            (l.fallback = function (O) {
              var I = this.values(O);
              this.tween = new Ae({
                current: this.current,
                values: I,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              Ee(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (O) {
              var I,
                S = "";
              for (I in O) S += I + "(" + O[I] + ") ";
              return S;
            }),
            (l.values = function (O) {
              var I,
                S = {};
              return (
                m.call(this, O, function (K, te, pe) {
                  (S[K] = te),
                    this.current[K] === void 0 &&
                      ((I = 0),
                      ~K.indexOf("scale") && (I = 1),
                      (this.current[K] = this.convert(I, pe)));
                }),
                S
              );
            });
        }),
        z = h(function (l) {
          function g(W) {
            te.push(W) === 1 && M(m);
          }
          function m() {
            var W,
              ae,
              se,
              Te = te.length;
            if (Te)
              for (M(m), ae = H(), W = Te; W--; )
                (se = te[W]), se && se.render(ae);
          }
          function O(W) {
            var ae,
              se = e.inArray(W, te);
            se >= 0 &&
              ((ae = te.slice(se + 1)),
              (te.length = se),
              ae.length && (te = te.concat(ae)));
          }
          function I(W) {
            return Math.round(W * pe) / pe;
          }
          function S(W, ae, se) {
            return i(
              W[0] + se * (ae[0] - W[0]),
              W[1] + se * (ae[1] - W[1]),
              W[2] + se * (ae[2] - W[2])
            );
          }
          var K = { ease: y.ease[1], from: 0, to: 1 };
          (l.init = function (W) {
            (this.duration = W.duration || 0), (this.delay = W.delay || 0);
            var ae = W.ease || K.ease;
            y[ae] && (ae = y[ae][1]),
              typeof ae != "function" && (ae = K.ease),
              (this.ease = ae),
              (this.update = W.update || o),
              (this.complete = W.complete || o),
              (this.context = W.context || this),
              (this.name = W.name);
            var se = W.from,
              Te = W.to;
            se === void 0 && (se = K.from),
              Te === void 0 && (Te = K.to),
              (this.unit = W.unit || ""),
              typeof se == "number" && typeof Te == "number"
                ? ((this.begin = se), (this.change = Te - se))
                : this.format(Te, se),
              (this.value = this.begin + this.unit),
              (this.start = H()),
              W.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = H()), (this.active = !0), g(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), O(this));
            }),
            (l.render = function (W) {
              var ae,
                se = W - this.start;
              if (this.delay) {
                if (se <= this.delay) return;
                se -= this.delay;
              }
              if (se < this.duration) {
                var Te = this.ease(se, 0, 1, this.duration);
                return (
                  (ae = this.startRGB
                    ? S(this.startRGB, this.endRGB, Te)
                    : I(this.begin + Te * this.change)),
                  (this.value = ae + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ae = this.endHex || this.begin + this.change),
                (this.value = ae + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (W, ae) {
              if (((ae += ""), (W += ""), W.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ae)),
                  (this.endRGB = n(W)),
                  (this.endHex = W),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var se = ae.replace(N, ""),
                  Te = W.replace(N, "");
                se !== Te && a("tween", ae, W), (this.unit = se);
              }
              (ae = parseFloat(ae)),
                (W = parseFloat(W)),
                (this.begin = this.value = ae),
                (this.change = W - ae);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var te = [],
            pe = 1e3;
        }),
        ce = h(z, function (l) {
          (l.init = function (g) {
            (this.duration = g.duration || 0),
              (this.complete = g.complete || o),
              (this.context = g.context),
              this.play();
          }),
            (l.render = function (g) {
              var m = g - this.start;
              m < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Ae = h(z, function (l, g) {
          (l.init = function (m) {
            (this.context = m.context),
              (this.update = m.update),
              (this.tweens = []),
              (this.current = m.current);
            var O, I;
            for (O in m.values)
              (I = m.values[O]),
                this.current[O] !== I &&
                  this.tweens.push(
                    new z({
                      name: O,
                      from: this.current[O],
                      to: I,
                      duration: m.duration,
                      delay: m.delay,
                      ease: m.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (m) {
              var O,
                I,
                S = this.tweens.length,
                K = !1;
              for (O = S; O--; )
                (I = this.tweens[O]),
                  I.context &&
                    (I.render(m), (this.current[I.name] = I.value), (K = !0));
              return K
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((g.destroy.call(this), this.tweens)) {
                var m,
                  O = this.tweens.length;
                for (m = O; m--; ) this.tweens[m].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        le = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !U.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!U.transition) return (le.fallback = !0);
        le.agentTests.push("(" + l + ")");
        var g = new RegExp(le.agentTests.join("|"), "i");
        le.fallback = g.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new z(l);
        }),
        (t.delay = function (l, g, m) {
          return new ce({ complete: g, duration: l, context: m });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var Ee = e.style,
        Ve = e.css,
        We = { transform: U.transform && U.transform.css },
        tt = {
          color: [p, X],
          background: [p, X, "background-color"],
          "outline-color": [p, X],
          "border-color": [p, X],
          "border-top-color": [p, X],
          "border-right-color": [p, X],
          "border-bottom-color": [p, X],
          "border-left-color": [p, X],
          "border-width": [E, D],
          "border-top-width": [E, D],
          "border-right-width": [E, D],
          "border-bottom-width": [E, D],
          "border-left-width": [E, D],
          "border-spacing": [E, D],
          "letter-spacing": [E, D],
          margin: [E, D],
          "margin-top": [E, D],
          "margin-right": [E, D],
          "margin-bottom": [E, D],
          "margin-left": [E, D],
          padding: [E, D],
          "padding-top": [E, D],
          "padding-right": [E, D],
          "padding-bottom": [E, D],
          "padding-left": [E, D],
          "outline-width": [E, D],
          opacity: [E, b],
          top: [E, q],
          right: [E, q],
          bottom: [E, q],
          left: [E, q],
          "font-size": [E, q],
          "text-indent": [E, q],
          "word-spacing": [E, q],
          width: [E, q],
          "min-width": [E, q],
          "max-width": [E, q],
          height: [E, q],
          "min-height": [E, q],
          "max-height": [E, q],
          "line-height": [E, j],
          "scroll-top": [B, b, "scrollTop"],
          "scroll-left": [B, b, "scrollLeft"],
        },
        xe = {};
      U.transform &&
        ((tt.transform = [Y]),
        (xe = {
          x: [q, "translateX"],
          y: [q, "translateY"],
          rotate: [V],
          rotateX: [V],
          rotateY: [V],
          scale: [b],
          scaleX: [b],
          scaleY: [b],
          skew: [V],
          skewX: [V],
          skewY: [V],
        })),
        U.transform &&
          U.backface &&
          ((xe.z = [q, "translateZ"]),
          (xe.rotateZ = [V]),
          (xe.scaleZ = [b]),
          (xe.perspective = [D]));
      var ht = /ms/,
        kt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Is = u((nW, ys) => {
    var sI = window.$,
      uI = Pi() && sI.tram;
    ys.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        c = n.toString,
        d = n.hasOwnProperty,
        _ = r.forEach,
        h = r.map,
        y = r.reduce,
        A = r.reduceRight,
        C = r.filter,
        w = r.every,
        L = r.some,
        N = r.indexOf,
        x = r.lastIndexOf,
        b = Array.isArray,
        X = Object.keys,
        D = i.bind,
        q =
          (e.each =
          e.forEach =
            function (T, P, G) {
              if (T == null) return T;
              if (_ && T.forEach === _) T.forEach(P, G);
              else if (T.length === +T.length) {
                for (var U = 0, Q = T.length; U < Q; U++)
                  if (P.call(G, T[U], U, T) === t) return;
              } else
                for (var ee = e.keys(T), U = 0, Q = ee.length; U < Q; U++)
                  if (P.call(G, T[ee[U]], ee[U], T) === t) return;
              return T;
            });
      (e.map = e.collect =
        function (T, P, G) {
          var U = [];
          return T == null
            ? U
            : h && T.map === h
            ? T.map(P, G)
            : (q(T, function (Q, ee, M) {
                U.push(P.call(G, Q, ee, M));
              }),
              U);
        }),
        (e.find = e.detect =
          function (T, P, G) {
            var U;
            return (
              V(T, function (Q, ee, M) {
                if (P.call(G, Q, ee, M)) return (U = Q), !0;
              }),
              U
            );
          }),
        (e.filter = e.select =
          function (T, P, G) {
            var U = [];
            return T == null
              ? U
              : C && T.filter === C
              ? T.filter(P, G)
              : (q(T, function (Q, ee, M) {
                  P.call(G, Q, ee, M) && U.push(Q);
                }),
                U);
          });
      var V =
        (e.some =
        e.any =
          function (T, P, G) {
            P || (P = e.identity);
            var U = !1;
            return T == null
              ? U
              : L && T.some === L
              ? T.some(P, G)
              : (q(T, function (Q, ee, M) {
                  if (U || (U = P.call(G, Q, ee, M))) return t;
                }),
                !!U);
          });
      (e.contains = e.include =
        function (T, P) {
          return T == null
            ? !1
            : N && T.indexOf === N
            ? T.indexOf(P) != -1
            : V(T, function (G) {
                return G === P;
              });
        }),
        (e.delay = function (T, P) {
          var G = s.call(arguments, 2);
          return setTimeout(function () {
            return T.apply(null, G);
          }, P);
        }),
        (e.defer = function (T) {
          return e.delay.apply(e, [T, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (T) {
          var P, G, U;
          return function () {
            P ||
              ((P = !0),
              (G = arguments),
              (U = this),
              uI.frame(function () {
                (P = !1), T.apply(U, G);
              }));
          };
        }),
        (e.debounce = function (T, P, G) {
          var U,
            Q,
            ee,
            M,
            H,
            f = function () {
              var v = e.now() - M;
              v < P
                ? (U = setTimeout(f, P - v))
                : ((U = null), G || ((H = T.apply(ee, Q)), (ee = Q = null)));
            };
          return function () {
            (ee = this), (Q = arguments), (M = e.now());
            var v = G && !U;
            return (
              U || (U = setTimeout(f, P)),
              v && ((H = T.apply(ee, Q)), (ee = Q = null)),
              H
            );
          };
        }),
        (e.defaults = function (T) {
          if (!e.isObject(T)) return T;
          for (var P = 1, G = arguments.length; P < G; P++) {
            var U = arguments[P];
            for (var Q in U) T[Q] === void 0 && (T[Q] = U[Q]);
          }
          return T;
        }),
        (e.keys = function (T) {
          if (!e.isObject(T)) return [];
          if (X) return X(T);
          var P = [];
          for (var G in T) e.has(T, G) && P.push(G);
          return P;
        }),
        (e.has = function (T, P) {
          return d.call(T, P);
        }),
        (e.isObject = function (T) {
          return T === Object(T);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var j = /(.)^/,
        k = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        oe = /\\|'|\r|\n|\u2028|\u2029/g,
        J = function (T) {
          return "\\" + k[T];
        },
        F = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (T, P, G) {
          !P && G && (P = G), (P = e.defaults({}, P, e.templateSettings));
          var U = RegExp(
              [
                (P.escape || j).source,
                (P.interpolate || j).source,
                (P.evaluate || j).source,
              ].join("|") + "|$",
              "g"
            ),
            Q = 0,
            ee = "__p+='";
          T.replace(U, function (v, E, p, B, Y) {
            return (
              (ee += T.slice(Q, Y).replace(oe, J)),
              (Q = Y + v.length),
              E
                ? (ee +=
                    `'+
((__t=(` +
                    E +
                    `))==null?'':_.escape(__t))+
'`)
                : p
                ? (ee +=
                    `'+
((__t=(` +
                    p +
                    `))==null?'':__t)+
'`)
                : B &&
                  (ee +=
                    `';
` +
                    B +
                    `
__p+='`),
              v
            );
          }),
            (ee += `';
`);
          var M = P.variable;
          if (M) {
            if (!F.test(M))
              throw new Error("variable is not a bare identifier: " + M);
          } else
            (ee =
              `with(obj||{}){
` +
              ee +
              `}
`),
              (M = "obj");
          ee =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ee +
            `return __p;
`;
          var H;
          try {
            H = new Function(P.variable || "obj", "_", ee);
          } catch (v) {
            throw ((v.source = ee), v);
          }
          var f = function (v) {
            return H.call(this, v, e);
          };
          return (
            (f.source =
              "function(" +
              M +
              `){
` +
              ee +
              "}"),
            f
          );
        }),
        e
      );
    })();
  });
  var it = u((iW, Rs) => {
    var de = {},
      jt = {},
      Kt = [],
      Di = window.Webflow || [],
      Tt = window.jQuery,
      ze = Tt(window),
      cI = Tt(document),
      nt = Tt.isFunction,
      Ke = (de._ = Is()),
      ms = (de.tram = Pi() && Tt.tram),
      cn = !1,
      Fi = !1;
    ms.config.hideBackface = !1;
    ms.config.keepInherited = !0;
    de.define = function (e, t, r) {
      jt[e] && bs(jt[e]);
      var n = (jt[e] = t(Tt, Ke, r) || {});
      return Os(n), n;
    };
    de.require = function (e) {
      return jt[e];
    };
    function Os(e) {
      de.env() &&
        (nt(e.design) && ze.on("__wf_design", e.design),
        nt(e.preview) && ze.on("__wf_preview", e.preview)),
        nt(e.destroy) && ze.on("__wf_destroy", e.destroy),
        e.ready && nt(e.ready) && lI(e);
    }
    function lI(e) {
      if (cn) {
        e.ready();
        return;
      }
      Ke.contains(Kt, e.ready) || Kt.push(e.ready);
    }
    function bs(e) {
      nt(e.design) && ze.off("__wf_design", e.design),
        nt(e.preview) && ze.off("__wf_preview", e.preview),
        nt(e.destroy) && ze.off("__wf_destroy", e.destroy),
        e.ready && nt(e.ready) && fI(e);
    }
    function fI(e) {
      Kt = Ke.filter(Kt, function (t) {
        return t !== e.ready;
      });
    }
    de.push = function (e) {
      if (cn) {
        nt(e) && e();
        return;
      }
      Di.push(e);
    };
    de.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var un = navigator.userAgent.toLowerCase(),
      Ss = (de.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      dI = (de.env.chrome =
        /chrome/.test(un) &&
        /Google/.test(navigator.vendor) &&
        parseInt(un.match(/chrome\/(\d+)\./)[1], 10)),
      pI = (de.env.ios = /(ipod|iphone|ipad)/.test(un));
    de.env.safari = /safari/.test(un) && !dI && !pI;
    var Mi;
    Ss &&
      cI.on("touchstart mousedown", function (e) {
        Mi = e.target;
      });
    de.validClick = Ss
      ? function (e) {
          return e === Mi || Tt.contains(e, Mi);
        }
      : function () {
          return !0;
        };
    var As = "resize.webflow orientationchange.webflow load.webflow",
      vI = "scroll.webflow " + As;
    de.resize = Gi(ze, As);
    de.scroll = Gi(ze, vI);
    de.redraw = Gi();
    function Gi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ke.throttle(function (i) {
          Ke.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Ke.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ke.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    de.location = function (e) {
      window.location = e;
    };
    de.env() && (de.location = function () {});
    de.ready = function () {
      (cn = !0), Fi ? hI() : Ke.each(Kt, Ts), Ke.each(Di, Ts), de.resize.up();
    };
    function Ts(e) {
      nt(e) && e();
    }
    function hI() {
      (Fi = !1), Ke.each(jt, Os);
    }
    var qt;
    de.load = function (e) {
      qt.then(e);
    };
    function ws() {
      qt && (qt.reject(), ze.off("load", qt.resolve)),
        (qt = new Tt.Deferred()),
        ze.on("load", qt.resolve);
    }
    de.destroy = function (e) {
      (e = e || {}),
        (Fi = !0),
        ze.triggerHandler("__wf_destroy"),
        e.domready != null && (cn = e.domready),
        Ke.each(jt, bs),
        de.resize.off(),
        de.scroll.off(),
        de.redraw.off(),
        (Kt = []),
        (Di = []),
        qt.state() === "pending" && ws();
    };
    Tt(de.ready);
    ws();
    Rs.exports = window.Webflow = de;
  });
  var xs = u((oW, Ns) => {
    var Cs = it();
    Cs.define(
      "brand",
      (Ns.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          c =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          d;
        t.ready = function () {
          var A = n.attr("data-wf-status"),
            C = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(C) && s.hostname !== C && (A = !0),
            A &&
              !a &&
              ((d = d || h()),
              y(),
              setTimeout(y, 500),
              e(r).off(c, _).on(c, _));
        };
        function _() {
          var A =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(d).attr("style", A ? "display: none !important;" : "");
        }
        function h() {
          var A = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            C = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon.f67cd735e3.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "8px", width: "16px" }),
            w = e("<img>")
              .attr(
                "src",
                "https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg"
              )
              .attr("alt", "Made in Webflow");
          return A.append(C, w), A[0];
        }
        function y() {
          var A = i.children(o),
            C = A.length && A.get(0) === d,
            w = Cs.env("editor");
          if (C) {
            w && A.remove();
            return;
          }
          A.length && A.remove(), w || i.append(d);
        }
        return t;
      })
    );
  });
  var Ls = u((aW, qs) => {
    var EI = it();
    EI.define(
      "focus-visible",
      (qs.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(b) {
            return !!(
              b &&
              b !== document &&
              b.nodeName !== "HTML" &&
              b.nodeName !== "BODY" &&
              "classList" in b &&
              "contains" in b.classList
            );
          }
          function c(b) {
            var X = b.type,
              D = b.tagName;
            return !!(
              (D === "INPUT" && s[X] && !b.readOnly) ||
              (D === "TEXTAREA" && !b.readOnly) ||
              b.isContentEditable
            );
          }
          function d(b) {
            b.getAttribute("data-wf-focus-visible") ||
              b.setAttribute("data-wf-focus-visible", "true");
          }
          function _(b) {
            b.getAttribute("data-wf-focus-visible") &&
              b.removeAttribute("data-wf-focus-visible");
          }
          function h(b) {
            b.metaKey ||
              b.altKey ||
              b.ctrlKey ||
              (a(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function y() {
            n = !1;
          }
          function A(b) {
            a(b.target) && (n || c(b.target)) && d(b.target);
          }
          function C(b) {
            a(b.target) &&
              b.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              _(b.target));
          }
          function w() {
            document.visibilityState === "hidden" && (i && (n = !0), L());
          }
          function L() {
            document.addEventListener("mousemove", x),
              document.addEventListener("mousedown", x),
              document.addEventListener("mouseup", x),
              document.addEventListener("pointermove", x),
              document.addEventListener("pointerdown", x),
              document.addEventListener("pointerup", x),
              document.addEventListener("touchmove", x),
              document.addEventListener("touchstart", x),
              document.addEventListener("touchend", x);
          }
          function N() {
            document.removeEventListener("mousemove", x),
              document.removeEventListener("mousedown", x),
              document.removeEventListener("mouseup", x),
              document.removeEventListener("pointermove", x),
              document.removeEventListener("pointerdown", x),
              document.removeEventListener("pointerup", x),
              document.removeEventListener("touchmove", x),
              document.removeEventListener("touchstart", x),
              document.removeEventListener("touchend", x);
          }
          function x(b) {
            (b.target.nodeName && b.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), N());
          }
          document.addEventListener("keydown", h, !0),
            document.addEventListener("mousedown", y, !0),
            document.addEventListener("pointerdown", y, !0),
            document.addEventListener("touchstart", y, !0),
            document.addEventListener("visibilitychange", w, !0),
            L(),
            r.addEventListener("focus", A, !0),
            r.addEventListener("blur", C, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Ds = u((sW, Ms) => {
    var Ps = it();
    Ps.define(
      "focus",
      (Ms.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            c = a.tagName;
          return (
            (/^a$/i.test(c) && a.href != null) ||
            (/^(button|textarea)$/i.test(c) && a.disabled !== !0) ||
            (/^input$/i.test(c) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(c) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(c) ||
            (/^video$/i.test(c) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Ps.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var Xs = u((uW, Gs) => {
    "use strict";
    var Xi = window.jQuery,
      ot = {},
      ln = [],
      Fs = ".w-ix",
      fn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Xi(t).triggerHandler(ot.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Xi(t).triggerHandler(ot.types.OUTRO));
        },
      };
    ot.triggers = {};
    ot.types = { INTRO: "w-ix-intro" + Fs, OUTRO: "w-ix-outro" + Fs };
    ot.init = function () {
      for (var e = ln.length, t = 0; t < e; t++) {
        var r = ln[t];
        r[0](0, r[1]);
      }
      (ln = []), Xi.extend(ot.triggers, fn);
    };
    ot.async = function () {
      for (var e in fn) {
        var t = fn[e];
        fn.hasOwnProperty(e) &&
          (ot.triggers[e] = function (r, n) {
            ln.push([t, n]);
          });
      }
    };
    ot.async();
    Gs.exports = ot;
  });
  var Vi = u((cW, Ws) => {
    "use strict";
    var Ui = Xs();
    function Us(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var gI = window.jQuery,
      dn = {},
      Vs = ".w-ix",
      _I = {
        reset: function (e, t) {
          Ui.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Ui.triggers.intro(e, t), Us(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Ui.triggers.outro(e, t), Us(t, "COMPONENT_INACTIVE");
        },
      };
    dn.triggers = {};
    dn.types = { INTRO: "w-ix-intro" + Vs, OUTRO: "w-ix-outro" + Vs };
    gI.extend(dn.triggers, _I);
    Ws.exports = dn;
  });
  var Bs = u((lW, Et) => {
    function Wi(e) {
      return (
        (Et.exports = Wi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (Et.exports.__esModule = !0),
        (Et.exports.default = Et.exports),
        Wi(e)
      );
    }
    (Et.exports = Wi),
      (Et.exports.__esModule = !0),
      (Et.exports.default = Et.exports);
  });
  var zt = u((fW, br) => {
    var yI = Bs().default;
    function Hs(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (Hs = function (i) {
        return i ? r : t;
      })(e);
    }
    function II(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (yI(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = Hs(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (br.exports = II),
      (br.exports.__esModule = !0),
      (br.exports.default = br.exports);
  });
  var at = u((dW, Sr) => {
    function TI(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Sr.exports = TI),
      (Sr.exports.__esModule = !0),
      (Sr.exports.default = Sr.exports);
  });
  var ge = u((pW, ks) => {
    var pn = function (e) {
      return e && e.Math == Math && e;
    };
    ks.exports =
      pn(typeof globalThis == "object" && globalThis) ||
      pn(typeof window == "object" && window) ||
      pn(typeof self == "object" && self) ||
      pn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Yt = u((vW, js) => {
    js.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Lt = u((hW, Ks) => {
    var mI = Yt();
    Ks.exports = !mI(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var vn = u((EW, zs) => {
    var Ar = Function.prototype.call;
    zs.exports = Ar.bind
      ? Ar.bind(Ar)
      : function () {
          return Ar.apply(Ar, arguments);
        };
  });
  var Zs = u(($s) => {
    "use strict";
    var Ys = {}.propertyIsEnumerable,
      Qs = Object.getOwnPropertyDescriptor,
      OI = Qs && !Ys.call({ 1: 2 }, 1);
    $s.f = OI
      ? function (t) {
          var r = Qs(this, t);
          return !!r && r.enumerable;
        }
      : Ys;
  });
  var Bi = u((_W, Js) => {
    Js.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Ye = u((yW, tu) => {
    var eu = Function.prototype,
      Hi = eu.bind,
      ki = eu.call,
      bI = Hi && Hi.bind(ki);
    tu.exports = Hi
      ? function (e) {
          return e && bI(ki, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return ki.apply(e, arguments);
            }
          );
        };
  });
  var iu = u((IW, nu) => {
    var ru = Ye(),
      SI = ru({}.toString),
      AI = ru("".slice);
    nu.exports = function (e) {
      return AI(SI(e), 8, -1);
    };
  });
  var au = u((TW, ou) => {
    var wI = ge(),
      RI = Ye(),
      CI = Yt(),
      NI = iu(),
      ji = wI.Object,
      xI = RI("".split);
    ou.exports = CI(function () {
      return !ji("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return NI(e) == "String" ? xI(e, "") : ji(e);
        }
      : ji;
  });
  var Ki = u((mW, su) => {
    var qI = ge(),
      LI = qI.TypeError;
    su.exports = function (e) {
      if (e == null) throw LI("Can't call method on " + e);
      return e;
    };
  });
  var wr = u((OW, uu) => {
    var PI = au(),
      MI = Ki();
    uu.exports = function (e) {
      return PI(MI(e));
    };
  });
  var st = u((bW, cu) => {
    cu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Qt = u((SW, lu) => {
    var DI = st();
    lu.exports = function (e) {
      return typeof e == "object" ? e !== null : DI(e);
    };
  });
  var Rr = u((AW, fu) => {
    var zi = ge(),
      FI = st(),
      GI = function (e) {
        return FI(e) ? e : void 0;
      };
    fu.exports = function (e, t) {
      return arguments.length < 2 ? GI(zi[e]) : zi[e] && zi[e][t];
    };
  });
  var pu = u((wW, du) => {
    var XI = Ye();
    du.exports = XI({}.isPrototypeOf);
  });
  var hu = u((RW, vu) => {
    var UI = Rr();
    vu.exports = UI("navigator", "userAgent") || "";
  });
  var mu = u((CW, Tu) => {
    var Iu = ge(),
      Yi = hu(),
      Eu = Iu.process,
      gu = Iu.Deno,
      _u = (Eu && Eu.versions) || (gu && gu.version),
      yu = _u && _u.v8,
      Qe,
      hn;
    yu &&
      ((Qe = yu.split(".")),
      (hn = Qe[0] > 0 && Qe[0] < 4 ? 1 : +(Qe[0] + Qe[1])));
    !hn &&
      Yi &&
      ((Qe = Yi.match(/Edge\/(\d+)/)),
      (!Qe || Qe[1] >= 74) &&
        ((Qe = Yi.match(/Chrome\/(\d+)/)), Qe && (hn = +Qe[1])));
    Tu.exports = hn;
  });
  var Qi = u((NW, bu) => {
    var Ou = mu(),
      VI = Yt();
    bu.exports =
      !!Object.getOwnPropertySymbols &&
      !VI(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Ou && Ou < 41)
        );
      });
  });
  var $i = u((xW, Su) => {
    var WI = Qi();
    Su.exports = WI && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Zi = u((qW, Au) => {
    var BI = ge(),
      HI = Rr(),
      kI = st(),
      jI = pu(),
      KI = $i(),
      zI = BI.Object;
    Au.exports = KI
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = HI("Symbol");
          return kI(t) && jI(t.prototype, zI(e));
        };
  });
  var Ru = u((LW, wu) => {
    var YI = ge(),
      QI = YI.String;
    wu.exports = function (e) {
      try {
        return QI(e);
      } catch {
        return "Object";
      }
    };
  });
  var Nu = u((PW, Cu) => {
    var $I = ge(),
      ZI = st(),
      JI = Ru(),
      eT = $I.TypeError;
    Cu.exports = function (e) {
      if (ZI(e)) return e;
      throw eT(JI(e) + " is not a function");
    };
  });
  var qu = u((MW, xu) => {
    var tT = Nu();
    xu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : tT(r);
    };
  });
  var Pu = u((DW, Lu) => {
    var rT = ge(),
      Ji = vn(),
      eo = st(),
      to = Qt(),
      nT = rT.TypeError;
    Lu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && eo((r = e.toString)) && !to((n = Ji(r, e)))) ||
        (eo((r = e.valueOf)) && !to((n = Ji(r, e)))) ||
        (t !== "string" && eo((r = e.toString)) && !to((n = Ji(r, e))))
      )
        return n;
      throw nT("Can't convert object to primitive value");
    };
  });
  var Du = u((FW, Mu) => {
    Mu.exports = !1;
  });
  var En = u((GW, Gu) => {
    var Fu = ge(),
      iT = Object.defineProperty;
    Gu.exports = function (e, t) {
      try {
        iT(Fu, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Fu[e] = t;
      }
      return t;
    };
  });
  var gn = u((XW, Uu) => {
    var oT = ge(),
      aT = En(),
      Xu = "__core-js_shared__",
      sT = oT[Xu] || aT(Xu, {});
    Uu.exports = sT;
  });
  var ro = u((UW, Wu) => {
    var uT = Du(),
      Vu = gn();
    (Wu.exports = function (e, t) {
      return Vu[e] || (Vu[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: uT ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var Hu = u((VW, Bu) => {
    var cT = ge(),
      lT = Ki(),
      fT = cT.Object;
    Bu.exports = function (e) {
      return fT(lT(e));
    };
  });
  var mt = u((WW, ku) => {
    var dT = Ye(),
      pT = Hu(),
      vT = dT({}.hasOwnProperty);
    ku.exports =
      Object.hasOwn ||
      function (t, r) {
        return vT(pT(t), r);
      };
  });
  var no = u((BW, ju) => {
    var hT = Ye(),
      ET = 0,
      gT = Math.random(),
      _T = hT((1).toString);
    ju.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + _T(++ET + gT, 36);
    };
  });
  var io = u((HW, $u) => {
    var yT = ge(),
      IT = ro(),
      Ku = mt(),
      TT = no(),
      zu = Qi(),
      Qu = $i(),
      $t = IT("wks"),
      Pt = yT.Symbol,
      Yu = Pt && Pt.for,
      mT = Qu ? Pt : (Pt && Pt.withoutSetter) || TT;
    $u.exports = function (e) {
      if (!Ku($t, e) || !(zu || typeof $t[e] == "string")) {
        var t = "Symbol." + e;
        zu && Ku(Pt, e)
          ? ($t[e] = Pt[e])
          : Qu && Yu
          ? ($t[e] = Yu(t))
          : ($t[e] = mT(t));
      }
      return $t[e];
    };
  });
  var tc = u((kW, ec) => {
    var OT = ge(),
      bT = vn(),
      Zu = Qt(),
      Ju = Zi(),
      ST = qu(),
      AT = Pu(),
      wT = io(),
      RT = OT.TypeError,
      CT = wT("toPrimitive");
    ec.exports = function (e, t) {
      if (!Zu(e) || Ju(e)) return e;
      var r = ST(e, CT),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = bT(r, e, t)), !Zu(n) || Ju(n))
        )
          return n;
        throw RT("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), AT(e, t);
    };
  });
  var oo = u((jW, rc) => {
    var NT = tc(),
      xT = Zi();
    rc.exports = function (e) {
      var t = NT(e, "string");
      return xT(t) ? t : t + "";
    };
  });
  var so = u((KW, ic) => {
    var qT = ge(),
      nc = Qt(),
      ao = qT.document,
      LT = nc(ao) && nc(ao.createElement);
    ic.exports = function (e) {
      return LT ? ao.createElement(e) : {};
    };
  });
  var uo = u((zW, oc) => {
    var PT = Lt(),
      MT = Yt(),
      DT = so();
    oc.exports =
      !PT &&
      !MT(function () {
        return (
          Object.defineProperty(DT("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var co = u((sc) => {
    var FT = Lt(),
      GT = vn(),
      XT = Zs(),
      UT = Bi(),
      VT = wr(),
      WT = oo(),
      BT = mt(),
      HT = uo(),
      ac = Object.getOwnPropertyDescriptor;
    sc.f = FT
      ? ac
      : function (t, r) {
          if (((t = VT(t)), (r = WT(r)), HT))
            try {
              return ac(t, r);
            } catch {}
          if (BT(t, r)) return UT(!GT(XT.f, t, r), t[r]);
        };
  });
  var Cr = u((QW, cc) => {
    var uc = ge(),
      kT = Qt(),
      jT = uc.String,
      KT = uc.TypeError;
    cc.exports = function (e) {
      if (kT(e)) return e;
      throw KT(jT(e) + " is not an object");
    };
  });
  var Nr = u((dc) => {
    var zT = ge(),
      YT = Lt(),
      QT = uo(),
      lc = Cr(),
      $T = oo(),
      ZT = zT.TypeError,
      fc = Object.defineProperty;
    dc.f = YT
      ? fc
      : function (t, r, n) {
          if ((lc(t), (r = $T(r)), lc(n), QT))
            try {
              return fc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw ZT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var _n = u((ZW, pc) => {
    var JT = Lt(),
      em = Nr(),
      tm = Bi();
    pc.exports = JT
      ? function (e, t, r) {
          return em.f(e, t, tm(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var fo = u((JW, vc) => {
    var rm = Ye(),
      nm = st(),
      lo = gn(),
      im = rm(Function.toString);
    nm(lo.inspectSource) ||
      (lo.inspectSource = function (e) {
        return im(e);
      });
    vc.exports = lo.inspectSource;
  });
  var gc = u((eB, Ec) => {
    var om = ge(),
      am = st(),
      sm = fo(),
      hc = om.WeakMap;
    Ec.exports = am(hc) && /native code/.test(sm(hc));
  });
  var po = u((tB, yc) => {
    var um = ro(),
      cm = no(),
      _c = um("keys");
    yc.exports = function (e) {
      return _c[e] || (_c[e] = cm(e));
    };
  });
  var yn = u((rB, Ic) => {
    Ic.exports = {};
  });
  var Ac = u((nB, Sc) => {
    var lm = gc(),
      bc = ge(),
      vo = Ye(),
      fm = Qt(),
      dm = _n(),
      ho = mt(),
      Eo = gn(),
      pm = po(),
      vm = yn(),
      Tc = "Object already initialized",
      _o = bc.TypeError,
      hm = bc.WeakMap,
      In,
      xr,
      Tn,
      Em = function (e) {
        return Tn(e) ? xr(e) : In(e, {});
      },
      gm = function (e) {
        return function (t) {
          var r;
          if (!fm(t) || (r = xr(t)).type !== e)
            throw _o("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    lm || Eo.state
      ? ((Ot = Eo.state || (Eo.state = new hm())),
        (mc = vo(Ot.get)),
        (go = vo(Ot.has)),
        (Oc = vo(Ot.set)),
        (In = function (e, t) {
          if (go(Ot, e)) throw new _o(Tc);
          return (t.facade = e), Oc(Ot, e, t), t;
        }),
        (xr = function (e) {
          return mc(Ot, e) || {};
        }),
        (Tn = function (e) {
          return go(Ot, e);
        }))
      : ((Mt = pm("state")),
        (vm[Mt] = !0),
        (In = function (e, t) {
          if (ho(e, Mt)) throw new _o(Tc);
          return (t.facade = e), dm(e, Mt, t), t;
        }),
        (xr = function (e) {
          return ho(e, Mt) ? e[Mt] : {};
        }),
        (Tn = function (e) {
          return ho(e, Mt);
        }));
    var Ot, mc, go, Oc, Mt;
    Sc.exports = { set: In, get: xr, has: Tn, enforce: Em, getterFor: gm };
  });
  var Cc = u((iB, Rc) => {
    var yo = Lt(),
      _m = mt(),
      wc = Function.prototype,
      ym = yo && Object.getOwnPropertyDescriptor,
      Io = _m(wc, "name"),
      Im = Io && function () {}.name === "something",
      Tm = Io && (!yo || (yo && ym(wc, "name").configurable));
    Rc.exports = { EXISTS: Io, PROPER: Im, CONFIGURABLE: Tm };
  });
  var Pc = u((oB, Lc) => {
    var mm = ge(),
      Nc = st(),
      Om = mt(),
      xc = _n(),
      bm = En(),
      Sm = fo(),
      qc = Ac(),
      Am = Cc().CONFIGURABLE,
      wm = qc.get,
      Rm = qc.enforce,
      Cm = String(String).split("String");
    (Lc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        c;
      if (
        (Nc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!Om(r, "name") || (Am && r.name !== a)) && xc(r, "name", a),
          (c = Rm(r)),
          c.source || (c.source = Cm.join(typeof a == "string" ? a : ""))),
        e === mm)
      ) {
        o ? (e[t] = r) : bm(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : xc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Nc(this) && wm(this).source) || Sm(this);
    });
  });
  var To = u((aB, Mc) => {
    var Nm = Math.ceil,
      xm = Math.floor;
    Mc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? xm : Nm)(t);
    };
  });
  var Fc = u((sB, Dc) => {
    var qm = To(),
      Lm = Math.max,
      Pm = Math.min;
    Dc.exports = function (e, t) {
      var r = qm(e);
      return r < 0 ? Lm(r + t, 0) : Pm(r, t);
    };
  });
  var Xc = u((uB, Gc) => {
    var Mm = To(),
      Dm = Math.min;
    Gc.exports = function (e) {
      return e > 0 ? Dm(Mm(e), 9007199254740991) : 0;
    };
  });
  var Vc = u((cB, Uc) => {
    var Fm = Xc();
    Uc.exports = function (e) {
      return Fm(e.length);
    };
  });
  var mo = u((lB, Bc) => {
    var Gm = wr(),
      Xm = Fc(),
      Um = Vc(),
      Wc = function (e) {
        return function (t, r, n) {
          var i = Gm(t),
            o = Um(i),
            s = Xm(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    Bc.exports = { includes: Wc(!0), indexOf: Wc(!1) };
  });
  var bo = u((fB, kc) => {
    var Vm = Ye(),
      Oo = mt(),
      Wm = wr(),
      Bm = mo().indexOf,
      Hm = yn(),
      Hc = Vm([].push);
    kc.exports = function (e, t) {
      var r = Wm(e),
        n = 0,
        i = [],
        o;
      for (o in r) !Oo(Hm, o) && Oo(r, o) && Hc(i, o);
      for (; t.length > n; ) Oo(r, (o = t[n++])) && (~Bm(i, o) || Hc(i, o));
      return i;
    };
  });
  var mn = u((dB, jc) => {
    jc.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var zc = u((Kc) => {
    var km = bo(),
      jm = mn(),
      Km = jm.concat("length", "prototype");
    Kc.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return km(t, Km);
      };
  });
  var Qc = u((Yc) => {
    Yc.f = Object.getOwnPropertySymbols;
  });
  var Zc = u((hB, $c) => {
    var zm = Rr(),
      Ym = Ye(),
      Qm = zc(),
      $m = Qc(),
      Zm = Cr(),
      Jm = Ym([].concat);
    $c.exports =
      zm("Reflect", "ownKeys") ||
      function (t) {
        var r = Qm.f(Zm(t)),
          n = $m.f;
        return n ? Jm(r, n(t)) : r;
      };
  });
  var el = u((EB, Jc) => {
    var eO = mt(),
      tO = Zc(),
      rO = co(),
      nO = Nr();
    Jc.exports = function (e, t) {
      for (var r = tO(t), n = nO.f, i = rO.f, o = 0; o < r.length; o++) {
        var s = r[o];
        eO(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var rl = u((gB, tl) => {
    var iO = Yt(),
      oO = st(),
      aO = /#|\.prototype\./,
      qr = function (e, t) {
        var r = uO[sO(e)];
        return r == lO ? !0 : r == cO ? !1 : oO(t) ? iO(t) : !!t;
      },
      sO = (qr.normalize = function (e) {
        return String(e).replace(aO, ".").toLowerCase();
      }),
      uO = (qr.data = {}),
      cO = (qr.NATIVE = "N"),
      lO = (qr.POLYFILL = "P");
    tl.exports = qr;
  });
  var il = u((_B, nl) => {
    var So = ge(),
      fO = co().f,
      dO = _n(),
      pO = Pc(),
      vO = En(),
      hO = el(),
      EO = rl();
    nl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        c,
        d,
        _;
      if (
        (n
          ? (s = So)
          : i
          ? (s = So[r] || vO(r, {}))
          : (s = (So[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((d = t[a]),
            e.noTargetGet ? ((_ = fO(s, a)), (c = _ && _.value)) : (c = s[a]),
            (o = EO(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && c !== void 0)
          ) {
            if (typeof d == typeof c) continue;
            hO(d, c);
          }
          (e.sham || (c && c.sham)) && dO(d, "sham", !0), pO(s, a, d, e);
        }
    };
  });
  var al = u((yB, ol) => {
    var gO = bo(),
      _O = mn();
    ol.exports =
      Object.keys ||
      function (t) {
        return gO(t, _O);
      };
  });
  var ul = u((IB, sl) => {
    var yO = Lt(),
      IO = Nr(),
      TO = Cr(),
      mO = wr(),
      OO = al();
    sl.exports = yO
      ? Object.defineProperties
      : function (t, r) {
          TO(t);
          for (var n = mO(r), i = OO(r), o = i.length, s = 0, a; o > s; )
            IO.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var ll = u((TB, cl) => {
    var bO = Rr();
    cl.exports = bO("document", "documentElement");
  });
  var _l = u((mB, gl) => {
    var SO = Cr(),
      AO = ul(),
      fl = mn(),
      wO = yn(),
      RO = ll(),
      CO = so(),
      NO = po(),
      dl = ">",
      pl = "<",
      wo = "prototype",
      Ro = "script",
      hl = NO("IE_PROTO"),
      Ao = function () {},
      El = function (e) {
        return pl + Ro + dl + e + pl + "/" + Ro + dl;
      },
      vl = function (e) {
        e.write(El("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      xO = function () {
        var e = CO("iframe"),
          t = "java" + Ro + ":",
          r;
        return (
          (e.style.display = "none"),
          RO.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(El("document.F=Object")),
          r.close(),
          r.F
        );
      },
      On,
      bn = function () {
        try {
          On = new ActiveXObject("htmlfile");
        } catch {}
        bn =
          typeof document < "u"
            ? document.domain && On
              ? vl(On)
              : xO()
            : vl(On);
        for (var e = fl.length; e--; ) delete bn[wo][fl[e]];
        return bn();
      };
    wO[hl] = !0;
    gl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Ao[wo] = SO(t)), (n = new Ao()), (Ao[wo] = null), (n[hl] = t))
            : (n = bn()),
          r === void 0 ? n : AO(n, r)
        );
      };
  });
  var Il = u((OB, yl) => {
    var qO = io(),
      LO = _l(),
      PO = Nr(),
      Co = qO("unscopables"),
      No = Array.prototype;
    No[Co] == null && PO.f(No, Co, { configurable: !0, value: LO(null) });
    yl.exports = function (e) {
      No[Co][e] = !0;
    };
  });
  var Tl = u(() => {
    "use strict";
    var MO = il(),
      DO = mo().includes,
      FO = Il();
    MO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return DO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    FO("includes");
  });
  var Ol = u((AB, ml) => {
    var GO = ge(),
      XO = Ye();
    ml.exports = function (e, t) {
      return XO(GO[e].prototype[t]);
    };
  });
  var Sl = u((wB, bl) => {
    Tl();
    var UO = Ol();
    bl.exports = UO("Array", "includes");
  });
  var wl = u((RB, Al) => {
    var VO = Sl();
    Al.exports = VO;
  });
  var Cl = u((CB, Rl) => {
    var WO = wl();
    Rl.exports = WO;
  });
  var xo = u((NB, Nl) => {
    var BO =
      typeof global == "object" && global && global.Object === Object && global;
    Nl.exports = BO;
  });
  var $e = u((xB, xl) => {
    var HO = xo(),
      kO = typeof self == "object" && self && self.Object === Object && self,
      jO = HO || kO || Function("return this")();
    xl.exports = jO;
  });
  var Zt = u((qB, ql) => {
    var KO = $e(),
      zO = KO.Symbol;
    ql.exports = zO;
  });
  var Dl = u((LB, Ml) => {
    var Ll = Zt(),
      Pl = Object.prototype,
      YO = Pl.hasOwnProperty,
      QO = Pl.toString,
      Lr = Ll ? Ll.toStringTag : void 0;
    function $O(e) {
      var t = YO.call(e, Lr),
        r = e[Lr];
      try {
        e[Lr] = void 0;
        var n = !0;
      } catch {}
      var i = QO.call(e);
      return n && (t ? (e[Lr] = r) : delete e[Lr]), i;
    }
    Ml.exports = $O;
  });
  var Gl = u((PB, Fl) => {
    var ZO = Object.prototype,
      JO = ZO.toString;
    function eb(e) {
      return JO.call(e);
    }
    Fl.exports = eb;
  });
  var bt = u((MB, Vl) => {
    var Xl = Zt(),
      tb = Dl(),
      rb = Gl(),
      nb = "[object Null]",
      ib = "[object Undefined]",
      Ul = Xl ? Xl.toStringTag : void 0;
    function ob(e) {
      return e == null
        ? e === void 0
          ? ib
          : nb
        : Ul && Ul in Object(e)
        ? tb(e)
        : rb(e);
    }
    Vl.exports = ob;
  });
  var qo = u((DB, Wl) => {
    function ab(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    Wl.exports = ab;
  });
  var Lo = u((FB, Bl) => {
    var sb = qo(),
      ub = sb(Object.getPrototypeOf, Object);
    Bl.exports = ub;
  });
  var gt = u((GB, Hl) => {
    function cb(e) {
      return e != null && typeof e == "object";
    }
    Hl.exports = cb;
  });
  var Po = u((XB, jl) => {
    var lb = bt(),
      fb = Lo(),
      db = gt(),
      pb = "[object Object]",
      vb = Function.prototype,
      hb = Object.prototype,
      kl = vb.toString,
      Eb = hb.hasOwnProperty,
      gb = kl.call(Object);
    function _b(e) {
      if (!db(e) || lb(e) != pb) return !1;
      var t = fb(e);
      if (t === null) return !0;
      var r = Eb.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && kl.call(r) == gb;
    }
    jl.exports = _b;
  });
  var Kl = u((Mo) => {
    "use strict";
    Object.defineProperty(Mo, "__esModule", { value: !0 });
    Mo.default = yb;
    function yb(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var zl = u((Fo, Do) => {
    "use strict";
    Object.defineProperty(Fo, "__esModule", { value: !0 });
    var Ib = Kl(),
      Tb = mb(Ib);
    function mb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Jt;
    typeof self < "u"
      ? (Jt = self)
      : typeof window < "u"
      ? (Jt = window)
      : typeof global < "u"
      ? (Jt = global)
      : typeof Do < "u"
      ? (Jt = Do)
      : (Jt = Function("return this")());
    var Ob = (0, Tb.default)(Jt);
    Fo.default = Ob;
  });
  var Go = u((Pr) => {
    "use strict";
    Pr.__esModule = !0;
    Pr.ActionTypes = void 0;
    Pr.default = Zl;
    var bb = Po(),
      Sb = $l(bb),
      Ab = zl(),
      Yl = $l(Ab);
    function $l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Ql = (Pr.ActionTypes = { INIT: "@@redux/INIT" });
    function Zl(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(Zl)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        c = !1;
      function d() {
        a === s && (a = s.slice());
      }
      function _() {
        return o;
      }
      function h(w) {
        if (typeof w != "function")
          throw new Error("Expected listener to be a function.");
        var L = !0;
        return (
          d(),
          a.push(w),
          function () {
            if (L) {
              (L = !1), d();
              var x = a.indexOf(w);
              a.splice(x, 1);
            }
          }
        );
      }
      function y(w) {
        if (!(0, Sb.default)(w))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof w.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0), (o = i(o, w));
        } finally {
          c = !1;
        }
        for (var L = (s = a), N = 0; N < L.length; N++) L[N]();
        return w;
      }
      function A(w) {
        if (typeof w != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = w), y({ type: Ql.INIT });
      }
      function C() {
        var w,
          L = h;
        return (
          (w = {
            subscribe: function (x) {
              if (typeof x != "object")
                throw new TypeError("Expected the observer to be an object.");
              function b() {
                x.next && x.next(_());
              }
              b();
              var X = L(b);
              return { unsubscribe: X };
            },
          }),
          (w[Yl.default] = function () {
            return this;
          }),
          w
        );
      }
      return (
        y({ type: Ql.INIT }),
        (n = { dispatch: y, subscribe: h, getState: _, replaceReducer: A }),
        (n[Yl.default] = C),
        n
      );
    }
  });
  var Uo = u((Xo) => {
    "use strict";
    Xo.__esModule = !0;
    Xo.default = wb;
    function wb(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var tf = u((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = qb;
    var Jl = Go(),
      Rb = Po(),
      BB = ef(Rb),
      Cb = Uo(),
      HB = ef(Cb);
    function ef(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Nb(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function xb(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: Jl.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                Jl.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function qb(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        xb(r);
      } catch (c) {
        a = c;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          _ = arguments[1];
        if (a) throw a;
        if (!1) var h;
        for (var y = !1, A = {}, C = 0; C < o.length; C++) {
          var w = o[C],
            L = r[w],
            N = d[w],
            x = L(N, _);
          if (typeof x > "u") {
            var b = Nb(w, _);
            throw new Error(b);
          }
          (A[w] = x), (y = y || x !== N);
        }
        return y ? A : d;
      };
    }
  });
  var nf = u((Wo) => {
    "use strict";
    Wo.__esModule = !0;
    Wo.default = Lb;
    function rf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Lb(e, t) {
      if (typeof e == "function") return rf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = rf(s, t));
      }
      return n;
    }
  });
  var Ho = u((Bo) => {
    "use strict";
    Bo.__esModule = !0;
    Bo.default = Pb;
    function Pb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var of = u((ko) => {
    "use strict";
    ko.__esModule = !0;
    var Mb =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    ko.default = Xb;
    var Db = Ho(),
      Fb = Gb(Db);
    function Gb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Xb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            c = a.dispatch,
            d = [],
            _ = {
              getState: a.getState,
              dispatch: function (y) {
                return c(y);
              },
            };
          return (
            (d = t.map(function (h) {
              return h(_);
            })),
            (c = Fb.default.apply(void 0, d)(a.dispatch)),
            Mb({}, a, { dispatch: c })
          );
        };
      };
    }
  });
  var jo = u((Be) => {
    "use strict";
    Be.__esModule = !0;
    Be.compose =
      Be.applyMiddleware =
      Be.bindActionCreators =
      Be.combineReducers =
      Be.createStore =
        void 0;
    var Ub = Go(),
      Vb = er(Ub),
      Wb = tf(),
      Bb = er(Wb),
      Hb = nf(),
      kb = er(Hb),
      jb = of(),
      Kb = er(jb),
      zb = Ho(),
      Yb = er(zb),
      Qb = Uo(),
      YB = er(Qb);
    function er(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Be.createStore = Vb.default;
    Be.combineReducers = Bb.default;
    Be.bindActionCreators = kb.default;
    Be.applyMiddleware = Kb.default;
    Be.compose = Yb.default;
  });
  var af = u((we) => {
    "use strict";
    Object.defineProperty(we, "__esModule", { value: !0 });
    we.QuickEffectIds =
      we.QuickEffectDirectionConsts =
      we.EventTypeConsts =
      we.EventLimitAffectedElements =
      we.EventContinuousMouseAxes =
      we.EventBasedOn =
      we.EventAppliesTo =
        void 0;
    var $b = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    };
    we.EventTypeConsts = $b;
    var Zb = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
    we.EventAppliesTo = Zb;
    var Jb = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
    we.EventBasedOn = Jb;
    var eS = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
    we.EventContinuousMouseAxes = eS;
    var tS = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
    };
    we.EventLimitAffectedElements = tS;
    var rS = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
    };
    we.QuickEffectIds = rS;
    var nS = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
    };
    we.QuickEffectDirectionConsts = nS;
  });
  var Ko = u((tr) => {
    "use strict";
    Object.defineProperty(tr, "__esModule", { value: !0 });
    tr.ActionTypeConsts = tr.ActionAppliesTo = void 0;
    var iS = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    };
    tr.ActionTypeConsts = iS;
    var oS = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
    };
    tr.ActionAppliesTo = oS;
  });
  var sf = u((Sn) => {
    "use strict";
    Object.defineProperty(Sn, "__esModule", { value: !0 });
    Sn.InteractionTypeConsts = void 0;
    var aS = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
    Sn.InteractionTypeConsts = aS;
  });
  var uf = u((An) => {
    "use strict";
    Object.defineProperty(An, "__esModule", { value: !0 });
    An.ReducedMotionTypes = void 0;
    var sS = Ko(),
      {
        TRANSFORM_MOVE: uS,
        TRANSFORM_SCALE: cS,
        TRANSFORM_ROTATE: lS,
        TRANSFORM_SKEW: fS,
        STYLE_SIZE: dS,
        STYLE_FILTER: pS,
        STYLE_FONT_VARIATION: vS,
      } = sS.ActionTypeConsts,
      hS = {
        [uS]: !0,
        [cS]: !0,
        [lS]: !0,
        [fS]: !0,
        [dS]: !0,
        [pS]: !0,
        [vS]: !0,
      };
    An.ReducedMotionTypes = hS;
  });
  var cf = u((ne) => {
    "use strict";
    Object.defineProperty(ne, "__esModule", { value: !0 });
    ne.IX2_VIEWPORT_WIDTH_CHANGED =
      ne.IX2_TEST_FRAME_RENDERED =
      ne.IX2_STOP_REQUESTED =
      ne.IX2_SESSION_STOPPED =
      ne.IX2_SESSION_STARTED =
      ne.IX2_SESSION_INITIALIZED =
      ne.IX2_RAW_DATA_IMPORTED =
      ne.IX2_PREVIEW_REQUESTED =
      ne.IX2_PLAYBACK_REQUESTED =
      ne.IX2_PARAMETER_CHANGED =
      ne.IX2_MEDIA_QUERIES_DEFINED =
      ne.IX2_INSTANCE_STARTED =
      ne.IX2_INSTANCE_REMOVED =
      ne.IX2_INSTANCE_ADDED =
      ne.IX2_EVENT_STATE_CHANGED =
      ne.IX2_EVENT_LISTENER_ADDED =
      ne.IX2_ELEMENT_STATE_CHANGED =
      ne.IX2_CLEAR_REQUESTED =
      ne.IX2_ANIMATION_FRAME_CHANGED =
      ne.IX2_ACTION_LIST_PLAYBACK_CHANGED =
        void 0;
    var ES = "IX2_RAW_DATA_IMPORTED";
    ne.IX2_RAW_DATA_IMPORTED = ES;
    var gS = "IX2_SESSION_INITIALIZED";
    ne.IX2_SESSION_INITIALIZED = gS;
    var _S = "IX2_SESSION_STARTED";
    ne.IX2_SESSION_STARTED = _S;
    var yS = "IX2_SESSION_STOPPED";
    ne.IX2_SESSION_STOPPED = yS;
    var IS = "IX2_PREVIEW_REQUESTED";
    ne.IX2_PREVIEW_REQUESTED = IS;
    var TS = "IX2_PLAYBACK_REQUESTED";
    ne.IX2_PLAYBACK_REQUESTED = TS;
    var mS = "IX2_STOP_REQUESTED";
    ne.IX2_STOP_REQUESTED = mS;
    var OS = "IX2_CLEAR_REQUESTED";
    ne.IX2_CLEAR_REQUESTED = OS;
    var bS = "IX2_EVENT_LISTENER_ADDED";
    ne.IX2_EVENT_LISTENER_ADDED = bS;
    var SS = "IX2_EVENT_STATE_CHANGED";
    ne.IX2_EVENT_STATE_CHANGED = SS;
    var AS = "IX2_ANIMATION_FRAME_CHANGED";
    ne.IX2_ANIMATION_FRAME_CHANGED = AS;
    var wS = "IX2_PARAMETER_CHANGED";
    ne.IX2_PARAMETER_CHANGED = wS;
    var RS = "IX2_INSTANCE_ADDED";
    ne.IX2_INSTANCE_ADDED = RS;
    var CS = "IX2_INSTANCE_STARTED";
    ne.IX2_INSTANCE_STARTED = CS;
    var NS = "IX2_INSTANCE_REMOVED";
    ne.IX2_INSTANCE_REMOVED = NS;
    var xS = "IX2_ELEMENT_STATE_CHANGED";
    ne.IX2_ELEMENT_STATE_CHANGED = xS;
    var qS = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
    ne.IX2_ACTION_LIST_PLAYBACK_CHANGED = qS;
    var LS = "IX2_VIEWPORT_WIDTH_CHANGED";
    ne.IX2_VIEWPORT_WIDTH_CHANGED = LS;
    var PS = "IX2_MEDIA_QUERIES_DEFINED";
    ne.IX2_MEDIA_QUERIES_DEFINED = PS;
    var MS = "IX2_TEST_FRAME_RENDERED";
    ne.IX2_TEST_FRAME_RENDERED = MS;
  });
  var lf = u((R) => {
    "use strict";
    Object.defineProperty(R, "__esModule", { value: !0 });
    R.W_MOD_JS =
      R.W_MOD_IX =
      R.WILL_CHANGE =
      R.WIDTH =
      R.WF_PAGE =
      R.TRANSLATE_Z =
      R.TRANSLATE_Y =
      R.TRANSLATE_X =
      R.TRANSLATE_3D =
      R.TRANSFORM =
      R.SKEW_Y =
      R.SKEW_X =
      R.SKEW =
      R.SIBLINGS =
      R.SCALE_Z =
      R.SCALE_Y =
      R.SCALE_X =
      R.SCALE_3D =
      R.ROTATE_Z =
      R.ROTATE_Y =
      R.ROTATE_X =
      R.RENDER_TRANSFORM =
      R.RENDER_STYLE =
      R.RENDER_PLUGIN =
      R.RENDER_GENERAL =
      R.PRESERVE_3D =
      R.PLAIN_OBJECT =
      R.PARENT =
      R.OPACITY =
      R.IX2_ID_DELIMITER =
      R.IMMEDIATE_CHILDREN =
      R.HTML_ELEMENT =
      R.HEIGHT =
      R.FONT_VARIATION_SETTINGS =
      R.FLEX =
      R.FILTER =
      R.DISPLAY =
      R.CONFIG_Z_VALUE =
      R.CONFIG_Z_UNIT =
      R.CONFIG_Y_VALUE =
      R.CONFIG_Y_UNIT =
      R.CONFIG_X_VALUE =
      R.CONFIG_X_UNIT =
      R.CONFIG_VALUE =
      R.CONFIG_UNIT =
      R.COMMA_DELIMITER =
      R.COLOR =
      R.COLON_DELIMITER =
      R.CHILDREN =
      R.BOUNDARY_SELECTOR =
      R.BORDER_COLOR =
      R.BAR_DELIMITER =
      R.BACKGROUND_COLOR =
      R.BACKGROUND =
      R.AUTO =
      R.ABSTRACT_NODE =
        void 0;
    var DS = "|";
    R.IX2_ID_DELIMITER = DS;
    var FS = "data-wf-page";
    R.WF_PAGE = FS;
    var GS = "w-mod-js";
    R.W_MOD_JS = GS;
    var XS = "w-mod-ix";
    R.W_MOD_IX = XS;
    var US = ".w-dyn-item";
    R.BOUNDARY_SELECTOR = US;
    var VS = "xValue";
    R.CONFIG_X_VALUE = VS;
    var WS = "yValue";
    R.CONFIG_Y_VALUE = WS;
    var BS = "zValue";
    R.CONFIG_Z_VALUE = BS;
    var HS = "value";
    R.CONFIG_VALUE = HS;
    var kS = "xUnit";
    R.CONFIG_X_UNIT = kS;
    var jS = "yUnit";
    R.CONFIG_Y_UNIT = jS;
    var KS = "zUnit";
    R.CONFIG_Z_UNIT = KS;
    var zS = "unit";
    R.CONFIG_UNIT = zS;
    var YS = "transform";
    R.TRANSFORM = YS;
    var QS = "translateX";
    R.TRANSLATE_X = QS;
    var $S = "translateY";
    R.TRANSLATE_Y = $S;
    var ZS = "translateZ";
    R.TRANSLATE_Z = ZS;
    var JS = "translate3d";
    R.TRANSLATE_3D = JS;
    var eA = "scaleX";
    R.SCALE_X = eA;
    var tA = "scaleY";
    R.SCALE_Y = tA;
    var rA = "scaleZ";
    R.SCALE_Z = rA;
    var nA = "scale3d";
    R.SCALE_3D = nA;
    var iA = "rotateX";
    R.ROTATE_X = iA;
    var oA = "rotateY";
    R.ROTATE_Y = oA;
    var aA = "rotateZ";
    R.ROTATE_Z = aA;
    var sA = "skew";
    R.SKEW = sA;
    var uA = "skewX";
    R.SKEW_X = uA;
    var cA = "skewY";
    R.SKEW_Y = cA;
    var lA = "opacity";
    R.OPACITY = lA;
    var fA = "filter";
    R.FILTER = fA;
    var dA = "font-variation-settings";
    R.FONT_VARIATION_SETTINGS = dA;
    var pA = "width";
    R.WIDTH = pA;
    var vA = "height";
    R.HEIGHT = vA;
    var hA = "backgroundColor";
    R.BACKGROUND_COLOR = hA;
    var EA = "background";
    R.BACKGROUND = EA;
    var gA = "borderColor";
    R.BORDER_COLOR = gA;
    var _A = "color";
    R.COLOR = _A;
    var yA = "display";
    R.DISPLAY = yA;
    var IA = "flex";
    R.FLEX = IA;
    var TA = "willChange";
    R.WILL_CHANGE = TA;
    var mA = "AUTO";
    R.AUTO = mA;
    var OA = ",";
    R.COMMA_DELIMITER = OA;
    var bA = ":";
    R.COLON_DELIMITER = bA;
    var SA = "|";
    R.BAR_DELIMITER = SA;
    var AA = "CHILDREN";
    R.CHILDREN = AA;
    var wA = "IMMEDIATE_CHILDREN";
    R.IMMEDIATE_CHILDREN = wA;
    var RA = "SIBLINGS";
    R.SIBLINGS = RA;
    var CA = "PARENT";
    R.PARENT = CA;
    var NA = "preserve-3d";
    R.PRESERVE_3D = NA;
    var xA = "HTML_ELEMENT";
    R.HTML_ELEMENT = xA;
    var qA = "PLAIN_OBJECT";
    R.PLAIN_OBJECT = qA;
    var LA = "ABSTRACT_NODE";
    R.ABSTRACT_NODE = LA;
    var PA = "RENDER_TRANSFORM";
    R.RENDER_TRANSFORM = PA;
    var MA = "RENDER_GENERAL";
    R.RENDER_GENERAL = MA;
    var DA = "RENDER_STYLE";
    R.RENDER_STYLE = DA;
    var FA = "RENDER_PLUGIN";
    R.RENDER_PLUGIN = FA;
  });
  var Ge = u((Oe) => {
    "use strict";
    var ff = zt().default;
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    var wn = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
    Oe.IX2EngineConstants = Oe.IX2EngineActionTypes = void 0;
    var zo = af();
    Object.keys(zo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Oe && Oe[e] === zo[e]) ||
        Object.defineProperty(Oe, e, {
          enumerable: !0,
          get: function () {
            return zo[e];
          },
        });
    });
    var Yo = Ko();
    Object.keys(Yo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Oe && Oe[e] === Yo[e]) ||
        Object.defineProperty(Oe, e, {
          enumerable: !0,
          get: function () {
            return Yo[e];
          },
        });
    });
    var Qo = sf();
    Object.keys(Qo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Oe && Oe[e] === Qo[e]) ||
        Object.defineProperty(Oe, e, {
          enumerable: !0,
          get: function () {
            return Qo[e];
          },
        });
    });
    var $o = uf();
    Object.keys($o).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Oe && Oe[e] === $o[e]) ||
        Object.defineProperty(Oe, e, {
          enumerable: !0,
          get: function () {
            return $o[e];
          },
        });
    });
    var GA = ff(cf());
    Oe.IX2EngineActionTypes = GA;
    var XA = ff(lf());
    Oe.IX2EngineConstants = XA;
  });
  var df = u((Rn) => {
    "use strict";
    Object.defineProperty(Rn, "__esModule", { value: !0 });
    Rn.ixData = void 0;
    var UA = Ge(),
      { IX2_RAW_DATA_IMPORTED: VA } = UA.IX2EngineActionTypes,
      WA = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case VA:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      };
    Rn.ixData = WA;
  });
  var Mr = u((o5, _t) => {
    function Zo() {
      return (
        (_t.exports = Zo =
          Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
        (_t.exports.__esModule = !0),
        (_t.exports.default = _t.exports),
        Zo.apply(this, arguments)
      );
    }
    (_t.exports = Zo),
      (_t.exports.__esModule = !0),
      (_t.exports.default = _t.exports);
  });
  var rr = u((ye) => {
    "use strict";
    Object.defineProperty(ye, "__esModule", { value: !0 });
    var BA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    ye.clone = Nn;
    ye.addLast = hf;
    ye.addFirst = Ef;
    ye.removeLast = gf;
    ye.removeFirst = _f;
    ye.insert = yf;
    ye.removeAt = If;
    ye.replaceAt = Tf;
    ye.getIn = xn;
    ye.set = qn;
    ye.setIn = Ln;
    ye.update = Of;
    ye.updateIn = bf;
    ye.merge = Sf;
    ye.mergeDeep = Af;
    ye.mergeIn = wf;
    ye.omit = Rf;
    ye.addDefaults = Cf;
    var pf = "INVALID_ARGS";
    function vf(e) {
      throw new Error(e);
    }
    function Jo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var HA = {}.hasOwnProperty;
    function Nn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Jo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Xe(e, t, r) {
      var n = r;
      n == null && vf(pf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var c = 0; c < s.length; c++) {
        var d = s[c];
        if (d != null) {
          var _ = Jo(d);
          if (_.length)
            for (var h = 0; h <= _.length; h++) {
              var y = _[h];
              if (!(e && n[y] !== void 0)) {
                var A = d[y];
                t && Cn(n[y]) && Cn(A) && (A = Xe(e, t, n[y], A)),
                  !(A === void 0 || A === n[y]) &&
                    (i || ((i = !0), (n = Nn(n))), (n[y] = A));
              }
            }
        }
      }
      return n;
    }
    function Cn(e) {
      var t = typeof e > "u" ? "undefined" : BA(e);
      return e != null && (t === "object" || t === "function");
    }
    function hf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Ef(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function gf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function _f(e) {
      return e.length ? e.slice(1) : e;
    }
    function yf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function If(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Tf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function xn(e, t) {
      if ((!Array.isArray(t) && vf(pf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function qn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Nn(i);
      return (o[t] = r), o;
    }
    function mf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          Cn(e) && Cn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = mf(s, t, r, n + 1);
      }
      return qn(e, o, i);
    }
    function Ln(e, t, r) {
      return t.length ? mf(e, t, r, 0) : r;
    }
    function Of(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return qn(e, t, i);
    }
    function bf(e, t, r) {
      var n = xn(e, t),
        i = r(n);
      return Ln(e, t, i);
    }
    function Sf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? Xe.call.apply(Xe, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : Xe(!1, !1, e, t, r, n, i, o);
    }
    function Af(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? Xe.call.apply(Xe, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : Xe(!1, !0, e, t, r, n, i, o);
    }
    function wf(e, t, r, n, i, o, s) {
      var a = xn(e, t);
      a == null && (a = {});
      for (
        var c = void 0,
          d = arguments.length,
          _ = Array(d > 7 ? d - 7 : 0),
          h = 7;
        h < d;
        h++
      )
        _[h - 7] = arguments[h];
      return (
        _.length
          ? (c = Xe.call.apply(Xe, [null, !1, !1, a, r, n, i, o, s].concat(_)))
          : (c = Xe(!1, !1, a, r, n, i, o, s)),
        Ln(e, t, c)
      );
    }
    function Rf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (HA.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = Jo(e), a = 0; a < s.length; a++) {
        var c = s[a];
        r.indexOf(c) >= 0 || (o[c] = e[c]);
      }
      return o;
    }
    function Cf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), c = 6;
        c < s;
        c++
      )
        a[c - 6] = arguments[c];
      return a.length
        ? Xe.call.apply(Xe, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : Xe(!0, !1, e, t, r, n, i, o);
    }
    var kA = {
      clone: Nn,
      addLast: hf,
      addFirst: Ef,
      removeLast: gf,
      removeFirst: _f,
      insert: yf,
      removeAt: If,
      replaceAt: Tf,
      getIn: xn,
      set: qn,
      setIn: Ln,
      update: Of,
      updateIn: bf,
      merge: Sf,
      mergeDeep: Af,
      mergeIn: wf,
      omit: Rf,
      addDefaults: Cf,
    };
    ye.default = kA;
  });
  var xf = u((Pn) => {
    "use strict";
    var jA = at().default;
    Object.defineProperty(Pn, "__esModule", { value: !0 });
    Pn.ixRequest = void 0;
    var KA = jA(Mr()),
      zA = Ge(),
      YA = rr(),
      {
        IX2_PREVIEW_REQUESTED: QA,
        IX2_PLAYBACK_REQUESTED: $A,
        IX2_STOP_REQUESTED: ZA,
        IX2_CLEAR_REQUESTED: JA,
      } = zA.IX2EngineActionTypes,
      e0 = { preview: {}, playback: {}, stop: {}, clear: {} },
      Nf = Object.create(null, {
        [QA]: { value: "preview" },
        [$A]: { value: "playback" },
        [ZA]: { value: "stop" },
        [JA]: { value: "clear" },
      }),
      t0 = (e = e0, t) => {
        if (t.type in Nf) {
          let r = [Nf[t.type]];
          return (0, YA.setIn)(e, [r], (0, KA.default)({}, t.payload));
        }
        return e;
      };
    Pn.ixRequest = t0;
  });
  var Lf = u((Mn) => {
    "use strict";
    Object.defineProperty(Mn, "__esModule", { value: !0 });
    Mn.ixSession = void 0;
    var r0 = Ge(),
      ut = rr(),
      {
        IX2_SESSION_INITIALIZED: n0,
        IX2_SESSION_STARTED: i0,
        IX2_TEST_FRAME_RENDERED: o0,
        IX2_SESSION_STOPPED: a0,
        IX2_EVENT_LISTENER_ADDED: s0,
        IX2_EVENT_STATE_CHANGED: u0,
        IX2_ANIMATION_FRAME_CHANGED: c0,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: l0,
        IX2_VIEWPORT_WIDTH_CHANGED: f0,
        IX2_MEDIA_QUERIES_DEFINED: d0,
      } = r0.IX2EngineActionTypes,
      qf = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      },
      p0 = 20,
      v0 = (e = qf, t) => {
        switch (t.type) {
          case n0: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, ut.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case i0:
            return (0, ut.set)(e, "active", !0);
          case o0: {
            let {
              payload: { step: r = p0 },
            } = t;
            return (0, ut.set)(e, "tick", e.tick + r);
          }
          case a0:
            return qf;
          case c0: {
            let {
              payload: { now: r },
            } = t;
            return (0, ut.set)(e, "tick", r);
          }
          case s0: {
            let r = (0, ut.addLast)(e.eventListeners, t.payload);
            return (0, ut.set)(e, "eventListeners", r);
          }
          case u0: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, ut.setIn)(e, ["eventState", r], n);
          }
          case l0: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, ut.setIn)(e, ["playbackState", r], n);
          }
          case f0: {
            let { width: r, mediaQueries: n } = t.payload,
              i = n.length,
              o = null;
            for (let s = 0; s < i; s++) {
              let { key: a, min: c, max: d } = n[s];
              if (r >= c && r <= d) {
                o = a;
                break;
              }
            }
            return (0, ut.merge)(e, { viewportWidth: r, mediaQueryKey: o });
          }
          case d0:
            return (0, ut.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      };
    Mn.ixSession = v0;
  });
  var Mf = u((c5, Pf) => {
    function h0() {
      (this.__data__ = []), (this.size = 0);
    }
    Pf.exports = h0;
  });
  var Dn = u((l5, Df) => {
    function E0(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Df.exports = E0;
  });
  var Dr = u((f5, Ff) => {
    var g0 = Dn();
    function _0(e, t) {
      for (var r = e.length; r--; ) if (g0(e[r][0], t)) return r;
      return -1;
    }
    Ff.exports = _0;
  });
  var Xf = u((d5, Gf) => {
    var y0 = Dr(),
      I0 = Array.prototype,
      T0 = I0.splice;
    function m0(e) {
      var t = this.__data__,
        r = y0(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : T0.call(t, r, 1), --this.size, !0;
    }
    Gf.exports = m0;
  });
  var Vf = u((p5, Uf) => {
    var O0 = Dr();
    function b0(e) {
      var t = this.__data__,
        r = O0(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    Uf.exports = b0;
  });
  var Bf = u((v5, Wf) => {
    var S0 = Dr();
    function A0(e) {
      return S0(this.__data__, e) > -1;
    }
    Wf.exports = A0;
  });
  var kf = u((h5, Hf) => {
    var w0 = Dr();
    function R0(e, t) {
      var r = this.__data__,
        n = w0(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Hf.exports = R0;
  });
  var Fr = u((E5, jf) => {
    var C0 = Mf(),
      N0 = Xf(),
      x0 = Vf(),
      q0 = Bf(),
      L0 = kf();
    function nr(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    nr.prototype.clear = C0;
    nr.prototype.delete = N0;
    nr.prototype.get = x0;
    nr.prototype.has = q0;
    nr.prototype.set = L0;
    jf.exports = nr;
  });
  var zf = u((g5, Kf) => {
    var P0 = Fr();
    function M0() {
      (this.__data__ = new P0()), (this.size = 0);
    }
    Kf.exports = M0;
  });
  var Qf = u((_5, Yf) => {
    function D0(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    Yf.exports = D0;
  });
  var Zf = u((y5, $f) => {
    function F0(e) {
      return this.__data__.get(e);
    }
    $f.exports = F0;
  });
  var ed = u((I5, Jf) => {
    function G0(e) {
      return this.__data__.has(e);
    }
    Jf.exports = G0;
  });
  var ct = u((T5, td) => {
    function X0(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    td.exports = X0;
  });
  var ea = u((m5, rd) => {
    var U0 = bt(),
      V0 = ct(),
      W0 = "[object AsyncFunction]",
      B0 = "[object Function]",
      H0 = "[object GeneratorFunction]",
      k0 = "[object Proxy]";
    function j0(e) {
      if (!V0(e)) return !1;
      var t = U0(e);
      return t == B0 || t == H0 || t == W0 || t == k0;
    }
    rd.exports = j0;
  });
  var id = u((O5, nd) => {
    var K0 = $e(),
      z0 = K0["__core-js_shared__"];
    nd.exports = z0;
  });
  var sd = u((b5, ad) => {
    var ta = id(),
      od = (function () {
        var e = /[^.]+$/.exec((ta && ta.keys && ta.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function Y0(e) {
      return !!od && od in e;
    }
    ad.exports = Y0;
  });
  var ra = u((S5, ud) => {
    var Q0 = Function.prototype,
      $0 = Q0.toString;
    function Z0(e) {
      if (e != null) {
        try {
          return $0.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    ud.exports = Z0;
  });
  var ld = u((A5, cd) => {
    var J0 = ea(),
      ew = sd(),
      tw = ct(),
      rw = ra(),
      nw = /[\\^$.*+?()[\]{}|]/g,
      iw = /^\[object .+?Constructor\]$/,
      ow = Function.prototype,
      aw = Object.prototype,
      sw = ow.toString,
      uw = aw.hasOwnProperty,
      cw = RegExp(
        "^" +
          sw
            .call(uw)
            .replace(nw, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function lw(e) {
      if (!tw(e) || ew(e)) return !1;
      var t = J0(e) ? cw : iw;
      return t.test(rw(e));
    }
    cd.exports = lw;
  });
  var dd = u((w5, fd) => {
    function fw(e, t) {
      return e?.[t];
    }
    fd.exports = fw;
  });
  var St = u((R5, pd) => {
    var dw = ld(),
      pw = dd();
    function vw(e, t) {
      var r = pw(e, t);
      return dw(r) ? r : void 0;
    }
    pd.exports = vw;
  });
  var Fn = u((C5, vd) => {
    var hw = St(),
      Ew = $e(),
      gw = hw(Ew, "Map");
    vd.exports = gw;
  });
  var Gr = u((N5, hd) => {
    var _w = St(),
      yw = _w(Object, "create");
    hd.exports = yw;
  });
  var _d = u((x5, gd) => {
    var Ed = Gr();
    function Iw() {
      (this.__data__ = Ed ? Ed(null) : {}), (this.size = 0);
    }
    gd.exports = Iw;
  });
  var Id = u((q5, yd) => {
    function Tw(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    yd.exports = Tw;
  });
  var md = u((L5, Td) => {
    var mw = Gr(),
      Ow = "__lodash_hash_undefined__",
      bw = Object.prototype,
      Sw = bw.hasOwnProperty;
    function Aw(e) {
      var t = this.__data__;
      if (mw) {
        var r = t[e];
        return r === Ow ? void 0 : r;
      }
      return Sw.call(t, e) ? t[e] : void 0;
    }
    Td.exports = Aw;
  });
  var bd = u((P5, Od) => {
    var ww = Gr(),
      Rw = Object.prototype,
      Cw = Rw.hasOwnProperty;
    function Nw(e) {
      var t = this.__data__;
      return ww ? t[e] !== void 0 : Cw.call(t, e);
    }
    Od.exports = Nw;
  });
  var Ad = u((M5, Sd) => {
    var xw = Gr(),
      qw = "__lodash_hash_undefined__";
    function Lw(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = xw && t === void 0 ? qw : t),
        this
      );
    }
    Sd.exports = Lw;
  });
  var Rd = u((D5, wd) => {
    var Pw = _d(),
      Mw = Id(),
      Dw = md(),
      Fw = bd(),
      Gw = Ad();
    function ir(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ir.prototype.clear = Pw;
    ir.prototype.delete = Mw;
    ir.prototype.get = Dw;
    ir.prototype.has = Fw;
    ir.prototype.set = Gw;
    wd.exports = ir;
  });
  var xd = u((F5, Nd) => {
    var Cd = Rd(),
      Xw = Fr(),
      Uw = Fn();
    function Vw() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Cd(),
          map: new (Uw || Xw)(),
          string: new Cd(),
        });
    }
    Nd.exports = Vw;
  });
  var Ld = u((G5, qd) => {
    function Ww(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    qd.exports = Ww;
  });
  var Xr = u((X5, Pd) => {
    var Bw = Ld();
    function Hw(e, t) {
      var r = e.__data__;
      return Bw(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Pd.exports = Hw;
  });
  var Dd = u((U5, Md) => {
    var kw = Xr();
    function jw(e) {
      var t = kw(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Md.exports = jw;
  });
  var Gd = u((V5, Fd) => {
    var Kw = Xr();
    function zw(e) {
      return Kw(this, e).get(e);
    }
    Fd.exports = zw;
  });
  var Ud = u((W5, Xd) => {
    var Yw = Xr();
    function Qw(e) {
      return Yw(this, e).has(e);
    }
    Xd.exports = Qw;
  });
  var Wd = u((B5, Vd) => {
    var $w = Xr();
    function Zw(e, t) {
      var r = $w(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Vd.exports = Zw;
  });
  var Gn = u((H5, Bd) => {
    var Jw = xd(),
      eR = Dd(),
      tR = Gd(),
      rR = Ud(),
      nR = Wd();
    function or(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    or.prototype.clear = Jw;
    or.prototype.delete = eR;
    or.prototype.get = tR;
    or.prototype.has = rR;
    or.prototype.set = nR;
    Bd.exports = or;
  });
  var kd = u((k5, Hd) => {
    var iR = Fr(),
      oR = Fn(),
      aR = Gn(),
      sR = 200;
    function uR(e, t) {
      var r = this.__data__;
      if (r instanceof iR) {
        var n = r.__data__;
        if (!oR || n.length < sR - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new aR(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    Hd.exports = uR;
  });
  var na = u((j5, jd) => {
    var cR = Fr(),
      lR = zf(),
      fR = Qf(),
      dR = Zf(),
      pR = ed(),
      vR = kd();
    function ar(e) {
      var t = (this.__data__ = new cR(e));
      this.size = t.size;
    }
    ar.prototype.clear = lR;
    ar.prototype.delete = fR;
    ar.prototype.get = dR;
    ar.prototype.has = pR;
    ar.prototype.set = vR;
    jd.exports = ar;
  });
  var zd = u((K5, Kd) => {
    var hR = "__lodash_hash_undefined__";
    function ER(e) {
      return this.__data__.set(e, hR), this;
    }
    Kd.exports = ER;
  });
  var Qd = u((z5, Yd) => {
    function gR(e) {
      return this.__data__.has(e);
    }
    Yd.exports = gR;
  });
  var Zd = u((Y5, $d) => {
    var _R = Gn(),
      yR = zd(),
      IR = Qd();
    function Xn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new _R(); ++t < r; ) this.add(e[t]);
    }
    Xn.prototype.add = Xn.prototype.push = yR;
    Xn.prototype.has = IR;
    $d.exports = Xn;
  });
  var ep = u((Q5, Jd) => {
    function TR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    Jd.exports = TR;
  });
  var rp = u(($5, tp) => {
    function mR(e, t) {
      return e.has(t);
    }
    tp.exports = mR;
  });
  var ia = u((Z5, np) => {
    var OR = Zd(),
      bR = ep(),
      SR = rp(),
      AR = 1,
      wR = 2;
    function RR(e, t, r, n, i, o) {
      var s = r & AR,
        a = e.length,
        c = t.length;
      if (a != c && !(s && c > a)) return !1;
      var d = o.get(e),
        _ = o.get(t);
      if (d && _) return d == t && _ == e;
      var h = -1,
        y = !0,
        A = r & wR ? new OR() : void 0;
      for (o.set(e, t), o.set(t, e); ++h < a; ) {
        var C = e[h],
          w = t[h];
        if (n) var L = s ? n(w, C, h, t, e, o) : n(C, w, h, e, t, o);
        if (L !== void 0) {
          if (L) continue;
          y = !1;
          break;
        }
        if (A) {
          if (
            !bR(t, function (N, x) {
              if (!SR(A, x) && (C === N || i(C, N, r, n, o))) return A.push(x);
            })
          ) {
            y = !1;
            break;
          }
        } else if (!(C === w || i(C, w, r, n, o))) {
          y = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), y;
    }
    np.exports = RR;
  });
  var op = u((J5, ip) => {
    var CR = $e(),
      NR = CR.Uint8Array;
    ip.exports = NR;
  });
  var sp = u((eH, ap) => {
    function xR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    ap.exports = xR;
  });
  var cp = u((tH, up) => {
    function qR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    up.exports = qR;
  });
  var vp = u((rH, pp) => {
    var lp = Zt(),
      fp = op(),
      LR = Dn(),
      PR = ia(),
      MR = sp(),
      DR = cp(),
      FR = 1,
      GR = 2,
      XR = "[object Boolean]",
      UR = "[object Date]",
      VR = "[object Error]",
      WR = "[object Map]",
      BR = "[object Number]",
      HR = "[object RegExp]",
      kR = "[object Set]",
      jR = "[object String]",
      KR = "[object Symbol]",
      zR = "[object ArrayBuffer]",
      YR = "[object DataView]",
      dp = lp ? lp.prototype : void 0,
      oa = dp ? dp.valueOf : void 0;
    function QR(e, t, r, n, i, o, s) {
      switch (r) {
        case YR:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case zR:
          return !(e.byteLength != t.byteLength || !o(new fp(e), new fp(t)));
        case XR:
        case UR:
        case BR:
          return LR(+e, +t);
        case VR:
          return e.name == t.name && e.message == t.message;
        case HR:
        case jR:
          return e == t + "";
        case WR:
          var a = MR;
        case kR:
          var c = n & FR;
          if ((a || (a = DR), e.size != t.size && !c)) return !1;
          var d = s.get(e);
          if (d) return d == t;
          (n |= GR), s.set(e, t);
          var _ = PR(a(e), a(t), n, i, o, s);
          return s.delete(e), _;
        case KR:
          if (oa) return oa.call(e) == oa.call(t);
      }
      return !1;
    }
    pp.exports = QR;
  });
  var Un = u((nH, hp) => {
    function $R(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    hp.exports = $R;
  });
  var Re = u((iH, Ep) => {
    var ZR = Array.isArray;
    Ep.exports = ZR;
  });
  var aa = u((oH, gp) => {
    var JR = Un(),
      eC = Re();
    function tC(e, t, r) {
      var n = t(e);
      return eC(e) ? n : JR(n, r(e));
    }
    gp.exports = tC;
  });
  var yp = u((aH, _p) => {
    function rC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    _p.exports = rC;
  });
  var sa = u((sH, Ip) => {
    function nC() {
      return [];
    }
    Ip.exports = nC;
  });
  var ua = u((uH, mp) => {
    var iC = yp(),
      oC = sa(),
      aC = Object.prototype,
      sC = aC.propertyIsEnumerable,
      Tp = Object.getOwnPropertySymbols,
      uC = Tp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                iC(Tp(e), function (t) {
                  return sC.call(e, t);
                }));
          }
        : oC;
    mp.exports = uC;
  });
  var bp = u((cH, Op) => {
    function cC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Op.exports = cC;
  });
  var Ap = u((lH, Sp) => {
    var lC = bt(),
      fC = gt(),
      dC = "[object Arguments]";
    function pC(e) {
      return fC(e) && lC(e) == dC;
    }
    Sp.exports = pC;
  });
  var Ur = u((fH, Cp) => {
    var wp = Ap(),
      vC = gt(),
      Rp = Object.prototype,
      hC = Rp.hasOwnProperty,
      EC = Rp.propertyIsEnumerable,
      gC = wp(
        (function () {
          return arguments;
        })()
      )
        ? wp
        : function (e) {
            return vC(e) && hC.call(e, "callee") && !EC.call(e, "callee");
          };
    Cp.exports = gC;
  });
  var xp = u((dH, Np) => {
    function _C() {
      return !1;
    }
    Np.exports = _C;
  });
  var Vn = u((Vr, sr) => {
    var yC = $e(),
      IC = xp(),
      Pp = typeof Vr == "object" && Vr && !Vr.nodeType && Vr,
      qp = Pp && typeof sr == "object" && sr && !sr.nodeType && sr,
      TC = qp && qp.exports === Pp,
      Lp = TC ? yC.Buffer : void 0,
      mC = Lp ? Lp.isBuffer : void 0,
      OC = mC || IC;
    sr.exports = OC;
  });
  var Wn = u((pH, Mp) => {
    var bC = 9007199254740991,
      SC = /^(?:0|[1-9]\d*)$/;
    function AC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? bC),
        !!t &&
          (r == "number" || (r != "symbol" && SC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Mp.exports = AC;
  });
  var Bn = u((vH, Dp) => {
    var wC = 9007199254740991;
    function RC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= wC;
    }
    Dp.exports = RC;
  });
  var Gp = u((hH, Fp) => {
    var CC = bt(),
      NC = Bn(),
      xC = gt(),
      qC = "[object Arguments]",
      LC = "[object Array]",
      PC = "[object Boolean]",
      MC = "[object Date]",
      DC = "[object Error]",
      FC = "[object Function]",
      GC = "[object Map]",
      XC = "[object Number]",
      UC = "[object Object]",
      VC = "[object RegExp]",
      WC = "[object Set]",
      BC = "[object String]",
      HC = "[object WeakMap]",
      kC = "[object ArrayBuffer]",
      jC = "[object DataView]",
      KC = "[object Float32Array]",
      zC = "[object Float64Array]",
      YC = "[object Int8Array]",
      QC = "[object Int16Array]",
      $C = "[object Int32Array]",
      ZC = "[object Uint8Array]",
      JC = "[object Uint8ClampedArray]",
      eN = "[object Uint16Array]",
      tN = "[object Uint32Array]",
      he = {};
    he[KC] =
      he[zC] =
      he[YC] =
      he[QC] =
      he[$C] =
      he[ZC] =
      he[JC] =
      he[eN] =
      he[tN] =
        !0;
    he[qC] =
      he[LC] =
      he[kC] =
      he[PC] =
      he[jC] =
      he[MC] =
      he[DC] =
      he[FC] =
      he[GC] =
      he[XC] =
      he[UC] =
      he[VC] =
      he[WC] =
      he[BC] =
      he[HC] =
        !1;
    function rN(e) {
      return xC(e) && NC(e.length) && !!he[CC(e)];
    }
    Fp.exports = rN;
  });
  var Up = u((EH, Xp) => {
    function nN(e) {
      return function (t) {
        return e(t);
      };
    }
    Xp.exports = nN;
  });
  var Wp = u((Wr, ur) => {
    var iN = xo(),
      Vp = typeof Wr == "object" && Wr && !Wr.nodeType && Wr,
      Br = Vp && typeof ur == "object" && ur && !ur.nodeType && ur,
      oN = Br && Br.exports === Vp,
      ca = oN && iN.process,
      aN = (function () {
        try {
          var e = Br && Br.require && Br.require("util").types;
          return e || (ca && ca.binding && ca.binding("util"));
        } catch {}
      })();
    ur.exports = aN;
  });
  var Hn = u((gH, kp) => {
    var sN = Gp(),
      uN = Up(),
      Bp = Wp(),
      Hp = Bp && Bp.isTypedArray,
      cN = Hp ? uN(Hp) : sN;
    kp.exports = cN;
  });
  var la = u((_H, jp) => {
    var lN = bp(),
      fN = Ur(),
      dN = Re(),
      pN = Vn(),
      vN = Wn(),
      hN = Hn(),
      EN = Object.prototype,
      gN = EN.hasOwnProperty;
    function _N(e, t) {
      var r = dN(e),
        n = !r && fN(e),
        i = !r && !n && pN(e),
        o = !r && !n && !i && hN(e),
        s = r || n || i || o,
        a = s ? lN(e.length, String) : [],
        c = a.length;
      for (var d in e)
        (t || gN.call(e, d)) &&
          !(
            s &&
            (d == "length" ||
              (i && (d == "offset" || d == "parent")) ||
              (o &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              vN(d, c))
          ) &&
          a.push(d);
      return a;
    }
    jp.exports = _N;
  });
  var kn = u((yH, Kp) => {
    var yN = Object.prototype;
    function IN(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || yN;
      return e === r;
    }
    Kp.exports = IN;
  });
  var Yp = u((IH, zp) => {
    var TN = qo(),
      mN = TN(Object.keys, Object);
    zp.exports = mN;
  });
  var jn = u((TH, Qp) => {
    var ON = kn(),
      bN = Yp(),
      SN = Object.prototype,
      AN = SN.hasOwnProperty;
    function wN(e) {
      if (!ON(e)) return bN(e);
      var t = [];
      for (var r in Object(e)) AN.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    Qp.exports = wN;
  });
  var Dt = u((mH, $p) => {
    var RN = ea(),
      CN = Bn();
    function NN(e) {
      return e != null && CN(e.length) && !RN(e);
    }
    $p.exports = NN;
  });
  var Hr = u((OH, Zp) => {
    var xN = la(),
      qN = jn(),
      LN = Dt();
    function PN(e) {
      return LN(e) ? xN(e) : qN(e);
    }
    Zp.exports = PN;
  });
  var ev = u((bH, Jp) => {
    var MN = aa(),
      DN = ua(),
      FN = Hr();
    function GN(e) {
      return MN(e, FN, DN);
    }
    Jp.exports = GN;
  });
  var nv = u((SH, rv) => {
    var tv = ev(),
      XN = 1,
      UN = Object.prototype,
      VN = UN.hasOwnProperty;
    function WN(e, t, r, n, i, o) {
      var s = r & XN,
        a = tv(e),
        c = a.length,
        d = tv(t),
        _ = d.length;
      if (c != _ && !s) return !1;
      for (var h = c; h--; ) {
        var y = a[h];
        if (!(s ? y in t : VN.call(t, y))) return !1;
      }
      var A = o.get(e),
        C = o.get(t);
      if (A && C) return A == t && C == e;
      var w = !0;
      o.set(e, t), o.set(t, e);
      for (var L = s; ++h < c; ) {
        y = a[h];
        var N = e[y],
          x = t[y];
        if (n) var b = s ? n(x, N, y, t, e, o) : n(N, x, y, e, t, o);
        if (!(b === void 0 ? N === x || i(N, x, r, n, o) : b)) {
          w = !1;
          break;
        }
        L || (L = y == "constructor");
      }
      if (w && !L) {
        var X = e.constructor,
          D = t.constructor;
        X != D &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof X == "function" &&
            X instanceof X &&
            typeof D == "function" &&
            D instanceof D
          ) &&
          (w = !1);
      }
      return o.delete(e), o.delete(t), w;
    }
    rv.exports = WN;
  });
  var ov = u((AH, iv) => {
    var BN = St(),
      HN = $e(),
      kN = BN(HN, "DataView");
    iv.exports = kN;
  });
  var sv = u((wH, av) => {
    var jN = St(),
      KN = $e(),
      zN = jN(KN, "Promise");
    av.exports = zN;
  });
  var cv = u((RH, uv) => {
    var YN = St(),
      QN = $e(),
      $N = YN(QN, "Set");
    uv.exports = $N;
  });
  var fa = u((CH, lv) => {
    var ZN = St(),
      JN = $e(),
      ex = ZN(JN, "WeakMap");
    lv.exports = ex;
  });
  var Kn = u((NH, gv) => {
    var da = ov(),
      pa = Fn(),
      va = sv(),
      ha = cv(),
      Ea = fa(),
      Ev = bt(),
      cr = ra(),
      fv = "[object Map]",
      tx = "[object Object]",
      dv = "[object Promise]",
      pv = "[object Set]",
      vv = "[object WeakMap]",
      hv = "[object DataView]",
      rx = cr(da),
      nx = cr(pa),
      ix = cr(va),
      ox = cr(ha),
      ax = cr(Ea),
      Ft = Ev;
    ((da && Ft(new da(new ArrayBuffer(1))) != hv) ||
      (pa && Ft(new pa()) != fv) ||
      (va && Ft(va.resolve()) != dv) ||
      (ha && Ft(new ha()) != pv) ||
      (Ea && Ft(new Ea()) != vv)) &&
      (Ft = function (e) {
        var t = Ev(e),
          r = t == tx ? e.constructor : void 0,
          n = r ? cr(r) : "";
        if (n)
          switch (n) {
            case rx:
              return hv;
            case nx:
              return fv;
            case ix:
              return dv;
            case ox:
              return pv;
            case ax:
              return vv;
          }
        return t;
      });
    gv.exports = Ft;
  });
  var Sv = u((xH, bv) => {
    var ga = na(),
      sx = ia(),
      ux = vp(),
      cx = nv(),
      _v = Kn(),
      yv = Re(),
      Iv = Vn(),
      lx = Hn(),
      fx = 1,
      Tv = "[object Arguments]",
      mv = "[object Array]",
      zn = "[object Object]",
      dx = Object.prototype,
      Ov = dx.hasOwnProperty;
    function px(e, t, r, n, i, o) {
      var s = yv(e),
        a = yv(t),
        c = s ? mv : _v(e),
        d = a ? mv : _v(t);
      (c = c == Tv ? zn : c), (d = d == Tv ? zn : d);
      var _ = c == zn,
        h = d == zn,
        y = c == d;
      if (y && Iv(e)) {
        if (!Iv(t)) return !1;
        (s = !0), (_ = !1);
      }
      if (y && !_)
        return (
          o || (o = new ga()),
          s || lx(e) ? sx(e, t, r, n, i, o) : ux(e, t, c, r, n, i, o)
        );
      if (!(r & fx)) {
        var A = _ && Ov.call(e, "__wrapped__"),
          C = h && Ov.call(t, "__wrapped__");
        if (A || C) {
          var w = A ? e.value() : e,
            L = C ? t.value() : t;
          return o || (o = new ga()), i(w, L, r, n, o);
        }
      }
      return y ? (o || (o = new ga()), cx(e, t, r, n, i, o)) : !1;
    }
    bv.exports = px;
  });
  var _a = u((qH, Rv) => {
    var vx = Sv(),
      Av = gt();
    function wv(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Av(e) && !Av(t))
        ? e !== e && t !== t
        : vx(e, t, r, n, wv, i);
    }
    Rv.exports = wv;
  });
  var Nv = u((LH, Cv) => {
    var hx = na(),
      Ex = _a(),
      gx = 1,
      _x = 2;
    function yx(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var c = a[0],
          d = e[c],
          _ = a[1];
        if (s && a[2]) {
          if (d === void 0 && !(c in e)) return !1;
        } else {
          var h = new hx();
          if (n) var y = n(d, _, c, e, t, h);
          if (!(y === void 0 ? Ex(_, d, gx | _x, n, h) : y)) return !1;
        }
      }
      return !0;
    }
    Cv.exports = yx;
  });
  var ya = u((PH, xv) => {
    var Ix = ct();
    function Tx(e) {
      return e === e && !Ix(e);
    }
    xv.exports = Tx;
  });
  var Lv = u((MH, qv) => {
    var mx = ya(),
      Ox = Hr();
    function bx(e) {
      for (var t = Ox(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, mx(i)];
      }
      return t;
    }
    qv.exports = bx;
  });
  var Ia = u((DH, Pv) => {
    function Sx(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Pv.exports = Sx;
  });
  var Dv = u((FH, Mv) => {
    var Ax = Nv(),
      wx = Lv(),
      Rx = Ia();
    function Cx(e) {
      var t = wx(e);
      return t.length == 1 && t[0][2]
        ? Rx(t[0][0], t[0][1])
        : function (r) {
            return r === e || Ax(r, e, t);
          };
    }
    Mv.exports = Cx;
  });
  var kr = u((GH, Fv) => {
    var Nx = bt(),
      xx = gt(),
      qx = "[object Symbol]";
    function Lx(e) {
      return typeof e == "symbol" || (xx(e) && Nx(e) == qx);
    }
    Fv.exports = Lx;
  });
  var Yn = u((XH, Gv) => {
    var Px = Re(),
      Mx = kr(),
      Dx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Fx = /^\w*$/;
    function Gx(e, t) {
      if (Px(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        Mx(e)
        ? !0
        : Fx.test(e) || !Dx.test(e) || (t != null && e in Object(t));
    }
    Gv.exports = Gx;
  });
  var Vv = u((UH, Uv) => {
    var Xv = Gn(),
      Xx = "Expected a function";
    function Ta(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(Xx);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (Ta.Cache || Xv)()), r;
    }
    Ta.Cache = Xv;
    Uv.exports = Ta;
  });
  var Bv = u((VH, Wv) => {
    var Ux = Vv(),
      Vx = 500;
    function Wx(e) {
      var t = Ux(e, function (n) {
          return r.size === Vx && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    Wv.exports = Wx;
  });
  var kv = u((WH, Hv) => {
    var Bx = Bv(),
      Hx =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      kx = /\\(\\)?/g,
      jx = Bx(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(Hx, function (r, n, i, o) {
            t.push(i ? o.replace(kx, "$1") : n || r);
          }),
          t
        );
      });
    Hv.exports = jx;
  });
  var ma = u((BH, jv) => {
    function Kx(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    jv.exports = Kx;
  });
  var Zv = u((HH, $v) => {
    var Kv = Zt(),
      zx = ma(),
      Yx = Re(),
      Qx = kr(),
      $x = 1 / 0,
      zv = Kv ? Kv.prototype : void 0,
      Yv = zv ? zv.toString : void 0;
    function Qv(e) {
      if (typeof e == "string") return e;
      if (Yx(e)) return zx(e, Qv) + "";
      if (Qx(e)) return Yv ? Yv.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -$x ? "-0" : t;
    }
    $v.exports = Qv;
  });
  var eh = u((kH, Jv) => {
    var Zx = Zv();
    function Jx(e) {
      return e == null ? "" : Zx(e);
    }
    Jv.exports = Jx;
  });
  var jr = u((jH, th) => {
    var eq = Re(),
      tq = Yn(),
      rq = kv(),
      nq = eh();
    function iq(e, t) {
      return eq(e) ? e : tq(e, t) ? [e] : rq(nq(e));
    }
    th.exports = iq;
  });
  var lr = u((KH, rh) => {
    var oq = kr(),
      aq = 1 / 0;
    function sq(e) {
      if (typeof e == "string" || oq(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -aq ? "-0" : t;
    }
    rh.exports = sq;
  });
  var Qn = u((zH, nh) => {
    var uq = jr(),
      cq = lr();
    function lq(e, t) {
      t = uq(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[cq(t[r++])];
      return r && r == n ? e : void 0;
    }
    nh.exports = lq;
  });
  var $n = u((YH, ih) => {
    var fq = Qn();
    function dq(e, t, r) {
      var n = e == null ? void 0 : fq(e, t);
      return n === void 0 ? r : n;
    }
    ih.exports = dq;
  });
  var ah = u((QH, oh) => {
    function pq(e, t) {
      return e != null && t in Object(e);
    }
    oh.exports = pq;
  });
  var uh = u(($H, sh) => {
    var vq = jr(),
      hq = Ur(),
      Eq = Re(),
      gq = Wn(),
      _q = Bn(),
      yq = lr();
    function Iq(e, t, r) {
      t = vq(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = yq(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && _q(i) && gq(s, i) && (Eq(e) || hq(e)));
    }
    sh.exports = Iq;
  });
  var lh = u((ZH, ch) => {
    var Tq = ah(),
      mq = uh();
    function Oq(e, t) {
      return e != null && mq(e, t, Tq);
    }
    ch.exports = Oq;
  });
  var dh = u((JH, fh) => {
    var bq = _a(),
      Sq = $n(),
      Aq = lh(),
      wq = Yn(),
      Rq = ya(),
      Cq = Ia(),
      Nq = lr(),
      xq = 1,
      qq = 2;
    function Lq(e, t) {
      return wq(e) && Rq(t)
        ? Cq(Nq(e), t)
        : function (r) {
            var n = Sq(r, e);
            return n === void 0 && n === t ? Aq(r, e) : bq(t, n, xq | qq);
          };
    }
    fh.exports = Lq;
  });
  var Zn = u((ek, ph) => {
    function Pq(e) {
      return e;
    }
    ph.exports = Pq;
  });
  var Oa = u((tk, vh) => {
    function Mq(e) {
      return function (t) {
        return t?.[e];
      };
    }
    vh.exports = Mq;
  });
  var Eh = u((rk, hh) => {
    var Dq = Qn();
    function Fq(e) {
      return function (t) {
        return Dq(t, e);
      };
    }
    hh.exports = Fq;
  });
  var _h = u((nk, gh) => {
    var Gq = Oa(),
      Xq = Eh(),
      Uq = Yn(),
      Vq = lr();
    function Wq(e) {
      return Uq(e) ? Gq(Vq(e)) : Xq(e);
    }
    gh.exports = Wq;
  });
  var At = u((ik, yh) => {
    var Bq = Dv(),
      Hq = dh(),
      kq = Zn(),
      jq = Re(),
      Kq = _h();
    function zq(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? kq
        : typeof e == "object"
        ? jq(e)
          ? Hq(e[0], e[1])
          : Bq(e)
        : Kq(e);
    }
    yh.exports = zq;
  });
  var ba = u((ok, Ih) => {
    var Yq = At(),
      Qq = Dt(),
      $q = Hr();
    function Zq(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!Qq(t)) {
          var o = Yq(r, 3);
          (t = $q(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Ih.exports = Zq;
  });
  var Sa = u((ak, Th) => {
    function Jq(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Th.exports = Jq;
  });
  var Oh = u((sk, mh) => {
    var eL = /\s/;
    function tL(e) {
      for (var t = e.length; t-- && eL.test(e.charAt(t)); );
      return t;
    }
    mh.exports = tL;
  });
  var Sh = u((uk, bh) => {
    var rL = Oh(),
      nL = /^\s+/;
    function iL(e) {
      return e && e.slice(0, rL(e) + 1).replace(nL, "");
    }
    bh.exports = iL;
  });
  var Jn = u((ck, Rh) => {
    var oL = Sh(),
      Ah = ct(),
      aL = kr(),
      wh = 0 / 0,
      sL = /^[-+]0x[0-9a-f]+$/i,
      uL = /^0b[01]+$/i,
      cL = /^0o[0-7]+$/i,
      lL = parseInt;
    function fL(e) {
      if (typeof e == "number") return e;
      if (aL(e)) return wh;
      if (Ah(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Ah(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = oL(e);
      var r = uL.test(e);
      return r || cL.test(e) ? lL(e.slice(2), r ? 2 : 8) : sL.test(e) ? wh : +e;
    }
    Rh.exports = fL;
  });
  var xh = u((lk, Nh) => {
    var dL = Jn(),
      Ch = 1 / 0,
      pL = 17976931348623157e292;
    function vL(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = dL(e)), e === Ch || e === -Ch)) {
        var t = e < 0 ? -1 : 1;
        return t * pL;
      }
      return e === e ? e : 0;
    }
    Nh.exports = vL;
  });
  var Aa = u((fk, qh) => {
    var hL = xh();
    function EL(e) {
      var t = hL(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    qh.exports = EL;
  });
  var Ph = u((dk, Lh) => {
    var gL = Sa(),
      _L = At(),
      yL = Aa(),
      IL = Math.max;
    function TL(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : yL(r);
      return i < 0 && (i = IL(n + i, 0)), gL(e, _L(t, 3), i);
    }
    Lh.exports = TL;
  });
  var wa = u((pk, Mh) => {
    var mL = ba(),
      OL = Ph(),
      bL = mL(OL);
    Mh.exports = bL;
  });
  var ti = u((Pe) => {
    "use strict";
    var SL = at().default;
    Object.defineProperty(Pe, "__esModule", { value: !0 });
    Pe.withBrowser =
      Pe.TRANSFORM_STYLE_PREFIXED =
      Pe.TRANSFORM_PREFIXED =
      Pe.IS_BROWSER_ENV =
      Pe.FLEX_PREFIXED =
      Pe.ELEMENT_MATCHES =
        void 0;
    var AL = SL(wa()),
      Fh = typeof window < "u";
    Pe.IS_BROWSER_ENV = Fh;
    var ei = (e, t) => (Fh ? e() : t);
    Pe.withBrowser = ei;
    var wL = ei(() =>
      (0, AL.default)(
        [
          "matches",
          "matchesSelector",
          "mozMatchesSelector",
          "msMatchesSelector",
          "oMatchesSelector",
          "webkitMatchesSelector",
        ],
        (e) => e in Element.prototype
      )
    );
    Pe.ELEMENT_MATCHES = wL;
    var RL = ei(() => {
      let e = document.createElement("i"),
        t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
        r = "";
      try {
        let { length: n } = t;
        for (let i = 0; i < n; i++) {
          let o = t[i];
          if (((e.style.display = o), e.style.display === o)) return o;
        }
        return r;
      } catch {
        return r;
      }
    }, "flex");
    Pe.FLEX_PREFIXED = RL;
    var Gh = ei(() => {
      let e = document.createElement("i");
      if (e.style.transform == null) {
        let t = ["Webkit", "Moz", "ms"],
          r = "Transform",
          { length: n } = t;
        for (let i = 0; i < n; i++) {
          let o = t[i] + r;
          if (e.style[o] !== void 0) return o;
        }
      }
      return "transform";
    }, "transform");
    Pe.TRANSFORM_PREFIXED = Gh;
    var Dh = Gh.split("transform")[0],
      CL = Dh ? Dh + "TransformStyle" : "transformStyle";
    Pe.TRANSFORM_STYLE_PREFIXED = CL;
  });
  var Ra = u((hk, Bh) => {
    var NL = 4,
      xL = 0.001,
      qL = 1e-7,
      LL = 10,
      Kr = 11,
      ri = 1 / (Kr - 1),
      PL = typeof Float32Array == "function";
    function Xh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function Uh(e, t) {
      return 3 * t - 6 * e;
    }
    function Vh(e) {
      return 3 * e;
    }
    function ni(e, t, r) {
      return ((Xh(t, r) * e + Uh(t, r)) * e + Vh(t)) * e;
    }
    function Wh(e, t, r) {
      return 3 * Xh(t, r) * e * e + 2 * Uh(t, r) * e + Vh(t);
    }
    function ML(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = ni(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > qL && ++a < LL);
      return s;
    }
    function DL(e, t, r, n) {
      for (var i = 0; i < NL; ++i) {
        var o = Wh(t, r, n);
        if (o === 0) return t;
        var s = ni(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    Bh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = PL ? new Float32Array(Kr) : new Array(Kr);
      if (t !== r || n !== i)
        for (var s = 0; s < Kr; ++s) o[s] = ni(s * ri, t, n);
      function a(c) {
        for (var d = 0, _ = 1, h = Kr - 1; _ !== h && o[_] <= c; ++_) d += ri;
        --_;
        var y = (c - o[_]) / (o[_ + 1] - o[_]),
          A = d + y * ri,
          C = Wh(A, t, n);
        return C >= xL ? DL(c, A, t, n) : C === 0 ? A : ML(c, d, d + ri, t, n);
      }
      return function (d) {
        return t === r && n === i
          ? d
          : d === 0
          ? 0
          : d === 1
          ? 1
          : ni(a(d), r, i);
      };
    };
  });
  var Ca = u((re) => {
    "use strict";
    var FL = at().default;
    Object.defineProperty(re, "__esModule", { value: !0 });
    re.bounce = yP;
    re.bouncePast = IP;
    re.easeOut = re.easeInOut = re.easeIn = re.ease = void 0;
    re.inBack = lP;
    re.inCirc = aP;
    re.inCubic = kL;
    re.inElastic = pP;
    re.inExpo = nP;
    re.inOutBack = dP;
    re.inOutCirc = uP;
    re.inOutCubic = KL;
    re.inOutElastic = hP;
    re.inOutExpo = oP;
    re.inOutQuad = HL;
    re.inOutQuart = QL;
    re.inOutQuint = JL;
    re.inOutSine = rP;
    re.inQuad = WL;
    re.inQuart = zL;
    re.inQuint = $L;
    re.inSine = eP;
    re.outBack = fP;
    re.outBounce = cP;
    re.outCirc = sP;
    re.outCubic = jL;
    re.outElastic = vP;
    re.outExpo = iP;
    re.outQuad = BL;
    re.outQuart = YL;
    re.outQuint = ZL;
    re.outSine = tP;
    re.swingFrom = gP;
    re.swingFromTo = EP;
    re.swingTo = _P;
    var ii = FL(Ra()),
      yt = 1.70158,
      GL = (0, ii.default)(0.25, 0.1, 0.25, 1);
    re.ease = GL;
    var XL = (0, ii.default)(0.42, 0, 1, 1);
    re.easeIn = XL;
    var UL = (0, ii.default)(0, 0, 0.58, 1);
    re.easeOut = UL;
    var VL = (0, ii.default)(0.42, 0, 0.58, 1);
    re.easeInOut = VL;
    function WL(e) {
      return Math.pow(e, 2);
    }
    function BL(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function HL(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function kL(e) {
      return Math.pow(e, 3);
    }
    function jL(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function KL(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 3)
        : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function zL(e) {
      return Math.pow(e, 4);
    }
    function YL(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function QL(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 4)
        : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function $L(e) {
      return Math.pow(e, 5);
    }
    function ZL(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function JL(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 5)
        : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function eP(e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function tP(e) {
      return Math.sin(e * (Math.PI / 2));
    }
    function rP(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function nP(e) {
      return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function iP(e) {
      return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function oP(e) {
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (e /= 0.5) < 1
        ? 0.5 * Math.pow(2, 10 * (e - 1))
        : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function aP(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function sP(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function uP(e) {
      return (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function cP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function lP(e) {
      let t = yt;
      return e * e * ((t + 1) * e - t);
    }
    function fP(e) {
      let t = yt;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function dP(e) {
      let t = yt;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function pP(e) {
      let t = yt,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
    }
    function vP(e) {
      let t = yt,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
    }
    function hP(e) {
      let t = yt,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
    }
    function EP(e) {
      let t = yt;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function gP(e) {
      let t = yt;
      return e * e * ((t + 1) * e - t);
    }
    function _P(e) {
      let t = yt;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function yP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function IP(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
        ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
        : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  });
  var xa = u((zr) => {
    "use strict";
    var TP = at().default,
      mP = zt().default;
    Object.defineProperty(zr, "__esModule", { value: !0 });
    zr.applyEasing = SP;
    zr.createBezierEasing = bP;
    zr.optimizeFloat = Na;
    var Hh = mP(Ca()),
      OP = TP(Ra());
    function Na(e, t = 5, r = 10) {
      let n = Math.pow(r, t),
        i = Number(Math.round(e * n) / n);
      return Math.abs(i) > 1e-4 ? i : 0;
    }
    function bP(e) {
      return (0, OP.default)(...e);
    }
    function SP(e, t, r) {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Na(r ? (t > 0 ? r(t) : t) : t > 0 && e && Hh[e] ? Hh[e](t) : t);
    }
  });
  var zh = u((fr) => {
    "use strict";
    Object.defineProperty(fr, "__esModule", { value: !0 });
    fr.createElementState = Kh;
    fr.ixElements = void 0;
    fr.mergeActionState = qa;
    var oi = rr(),
      jh = Ge(),
      {
        HTML_ELEMENT: _k,
        PLAIN_OBJECT: AP,
        ABSTRACT_NODE: yk,
        CONFIG_X_VALUE: wP,
        CONFIG_Y_VALUE: RP,
        CONFIG_Z_VALUE: CP,
        CONFIG_VALUE: NP,
        CONFIG_X_UNIT: xP,
        CONFIG_Y_UNIT: qP,
        CONFIG_Z_UNIT: LP,
        CONFIG_UNIT: PP,
      } = jh.IX2EngineConstants,
      {
        IX2_SESSION_STOPPED: MP,
        IX2_INSTANCE_ADDED: DP,
        IX2_ELEMENT_STATE_CHANGED: FP,
      } = jh.IX2EngineActionTypes,
      kh = {},
      GP = "refState",
      XP = (e = kh, t = {}) => {
        switch (t.type) {
          case MP:
            return kh;
          case DP: {
            let {
                elementId: r,
                element: n,
                origin: i,
                actionItem: o,
                refType: s,
              } = t.payload,
              { actionTypeId: a } = o,
              c = e;
            return (
              (0, oi.getIn)(c, [r, n]) !== n && (c = Kh(c, n, s, r, o)),
              qa(c, r, a, i, o)
            );
          }
          case FP: {
            let {
              elementId: r,
              actionTypeId: n,
              current: i,
              actionItem: o,
            } = t.payload;
            return qa(e, r, n, i, o);
          }
          default:
            return e;
        }
      };
    fr.ixElements = XP;
    function Kh(e, t, r, n, i) {
      let o =
        r === AP ? (0, oi.getIn)(i, ["config", "target", "objectId"]) : null;
      return (0, oi.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
    }
    function qa(e, t, r, n, i) {
      let o = VP(i),
        s = [t, GP, r];
      return (0, oi.mergeIn)(e, s, n, o);
    }
    var UP = [
      [wP, xP],
      [RP, qP],
      [CP, LP],
      [NP, PP],
    ];
    function VP(e) {
      let { config: t } = e;
      return UP.reduce((r, n) => {
        let i = n[0],
          o = n[1],
          s = t[i],
          a = t[o];
        return s != null && a != null && (r[o] = a), r;
      }, {});
    }
  });
  var Yh = u((Ce) => {
    "use strict";
    Object.defineProperty(Ce, "__esModule", { value: !0 });
    Ce.renderPlugin =
      Ce.getPluginOrigin =
      Ce.getPluginDuration =
      Ce.getPluginDestination =
      Ce.getPluginConfig =
      Ce.createPluginInstance =
      Ce.clearPlugin =
        void 0;
    var WP = (e) => e.value;
    Ce.getPluginConfig = WP;
    var BP = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ce.getPluginDuration = BP;
    var HP = (e) => e || { value: 0 };
    Ce.getPluginOrigin = HP;
    var kP = (e) => ({ value: e.value });
    Ce.getPluginDestination = kP;
    var jP = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Ce.createPluginInstance = jP;
    var KP = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ce.renderPlugin = KP;
    var zP = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ce.clearPlugin = zP;
  });
  var La = u((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    Se.isPluginType = $P;
    Se.renderPlugin = void 0;
    var Gt = Yh(),
      Qh = Ge(),
      YP = ti(),
      QP = {
        [Qh.ActionTypeConsts.PLUGIN_LOTTIE]: {
          getConfig: Gt.getPluginConfig,
          getOrigin: Gt.getPluginOrigin,
          getDuration: Gt.getPluginDuration,
          getDestination: Gt.getPluginDestination,
          createInstance: Gt.createPluginInstance,
          render: Gt.renderPlugin,
          clear: Gt.clearPlugin,
        },
      };
    function $P(e) {
      return e === Qh.ActionTypeConsts.PLUGIN_LOTTIE;
    }
    var Xt = (e) => (t) => {
        if (!YP.IS_BROWSER_ENV) return () => null;
        let r = QP[t];
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
      ZP = Xt("getConfig");
    Se.getPluginConfig = ZP;
    var JP = Xt("getOrigin");
    Se.getPluginOrigin = JP;
    var eM = Xt("getDuration");
    Se.getPluginDuration = eM;
    var tM = Xt("getDestination");
    Se.getPluginDestination = tM;
    var rM = Xt("createInstance");
    Se.createPluginInstance = rM;
    var nM = Xt("render");
    Se.renderPlugin = nM;
    var iM = Xt("clear");
    Se.clearPlugin = iM;
  });
  var Zh = u((Ok, $h) => {
    function oM(e, t) {
      return e == null || e !== e ? t : e;
    }
    $h.exports = oM;
  });
  var eE = u((bk, Jh) => {
    function aM(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Jh.exports = aM;
  });
  var rE = u((Sk, tE) => {
    function sM(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var c = s[e ? a : ++i];
          if (r(o[c], c, o) === !1) break;
        }
        return t;
      };
    }
    tE.exports = sM;
  });
  var iE = u((Ak, nE) => {
    var uM = rE(),
      cM = uM();
    nE.exports = cM;
  });
  var Pa = u((wk, oE) => {
    var lM = iE(),
      fM = Hr();
    function dM(e, t) {
      return e && lM(e, t, fM);
    }
    oE.exports = dM;
  });
  var sE = u((Rk, aE) => {
    var pM = Dt();
    function vM(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!pM(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    aE.exports = vM;
  });
  var Ma = u((Ck, uE) => {
    var hM = Pa(),
      EM = sE(),
      gM = EM(hM);
    uE.exports = gM;
  });
  var lE = u((Nk, cE) => {
    function _M(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    cE.exports = _M;
  });
  var dE = u((xk, fE) => {
    var yM = eE(),
      IM = Ma(),
      TM = At(),
      mM = lE(),
      OM = Re();
    function bM(e, t, r) {
      var n = OM(e) ? yM : mM,
        i = arguments.length < 3;
      return n(e, TM(t, 4), r, i, IM);
    }
    fE.exports = bM;
  });
  var vE = u((qk, pE) => {
    var SM = Sa(),
      AM = At(),
      wM = Aa(),
      RM = Math.max,
      CM = Math.min;
    function NM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = wM(r)), (i = r < 0 ? RM(n + i, 0) : CM(i, n - 1))),
        SM(e, AM(t, 3), i, !0)
      );
    }
    pE.exports = NM;
  });
  var EE = u((Lk, hE) => {
    var xM = ba(),
      qM = vE(),
      LM = xM(qM);
    hE.exports = LM;
  });
  var _E = u((ai) => {
    "use strict";
    Object.defineProperty(ai, "__esModule", { value: !0 });
    ai.default = void 0;
    var PM = Object.prototype.hasOwnProperty;
    function gE(e, t) {
      return e === t
        ? e !== 0 || t !== 0 || 1 / e === 1 / t
        : e !== e && t !== t;
    }
    function MM(e, t) {
      if (gE(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let i = 0; i < r.length; i++)
        if (!PM.call(t, r[i]) || !gE(e[r[i]], t[r[i]])) return !1;
      return !0;
    }
    var DM = MM;
    ai.default = DM;
  });
  var XE = u((ve) => {
    "use strict";
    var ci = at().default;
    Object.defineProperty(ve, "__esModule", { value: !0 });
    ve.cleanupHTMLElement = LD;
    ve.clearAllStyles = qD;
    ve.getActionListProgress = MD;
    ve.getAffectedElements = Va;
    ve.getComputedStyle = sD;
    ve.getDestinationValues = vD;
    ve.getElementId = nD;
    ve.getInstanceId = tD;
    ve.getInstanceOrigin = lD;
    ve.getItemConfigByKey = void 0;
    ve.getMaxDurationItemIndex = GE;
    ve.getNamespacedParameterId = GD;
    ve.getRenderType = ME;
    ve.getStyleProp = hD;
    ve.mediaQueriesEqual = UD;
    ve.observeStore = aD;
    ve.reduceListToGroup = DD;
    ve.reifyState = iD;
    ve.renderHTMLElement = ED;
    Object.defineProperty(ve, "shallowEqual", {
      enumerable: !0,
      get: function () {
        return RE.default;
      },
    });
    ve.shouldAllowMediaQuery = XD;
    ve.shouldNamespaceEventParameter = FD;
    ve.stringifyTarget = VD;
    var wt = ci(Zh()),
      Fa = ci(dE()),
      Da = ci(EE()),
      yE = rr(),
      Ut = Ge(),
      RE = ci(_E()),
      FM = xa(),
      dt = La(),
      Me = ti(),
      {
        BACKGROUND: GM,
        TRANSFORM: XM,
        TRANSLATE_3D: UM,
        SCALE_3D: VM,
        ROTATE_X: WM,
        ROTATE_Y: BM,
        ROTATE_Z: HM,
        SKEW: kM,
        PRESERVE_3D: jM,
        FLEX: KM,
        OPACITY: si,
        FILTER: Yr,
        FONT_VARIATION_SETTINGS: Qr,
        WIDTH: lt,
        HEIGHT: ft,
        BACKGROUND_COLOR: CE,
        BORDER_COLOR: zM,
        COLOR: YM,
        CHILDREN: IE,
        IMMEDIATE_CHILDREN: QM,
        SIBLINGS: TE,
        PARENT: $M,
        DISPLAY: ui,
        WILL_CHANGE: dr,
        AUTO: Rt,
        COMMA_DELIMITER: $r,
        COLON_DELIMITER: ZM,
        BAR_DELIMITER: mE,
        RENDER_TRANSFORM: NE,
        RENDER_GENERAL: Ga,
        RENDER_STYLE: Xa,
        RENDER_PLUGIN: xE,
      } = Ut.IX2EngineConstants,
      {
        TRANSFORM_MOVE: pr,
        TRANSFORM_SCALE: vr,
        TRANSFORM_ROTATE: hr,
        TRANSFORM_SKEW: Zr,
        STYLE_OPACITY: qE,
        STYLE_FILTER: Jr,
        STYLE_FONT_VARIATION: en,
        STYLE_SIZE: Er,
        STYLE_BACKGROUND_COLOR: gr,
        STYLE_BORDER: _r,
        STYLE_TEXT_COLOR: yr,
        GENERAL_DISPLAY: li,
      } = Ut.ActionTypeConsts,
      JM = "OBJECT_VALUE",
      LE = (e) => e.trim(),
      Ua = Object.freeze({ [gr]: CE, [_r]: zM, [yr]: YM }),
      PE = Object.freeze({
        [Me.TRANSFORM_PREFIXED]: XM,
        [CE]: GM,
        [si]: si,
        [Yr]: Yr,
        [lt]: lt,
        [ft]: ft,
        [Qr]: Qr,
      }),
      OE = {},
      eD = 1;
    function tD() {
      return "i" + eD++;
    }
    var rD = 1;
    function nD(e, t) {
      for (let r in e) {
        let n = e[r];
        if (n && n.ref === t) return n.id;
      }
      return "e" + rD++;
    }
    function iD({ events: e, actionLists: t, site: r } = {}) {
      let n = (0, Fa.default)(
          e,
          (s, a) => {
            let { eventTypeId: c } = a;
            return s[c] || (s[c] = {}), (s[c][a.id] = a), s;
          },
          {}
        ),
        i = r && r.mediaQueries,
        o = [];
      return (
        i
          ? (o = i.map((s) => s.key))
          : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
        {
          ixData: {
            events: e,
            actionLists: t,
            eventTypeMap: n,
            mediaQueries: i,
            mediaQueryKeys: o,
          },
        }
      );
    }
    var oD = (e, t) => e === t;
    function aD({ store: e, select: t, onChange: r, comparator: n = oD }) {
      let { getState: i, subscribe: o } = e,
        s = o(c),
        a = t(i());
      function c() {
        let d = t(i());
        if (d == null) {
          s();
          return;
        }
        n(d, a) || ((a = d), r(a, e));
      }
      return s;
    }
    function bE(e) {
      let t = typeof e;
      if (t === "string") return { id: e };
      if (e != null && t === "object") {
        let {
          id: r,
          objectId: n,
          selector: i,
          selectorGuids: o,
          appliesTo: s,
          useEventTarget: a,
        } = e;
        return {
          id: r,
          objectId: n,
          selector: i,
          selectorGuids: o,
          appliesTo: s,
          useEventTarget: a,
        };
      }
      return {};
    }
    function Va({
      config: e,
      event: t,
      eventTarget: r,
      elementRoot: n,
      elementApi: i,
    }) {
      var o, s, a;
      if (!i) throw new Error("IX2 missing elementApi");
      let { targets: c } = e;
      if (Array.isArray(c) && c.length > 0)
        return c.reduce(
          (G, U) =>
            G.concat(
              Va({
                config: { target: U },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: i,
              })
            ),
          []
        );
      let {
          getValidDocument: d,
          getQuerySelector: _,
          queryDocument: h,
          getChildElements: y,
          getSiblingElements: A,
          matchSelector: C,
          elementContains: w,
          isSiblingNode: L,
        } = i,
        { target: N } = e;
      if (!N) return [];
      let {
        id: x,
        objectId: b,
        selector: X,
        selectorGuids: D,
        appliesTo: q,
        useEventTarget: V,
      } = bE(N);
      if (b) return [OE[b] || (OE[b] = {})];
      if (q === Ut.EventAppliesTo.PAGE) {
        let G = d(x);
        return G ? [G] : [];
      }
      let k =
          ((o =
            t == null ||
            (s = t.action) === null ||
            s === void 0 ||
            (a = s.config) === null ||
            a === void 0
              ? void 0
              : a.affectedElements) !== null && o !== void 0
            ? o
            : {})[x || X] || {},
        oe = !!(k.id || k.selector),
        J,
        F,
        T,
        P = t && _(bE(t.target));
      if (
        (oe
          ? ((J = k.limitAffectedElements), (F = P), (T = _(k)))
          : (F = T = _({ id: x, selector: X, selectorGuids: D })),
        t && V)
      ) {
        let G = r && (T || V === !0) ? [r] : h(P);
        if (T) {
          if (V === $M) return h(T).filter((U) => G.some((Q) => w(U, Q)));
          if (V === IE) return h(T).filter((U) => G.some((Q) => w(Q, U)));
          if (V === TE) return h(T).filter((U) => G.some((Q) => L(Q, U)));
        }
        return G;
      }
      return F == null || T == null
        ? []
        : Me.IS_BROWSER_ENV && n
        ? h(T).filter((G) => n.contains(G))
        : J === IE
        ? h(F, T)
        : J === QM
        ? y(h(F)).filter(C(T))
        : J === TE
        ? A(h(F)).filter(C(T))
        : h(T);
    }
    function sD({ element: e, actionItem: t }) {
      if (!Me.IS_BROWSER_ENV) return {};
      let { actionTypeId: r } = t;
      switch (r) {
        case Er:
        case gr:
        case _r:
        case yr:
        case li:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    var SE = /px/,
      uD = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = gD[n.type]), r),
          e || {}
        ),
      cD = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = _D[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        );
    function lD(e, t = {}, r = {}, n, i) {
      let { getStyle: o } = i,
        { actionTypeId: s } = n;
      if ((0, dt.isPluginType)(s)) return (0, dt.getPluginOrigin)(s)(t[s]);
      switch (n.actionTypeId) {
        case pr:
        case vr:
        case hr:
        case Zr:
          return t[n.actionTypeId] || Wa[n.actionTypeId];
        case Jr:
          return uD(t[n.actionTypeId], n.config.filters);
        case en:
          return cD(t[n.actionTypeId], n.config.fontVariations);
        case qE:
          return { value: (0, wt.default)(parseFloat(o(e, si)), 1) };
        case Er: {
          let a = o(e, lt),
            c = o(e, ft),
            d,
            _;
          return (
            n.config.widthUnit === Rt
              ? (d = SE.test(a) ? parseFloat(a) : parseFloat(r.width))
              : (d = (0, wt.default)(parseFloat(a), parseFloat(r.width))),
            n.config.heightUnit === Rt
              ? (_ = SE.test(c) ? parseFloat(c) : parseFloat(r.height))
              : (_ = (0, wt.default)(parseFloat(c), parseFloat(r.height))),
            { widthValue: d, heightValue: _ }
          );
        }
        case gr:
        case _r:
        case yr:
          return CD({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: r,
            getStyle: o,
          });
        case li:
          return { value: (0, wt.default)(o(e, ui), r.display) };
        case JM:
          return t[n.actionTypeId] || { value: 0 };
        default:
          return;
      }
    }
    var fD = (e, t) => (t && (e[t.type] = t.value || 0), e),
      dD = (e, t) => (t && (e[t.type] = t.value || 0), e),
      pD = (e, t, r) => {
        if ((0, dt.isPluginType)(e)) return (0, dt.getPluginConfig)(e)(r, t);
        switch (e) {
          case Jr: {
            let n = (0, Da.default)(r.filters, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          case en: {
            let n = (0, Da.default)(r.fontVariations, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      };
    ve.getItemConfigByKey = pD;
    function vD({ element: e, actionItem: t, elementApi: r }) {
      if ((0, dt.isPluginType)(t.actionTypeId))
        return (0, dt.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
        case pr:
        case vr:
        case hr:
        case Zr: {
          let { xValue: n, yValue: i, zValue: o } = t.config;
          return { xValue: n, yValue: i, zValue: o };
        }
        case Er: {
          let { getStyle: n, setStyle: i, getProperty: o } = r,
            { widthUnit: s, heightUnit: a } = t.config,
            { widthValue: c, heightValue: d } = t.config;
          if (!Me.IS_BROWSER_ENV) return { widthValue: c, heightValue: d };
          if (s === Rt) {
            let _ = n(e, lt);
            i(e, lt, ""), (c = o(e, "offsetWidth")), i(e, lt, _);
          }
          if (a === Rt) {
            let _ = n(e, ft);
            i(e, ft, ""), (d = o(e, "offsetHeight")), i(e, ft, _);
          }
          return { widthValue: c, heightValue: d };
        }
        case gr:
        case _r:
        case yr: {
          let { rValue: n, gValue: i, bValue: o, aValue: s } = t.config;
          return { rValue: n, gValue: i, bValue: o, aValue: s };
        }
        case Jr:
          return t.config.filters.reduce(fD, {});
        case en:
          return t.config.fontVariations.reduce(dD, {});
        default: {
          let { value: n } = t.config;
          return { value: n };
        }
      }
    }
    function ME(e) {
      if (/^TRANSFORM_/.test(e)) return NE;
      if (/^STYLE_/.test(e)) return Xa;
      if (/^GENERAL_/.test(e)) return Ga;
      if (/^PLUGIN_/.test(e)) return xE;
    }
    function hD(e, t) {
      return e === Xa ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function ED(e, t, r, n, i, o, s, a, c) {
      switch (a) {
        case NE:
          return TD(e, t, r, i, s);
        case Xa:
          return ND(e, t, r, i, o, s);
        case Ga:
          return xD(e, i, s);
        case xE: {
          let { actionTypeId: d } = i;
          if ((0, dt.isPluginType)(d)) return (0, dt.renderPlugin)(d)(c, t, i);
        }
      }
    }
    var Wa = {
        [pr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [vr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [hr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Zr]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
      gD = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      }),
      _D = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
      yD = (e, t) => {
        let r = (0, Da.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      },
      ID = Object.keys(Wa);
    function TD(e, t, r, n, i) {
      let o = ID.map((a) => {
          let c = Wa[a],
            {
              xValue: d = c.xValue,
              yValue: _ = c.yValue,
              zValue: h = c.zValue,
              xUnit: y = "",
              yUnit: A = "",
              zUnit: C = "",
            } = t[a] || {};
          switch (a) {
            case pr:
              return `${UM}(${d}${y}, ${_}${A}, ${h}${C})`;
            case vr:
              return `${VM}(${d}${y}, ${_}${A}, ${h}${C})`;
            case hr:
              return `${WM}(${d}${y}) ${BM}(${_}${A}) ${HM}(${h}${C})`;
            case Zr:
              return `${kM}(${d}${y}, ${_}${A})`;
            default:
              return "";
          }
        }).join(" "),
        { setStyle: s } = i;
      Vt(e, Me.TRANSFORM_PREFIXED, i),
        s(e, Me.TRANSFORM_PREFIXED, o),
        bD(n, r) && s(e, Me.TRANSFORM_STYLE_PREFIXED, jM);
    }
    function mD(e, t, r, n) {
      let i = (0, Fa.default)(t, (s, a, c) => `${s} ${c}(${a}${yD(c, r)})`, ""),
        { setStyle: o } = n;
      Vt(e, Yr, n), o(e, Yr, i);
    }
    function OD(e, t, r, n) {
      let i = (0, Fa.default)(
          t,
          (s, a, c) => (s.push(`"${c}" ${a}`), s),
          []
        ).join(", "),
        { setStyle: o } = n;
      Vt(e, Qr, n), o(e, Qr, i);
    }
    function bD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
      return (
        (e === pr && n !== void 0) ||
        (e === vr && n !== void 0) ||
        (e === hr && (t !== void 0 || r !== void 0))
      );
    }
    var SD = "\\(([^)]+)\\)",
      AD = /^rgb/,
      wD = RegExp(`rgba?${SD}`);
    function RD(e, t) {
      let r = e.exec(t);
      return r ? r[1] : "";
    }
    function CD({
      element: e,
      actionTypeId: t,
      computedStyle: r,
      getStyle: n,
    }) {
      let i = Ua[t],
        o = n(e, i),
        s = AD.test(o) ? o : r[i],
        a = RD(wD, s).split($r);
      return {
        rValue: (0, wt.default)(parseInt(a[0], 10), 255),
        gValue: (0, wt.default)(parseInt(a[1], 10), 255),
        bValue: (0, wt.default)(parseInt(a[2], 10), 255),
        aValue: (0, wt.default)(parseFloat(a[3]), 1),
      };
    }
    function ND(e, t, r, n, i, o) {
      let { setStyle: s } = o;
      switch (n.actionTypeId) {
        case Er: {
          let { widthUnit: a = "", heightUnit: c = "" } = n.config,
            { widthValue: d, heightValue: _ } = r;
          d !== void 0 &&
            (a === Rt && (a = "px"), Vt(e, lt, o), s(e, lt, d + a)),
            _ !== void 0 &&
              (c === Rt && (c = "px"), Vt(e, ft, o), s(e, ft, _ + c));
          break;
        }
        case Jr: {
          mD(e, r, n.config, o);
          break;
        }
        case en: {
          OD(e, r, n.config, o);
          break;
        }
        case gr:
        case _r:
        case yr: {
          let a = Ua[n.actionTypeId],
            c = Math.round(r.rValue),
            d = Math.round(r.gValue),
            _ = Math.round(r.bValue),
            h = r.aValue;
          Vt(e, a, o),
            s(
              e,
              a,
              h >= 1 ? `rgb(${c},${d},${_})` : `rgba(${c},${d},${_},${h})`
            );
          break;
        }
        default: {
          let { unit: a = "" } = n.config;
          Vt(e, i, o), s(e, i, r.value + a);
          break;
        }
      }
    }
    function xD(e, t, r) {
      let { setStyle: n } = r;
      switch (t.actionTypeId) {
        case li: {
          let { value: i } = t.config;
          i === KM && Me.IS_BROWSER_ENV
            ? n(e, ui, Me.FLEX_PREFIXED)
            : n(e, ui, i);
          return;
        }
      }
    }
    function Vt(e, t, r) {
      if (!Me.IS_BROWSER_ENV) return;
      let n = PE[t];
      if (!n) return;
      let { getStyle: i, setStyle: o } = r,
        s = i(e, dr);
      if (!s) {
        o(e, dr, n);
        return;
      }
      let a = s.split($r).map(LE);
      a.indexOf(n) === -1 && o(e, dr, a.concat(n).join($r));
    }
    function DE(e, t, r) {
      if (!Me.IS_BROWSER_ENV) return;
      let n = PE[t];
      if (!n) return;
      let { getStyle: i, setStyle: o } = r,
        s = i(e, dr);
      !s ||
        s.indexOf(n) === -1 ||
        o(
          e,
          dr,
          s
            .split($r)
            .map(LE)
            .filter((a) => a !== n)
            .join($r)
        );
    }
    function qD({ store: e, elementApi: t }) {
      let { ixData: r } = e.getState(),
        { events: n = {}, actionLists: i = {} } = r;
      Object.keys(n).forEach((o) => {
        let s = n[o],
          { config: a } = s.action,
          { actionListId: c } = a,
          d = i[c];
        d && AE({ actionList: d, event: s, elementApi: t });
      }),
        Object.keys(i).forEach((o) => {
          AE({ actionList: i[o], elementApi: t });
        });
    }
    function AE({ actionList: e = {}, event: t, elementApi: r }) {
      let { actionItemGroups: n, continuousParameterGroups: i } = e;
      n &&
        n.forEach((o) => {
          wE({ actionGroup: o, event: t, elementApi: r });
        }),
        i &&
          i.forEach((o) => {
            let { continuousActionGroups: s } = o;
            s.forEach((a) => {
              wE({ actionGroup: a, event: t, elementApi: r });
            });
          });
    }
    function wE({ actionGroup: e, event: t, elementApi: r }) {
      let { actionItems: n } = e;
      n.forEach(({ actionTypeId: i, config: o }) => {
        let s;
        (0, dt.isPluginType)(i)
          ? (s = (0, dt.clearPlugin)(i))
          : (s = FE({ effect: PD, actionTypeId: i, elementApi: r })),
          Va({ config: o, event: t, elementApi: r }).forEach(s);
      });
    }
    function LD(e, t, r) {
      let { setStyle: n, getStyle: i } = r,
        { actionTypeId: o } = t;
      if (o === Er) {
        let { config: s } = t;
        s.widthUnit === Rt && n(e, lt, ""), s.heightUnit === Rt && n(e, ft, "");
      }
      i(e, dr) && FE({ effect: DE, actionTypeId: o, elementApi: r })(e);
    }
    var FE =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case pr:
          case vr:
          case hr:
          case Zr:
            e(n, Me.TRANSFORM_PREFIXED, r);
            break;
          case Jr:
            e(n, Yr, r);
            break;
          case en:
            e(n, Qr, r);
            break;
          case qE:
            e(n, si, r);
            break;
          case Er:
            e(n, lt, r), e(n, ft, r);
            break;
          case gr:
          case _r:
          case yr:
            e(n, Ua[t], r);
            break;
          case li:
            e(n, ui, r);
            break;
        }
      };
    function PD(e, t, r) {
      let { setStyle: n } = r;
      DE(e, t, r),
        n(e, t, ""),
        t === Me.TRANSFORM_PREFIXED && n(e, Me.TRANSFORM_STYLE_PREFIXED, "");
    }
    function GE(e) {
      let t = 0,
        r = 0;
      return (
        e.forEach((n, i) => {
          let { config: o } = n,
            s = o.delay + o.duration;
          s >= t && ((t = s), (r = i));
        }),
        r
      );
    }
    function MD(e, t) {
      let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
        { actionItem: i, verboseTimeElapsed: o = 0 } = t,
        s = 0,
        a = 0;
      return (
        r.forEach((c, d) => {
          if (n && d === 0) return;
          let { actionItems: _ } = c,
            h = _[GE(_)],
            { config: y, actionTypeId: A } = h;
          i.id === h.id && (a = s + o);
          let C = ME(A) === Ga ? 0 : y.duration;
          s += y.delay + C;
        }),
        s > 0 ? (0, FM.optimizeFloat)(a / s) : 0
      );
    }
    function DD({ actionList: e, actionItemId: t, rawData: r }) {
      let { actionItemGroups: n, continuousParameterGroups: i } = e,
        o = [],
        s = (a) => (
          o.push((0, yE.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
          a.id === t
        );
      return (
        n && n.some(({ actionItems: a }) => a.some(s)),
        i &&
          i.some((a) => {
            let { continuousActionGroups: c } = a;
            return c.some(({ actionItems: d }) => d.some(s));
          }),
        (0, yE.setIn)(r, ["actionLists"], {
          [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
        })
      );
    }
    function FD(e, { basedOn: t }) {
      return (
        (e === Ut.EventTypeConsts.SCROLLING_IN_VIEW &&
          (t === Ut.EventBasedOn.ELEMENT || t == null)) ||
        (e === Ut.EventTypeConsts.MOUSE_MOVE && t === Ut.EventBasedOn.ELEMENT)
      );
    }
    function GD(e, t) {
      return e + ZM + t;
    }
    function XD(e, t) {
      return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function UD(e, t) {
      return (0, RE.default)(e && e.sort(), t && t.sort());
    }
    function VD(e) {
      if (typeof e == "string") return e;
      let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
      return t + mE + r + mE + n;
    }
  });
  var Wt = u((De) => {
    "use strict";
    var Ir = zt().default;
    Object.defineProperty(De, "__esModule", { value: !0 });
    De.IX2VanillaUtils =
      De.IX2VanillaPlugins =
      De.IX2ElementsReducer =
      De.IX2Easings =
      De.IX2EasingUtils =
      De.IX2BrowserSupport =
        void 0;
    var WD = Ir(ti());
    De.IX2BrowserSupport = WD;
    var BD = Ir(Ca());
    De.IX2Easings = BD;
    var HD = Ir(xa());
    De.IX2EasingUtils = HD;
    var kD = Ir(zh());
    De.IX2ElementsReducer = kD;
    var jD = Ir(La());
    De.IX2VanillaPlugins = jD;
    var KD = Ir(XE());
    De.IX2VanillaUtils = KD;
  });
  var BE = u((di) => {
    "use strict";
    Object.defineProperty(di, "__esModule", { value: !0 });
    di.ixInstances = void 0;
    var UE = Ge(),
      VE = Wt(),
      Tr = rr(),
      {
        IX2_RAW_DATA_IMPORTED: zD,
        IX2_SESSION_STOPPED: YD,
        IX2_INSTANCE_ADDED: QD,
        IX2_INSTANCE_STARTED: $D,
        IX2_INSTANCE_REMOVED: ZD,
        IX2_ANIMATION_FRAME_CHANGED: JD,
      } = UE.IX2EngineActionTypes,
      {
        optimizeFloat: fi,
        applyEasing: WE,
        createBezierEasing: e1,
      } = VE.IX2EasingUtils,
      { RENDER_GENERAL: t1 } = UE.IX2EngineConstants,
      {
        getItemConfigByKey: Ba,
        getRenderType: r1,
        getStyleProp: n1,
      } = VE.IX2VanillaUtils,
      i1 = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: i,
            destinationKeys: o,
            smoothing: s,
            restingValue: a,
            actionTypeId: c,
            customEasingFn: d,
            skipMotion: _,
            skipToValue: h,
          } = e,
          { parameters: y } = t.payload,
          A = Math.max(1 - s, 0.01),
          C = y[n];
        C == null && ((A = 1), (C = a));
        let w = Math.max(C, 0) || 0,
          L = fi(w - r),
          N = _ ? h : fi(r + L * A),
          x = N * 100;
        if (N === r && e.current) return e;
        let b, X, D, q;
        for (let j = 0, { length: k } = i; j < k; j++) {
          let { keyframe: oe, actionItems: J } = i[j];
          if ((j === 0 && (b = J[0]), x >= oe)) {
            b = J[0];
            let F = i[j + 1],
              T = F && x !== oe;
            (X = T ? F.actionItems[0] : null),
              T && ((D = oe / 100), (q = (F.keyframe - oe) / 100));
          }
        }
        let V = {};
        if (b && !X)
          for (let j = 0, { length: k } = o; j < k; j++) {
            let oe = o[j];
            V[oe] = Ba(c, oe, b.config);
          }
        else if (b && X && D !== void 0 && q !== void 0) {
          let j = (N - D) / q,
            k = b.config.easing,
            oe = WE(k, j, d);
          for (let J = 0, { length: F } = o; J < F; J++) {
            let T = o[J],
              P = Ba(c, T, b.config),
              Q = (Ba(c, T, X.config) - P) * oe + P;
            V[T] = Q;
          }
        }
        return (0, Tr.merge)(e, { position: N, current: V });
      },
      o1 = (e, t) => {
        let {
            active: r,
            origin: n,
            start: i,
            immediate: o,
            renderType: s,
            verbose: a,
            actionItem: c,
            destination: d,
            destinationKeys: _,
            pluginDuration: h,
            instanceDelay: y,
            customEasingFn: A,
            skipMotion: C,
          } = e,
          w = c.config.easing,
          { duration: L, delay: N } = c.config;
        h != null && (L = h),
          (N = y ?? N),
          s === t1 ? (L = 0) : (o || C) && (L = N = 0);
        let { now: x } = t.payload;
        if (r && n) {
          let b = x - (i + N);
          if (a) {
            let j = x - i,
              k = L + N,
              oe = fi(Math.min(Math.max(0, j / k), 1));
            e = (0, Tr.set)(e, "verboseTimeElapsed", k * oe);
          }
          if (b < 0) return e;
          let X = fi(Math.min(Math.max(0, b / L), 1)),
            D = WE(w, X, A),
            q = {},
            V = null;
          return (
            _.length &&
              (V = _.reduce((j, k) => {
                let oe = d[k],
                  J = parseFloat(n[k]) || 0,
                  T = (parseFloat(oe) - J) * D + J;
                return (j[k] = T), j;
              }, {})),
            (q.current = V),
            (q.position = X),
            X === 1 && ((q.active = !1), (q.complete = !0)),
            (0, Tr.merge)(e, q)
          );
        }
        return e;
      },
      a1 = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case zD:
            return t.payload.ixInstances || Object.freeze({});
          case YD:
            return Object.freeze({});
          case QD: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: i,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: c,
                groupIndex: d,
                isCarrier: _,
                origin: h,
                destination: y,
                immediate: A,
                verbose: C,
                continuous: w,
                parameterId: L,
                actionGroups: N,
                smoothing: x,
                restingValue: b,
                pluginInstance: X,
                pluginDuration: D,
                instanceDelay: q,
                skipMotion: V,
                skipToValue: j,
              } = t.payload,
              { actionTypeId: k } = i,
              oe = r1(k),
              J = n1(oe, k),
              F = Object.keys(y).filter((P) => y[P] != null),
              { easing: T } = i.config;
            return (0, Tr.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: h,
              destination: y,
              destinationKeys: F,
              immediate: A,
              verbose: C,
              current: null,
              actionItem: i,
              actionTypeId: k,
              eventId: o,
              eventTarget: s,
              eventStateKey: a,
              actionListId: c,
              groupIndex: d,
              renderType: oe,
              isCarrier: _,
              styleProp: J,
              continuous: w,
              parameterId: L,
              actionGroups: N,
              smoothing: x,
              restingValue: b,
              pluginInstance: X,
              pluginDuration: D,
              instanceDelay: q,
              skipMotion: V,
              skipToValue: j,
              customEasingFn:
                Array.isArray(T) && T.length === 4 ? e1(T) : void 0,
            });
          }
          case $D: {
            let { instanceId: r, time: n } = t.payload;
            return (0, Tr.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case ZD: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              i = Object.keys(e),
              { length: o } = i;
            for (let s = 0; s < o; s++) {
              let a = i[s];
              a !== r && (n[a] = e[a]);
            }
            return n;
          }
          case JD: {
            let r = e,
              n = Object.keys(e),
              { length: i } = n;
            for (let o = 0; o < i; o++) {
              let s = n[o],
                a = e[s],
                c = a.continuous ? i1 : o1;
              r = (0, Tr.set)(r, s, c(a, t));
            }
            return r;
          }
          default:
            return e;
        }
      };
    di.ixInstances = a1;
  });
  var HE = u((pi) => {
    "use strict";
    Object.defineProperty(pi, "__esModule", { value: !0 });
    pi.ixParameters = void 0;
    var s1 = Ge(),
      {
        IX2_RAW_DATA_IMPORTED: u1,
        IX2_SESSION_STOPPED: c1,
        IX2_PARAMETER_CHANGED: l1,
      } = s1.IX2EngineActionTypes,
      f1 = (e = {}, t) => {
        switch (t.type) {
          case u1:
            return t.payload.ixParameters || {};
          case c1:
            return {};
          case l1: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      };
    pi.ixParameters = f1;
  });
  var kE = u((vi) => {
    "use strict";
    Object.defineProperty(vi, "__esModule", { value: !0 });
    vi.default = void 0;
    var d1 = jo(),
      p1 = df(),
      v1 = xf(),
      h1 = Lf(),
      E1 = Wt(),
      g1 = BE(),
      _1 = HE(),
      { ixElements: y1 } = E1.IX2ElementsReducer,
      I1 = (0, d1.combineReducers)({
        ixData: p1.ixData,
        ixRequest: v1.ixRequest,
        ixSession: h1.ixSession,
        ixElements: y1,
        ixInstances: g1.ixInstances,
        ixParameters: _1.ixParameters,
      });
    vi.default = I1;
  });
  var jE = u((Uk, tn) => {
    function T1(e, t) {
      if (e == null) return {};
      var r = {},
        n = Object.keys(e),
        i,
        o;
      for (o = 0; o < n.length; o++)
        (i = n[o]), !(t.indexOf(i) >= 0) && (r[i] = e[i]);
      return r;
    }
    (tn.exports = T1),
      (tn.exports.__esModule = !0),
      (tn.exports.default = tn.exports);
  });
  var zE = u((Vk, KE) => {
    var m1 = bt(),
      O1 = Re(),
      b1 = gt(),
      S1 = "[object String]";
    function A1(e) {
      return typeof e == "string" || (!O1(e) && b1(e) && m1(e) == S1);
    }
    KE.exports = A1;
  });
  var QE = u((Wk, YE) => {
    var w1 = Oa(),
      R1 = w1("length");
    YE.exports = R1;
  });
  var ZE = u((Bk, $E) => {
    var C1 = "\\ud800-\\udfff",
      N1 = "\\u0300-\\u036f",
      x1 = "\\ufe20-\\ufe2f",
      q1 = "\\u20d0-\\u20ff",
      L1 = N1 + x1 + q1,
      P1 = "\\ufe0e\\ufe0f",
      M1 = "\\u200d",
      D1 = RegExp("[" + M1 + C1 + L1 + P1 + "]");
    function F1(e) {
      return D1.test(e);
    }
    $E.exports = F1;
  });
  var sg = u((Hk, ag) => {
    var eg = "\\ud800-\\udfff",
      G1 = "\\u0300-\\u036f",
      X1 = "\\ufe20-\\ufe2f",
      U1 = "\\u20d0-\\u20ff",
      V1 = G1 + X1 + U1,
      W1 = "\\ufe0e\\ufe0f",
      B1 = "[" + eg + "]",
      Ha = "[" + V1 + "]",
      ka = "\\ud83c[\\udffb-\\udfff]",
      H1 = "(?:" + Ha + "|" + ka + ")",
      tg = "[^" + eg + "]",
      rg = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      ng = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      k1 = "\\u200d",
      ig = H1 + "?",
      og = "[" + W1 + "]?",
      j1 = "(?:" + k1 + "(?:" + [tg, rg, ng].join("|") + ")" + og + ig + ")*",
      K1 = og + ig + j1,
      z1 = "(?:" + [tg + Ha + "?", Ha, rg, ng, B1].join("|") + ")",
      JE = RegExp(ka + "(?=" + ka + ")|" + z1 + K1, "g");
    function Y1(e) {
      for (var t = (JE.lastIndex = 0); JE.test(e); ) ++t;
      return t;
    }
    ag.exports = Y1;
  });
  var cg = u((kk, ug) => {
    var Q1 = QE(),
      $1 = ZE(),
      Z1 = sg();
    function J1(e) {
      return $1(e) ? Z1(e) : Q1(e);
    }
    ug.exports = J1;
  });
  var fg = u((jk, lg) => {
    var eF = jn(),
      tF = Kn(),
      rF = Dt(),
      nF = zE(),
      iF = cg(),
      oF = "[object Map]",
      aF = "[object Set]";
    function sF(e) {
      if (e == null) return 0;
      if (rF(e)) return nF(e) ? iF(e) : e.length;
      var t = tF(e);
      return t == oF || t == aF ? e.size : eF(e).length;
    }
    lg.exports = sF;
  });
  var pg = u((Kk, dg) => {
    var uF = "Expected a function";
    function cF(e) {
      if (typeof e != "function") throw new TypeError(uF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    dg.exports = cF;
  });
  var ja = u((zk, vg) => {
    var lF = St(),
      fF = (function () {
        try {
          var e = lF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    vg.exports = fF;
  });
  var Ka = u((Yk, Eg) => {
    var hg = ja();
    function dF(e, t, r) {
      t == "__proto__" && hg
        ? hg(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Eg.exports = dF;
  });
  var _g = u((Qk, gg) => {
    var pF = Ka(),
      vF = Dn(),
      hF = Object.prototype,
      EF = hF.hasOwnProperty;
    function gF(e, t, r) {
      var n = e[t];
      (!(EF.call(e, t) && vF(n, r)) || (r === void 0 && !(t in e))) &&
        pF(e, t, r);
    }
    gg.exports = gF;
  });
  var Tg = u(($k, Ig) => {
    var _F = _g(),
      yF = jr(),
      IF = Wn(),
      yg = ct(),
      TF = lr();
    function mF(e, t, r, n) {
      if (!yg(e)) return e;
      t = yF(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var c = TF(t[i]),
          d = r;
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return e;
        if (i != s) {
          var _ = a[c];
          (d = n ? n(_, c, a) : void 0),
            d === void 0 && (d = yg(_) ? _ : IF(t[i + 1]) ? [] : {});
        }
        _F(a, c, d), (a = a[c]);
      }
      return e;
    }
    Ig.exports = mF;
  });
  var Og = u((Zk, mg) => {
    var OF = Qn(),
      bF = Tg(),
      SF = jr();
    function AF(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = OF(e, s);
        r(a, s) && bF(o, SF(s, e), a);
      }
      return o;
    }
    mg.exports = AF;
  });
  var Sg = u((Jk, bg) => {
    var wF = Un(),
      RF = Lo(),
      CF = ua(),
      NF = sa(),
      xF = Object.getOwnPropertySymbols,
      qF = xF
        ? function (e) {
            for (var t = []; e; ) wF(t, CF(e)), (e = RF(e));
            return t;
          }
        : NF;
    bg.exports = qF;
  });
  var wg = u((ej, Ag) => {
    function LF(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    Ag.exports = LF;
  });
  var Cg = u((tj, Rg) => {
    var PF = ct(),
      MF = kn(),
      DF = wg(),
      FF = Object.prototype,
      GF = FF.hasOwnProperty;
    function XF(e) {
      if (!PF(e)) return DF(e);
      var t = MF(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !GF.call(e, n))) || r.push(n);
      return r;
    }
    Rg.exports = XF;
  });
  var xg = u((rj, Ng) => {
    var UF = la(),
      VF = Cg(),
      WF = Dt();
    function BF(e) {
      return WF(e) ? UF(e, !0) : VF(e);
    }
    Ng.exports = BF;
  });
  var Lg = u((nj, qg) => {
    var HF = aa(),
      kF = Sg(),
      jF = xg();
    function KF(e) {
      return HF(e, jF, kF);
    }
    qg.exports = KF;
  });
  var Mg = u((ij, Pg) => {
    var zF = ma(),
      YF = At(),
      QF = Og(),
      $F = Lg();
    function ZF(e, t) {
      if (e == null) return {};
      var r = zF($F(e), function (n) {
        return [n];
      });
      return (
        (t = YF(t)),
        QF(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    Pg.exports = ZF;
  });
  var Fg = u((oj, Dg) => {
    var JF = At(),
      e2 = pg(),
      t2 = Mg();
    function r2(e, t) {
      return t2(e, e2(JF(t)));
    }
    Dg.exports = r2;
  });
  var Xg = u((aj, Gg) => {
    var n2 = jn(),
      i2 = Kn(),
      o2 = Ur(),
      a2 = Re(),
      s2 = Dt(),
      u2 = Vn(),
      c2 = kn(),
      l2 = Hn(),
      f2 = "[object Map]",
      d2 = "[object Set]",
      p2 = Object.prototype,
      v2 = p2.hasOwnProperty;
    function h2(e) {
      if (e == null) return !0;
      if (
        s2(e) &&
        (a2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          u2(e) ||
          l2(e) ||
          o2(e))
      )
        return !e.length;
      var t = i2(e);
      if (t == f2 || t == d2) return !e.size;
      if (c2(e)) return !n2(e).length;
      for (var r in e) if (v2.call(e, r)) return !1;
      return !0;
    }
    Gg.exports = h2;
  });
  var Vg = u((sj, Ug) => {
    var E2 = Ka(),
      g2 = Pa(),
      _2 = At();
    function y2(e, t) {
      var r = {};
      return (
        (t = _2(t, 3)),
        g2(e, function (n, i, o) {
          E2(r, i, t(n, i, o));
        }),
        r
      );
    }
    Ug.exports = y2;
  });
  var Bg = u((uj, Wg) => {
    function I2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    Wg.exports = I2;
  });
  var kg = u((cj, Hg) => {
    var T2 = Zn();
    function m2(e) {
      return typeof e == "function" ? e : T2;
    }
    Hg.exports = m2;
  });
  var Kg = u((lj, jg) => {
    var O2 = Bg(),
      b2 = Ma(),
      S2 = kg(),
      A2 = Re();
    function w2(e, t) {
      var r = A2(e) ? O2 : b2;
      return r(e, S2(t));
    }
    jg.exports = w2;
  });
  var Yg = u((fj, zg) => {
    var R2 = $e(),
      C2 = function () {
        return R2.Date.now();
      };
    zg.exports = C2;
  });
  var Zg = u((dj, $g) => {
    var N2 = ct(),
      za = Yg(),
      Qg = Jn(),
      x2 = "Expected a function",
      q2 = Math.max,
      L2 = Math.min;
    function P2(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        c,
        d = 0,
        _ = !1,
        h = !1,
        y = !0;
      if (typeof e != "function") throw new TypeError(x2);
      (t = Qg(t) || 0),
        N2(r) &&
          ((_ = !!r.leading),
          (h = "maxWait" in r),
          (o = h ? q2(Qg(r.maxWait) || 0, t) : o),
          (y = "trailing" in r ? !!r.trailing : y));
      function A(q) {
        var V = n,
          j = i;
        return (n = i = void 0), (d = q), (s = e.apply(j, V)), s;
      }
      function C(q) {
        return (d = q), (a = setTimeout(N, t)), _ ? A(q) : s;
      }
      function w(q) {
        var V = q - c,
          j = q - d,
          k = t - V;
        return h ? L2(k, o - j) : k;
      }
      function L(q) {
        var V = q - c,
          j = q - d;
        return c === void 0 || V >= t || V < 0 || (h && j >= o);
      }
      function N() {
        var q = za();
        if (L(q)) return x(q);
        a = setTimeout(N, w(q));
      }
      function x(q) {
        return (a = void 0), y && n ? A(q) : ((n = i = void 0), s);
      }
      function b() {
        a !== void 0 && clearTimeout(a), (d = 0), (n = c = i = a = void 0);
      }
      function X() {
        return a === void 0 ? s : x(za());
      }
      function D() {
        var q = za(),
          V = L(q);
        if (((n = arguments), (i = this), (c = q), V)) {
          if (a === void 0) return C(c);
          if (h) return clearTimeout(a), (a = setTimeout(N, t)), A(c);
        }
        return a === void 0 && (a = setTimeout(N, t)), s;
      }
      return (D.cancel = b), (D.flush = X), D;
    }
    $g.exports = P2;
  });
  var e_ = u((pj, Jg) => {
    var M2 = Zg(),
      D2 = ct(),
      F2 = "Expected a function";
    function G2(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(F2);
      return (
        D2(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        M2(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    Jg.exports = G2;
  });
  var hi = u((ie) => {
    "use strict";
    var X2 = at().default;
    Object.defineProperty(ie, "__esModule", { value: !0 });
    ie.viewportWidthChanged =
      ie.testFrameRendered =
      ie.stopRequested =
      ie.sessionStopped =
      ie.sessionStarted =
      ie.sessionInitialized =
      ie.rawDataImported =
      ie.previewRequested =
      ie.playbackRequested =
      ie.parameterChanged =
      ie.mediaQueriesDefined =
      ie.instanceStarted =
      ie.instanceRemoved =
      ie.instanceAdded =
      ie.eventStateChanged =
      ie.eventListenerAdded =
      ie.elementStateChanged =
      ie.clearRequested =
      ie.animationFrameChanged =
      ie.actionListPlaybackChanged =
        void 0;
    var t_ = X2(Mr()),
      r_ = Ge(),
      U2 = Wt(),
      {
        IX2_RAW_DATA_IMPORTED: V2,
        IX2_SESSION_INITIALIZED: W2,
        IX2_SESSION_STARTED: B2,
        IX2_SESSION_STOPPED: H2,
        IX2_PREVIEW_REQUESTED: k2,
        IX2_PLAYBACK_REQUESTED: j2,
        IX2_STOP_REQUESTED: K2,
        IX2_CLEAR_REQUESTED: z2,
        IX2_EVENT_LISTENER_ADDED: Y2,
        IX2_TEST_FRAME_RENDERED: Q2,
        IX2_EVENT_STATE_CHANGED: $2,
        IX2_ANIMATION_FRAME_CHANGED: Z2,
        IX2_PARAMETER_CHANGED: J2,
        IX2_INSTANCE_ADDED: eG,
        IX2_INSTANCE_STARTED: tG,
        IX2_INSTANCE_REMOVED: rG,
        IX2_ELEMENT_STATE_CHANGED: nG,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: iG,
        IX2_VIEWPORT_WIDTH_CHANGED: oG,
        IX2_MEDIA_QUERIES_DEFINED: aG,
      } = r_.IX2EngineActionTypes,
      { reifyState: sG } = U2.IX2VanillaUtils,
      uG = (e) => ({ type: V2, payload: (0, t_.default)({}, sG(e)) });
    ie.rawDataImported = uG;
    var cG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
      type: W2,
      payload: { hasBoundaryNodes: e, reducedMotion: t },
    });
    ie.sessionInitialized = cG;
    var lG = () => ({ type: B2 });
    ie.sessionStarted = lG;
    var fG = () => ({ type: H2 });
    ie.sessionStopped = fG;
    var dG = ({ rawData: e, defer: t }) => ({
      type: k2,
      payload: { defer: t, rawData: e },
    });
    ie.previewRequested = dG;
    var pG = ({
      actionTypeId: e = r_.ActionTypeConsts.GENERAL_START_ACTION,
      actionListId: t,
      actionItemId: r,
      eventId: n,
      allowEvents: i,
      immediate: o,
      testManual: s,
      verbose: a,
      rawData: c,
    }) => ({
      type: j2,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: r,
        testManual: s,
        eventId: n,
        allowEvents: i,
        immediate: o,
        verbose: a,
        rawData: c,
      },
    });
    ie.playbackRequested = pG;
    var vG = (e) => ({ type: K2, payload: { actionListId: e } });
    ie.stopRequested = vG;
    var hG = () => ({ type: z2 });
    ie.clearRequested = hG;
    var EG = (e, t) => ({
      type: Y2,
      payload: { target: e, listenerParams: t },
    });
    ie.eventListenerAdded = EG;
    var gG = (e = 1) => ({ type: Q2, payload: { step: e } });
    ie.testFrameRendered = gG;
    var _G = (e, t) => ({ type: $2, payload: { stateKey: e, newState: t } });
    ie.eventStateChanged = _G;
    var yG = (e, t) => ({ type: Z2, payload: { now: e, parameters: t } });
    ie.animationFrameChanged = yG;
    var IG = (e, t) => ({ type: J2, payload: { key: e, value: t } });
    ie.parameterChanged = IG;
    var TG = (e) => ({ type: eG, payload: (0, t_.default)({}, e) });
    ie.instanceAdded = TG;
    var mG = (e, t) => ({ type: tG, payload: { instanceId: e, time: t } });
    ie.instanceStarted = mG;
    var OG = (e) => ({ type: rG, payload: { instanceId: e } });
    ie.instanceRemoved = OG;
    var bG = (e, t, r, n) => ({
      type: nG,
      payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
    });
    ie.elementStateChanged = bG;
    var SG = ({ actionListId: e, isPlaying: t }) => ({
      type: iG,
      payload: { actionListId: e, isPlaying: t },
    });
    ie.actionListPlaybackChanged = SG;
    var AG = ({ width: e, mediaQueries: t }) => ({
      type: oG,
      payload: { width: e, mediaQueries: t },
    });
    ie.viewportWidthChanged = AG;
    var wG = () => ({ type: aG });
    ie.mediaQueriesDefined = wG;
  });
  var o_ = u((Ne) => {
    "use strict";
    Object.defineProperty(Ne, "__esModule", { value: !0 });
    Ne.elementContains = XG;
    Ne.getChildElements = VG;
    Ne.getClosestElement = void 0;
    Ne.getProperty = PG;
    Ne.getQuerySelector = DG;
    Ne.getRefType = HG;
    Ne.getSiblingElements = WG;
    Ne.getStyle = LG;
    Ne.getValidDocument = FG;
    Ne.isSiblingNode = UG;
    Ne.matchSelector = MG;
    Ne.queryDocument = GG;
    Ne.setStyle = qG;
    var RG = Wt(),
      CG = Ge(),
      { ELEMENT_MATCHES: Ya } = RG.IX2BrowserSupport,
      {
        IX2_ID_DELIMITER: n_,
        HTML_ELEMENT: NG,
        PLAIN_OBJECT: xG,
        WF_PAGE: i_,
      } = CG.IX2EngineConstants;
    function qG(e, t, r) {
      e.style[t] = r;
    }
    function LG(e, t) {
      return e.style[t];
    }
    function PG(e, t) {
      return e[t];
    }
    function MG(e) {
      return (t) => t[Ya](e);
    }
    function DG({ id: e, selector: t }) {
      if (e) {
        let r = e;
        if (e.indexOf(n_) !== -1) {
          let n = e.split(n_),
            i = n[0];
          if (((r = n[1]), i !== document.documentElement.getAttribute(i_)))
            return null;
        }
        return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
      }
      return t;
    }
    function FG(e) {
      return e == null || e === document.documentElement.getAttribute(i_)
        ? document
        : null;
    }
    function GG(e, t) {
      return Array.prototype.slice.call(
        document.querySelectorAll(t ? e + " " + t : e)
      );
    }
    function XG(e, t) {
      return e.contains(t);
    }
    function UG(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function VG(e) {
      let t = [];
      for (let r = 0, { length: n } = e || []; r < n; r++) {
        let { children: i } = e[r],
          { length: o } = i;
        if (o) for (let s = 0; s < o; s++) t.push(i[s]);
      }
      return t;
    }
    function WG(e = []) {
      let t = [],
        r = [];
      for (let n = 0, { length: i } = e; n < i; n++) {
        let { parentNode: o } = e[n];
        if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
          continue;
        r.push(o);
        let s = o.firstElementChild;
        for (; s != null; )
          e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
      }
      return t;
    }
    var BG = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[Ya] && r[Ya](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
    Ne.getClosestElement = BG;
    function HG(e) {
      return e != null && typeof e == "object"
        ? e instanceof Element
          ? NG
          : xG
        : null;
    }
  });
  var Qa = u((Ej, s_) => {
    var kG = ct(),
      a_ = Object.create,
      jG = (function () {
        function e() {}
        return function (t) {
          if (!kG(t)) return {};
          if (a_) return a_(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    s_.exports = jG;
  });
  var Ei = u((gj, u_) => {
    function KG() {}
    u_.exports = KG;
  });
  var _i = u((_j, c_) => {
    var zG = Qa(),
      YG = Ei();
    function gi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    gi.prototype = zG(YG.prototype);
    gi.prototype.constructor = gi;
    c_.exports = gi;
  });
  var p_ = u((yj, d_) => {
    var l_ = Zt(),
      QG = Ur(),
      $G = Re(),
      f_ = l_ ? l_.isConcatSpreadable : void 0;
    function ZG(e) {
      return $G(e) || QG(e) || !!(f_ && e && e[f_]);
    }
    d_.exports = ZG;
  });
  var E_ = u((Ij, h_) => {
    var JG = Un(),
      eX = p_();
    function v_(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = eX), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? v_(a, t - 1, r, n, i)
            : JG(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    h_.exports = v_;
  });
  var __ = u((Tj, g_) => {
    var tX = E_();
    function rX(e) {
      var t = e == null ? 0 : e.length;
      return t ? tX(e, 1) : [];
    }
    g_.exports = rX;
  });
  var I_ = u((mj, y_) => {
    function nX(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    y_.exports = nX;
  });
  var O_ = u((Oj, m_) => {
    var iX = I_(),
      T_ = Math.max;
    function oX(e, t, r) {
      return (
        (t = T_(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = T_(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), iX(e, this, a);
        }
      );
    }
    m_.exports = oX;
  });
  var S_ = u((bj, b_) => {
    function aX(e) {
      return function () {
        return e;
      };
    }
    b_.exports = aX;
  });
  var R_ = u((Sj, w_) => {
    var sX = S_(),
      A_ = ja(),
      uX = Zn(),
      cX = A_
        ? function (e, t) {
            return A_(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: sX(t),
              writable: !0,
            });
          }
        : uX;
    w_.exports = cX;
  });
  var N_ = u((Aj, C_) => {
    var lX = 800,
      fX = 16,
      dX = Date.now;
    function pX(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = dX(),
          i = fX - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= lX) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    C_.exports = pX;
  });
  var q_ = u((wj, x_) => {
    var vX = R_(),
      hX = N_(),
      EX = hX(vX);
    x_.exports = EX;
  });
  var P_ = u((Rj, L_) => {
    var gX = __(),
      _X = O_(),
      yX = q_();
    function IX(e) {
      return yX(_X(e, void 0, gX), e + "");
    }
    L_.exports = IX;
  });
  var F_ = u((Cj, D_) => {
    var M_ = fa(),
      TX = M_ && new M_();
    D_.exports = TX;
  });
  var X_ = u((Nj, G_) => {
    function mX() {}
    G_.exports = mX;
  });
  var $a = u((xj, V_) => {
    var U_ = F_(),
      OX = X_(),
      bX = U_
        ? function (e) {
            return U_.get(e);
          }
        : OX;
    V_.exports = bX;
  });
  var B_ = u((qj, W_) => {
    var SX = {};
    W_.exports = SX;
  });
  var Za = u((Lj, k_) => {
    var H_ = B_(),
      AX = Object.prototype,
      wX = AX.hasOwnProperty;
    function RX(e) {
      for (
        var t = e.name + "", r = H_[t], n = wX.call(H_, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    k_.exports = RX;
  });
  var Ii = u((Pj, j_) => {
    var CX = Qa(),
      NX = Ei(),
      xX = 4294967295;
    function yi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = xX),
        (this.__views__ = []);
    }
    yi.prototype = CX(NX.prototype);
    yi.prototype.constructor = yi;
    j_.exports = yi;
  });
  var z_ = u((Mj, K_) => {
    function qX(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    K_.exports = qX;
  });
  var Q_ = u((Dj, Y_) => {
    var LX = Ii(),
      PX = _i(),
      MX = z_();
    function DX(e) {
      if (e instanceof LX) return e.clone();
      var t = new PX(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = MX(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    Y_.exports = DX;
  });
  var J_ = u((Fj, Z_) => {
    var FX = Ii(),
      $_ = _i(),
      GX = Ei(),
      XX = Re(),
      UX = gt(),
      VX = Q_(),
      WX = Object.prototype,
      BX = WX.hasOwnProperty;
    function Ti(e) {
      if (UX(e) && !XX(e) && !(e instanceof FX)) {
        if (e instanceof $_) return e;
        if (BX.call(e, "__wrapped__")) return VX(e);
      }
      return new $_(e);
    }
    Ti.prototype = GX.prototype;
    Ti.prototype.constructor = Ti;
    Z_.exports = Ti;
  });
  var ty = u((Gj, ey) => {
    var HX = Ii(),
      kX = $a(),
      jX = Za(),
      KX = J_();
    function zX(e) {
      var t = jX(e),
        r = KX[t];
      if (typeof r != "function" || !(t in HX.prototype)) return !1;
      if (e === r) return !0;
      var n = kX(r);
      return !!n && e === n[0];
    }
    ey.exports = zX;
  });
  var oy = u((Xj, iy) => {
    var ry = _i(),
      YX = P_(),
      QX = $a(),
      Ja = Za(),
      $X = Re(),
      ny = ty(),
      ZX = "Expected a function",
      JX = 8,
      eU = 32,
      tU = 128,
      rU = 256;
    function nU(e) {
      return YX(function (t) {
        var r = t.length,
          n = r,
          i = ry.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(ZX);
          if (i && !s && Ja(o) == "wrapper") var s = new ry([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = Ja(o),
            c = a == "wrapper" ? QX(o) : void 0;
          c &&
          ny(c[0]) &&
          c[1] == (tU | JX | eU | rU) &&
          !c[4].length &&
          c[9] == 1
            ? (s = s[Ja(c[0])].apply(s, c[3]))
            : (s = o.length == 1 && ny(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var d = arguments,
            _ = d[0];
          if (s && d.length == 1 && $X(_)) return s.plant(_).value();
          for (var h = 0, y = r ? t[h].apply(this, d) : _; ++h < r; )
            y = t[h].call(this, y);
          return y;
        };
      });
    }
    iy.exports = nU;
  });
  var sy = u((Uj, ay) => {
    var iU = oy(),
      oU = iU();
    ay.exports = oU;
  });
  var cy = u((Vj, uy) => {
    function aU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    uy.exports = aU;
  });
  var fy = u((Wj, ly) => {
    var sU = cy(),
      es = Jn();
    function uU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = es(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = es(t)), (t = t === t ? t : 0)),
        sU(es(e), t, r)
      );
    }
    ly.exports = uU;
  });
  var Cy = u((Ai) => {
    "use strict";
    var Si = at().default;
    Object.defineProperty(Ai, "__esModule", { value: !0 });
    Ai.default = void 0;
    var He = Si(Mr()),
      cU = Si(sy()),
      lU = Si($n()),
      fU = Si(fy()),
      Bt = Ge(),
      ts = os(),
      mi = hi(),
      dU = Wt(),
      {
        MOUSE_CLICK: pU,
        MOUSE_SECOND_CLICK: vU,
        MOUSE_DOWN: hU,
        MOUSE_UP: EU,
        MOUSE_OVER: gU,
        MOUSE_OUT: _U,
        DROPDOWN_CLOSE: yU,
        DROPDOWN_OPEN: IU,
        SLIDER_ACTIVE: TU,
        SLIDER_INACTIVE: mU,
        TAB_ACTIVE: OU,
        TAB_INACTIVE: bU,
        NAVBAR_CLOSE: SU,
        NAVBAR_OPEN: AU,
        MOUSE_MOVE: wU,
        PAGE_SCROLL_DOWN: Iy,
        SCROLL_INTO_VIEW: Ty,
        SCROLL_OUT_OF_VIEW: RU,
        PAGE_SCROLL_UP: CU,
        SCROLLING_IN_VIEW: NU,
        PAGE_FINISH: my,
        ECOMMERCE_CART_CLOSE: xU,
        ECOMMERCE_CART_OPEN: qU,
        PAGE_START: Oy,
        PAGE_SCROLL: LU,
      } = Bt.EventTypeConsts,
      rs = "COMPONENT_ACTIVE",
      by = "COMPONENT_INACTIVE",
      { COLON_DELIMITER: dy } = Bt.IX2EngineConstants,
      { getNamespacedParameterId: py } = dU.IX2VanillaUtils,
      Sy = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
      nn = Sy(({ element: e, nativeEvent: t }) => e === t.target),
      PU = Sy(({ element: e, nativeEvent: t }) => e.contains(t.target)),
      pt = (0, cU.default)([nn, PU]),
      Ay = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            i = n[t];
          if (i && !DU[i.eventTypeId]) return i;
        }
        return null;
      },
      MU = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!Ay(e, n);
      },
      Ue = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
        let { action: o, id: s } = t,
          { actionListId: a, autoStopEventId: c } = o.config,
          d = Ay(e, c);
        return (
          d &&
            (0, ts.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: r,
              eventStateKey: c + dy + n.split(dy)[1],
              actionListId: (0, lU.default)(d, "action.config.actionListId"),
            }),
          (0, ts.stopActionGroup)({
            store: e,
            eventId: s,
            eventTarget: r,
            eventStateKey: n,
            actionListId: a,
          }),
          (0, ts.startActionGroup)({
            store: e,
            eventId: s,
            eventTarget: r,
            eventStateKey: n,
            actionListId: a,
          }),
          i
        );
      },
      Ze = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
      on = { handler: Ze(pt, Ue) },
      wy = (0, He.default)({}, on, { types: [rs, by].join(" ") }),
      ns = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ],
      vy = "mouseover mouseout",
      is = { types: ns },
      DU = { PAGE_START: Oy, PAGE_FINISH: my },
      rn = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, fU.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })(),
      FU = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        ),
      GU = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: i } = t,
          o = e.contains(n);
        if (r === "mouseover" && o) return !0;
        let s = e.contains(i);
        return !!(r === "mouseout" && o && s);
      },
      XU = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: i } = rn(),
          o = r.scrollOffsetValue,
          c = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
        return FU(t.getBoundingClientRect(), {
          left: 0,
          top: c,
          right: n,
          bottom: i - c,
        });
      },
      Ry = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          i = [rs, by].indexOf(n) !== -1 ? n === rs : r.isActive,
          o = (0, He.default)({}, r, { isActive: i });
        return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
      },
      hy = (e) => (t, r) => {
        let n = { elementHovered: GU(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      },
      UU = (e) => (t, r) => {
        let n = (0, He.default)({}, r, { elementVisible: XU(t) });
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      },
      Ey =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = rn(),
            {
              event: { config: s, eventTypeId: a },
            } = t,
            { scrollOffsetValue: c, scrollOffsetUnit: d } = s,
            _ = d === "PX",
            h = i - o,
            y = Number((n / h).toFixed(2));
          if (r && r.percentTop === y) return r;
          let A = (_ ? c : (o * (c || 0)) / 100) / h,
            C,
            w,
            L = 0;
          r &&
            ((C = y > r.percentTop),
            (w = r.scrollingDown !== C),
            (L = w ? y : r.anchorTop));
          let N = a === Iy ? y >= L + A : y <= L - A,
            x = (0, He.default)({}, r, {
              percentTop: y,
              inBounds: N,
              anchorTop: L,
              scrollingDown: C,
            });
          return (r && N && (w || x.inBounds !== r.inBounds) && e(t, x)) || x;
        },
      VU = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom,
      WU = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      },
      BU = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      },
      gy =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        },
      Oi = (e = !0) =>
        (0, He.default)({}, wy, {
          handler: Ze(
            e ? pt : nn,
            Ry((t, r) => (r.isActive ? on.handler(t, r) : r))
          ),
        }),
      bi = (e = !0) =>
        (0, He.default)({}, wy, {
          handler: Ze(
            e ? pt : nn,
            Ry((t, r) => (r.isActive ? r : on.handler(t, r)))
          ),
        }),
      _y = (0, He.default)({}, is, {
        handler: UU((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: i } = e,
            { ixData: o } = i.getState(),
            { events: s } = o;
          return !s[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === Ty) === r
            ? (Ue(e), (0, He.default)({}, t, { triggered: !0 }))
            : t;
        }),
      }),
      yy = 0.05,
      HU = {
        [TU]: Oi(),
        [mU]: bi(),
        [IU]: Oi(),
        [yU]: bi(),
        [AU]: Oi(!1),
        [SU]: bi(!1),
        [OU]: Oi(),
        [bU]: bi(),
        [qU]: { types: "ecommerce-cart-open", handler: Ze(pt, Ue) },
        [xU]: { types: "ecommerce-cart-close", handler: Ze(pt, Ue) },
        [pU]: {
          types: "click",
          handler: Ze(
            pt,
            gy((e, { clickCount: t }) => {
              MU(e) ? t === 1 && Ue(e) : Ue(e);
            })
          ),
        },
        [vU]: {
          types: "click",
          handler: Ze(
            pt,
            gy((e, { clickCount: t }) => {
              t === 2 && Ue(e);
            })
          ),
        },
        [hU]: (0, He.default)({}, on, { types: "mousedown" }),
        [EU]: (0, He.default)({}, on, { types: "mouseup" }),
        [gU]: {
          types: vy,
          handler: Ze(
            pt,
            hy((e, t) => {
              t.elementHovered && Ue(e);
            })
          ),
        },
        [_U]: {
          types: vy,
          handler: Ze(
            pt,
            hy((e, t) => {
              t.elementHovered || Ue(e);
            })
          ),
        },
        [wU]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: i,
            },
            o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: s,
                selectedAxis: a,
                continuousParameterGroupId: c,
                reverse: d,
                restingState: _ = 0,
              } = r,
              {
                clientX: h = o.clientX,
                clientY: y = o.clientY,
                pageX: A = o.pageX,
                pageY: C = o.pageY,
              } = n,
              w = a === "X_AXIS",
              L = n.type === "mouseout",
              N = _ / 100,
              x = c,
              b = !1;
            switch (s) {
              case Bt.EventBasedOn.VIEWPORT: {
                N = w
                  ? Math.min(h, window.innerWidth) / window.innerWidth
                  : Math.min(y, window.innerHeight) / window.innerHeight;
                break;
              }
              case Bt.EventBasedOn.PAGE: {
                let {
                  scrollLeft: X,
                  scrollTop: D,
                  scrollWidth: q,
                  scrollHeight: V,
                } = rn();
                N = w ? Math.min(X + A, q) / q : Math.min(D + C, V) / V;
                break;
              }
              case Bt.EventBasedOn.ELEMENT:
              default: {
                x = py(i, c);
                let X = n.type.indexOf("mouse") === 0;
                if (X && pt({ element: t, nativeEvent: n }) !== !0) break;
                let D = t.getBoundingClientRect(),
                  { left: q, top: V, width: j, height: k } = D;
                if (!X && !VU({ left: h, top: y }, D)) break;
                (b = !0), (N = w ? (h - q) / j : (y - V) / k);
                break;
              }
            }
            return (
              L && (N > 1 - yy || N < yy) && (N = Math.round(N)),
              (s !== Bt.EventBasedOn.ELEMENT || b || b !== o.elementHovered) &&
                ((N = d ? 1 - N : N),
                e.dispatch((0, mi.parameterChanged)(x, N))),
              { elementHovered: b, clientX: h, clientY: y, pageX: A, pageY: C }
            );
          },
        },
        [LU]: {
          types: ns,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: i, scrollHeight: o, clientHeight: s } = rn(),
              a = i / (o - s);
            (a = n ? 1 - a : a), e.dispatch((0, mi.parameterChanged)(r, a));
          },
        },
        [NU]: {
          types: ns,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            i = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: o,
                scrollTop: s,
                scrollWidth: a,
                scrollHeight: c,
                clientHeight: d,
              } = rn(),
              {
                basedOn: _,
                selectedAxis: h,
                continuousParameterGroupId: y,
                startsEntering: A,
                startsExiting: C,
                addEndOffset: w,
                addStartOffset: L,
                addOffsetValue: N = 0,
                endOffsetValue: x = 0,
              } = r,
              b = h === "X_AXIS";
            if (_ === Bt.EventBasedOn.VIEWPORT) {
              let X = b ? o / a : s / c;
              return (
                X !== i.scrollPercent &&
                  t.dispatch((0, mi.parameterChanged)(y, X)),
                { scrollPercent: X }
              );
            } else {
              let X = py(n, y),
                D = e.getBoundingClientRect(),
                q = (L ? N : 0) / 100,
                V = (w ? x : 0) / 100;
              (q = A ? q : 1 - q), (V = C ? V : 1 - V);
              let j = D.top + Math.min(D.height * q, d),
                oe = D.top + D.height * V - j,
                J = Math.min(d + oe, c),
                T = Math.min(Math.max(0, d - j), J) / J;
              return (
                T !== i.scrollPercent &&
                  t.dispatch((0, mi.parameterChanged)(X, T)),
                { scrollPercent: T }
              );
            }
          },
        },
        [Ty]: _y,
        [RU]: _y,
        [Iy]: (0, He.default)({}, is, {
          handler: Ey((e, t) => {
            t.scrollingDown && Ue(e);
          }),
        }),
        [CU]: (0, He.default)({}, is, {
          handler: Ey((e, t) => {
            t.scrollingDown || Ue(e);
          }),
        }),
        [my]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Ze(nn, WU(Ue)),
        },
        [Oy]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Ze(nn, BU(Ue)),
        },
      };
    Ai.default = HU;
  });
  var os = u((Nt) => {
    "use strict";
    var et = at().default,
      kU = zt().default;
    Object.defineProperty(Nt, "__esModule", { value: !0 });
    Nt.observeRequests = IV;
    Nt.startActionGroup = ds;
    Nt.startEngine = Ni;
    Nt.stopActionGroup = fs;
    Nt.stopAllActionGroups = Gy;
    Nt.stopEngine = xi;
    var jU = et(Mr()),
      KU = et(jE()),
      zU = et(wa()),
      Ct = et($n()),
      YU = et(fg()),
      QU = et(Fg()),
      $U = et(Xg()),
      ZU = et(Vg()),
      an = et(Kg()),
      JU = et(e_()),
      Je = Ge(),
      qy = Wt(),
      Ie = hi(),
      be = kU(o_()),
      eV = et(Cy()),
      tV = ["store", "computedStyle"],
      rV = Object.keys(Je.QuickEffectIds),
      as = (e) => rV.includes(e),
      {
        COLON_DELIMITER: ss,
        BOUNDARY_SELECTOR: wi,
        HTML_ELEMENT: Ly,
        RENDER_GENERAL: nV,
        W_MOD_IX: Ny,
      } = Je.IX2EngineConstants,
      {
        getAffectedElements: Ri,
        getElementId: iV,
        getDestinationValues: us,
        observeStore: Ht,
        getInstanceId: oV,
        renderHTMLElement: aV,
        clearAllStyles: Py,
        getMaxDurationItemIndex: sV,
        getComputedStyle: uV,
        getInstanceOrigin: cV,
        reduceListToGroup: lV,
        shouldNamespaceEventParameter: fV,
        getNamespacedParameterId: dV,
        shouldAllowMediaQuery: Ci,
        cleanupHTMLElement: pV,
        stringifyTarget: vV,
        mediaQueriesEqual: hV,
        shallowEqual: EV,
      } = qy.IX2VanillaUtils,
      {
        isPluginType: cs,
        createPluginInstance: ls,
        getPluginDuration: gV,
      } = qy.IX2VanillaPlugins,
      xy = navigator.userAgent,
      _V = xy.match(/iPad/i) || xy.match(/iPhone/),
      yV = 12;
    function IV(e) {
      Ht({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: OV }),
        Ht({
          store: e,
          select: ({ ixRequest: t }) => t.playback,
          onChange: bV,
        }),
        Ht({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: SV }),
        Ht({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: AV });
    }
    function TV(e) {
      Ht({
        store: e,
        select: ({ ixSession: t }) => t.mediaQueryKey,
        onChange: () => {
          xi(e),
            Py({ store: e, elementApi: be }),
            Ni({ store: e, allowEvents: !0 }),
            My();
        },
      });
    }
    function mV(e, t) {
      let r = Ht({
        store: e,
        select: ({ ixSession: n }) => n.tick,
        onChange: (n) => {
          t(n), r();
        },
      });
    }
    function OV({ rawData: e, defer: t }, r) {
      let n = () => {
        Ni({ store: r, rawData: e, allowEvents: !0 }), My();
      };
      t ? setTimeout(n, 0) : n();
    }
    function My() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function bV(e, t) {
      let {
          actionTypeId: r,
          actionListId: n,
          actionItemId: i,
          eventId: o,
          allowEvents: s,
          immediate: a,
          testManual: c,
          verbose: d = !0,
        } = e,
        { rawData: _ } = e;
      if (n && i && _ && a) {
        let h = _.actionLists[n];
        h && (_ = lV({ actionList: h, actionItemId: i, rawData: _ }));
      }
      if (
        (Ni({ store: t, rawData: _, allowEvents: s, testManual: c }),
        (n && r === Je.ActionTypeConsts.GENERAL_START_ACTION) || as(r))
      ) {
        fs({ store: t, actionListId: n }),
          Fy({ store: t, actionListId: n, eventId: o });
        let h = ds({
          store: t,
          eventId: o,
          actionListId: n,
          immediate: a,
          verbose: d,
        });
        d &&
          h &&
          t.dispatch(
            (0, Ie.actionListPlaybackChanged)({
              actionListId: n,
              isPlaying: !a,
            })
          );
      }
    }
    function SV({ actionListId: e }, t) {
      e ? fs({ store: t, actionListId: e }) : Gy({ store: t }), xi(t);
    }
    function AV(e, t) {
      xi(t), Py({ store: t, elementApi: be });
    }
    function Ni({ store: e, rawData: t, allowEvents: r, testManual: n }) {
      let { ixSession: i } = e.getState();
      t && e.dispatch((0, Ie.rawDataImported)(t)),
        i.active ||
          (e.dispatch(
            (0, Ie.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(wi),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          r &&
            (qV(e),
            wV(),
            e.getState().ixSession.hasDefinedMediaQueries && TV(e)),
          e.dispatch((0, Ie.sessionStarted)()),
          RV(e, n));
    }
    function wV() {
      let { documentElement: e } = document;
      e.className.indexOf(Ny) === -1 && (e.className += ` ${Ny}`);
    }
    function RV(e, t) {
      let r = (n) => {
        let { ixSession: i, ixParameters: o } = e.getState();
        i.active &&
          (e.dispatch((0, Ie.animationFrameChanged)(n, o)),
          t ? mV(e, r) : requestAnimationFrame(r));
      };
      r(window.performance.now());
    }
    function xi(e) {
      let { ixSession: t } = e.getState();
      if (t.active) {
        let { eventListeners: r } = t;
        r.forEach(CV), e.dispatch((0, Ie.sessionStopped)());
      }
    }
    function CV({ target: e, listenerParams: t }) {
      e.removeEventListener.apply(e, t);
    }
    function NV({
      store: e,
      eventStateKey: t,
      eventTarget: r,
      eventId: n,
      eventConfig: i,
      actionListId: o,
      parameterGroup: s,
      smoothing: a,
      restingValue: c,
    }) {
      let { ixData: d, ixSession: _ } = e.getState(),
        { events: h } = d,
        y = h[n],
        { eventTypeId: A } = y,
        C = {},
        w = {},
        L = [],
        { continuousActionGroups: N } = s,
        { id: x } = s;
      fV(A, i) && (x = dV(t, x));
      let b = _.hasBoundaryNodes && r ? be.getClosestElement(r, wi) : null;
      N.forEach((X) => {
        let { keyframe: D, actionItems: q } = X;
        q.forEach((V) => {
          let { actionTypeId: j } = V,
            { target: k } = V.config;
          if (!k) return;
          let oe = k.boundaryMode ? b : null,
            J = vV(k) + ss + j;
          if (((w[J] = xV(w[J], D, V)), !C[J])) {
            C[J] = !0;
            let { config: F } = V;
            Ri({
              config: F,
              event: y,
              eventTarget: r,
              elementRoot: oe,
              elementApi: be,
            }).forEach((T) => {
              L.push({ element: T, key: J });
            });
          }
        });
      }),
        L.forEach(({ element: X, key: D }) => {
          let q = w[D],
            V = (0, Ct.default)(q, "[0].actionItems[0]", {}),
            { actionTypeId: j } = V,
            k = cs(j) ? ls(j)(X, V) : null,
            oe = us({ element: X, actionItem: V, elementApi: be }, k);
          ps({
            store: e,
            element: X,
            eventId: n,
            actionListId: o,
            actionItem: V,
            destination: oe,
            continuous: !0,
            parameterId: x,
            actionGroups: q,
            smoothing: a,
            restingValue: c,
            pluginInstance: k,
          });
        });
    }
    function xV(e = [], t, r) {
      let n = [...e],
        i;
      return (
        n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
        i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
        n[i].actionItems.push(r),
        n
      );
    }
    function qV(e) {
      let { ixData: t } = e.getState(),
        { eventTypeMap: r } = t;
      Dy(e),
        (0, an.default)(r, (i, o) => {
          let s = eV.default[o];
          if (!s) {
            console.warn(`IX2 event type not configured: ${o}`);
            return;
          }
          GV({ logic: s, store: e, events: i });
        });
      let { ixSession: n } = e.getState();
      n.eventListeners.length && PV(e);
    }
    var LV = ["resize", "orientationchange"];
    function PV(e) {
      let t = () => {
        Dy(e);
      };
      LV.forEach((r) => {
        window.addEventListener(r, t),
          e.dispatch((0, Ie.eventListenerAdded)(window, [r, t]));
      }),
        t();
    }
    function Dy(e) {
      let { ixSession: t, ixData: r } = e.getState(),
        n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let { mediaQueries: i } = r;
        e.dispatch((0, Ie.viewportWidthChanged)({ width: n, mediaQueries: i }));
      }
    }
    var MV = (e, t) => (0, QU.default)((0, ZU.default)(e, t), $U.default),
      DV = (e, t) => {
        (0, an.default)(e, (r, n) => {
          r.forEach((i, o) => {
            let s = n + ss + o;
            t(i, n, s);
          });
        });
      },
      FV = (e) => {
        let t = { target: e.target, targets: e.targets };
        return Ri({ config: t, elementApi: be });
      };
    function GV({ logic: e, store: t, events: r }) {
      XV(r);
      let { types: n, handler: i } = e,
        { ixData: o } = t.getState(),
        { actionLists: s } = o,
        a = MV(r, FV);
      if (!(0, YU.default)(a)) return;
      (0, an.default)(a, (h, y) => {
        let A = r[y],
          { action: C, id: w, mediaQueries: L = o.mediaQueryKeys } = A,
          { actionListId: N } = C.config;
        hV(L, o.mediaQueryKeys) || t.dispatch((0, Ie.mediaQueriesDefined)()),
          C.actionTypeId === Je.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
            (Array.isArray(A.config) ? A.config : [A.config]).forEach((b) => {
              let { continuousParameterGroupId: X } = b,
                D = (0, Ct.default)(s, `${N}.continuousParameterGroups`, []),
                q = (0, zU.default)(D, ({ id: k }) => k === X),
                V = (b.smoothing || 0) / 100,
                j = (b.restingState || 0) / 100;
              q &&
                h.forEach((k, oe) => {
                  let J = w + ss + oe;
                  NV({
                    store: t,
                    eventStateKey: J,
                    eventTarget: k,
                    eventId: w,
                    eventConfig: b,
                    actionListId: N,
                    parameterGroup: q,
                    smoothing: V,
                    restingValue: j,
                  });
                });
            }),
          (C.actionTypeId === Je.ActionTypeConsts.GENERAL_START_ACTION ||
            as(C.actionTypeId)) &&
            Fy({ store: t, actionListId: N, eventId: w });
      });
      let c = (h) => {
          let { ixSession: y } = t.getState();
          DV(a, (A, C, w) => {
            let L = r[C],
              N = y.eventState[w],
              { action: x, mediaQueries: b = o.mediaQueryKeys } = L;
            if (!Ci(b, y.mediaQueryKey)) return;
            let X = (D = {}) => {
              let q = i(
                {
                  store: t,
                  element: A,
                  event: L,
                  eventConfig: D,
                  nativeEvent: h,
                  eventStateKey: w,
                },
                N
              );
              EV(q, N) || t.dispatch((0, Ie.eventStateChanged)(w, q));
            };
            x.actionTypeId === Je.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
              ? (Array.isArray(L.config) ? L.config : [L.config]).forEach(X)
              : X();
          });
        },
        d = (0, JU.default)(c, yV),
        _ = ({ target: h = document, types: y, throttle: A }) => {
          y.split(" ")
            .filter(Boolean)
            .forEach((C) => {
              let w = A ? d : c;
              h.addEventListener(C, w),
                t.dispatch((0, Ie.eventListenerAdded)(h, [C, w]));
            });
        };
      Array.isArray(n) ? n.forEach(_) : typeof n == "string" && _(e);
    }
    function XV(e) {
      if (!_V) return;
      let t = {},
        r = "";
      for (let n in e) {
        let { eventTypeId: i, target: o } = e[n],
          s = be.getQuerySelector(o);
        t[s] ||
          ((i === Je.EventTypeConsts.MOUSE_CLICK ||
            i === Je.EventTypeConsts.MOUSE_SECOND_CLICK) &&
            ((t[s] = !0),
            (r += s + "{cursor: pointer;touch-action: manipulation;}")));
      }
      if (r) {
        let n = document.createElement("style");
        (n.textContent = r), document.body.appendChild(n);
      }
    }
    function Fy({ store: e, actionListId: t, eventId: r }) {
      let { ixData: n, ixSession: i } = e.getState(),
        { actionLists: o, events: s } = n,
        a = s[r],
        c = o[t];
      if (c && c.useFirstGroupAsInitialState) {
        let d = (0, Ct.default)(c, "actionItemGroups[0].actionItems", []),
          _ = (0, Ct.default)(a, "mediaQueries", n.mediaQueryKeys);
        if (!Ci(_, i.mediaQueryKey)) return;
        d.forEach((h) => {
          var y;
          let { config: A, actionTypeId: C } = h,
            w =
              (A == null || (y = A.target) === null || y === void 0
                ? void 0
                : y.useEventTarget) === !0
                ? { target: a.target, targets: a.targets }
                : A,
            L = Ri({ config: w, event: a, elementApi: be }),
            N = cs(C);
          L.forEach((x) => {
            let b = N ? ls(C)(x, h) : null;
            ps({
              destination: us({ element: x, actionItem: h, elementApi: be }, b),
              immediate: !0,
              store: e,
              element: x,
              eventId: r,
              actionItem: h,
              actionListId: t,
              pluginInstance: b,
            });
          });
        });
      }
    }
    function Gy({ store: e }) {
      let { ixInstances: t } = e.getState();
      (0, an.default)(t, (r) => {
        if (!r.continuous) {
          let { actionListId: n, verbose: i } = r;
          vs(r, e),
            i &&
              e.dispatch(
                (0, Ie.actionListPlaybackChanged)({
                  actionListId: n,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function fs({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: i,
    }) {
      let { ixInstances: o, ixSession: s } = e.getState(),
        a = s.hasBoundaryNodes && r ? be.getClosestElement(r, wi) : null;
      (0, an.default)(o, (c) => {
        let d = (0, Ct.default)(c, "actionItem.config.target.boundaryMode"),
          _ = n ? c.eventStateKey === n : !0;
        if (c.actionListId === i && c.eventId === t && _) {
          if (a && d && !be.elementContains(a, c.element)) return;
          vs(c, e),
            c.verbose &&
              e.dispatch(
                (0, Ie.actionListPlaybackChanged)({
                  actionListId: i,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function ds({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: i,
      groupIndex: o = 0,
      immediate: s,
      verbose: a,
    }) {
      var c;
      let { ixData: d, ixSession: _ } = e.getState(),
        { events: h } = d,
        y = h[t] || {},
        { mediaQueries: A = d.mediaQueryKeys } = y,
        C = (0, Ct.default)(d, `actionLists.${i}`, {}),
        { actionItemGroups: w, useFirstGroupAsInitialState: L } = C;
      if (!w || !w.length) return !1;
      o >= w.length && (0, Ct.default)(y, "config.loop") && (o = 0),
        o === 0 && L && o++;
      let x =
          (o === 0 || (o === 1 && L)) &&
          as((c = y.action) === null || c === void 0 ? void 0 : c.actionTypeId)
            ? y.config.delay
            : void 0,
        b = (0, Ct.default)(w, [o, "actionItems"], []);
      if (!b.length || !Ci(A, _.mediaQueryKey)) return !1;
      let X = _.hasBoundaryNodes && r ? be.getClosestElement(r, wi) : null,
        D = sV(b),
        q = !1;
      return (
        b.forEach((V, j) => {
          let { config: k, actionTypeId: oe } = V,
            J = cs(oe),
            { target: F } = k;
          if (!F) return;
          let T = F.boundaryMode ? X : null;
          Ri({
            config: k,
            event: y,
            eventTarget: r,
            elementRoot: T,
            elementApi: be,
          }).forEach((G, U) => {
            let Q = J ? ls(oe)(G, V) : null,
              ee = J ? gV(oe)(G, V) : null;
            q = !0;
            let M = D === j && U === 0,
              H = uV({ element: G, actionItem: V }),
              f = us({ element: G, actionItem: V, elementApi: be }, Q);
            ps({
              store: e,
              element: G,
              actionItem: V,
              eventId: t,
              eventTarget: r,
              eventStateKey: n,
              actionListId: i,
              groupIndex: o,
              isCarrier: M,
              computedStyle: H,
              destination: f,
              immediate: s,
              verbose: a,
              pluginInstance: Q,
              pluginDuration: ee,
              instanceDelay: x,
            });
          });
        }),
        q
      );
    }
    function ps(e) {
      var t;
      let { store: r, computedStyle: n } = e,
        i = (0, KU.default)(e, tV),
        {
          element: o,
          actionItem: s,
          immediate: a,
          pluginInstance: c,
          continuous: d,
          restingValue: _,
          eventId: h,
        } = i,
        y = !d,
        A = oV(),
        { ixElements: C, ixSession: w, ixData: L } = r.getState(),
        N = iV(C, o),
        { refState: x } = C[N] || {},
        b = be.getRefType(o),
        X = w.reducedMotion && Je.ReducedMotionTypes[s.actionTypeId],
        D;
      if (X && d)
        switch (
          (t = L.events[h]) === null || t === void 0 ? void 0 : t.eventTypeId
        ) {
          case Je.EventTypeConsts.MOUSE_MOVE:
          case Je.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
            D = _;
            break;
          default:
            D = 0.5;
            break;
        }
      let q = cV(o, x, n, s, be, c);
      if (
        (r.dispatch(
          (0, Ie.instanceAdded)(
            (0, jU.default)(
              {
                instanceId: A,
                elementId: N,
                origin: q,
                refType: b,
                skipMotion: X,
                skipToValue: D,
              },
              i
            )
          )
        ),
        Xy(document.body, "ix2-animation-started", A),
        a)
      ) {
        UV(r, A);
        return;
      }
      Ht({ store: r, select: ({ ixInstances: V }) => V[A], onChange: Uy }),
        y && r.dispatch((0, Ie.instanceStarted)(A, w.tick));
    }
    function vs(e, t) {
      Xy(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState(),
      });
      let { elementId: r, actionItem: n } = e,
        { ixElements: i } = t.getState(),
        { ref: o, refType: s } = i[r] || {};
      s === Ly && pV(o, n, be), t.dispatch((0, Ie.instanceRemoved)(e.id));
    }
    function Xy(e, t, r) {
      let n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function UV(e, t) {
      let { ixParameters: r } = e.getState();
      e.dispatch((0, Ie.instanceStarted)(t, 0)),
        e.dispatch((0, Ie.animationFrameChanged)(performance.now(), r));
      let { ixInstances: n } = e.getState();
      Uy(n[t], e);
    }
    function Uy(e, t) {
      let {
          active: r,
          continuous: n,
          complete: i,
          elementId: o,
          actionItem: s,
          actionTypeId: a,
          renderType: c,
          current: d,
          groupIndex: _,
          eventId: h,
          eventTarget: y,
          eventStateKey: A,
          actionListId: C,
          isCarrier: w,
          styleProp: L,
          verbose: N,
          pluginInstance: x,
        } = e,
        { ixData: b, ixSession: X } = t.getState(),
        { events: D } = b,
        q = D[h] || {},
        { mediaQueries: V = b.mediaQueryKeys } = q;
      if (Ci(V, X.mediaQueryKey) && (n || r || i)) {
        if (d || (c === nV && i)) {
          t.dispatch((0, Ie.elementStateChanged)(o, a, d, s));
          let { ixElements: j } = t.getState(),
            { ref: k, refType: oe, refState: J } = j[o] || {},
            F = J && J[a];
          switch (oe) {
            case Ly: {
              aV(k, J, F, h, s, L, be, c, x);
              break;
            }
          }
        }
        if (i) {
          if (w) {
            let j = ds({
              store: t,
              eventId: h,
              eventTarget: y,
              eventStateKey: A,
              actionListId: C,
              groupIndex: _ + 1,
              verbose: N,
            });
            N &&
              !j &&
              t.dispatch(
                (0, Ie.actionListPlaybackChanged)({
                  actionListId: C,
                  isPlaying: !1,
                })
              );
          }
          vs(e, t);
        }
      }
    }
  });
  var Wy = u((It) => {
    "use strict";
    var VV = zt().default,
      WV = at().default;
    Object.defineProperty(It, "__esModule", { value: !0 });
    It.actions = void 0;
    It.destroy = Vy;
    It.init = KV;
    It.setEnv = jV;
    It.store = void 0;
    Cl();
    var BV = jo(),
      HV = WV(kE()),
      hs = os(),
      kV = VV(hi());
    It.actions = kV;
    var qi = (0, BV.createStore)(HV.default);
    It.store = qi;
    function jV(e) {
      e() && (0, hs.observeRequests)(qi);
    }
    function KV(e) {
      Vy(), (0, hs.startEngine)({ store: qi, rawData: e, allowEvents: !0 });
    }
    function Vy() {
      (0, hs.stopEngine)(qi);
    }
  });
  var jy = u((jj, ky) => {
    var By = it(),
      Hy = Wy();
    Hy.setEnv(By.env);
    By.define(
      "ix2",
      (ky.exports = function () {
        return Hy;
      })
    );
  });
  var zy = u((Kj, Ky) => {
    var mr = it();
    mr.define(
      "links",
      (Ky.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = mr.env(),
          s = window.location,
          a = document.createElement("a"),
          c = "w--current",
          d = /index\.(html|php)$/,
          _ = /\/$/,
          h,
          y;
        r.ready = r.design = r.preview = A;
        function A() {
          (i = o && mr.env("design")),
            (y = mr.env("slug") || s.pathname || ""),
            mr.scroll.off(w),
            (h = []);
          for (var N = document.links, x = 0; x < N.length; ++x) C(N[x]);
          h.length && (mr.scroll.on(w), w());
        }
        function C(N) {
          var x =
            (i && N.getAttribute("href-disabled")) || N.getAttribute("href");
          if (((a.href = x), !(x.indexOf(":") >= 0))) {
            var b = e(N);
            if (
              a.hash.length > 1 &&
              a.host + a.pathname === s.host + s.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
              var X = e(a.hash);
              X.length && h.push({ link: b, sec: X, active: !1 });
              return;
            }
            if (!(x === "#" || x === "")) {
              var D = a.href === s.href || x === y || (d.test(x) && _.test(y));
              L(b, c, D);
            }
          }
        }
        function w() {
          var N = n.scrollTop(),
            x = n.height();
          t.each(h, function (b) {
            var X = b.link,
              D = b.sec,
              q = D.offset().top,
              V = D.outerHeight(),
              j = x * 0.5,
              k = D.is(":visible") && q + V - j >= N && q + j <= N + x;
            b.active !== k && ((b.active = k), L(X, c, k));
          });
        }
        function L(N, x, b) {
          var X = N.hasClass(x);
          (b && X) || (!b && !X) || (b ? N.addClass(x) : N.removeClass(x));
        }
        return r;
      })
    );
  });
  var Qy = u((zj, Yy) => {
    var Li = it();
    Li.define(
      "scroll",
      (Yy.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = C() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (F) {
              window.setTimeout(F, 15);
            },
          c = Li.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            c +
            " > .header, " +
            c +
            " > .w-nav:not([data-no-scroll])",
          _ = 'a[href="#"]',
          h = 'a[href*="#"]:not(.w-tab-link):not(' + _ + ")",
          y = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          A = document.createElement("style");
        A.appendChild(document.createTextNode(y));
        function C() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var w = /^#[a-zA-Z0-9][\w:.-]*$/;
        function L(F) {
          return w.test(F.hash) && F.host + F.pathname === r.host + r.pathname;
        }
        let N =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function x() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            N.matches
          );
        }
        function b(F, T) {
          var P;
          switch (T) {
            case "add":
              (P = F.attr("tabindex")),
                P
                  ? F.attr("data-wf-tabindex-swap", P)
                  : F.attr("tabindex", "-1");
              break;
            case "remove":
              (P = F.attr("data-wf-tabindex-swap")),
                P
                  ? (F.attr("tabindex", P),
                    F.removeAttr("data-wf-tabindex-swap"))
                  : F.removeAttr("tabindex");
              break;
          }
          F.toggleClass("wf-force-outline-none", T === "add");
        }
        function X(F) {
          var T = F.currentTarget;
          if (
            !(
              Li.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(T.className))
            )
          ) {
            var P = L(T) ? T.hash : "";
            if (P !== "") {
              var G = e(P);
              G.length &&
                (F && (F.preventDefault(), F.stopPropagation()),
                D(P, F),
                window.setTimeout(
                  function () {
                    q(G, function () {
                      b(G, "add"),
                        G.get(0).focus({ preventScroll: !0 }),
                        b(G, "remove");
                    });
                  },
                  F ? 0 : 300
                ));
            }
          }
        }
        function D(F) {
          if (
            r.hash !== F &&
            n &&
            n.pushState &&
            !(Li.env.chrome && r.protocol === "file:")
          ) {
            var T = n.state && n.state.hash;
            T !== F && n.pushState({ hash: F }, "", F);
          }
        }
        function q(F, T) {
          var P = i.scrollTop(),
            G = V(F);
          if (P !== G) {
            var U = j(F, P, G),
              Q = Date.now(),
              ee = function () {
                var M = Date.now() - Q;
                window.scroll(0, k(P, G, M, U)),
                  M <= U ? a(ee) : typeof T == "function" && T();
              };
            a(ee);
          }
        }
        function V(F) {
          var T = e(d),
            P = T.css("position") === "fixed" ? T.outerHeight() : 0,
            G = F.offset().top - P;
          if (F.data("scroll") === "mid") {
            var U = i.height() - P,
              Q = F.outerHeight();
            Q < U && (G -= Math.round((U - Q) / 2));
          }
          return G;
        }
        function j(F, T, P) {
          if (x()) return 0;
          var G = 1;
          return (
            s.add(F).each(function (U, Q) {
              var ee = parseFloat(Q.getAttribute("data-scroll-time"));
              !isNaN(ee) && ee >= 0 && (G = ee);
            }),
            (472.143 * Math.log(Math.abs(T - P) + 125) - 2e3) * G
          );
        }
        function k(F, T, P, G) {
          return P > G ? T : F + (T - F) * oe(P / G);
        }
        function oe(F) {
          return F < 0.5
            ? 4 * F * F * F
            : (F - 1) * (2 * F - 2) * (2 * F - 2) + 1;
        }
        function J() {
          var { WF_CLICK_EMPTY: F, WF_CLICK_SCROLL: T } = t;
          o.on(T, h, X),
            o.on(F, _, function (P) {
              P.preventDefault();
            }),
            document.head.insertBefore(A, document.head.firstChild);
        }
        return { ready: J };
      })
    );
  });
  var Zy = u((Yj, $y) => {
    var zV = it();
    zV.define(
      "touch",
      ($y.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            c = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            _;
          o.addEventListener("touchstart", h, !1),
            o.addEventListener("touchmove", y, !1),
            o.addEventListener("touchend", A, !1),
            o.addEventListener("touchcancel", C, !1),
            o.addEventListener("mousedown", h, !1),
            o.addEventListener("mousemove", y, !1),
            o.addEventListener("mouseup", A, !1),
            o.addEventListener("mouseout", C, !1);
          function h(L) {
            var N = L.touches;
            (N && N.length > 1) ||
              ((s = !0),
              N ? ((a = !0), (d = N[0].clientX)) : (d = L.clientX),
              (_ = d));
          }
          function y(L) {
            if (s) {
              if (a && L.type === "mousemove") {
                L.preventDefault(), L.stopPropagation();
                return;
              }
              var N = L.touches,
                x = N ? N[0].clientX : L.clientX,
                b = x - _;
              (_ = x),
                Math.abs(b) > c &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", L, { direction: b > 0 ? "right" : "left" }), C());
            }
          }
          function A(L) {
            if (s && ((s = !1), a && L.type === "mouseup")) {
              L.preventDefault(), L.stopPropagation(), (a = !1);
              return;
            }
          }
          function C() {
            s = !1;
          }
          function w() {
            o.removeEventListener("touchstart", h, !1),
              o.removeEventListener("touchmove", y, !1),
              o.removeEventListener("touchend", A, !1),
              o.removeEventListener("touchcancel", C, !1),
              o.removeEventListener("mousedown", h, !1),
              o.removeEventListener("mousemove", y, !1),
              o.removeEventListener("mouseup", A, !1),
              o.removeEventListener("mouseout", C, !1),
              (o = null);
          }
          this.destroy = w;
        }
        function i(o, s, a) {
          var c = e.Event(o, { originalEvent: s });
          e(s.target).trigger(c, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var eI = u((Qj, Jy) => {
    var Es = it();
    Es.define(
      "forms",
      (Jy.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          c,
          d = /e(-)?mail/i,
          _ = /^\S+@\S+$/,
          h = window.alert,
          y = Es.env(),
          A,
          C,
          w,
          L = /list-manage[1-9]?.com/i,
          N = t.debounce(function () {
            h(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              x(), !y && !A && X();
            };
        function x() {
          (c = e("html").attr("data-wf-site")),
            (C = "https://webflow.com/api/v1/form/" + c),
            s &&
              C.indexOf("https://webflow.com") >= 0 &&
              (C = C.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (w = `${C}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(b);
        }
        function b(M, H) {
          var f = e(H),
            v = e.data(H, a);
          v || (v = e.data(H, a, { form: f })), D(v);
          var E = f.closest("div.w-form");
          (v.done = E.find("> .w-form-done")),
            (v.fail = E.find("> .w-form-fail")),
            (v.fileUploads = E.find(".w-file-upload")),
            v.fileUploads.each(function (Y) {
              U(Y, v);
            });
          var p =
            v.form.attr("aria-label") || v.form.attr("data-name") || "Form";
          v.done.attr("aria-label") || v.form.attr("aria-label", p),
            v.done.attr("tabindex", "-1"),
            v.done.attr("role", "region"),
            v.done.attr("aria-label") ||
              v.done.attr("aria-label", p + " success"),
            v.fail.attr("tabindex", "-1"),
            v.fail.attr("role", "region"),
            v.fail.attr("aria-label") ||
              v.fail.attr("aria-label", p + " failure");
          var B = (v.action = f.attr("action"));
          if (
            ((v.handler = null),
            (v.redirect = f.attr("data-redirect")),
            L.test(B))
          ) {
            v.handler = T;
            return;
          }
          if (!B) {
            if (c) {
              v.handler = F;
              return;
            }
            N();
          }
        }
        function X() {
          (A = !0),
            n.on("submit", a + " form", function (Y) {
              var z = e.data(this, a);
              z.handler && ((z.evt = Y), z.handler(z));
            });
          let M = ".w-checkbox-input",
            H = ".w-radio-input",
            f = "w--redirected-checked",
            v = "w--redirected-focus",
            E = "w--redirected-focus-visible",
            p = ":focus-visible, [data-wf-focus-visible]",
            B = [
              ["checkbox", M],
              ["radio", H],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + M + ")",
            (Y) => {
              e(Y.target).siblings(M).toggleClass(f);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (Y) => {
              e(`input[name="${Y.target.name}"]:not(${M})`).map((ce, Ae) =>
                e(Ae).siblings(H).removeClass(f)
              );
              let z = e(Y.target);
              z.hasClass("w-radio-input") || z.siblings(H).addClass(f);
            }),
            B.forEach(([Y, z]) => {
              n.on(
                "focus",
                a + ` form input[type="${Y}"]:not(` + z + ")",
                (ce) => {
                  e(ce.target).siblings(z).addClass(v),
                    e(ce.target).filter(p).siblings(z).addClass(E);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${Y}"]:not(` + z + ")",
                  (ce) => {
                    e(ce.target).siblings(z).removeClass(`${v} ${E}`);
                  }
                );
            });
        }
        function D(M) {
          var H = (M.btn = M.form.find(':input[type="submit"]'));
          (M.wait = M.btn.attr("data-wait") || null),
            (M.success = !1),
            H.prop("disabled", !1),
            M.label && H.val(M.label);
        }
        function q(M) {
          var H = M.btn,
            f = M.wait;
          H.prop("disabled", !0), f && ((M.label = H.val()), H.val(f));
        }
        function V(M, H) {
          var f = null;
          return (
            (H = H || {}),
            M.find(':input:not([type="submit"]):not([type="file"])').each(
              function (v, E) {
                var p = e(E),
                  B = p.attr("type"),
                  Y =
                    p.attr("data-name") || p.attr("name") || "Field " + (v + 1),
                  z = p.val();
                if (B === "checkbox") z = p.is(":checked");
                else if (B === "radio") {
                  if (H[Y] === null || typeof H[Y] == "string") return;
                  z =
                    M.find(
                      'input[name="' + p.attr("name") + '"]:checked'
                    ).val() || null;
                }
                typeof z == "string" && (z = e.trim(z)),
                  (H[Y] = z),
                  (f = f || J(p, B, Y, z));
              }
            ),
            f
          );
        }
        function j(M) {
          var H = {};
          return (
            M.find(':input[type="file"]').each(function (f, v) {
              var E = e(v),
                p = E.attr("data-name") || E.attr("name") || "File " + (f + 1),
                B = E.attr("data-value");
              typeof B == "string" && (B = e.trim(B)), (H[p] = B);
            }),
            H
          );
        }
        let k = { _mkto_trk: "marketo" };
        function oe() {
          return document.cookie.split("; ").reduce(function (H, f) {
            let v = f.split("="),
              E = v[0];
            if (E in k) {
              let p = k[E],
                B = v.slice(1).join("=");
              H[p] = B;
            }
            return H;
          }, {});
        }
        function J(M, H, f, v) {
          var E = null;
          return (
            H === "password"
              ? (E = "Passwords cannot be submitted.")
              : M.attr("required")
              ? v
                ? d.test(M.attr("type")) &&
                  (_.test(v) ||
                    (E = "Please enter a valid email address for: " + f))
                : (E = "Please fill out the required field: " + f)
              : f === "g-recaptcha-response" &&
                !v &&
                (E = "Please confirm you\u2019re not a robot."),
            E
          );
        }
        function F(M) {
          G(M), P(M);
        }
        function T(M) {
          D(M);
          var H = M.form,
            f = {};
          if (/^https/.test(o.href) && !/^https/.test(M.action)) {
            H.attr("method", "post");
            return;
          }
          G(M);
          var v = V(H, f);
          if (v) return h(v);
          q(M);
          var E;
          t.each(f, function (z, ce) {
            d.test(ce) && (f.EMAIL = z),
              /^((full[ _-]?)?name)$/i.test(ce) && (E = z),
              /^(first[ _-]?name)$/i.test(ce) && (f.FNAME = z),
              /^(last[ _-]?name)$/i.test(ce) && (f.LNAME = z);
          }),
            E &&
              !f.FNAME &&
              ((E = E.split(" ")),
              (f.FNAME = E[0]),
              (f.LNAME = f.LNAME || E[1]));
          var p = M.action.replace("/post?", "/post-json?") + "&c=?",
            B = p.indexOf("u=") + 2;
          B = p.substring(B, p.indexOf("&", B));
          var Y = p.indexOf("id=") + 3;
          (Y = p.substring(Y, p.indexOf("&", Y))),
            (f["b_" + B + "_" + Y] = ""),
            e
              .ajax({ url: p, data: f, dataType: "jsonp" })
              .done(function (z) {
                (M.success = z.result === "success" || /already/.test(z.msg)),
                  M.success || console.info("MailChimp error: " + z.msg),
                  P(M);
              })
              .fail(function () {
                P(M);
              });
        }
        function P(M) {
          var H = M.form,
            f = M.redirect,
            v = M.success;
          if (v && f) {
            Es.location(f);
            return;
          }
          M.done.toggle(v),
            M.fail.toggle(!v),
            v ? M.done.focus() : M.fail.focus(),
            H.toggle(!v),
            D(M);
        }
        function G(M) {
          M.evt && M.evt.preventDefault(), (M.evt = null);
        }
        function U(M, H) {
          if (!H.fileUploads || !H.fileUploads[M]) return;
          var f,
            v = e(H.fileUploads[M]),
            E = v.find("> .w-file-upload-default"),
            p = v.find("> .w-file-upload-uploading"),
            B = v.find("> .w-file-upload-success"),
            Y = v.find("> .w-file-upload-error"),
            z = E.find(".w-file-upload-input"),
            ce = E.find(".w-file-upload-label"),
            Ae = ce.children(),
            le = Y.find(".w-file-upload-error-msg"),
            Ee = B.find(".w-file-upload-file"),
            Ve = B.find(".w-file-remove-link"),
            We = Ee.find(".w-file-upload-file-name"),
            tt = le.attr("data-w-size-error"),
            xe = le.attr("data-w-type-error"),
            ht = le.attr("data-w-generic-error");
          if (
            (y ||
              ce.on("click keydown", function (I) {
                (I.type === "keydown" && I.which !== 13 && I.which !== 32) ||
                  (I.preventDefault(), z.click());
              }),
            ce.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            Ve.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            y)
          )
            z.on("click", function (I) {
              I.preventDefault();
            }),
              ce.on("click", function (I) {
                I.preventDefault();
              }),
              Ae.on("click", function (I) {
                I.preventDefault();
              });
          else {
            Ve.on("click keydown", function (I) {
              if (I.type === "keydown") {
                if (I.which !== 13 && I.which !== 32) return;
                I.preventDefault();
              }
              z.removeAttr("data-value"),
                z.val(""),
                We.html(""),
                E.toggle(!0),
                B.toggle(!1),
                ce.focus();
            }),
              z.on("change", function (I) {
                (f = I.target && I.target.files && I.target.files[0]),
                  f &&
                    (E.toggle(!1),
                    Y.toggle(!1),
                    p.toggle(!0),
                    p.focus(),
                    We.text(f.name),
                    O() || q(H),
                    (H.fileUploads[M].uploading = !0),
                    Q(f, g));
              });
            var kt = ce.outerHeight();
            z.height(kt), z.width(1);
          }
          function l(I) {
            var S = I.responseJSON && I.responseJSON.msg,
              K = ht;
            typeof S == "string" && S.indexOf("InvalidFileTypeError") === 0
              ? (K = xe)
              : typeof S == "string" &&
                S.indexOf("MaxFileSizeError") === 0 &&
                (K = tt),
              le.text(K),
              z.removeAttr("data-value"),
              z.val(""),
              p.toggle(!1),
              E.toggle(!0),
              Y.toggle(!0),
              Y.focus(),
              (H.fileUploads[M].uploading = !1),
              O() || D(H);
          }
          function g(I, S) {
            if (I) return l(I);
            var K = S.fileName,
              te = S.postData,
              pe = S.fileId,
              W = S.s3Url;
            z.attr("data-value", pe), ee(W, te, f, K, m);
          }
          function m(I) {
            if (I) return l(I);
            p.toggle(!1),
              B.css("display", "inline-block"),
              B.focus(),
              (H.fileUploads[M].uploading = !1),
              O() || D(H);
          }
          function O() {
            var I = (H.fileUploads && H.fileUploads.toArray()) || [];
            return I.some(function (S) {
              return S.uploading;
            });
          }
        }
        function Q(M, H) {
          var f = new URLSearchParams({ name: M.name, size: M.size });
          e.ajax({ type: "GET", url: `${w}?${f}`, crossDomain: !0 })
            .done(function (v) {
              H(null, v);
            })
            .fail(function (v) {
              H(v);
            });
        }
        function ee(M, H, f, v, E) {
          var p = new FormData();
          for (var B in H) p.append(B, H[B]);
          p.append("file", f, v),
            e
              .ajax({
                type: "POST",
                url: M,
                data: p,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                E(null);
              })
              .fail(function (Y) {
                E(Y);
              });
        }
        return r;
      })
    );
  });
  var nI = u(($j, rI) => {
    var xt = it(),
      YV = Vi(),
      vt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      tI =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    xt.define(
      "slider",
      (rI.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(document),
          o,
          s,
          a = xt.env(),
          c = ".w-slider",
          d = '<div class="w-slider-dot" data-wf-ignore />',
          _ =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          h = "w-slider-force-show",
          y = YV.triggers,
          A,
          C = !1;
        (r.ready = function () {
          (s = xt.env("design")), w();
        }),
          (r.design = function () {
            (s = !0), setTimeout(w, 1e3);
          }),
          (r.preview = function () {
            (s = !1), w();
          }),
          (r.redraw = function () {
            (C = !0), w(), (C = !1);
          }),
          (r.destroy = L);
        function w() {
          (o = i.find(c)), o.length && (o.each(b), !A && (L(), N()));
        }
        function L() {
          xt.resize.off(x), xt.redraw.off(r.redraw);
        }
        function N() {
          xt.resize.on(x), xt.redraw.on(r.redraw);
        }
        function x() {
          o.filter(":visible").each(U);
        }
        function b(f, v) {
          var E = e(v),
            p = e.data(v, c);
          p ||
            (p = e.data(v, c, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: E,
              config: {},
            })),
            (p.mask = E.children(".w-slider-mask")),
            (p.left = E.children(".w-slider-arrow-left")),
            (p.right = E.children(".w-slider-arrow-right")),
            (p.nav = E.children(".w-slider-nav")),
            (p.slides = p.mask.children(".w-slide")),
            p.slides.each(y.reset),
            C && (p.maskWidth = 0),
            E.attr("role") === void 0 && E.attr("role", "region"),
            E.attr("aria-label") === void 0 && E.attr("aria-label", "carousel");
          var B = p.mask.attr("id");
          if (
            (B || ((B = "w-slider-mask-" + f), p.mask.attr("id", B)),
            !s && !p.ariaLiveLabel && (p.ariaLiveLabel = e(_).appendTo(p.mask)),
            p.left.attr("role", "button"),
            p.left.attr("tabindex", "0"),
            p.left.attr("aria-controls", B),
            p.left.attr("aria-label") === void 0 &&
              p.left.attr("aria-label", "previous slide"),
            p.right.attr("role", "button"),
            p.right.attr("tabindex", "0"),
            p.right.attr("aria-controls", B),
            p.right.attr("aria-label") === void 0 &&
              p.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            p.left.hide(), p.right.hide(), p.nav.hide(), (A = !0);
            return;
          }
          p.el.off(c),
            p.left.off(c),
            p.right.off(c),
            p.nav.off(c),
            X(p),
            s
              ? (p.el.on("setting" + c, T(p)), F(p), (p.hasTimer = !1))
              : (p.el.on("swipe" + c, T(p)),
                p.left.on("click" + c, j(p)),
                p.right.on("click" + c, k(p)),
                p.left.on("keydown" + c, V(p, j)),
                p.right.on("keydown" + c, V(p, k)),
                p.nav.on("keydown" + c, "> div", T(p)),
                p.config.autoplay &&
                  !p.hasTimer &&
                  ((p.hasTimer = !0), (p.timerCount = 1), J(p)),
                p.el.on("mouseenter" + c, q(p, !0, "mouse")),
                p.el.on("focusin" + c, q(p, !0, "keyboard")),
                p.el.on("mouseleave" + c, q(p, !1, "mouse")),
                p.el.on("focusout" + c, q(p, !1, "keyboard"))),
            p.nav.on("click" + c, "> div", T(p)),
            a ||
              p.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var Y = E.filter(":hidden");
          Y.addClass(h);
          var z = E.parents(":hidden");
          z.addClass(h), C || U(f, v), Y.removeClass(h), z.removeClass(h);
        }
        function X(f) {
          var v = {};
          (v.crossOver = 0),
            (v.animation = f.el.attr("data-animation") || "slide"),
            v.animation === "outin" &&
              ((v.animation = "cross"), (v.crossOver = 0.5)),
            (v.easing = f.el.attr("data-easing") || "ease");
          var E = f.el.attr("data-duration");
          if (
            ((v.duration = E != null ? parseInt(E, 10) : 500),
            D(f.el.attr("data-infinite")) && (v.infinite = !0),
            D(f.el.attr("data-disable-swipe")) && (v.disableSwipe = !0),
            D(f.el.attr("data-hide-arrows"))
              ? (v.hideArrows = !0)
              : f.config.hideArrows && (f.left.show(), f.right.show()),
            D(f.el.attr("data-autoplay")))
          ) {
            (v.autoplay = !0),
              (v.delay = parseInt(f.el.attr("data-delay"), 10) || 2e3),
              (v.timerMax = parseInt(f.el.attr("data-autoplay-limit"), 10));
            var p = "mousedown" + c + " touchstart" + c;
            s ||
              f.el.off(p).one(p, function () {
                F(f);
              });
          }
          var B = f.right.width();
          (v.edge = B ? B + 40 : 100), (f.config = v);
        }
        function D(f) {
          return f === "1" || f === "true";
        }
        function q(f, v, E) {
          return function (p) {
            if (v) f.hasFocus[E] = v;
            else if (
              e.contains(f.el.get(0), p.relatedTarget) ||
              ((f.hasFocus[E] = v),
              (f.hasFocus.mouse && E === "keyboard") ||
                (f.hasFocus.keyboard && E === "mouse"))
            )
              return;
            v
              ? (f.ariaLiveLabel.attr("aria-live", "polite"),
                f.hasTimer && F(f))
              : (f.ariaLiveLabel.attr("aria-live", "off"), f.hasTimer && J(f));
          };
        }
        function V(f, v) {
          return function (E) {
            switch (E.keyCode) {
              case vt.SPACE:
              case vt.ENTER:
                return v(f)(), E.preventDefault(), E.stopPropagation();
            }
          };
        }
        function j(f) {
          return function () {
            G(f, { index: f.index - 1, vector: -1 });
          };
        }
        function k(f) {
          return function () {
            G(f, { index: f.index + 1, vector: 1 });
          };
        }
        function oe(f, v) {
          var E = null;
          v === f.slides.length && (w(), Q(f)),
            t.each(f.anchors, function (p, B) {
              e(p.els).each(function (Y, z) {
                e(z).index() === v && (E = B);
              });
            }),
            E != null && G(f, { index: E, immediate: !0 });
        }
        function J(f) {
          F(f);
          var v = f.config,
            E = v.timerMax;
          (E && f.timerCount++ > E) ||
            (f.timerId = window.setTimeout(function () {
              f.timerId == null || s || (k(f)(), J(f));
            }, v.delay));
        }
        function F(f) {
          window.clearTimeout(f.timerId), (f.timerId = null);
        }
        function T(f) {
          return function (v, E) {
            E = E || {};
            var p = f.config;
            if (s && v.type === "setting") {
              if (E.select === "prev") return j(f)();
              if (E.select === "next") return k(f)();
              if ((X(f), Q(f), E.select == null)) return;
              oe(f, E.select);
              return;
            }
            if (v.type === "swipe")
              return p.disableSwipe || xt.env("editor")
                ? void 0
                : E.direction === "left"
                ? k(f)()
                : E.direction === "right"
                ? j(f)()
                : void 0;
            if (f.nav.has(v.target).length) {
              var B = e(v.target).index();
              if (
                (v.type === "click" && G(f, { index: B }), v.type === "keydown")
              )
                switch (v.keyCode) {
                  case vt.ENTER:
                  case vt.SPACE: {
                    G(f, { index: B }), v.preventDefault();
                    break;
                  }
                  case vt.ARROW_LEFT:
                  case vt.ARROW_UP: {
                    P(f.nav, Math.max(B - 1, 0)), v.preventDefault();
                    break;
                  }
                  case vt.ARROW_RIGHT:
                  case vt.ARROW_DOWN: {
                    P(f.nav, Math.min(B + 1, f.pages)), v.preventDefault();
                    break;
                  }
                  case vt.HOME: {
                    P(f.nav, 0), v.preventDefault();
                    break;
                  }
                  case vt.END: {
                    P(f.nav, f.pages), v.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function P(f, v) {
          var E = f.children().eq(v).focus();
          f.children().not(E);
        }
        function G(f, v) {
          v = v || {};
          var E = f.config,
            p = f.anchors;
          f.previous = f.index;
          var B = v.index,
            Y = {};
          B < 0
            ? ((B = p.length - 1),
              E.infinite &&
                ((Y.x = -f.endX), (Y.from = 0), (Y.to = p[0].width)))
            : B >= p.length &&
              ((B = 0),
              E.infinite &&
                ((Y.x = p[p.length - 1].width),
                (Y.from = -p[p.length - 1].x),
                (Y.to = Y.from - Y.x))),
            (f.index = B);
          var z = f.nav
            .children()
            .eq(B)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          f.nav
            .children()
            .not(z)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            E.hideArrows &&
              (f.index === p.length - 1 ? f.right.hide() : f.right.show(),
              f.index === 0 ? f.left.hide() : f.left.show());
          var ce = f.offsetX || 0,
            Ae = (f.offsetX = -p[f.index].x),
            le = { x: Ae, opacity: 1, visibility: "" },
            Ee = e(p[f.index].els),
            Ve = e(p[f.previous] && p[f.previous].els),
            We = f.slides.not(Ee),
            tt = E.animation,
            xe = E.easing,
            ht = Math.round(E.duration),
            kt = v.vector || (f.index > f.previous ? 1 : -1),
            l = "opacity " + ht + "ms " + xe,
            g = "transform " + ht + "ms " + xe;
          if (
            (Ee.find(tI).removeAttr("tabindex"),
            Ee.removeAttr("aria-hidden"),
            Ee.find("*").removeAttr("aria-hidden"),
            We.find(tI).attr("tabindex", "-1"),
            We.attr("aria-hidden", "true"),
            We.find("*").attr("aria-hidden", "true"),
            s || (Ee.each(y.intro), We.each(y.outro)),
            v.immediate && !C)
          ) {
            n(Ee).set(le), I();
            return;
          }
          if (f.index === f.previous) return;
          if (
            (s || f.ariaLiveLabel.text(`Slide ${B + 1} of ${p.length}.`),
            tt === "cross")
          ) {
            var m = Math.round(ht - ht * E.crossOver),
              O = Math.round(ht - m);
            (l = "opacity " + m + "ms " + xe),
              n(Ve).set({ visibility: "" }).add(l).start({ opacity: 0 }),
              n(Ee)
                .set({ visibility: "", x: Ae, opacity: 0, zIndex: f.depth++ })
                .add(l)
                .wait(O)
                .then({ opacity: 1 })
                .then(I);
            return;
          }
          if (tt === "fade") {
            n(Ve).set({ visibility: "" }).stop(),
              n(Ee)
                .set({ visibility: "", x: Ae, opacity: 0, zIndex: f.depth++ })
                .add(l)
                .start({ opacity: 1 })
                .then(I);
            return;
          }
          if (tt === "over") {
            (le = { x: f.endX }),
              n(Ve).set({ visibility: "" }).stop(),
              n(Ee)
                .set({
                  visibility: "",
                  zIndex: f.depth++,
                  x: Ae + p[f.index].width * kt,
                })
                .add(g)
                .start({ x: Ae })
                .then(I);
            return;
          }
          E.infinite && Y.x
            ? (n(f.slides.not(Ve))
                .set({ visibility: "", x: Y.x })
                .add(g)
                .start({ x: Ae }),
              n(Ve)
                .set({ visibility: "", x: Y.from })
                .add(g)
                .start({ x: Y.to }),
              (f.shifted = Ve))
            : (E.infinite &&
                f.shifted &&
                (n(f.shifted).set({ visibility: "", x: ce }),
                (f.shifted = null)),
              n(f.slides).set({ visibility: "" }).add(g).start({ x: Ae }));
          function I() {
            (Ee = e(p[f.index].els)),
              (We = f.slides.not(Ee)),
              tt !== "slide" && (le.visibility = "hidden"),
              n(We).set(le);
          }
        }
        function U(f, v) {
          var E = e.data(v, c);
          if (E) {
            if (M(E)) return Q(E);
            s && H(E) && Q(E);
          }
        }
        function Q(f) {
          var v = 1,
            E = 0,
            p = 0,
            B = 0,
            Y = f.maskWidth,
            z = Y - f.config.edge;
          z < 0 && (z = 0),
            (f.anchors = [{ els: [], x: 0, width: 0 }]),
            f.slides.each(function (Ae, le) {
              p - E > z &&
                (v++,
                (E += Y),
                (f.anchors[v - 1] = { els: [], x: p, width: 0 })),
                (B = e(le).outerWidth(!0)),
                (p += B),
                (f.anchors[v - 1].width += B),
                f.anchors[v - 1].els.push(le);
              var Ee = Ae + 1 + " of " + f.slides.length;
              e(le).attr("aria-label", Ee), e(le).attr("role", "group");
            }),
            (f.endX = p),
            s && (f.pages = null),
            f.nav.length && f.pages !== v && ((f.pages = v), ee(f));
          var ce = f.index;
          ce >= v && (ce = v - 1), G(f, { immediate: !0, index: ce });
        }
        function ee(f) {
          var v = [],
            E,
            p = f.el.attr("data-nav-spacing");
          p && (p = parseFloat(p) + "px");
          for (var B = 0, Y = f.pages; B < Y; B++)
            (E = e(d)),
              E.attr("aria-label", "Show slide " + (B + 1) + " of " + Y)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              f.nav.hasClass("w-num") && E.text(B + 1),
              p != null && E.css({ "margin-left": p, "margin-right": p }),
              v.push(E);
          f.nav.empty().append(v);
        }
        function M(f) {
          var v = f.mask.width();
          return f.maskWidth !== v ? ((f.maskWidth = v), !0) : !1;
        }
        function H(f) {
          var v = 0;
          return (
            f.slides.each(function (E, p) {
              v += e(p).outerWidth(!0);
            }),
            f.slidesWidth !== v ? ((f.slidesWidth = v), !0) : !1
          );
        }
        return r;
      })
    );
  });
  gs();
  _s();
  xs();
  Ls();
  Ds();
  Vi();
  jy();
  zy();
  Qy();
  Zy();
  eI();
  nI();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-155": {
      id: "e-155",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-156",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "1a1d4640-ca34-2fe8-8dea-79a4a175c0b8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "1a1d4640-ca34-2fe8-8dea-79a4a175c0b8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1610330882696,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0660d2cdd9348|93d213c4-c55d-af8d-b7cb-1d0b08747b79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0660d2cdd9348|93d213c4-c55d-af8d-b7cb-1d0b08747b79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 15,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 10,
        },
      ],
      createdOn: 1610330882696,
    },
    "e-170": {
      id: "e-170",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0662950dd936e|08e6241c-28fa-5109-9dbc-154495d9a560",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0662950dd936e|08e6241c-28fa-5109-9dbc-154495d9a560",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: true,
          addOffsetValue: 15,
          startsExiting: false,
          addEndOffset: true,
          endOffsetValue: 10,
        },
      ],
      createdOn: 1610333552899,
    },
    "e-236": {
      id: "e-236",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-237",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8c04f4b0-8560-1c57-a677-69e7be5fccb4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8c04f4b0-8560-1c57-a677-69e7be5fccb4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1610574473234,
    },
    "e-252": {
      id: "e-252",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0662c42dd9396|e2de4fc3-d113-95cc-53b5-ff7f6775a3b4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0662c42dd9396|e2de4fc3-d113-95cc-53b5-ff7f6775a3b4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 15,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 10,
        },
      ],
      createdOn: 1610586095639,
    },
    "e-259": {
      id: "e-259",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-260",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b95234c6-aed3-1dd4-83e8-1075d88aabca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b95234c6-aed3-1dd4-83e8-1075d88aabca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1611625442482,
    },
    "e-261": {
      id: "e-261",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-262",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|51524a8c-295e-c874-faef-88ab9e5b5bb3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|51524a8c-295e-c874-faef-88ab9e5b5bb3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1611632598824,
    },
    "e-263": {
      id: "e-263",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-264",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e6d401c1-68da-a0fe-c139-f7d234ca8e62",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e6d401c1-68da-a0fe-c139-f7d234ca8e62",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1611965432766,
    },
    "e-265": {
      id: "e-265",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-266",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|015c10be-17fe-7048-c1e7-4f5dbed6b345",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|015c10be-17fe-7048-c1e7-4f5dbed6b345",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1611965805758,
    },
    "e-269": {
      id: "e-269",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-270",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0660d2cdd9348|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0660d2cdd9348|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1612035438534,
    },
    "e-271": {
      id: "e-271",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-272",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "78690269-788f-cca2-dacc-efa0a8729b86",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "78690269-788f-cca2-dacc-efa0a8729b86",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1612062949319,
    },
    "e-273": {
      id: "e-273",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-274",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e40638ca-f4a3-e760-c197-27c8f31d739c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e40638ca-f4a3-e760-c197-27c8f31d739c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1612065791121,
    },
    "e-288": {
      id: "e-288",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "62730e9837063e3676d4f47d|661b59f6-d7c4-6d07-34f9-ccabace40886",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "62730e9837063e3676d4f47d|661b59f6-d7c4-6d07-34f9-ccabace40886",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: true,
          addOffsetValue: 15,
          startsExiting: false,
          addEndOffset: true,
          endOffsetValue: 10,
        },
      ],
      createdOn: 1612309820950,
    },
    "e-302": {
      id: "e-302",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-303",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0668714dd939a|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0668714dd939a|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1612490807708,
    },
    "e-311": {
      id: "e-311",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-312",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0660b49dd939c|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0660b49dd939c|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1612909573163,
    },
    "e-316": {
      id: "e-316",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-317",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "56b48e56-e216-c418-01fc-719b93bc87e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "56b48e56-e216-c418-01fc-719b93bc87e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1612915576826,
    },
    "e-320": {
      id: "e-320",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-321",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0661999dd939e|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0661999dd939e|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1613014049951,
    },
    "e-330": {
      id: "e-330",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-331",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0662c42dd9396|53cc964c-ea73-7704-2cae-df64dc0bb75e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0662c42dd9396|53cc964c-ea73-7704-2cae-df64dc0bb75e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1613507060297,
    },
    "e-334": {
      id: "e-334",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-335",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c949af7a-d8cb-d841-0dde-eb26acb7d4e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c949af7a-d8cb-d841-0dde-eb26acb7d4e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1614224991505,
    },
    "e-348": {
      id: "e-348",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0661999dd939e|d9c34efd-2363-3976-7bd9-153d1689b659",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0661999dd939e|d9c34efd-2363-3976-7bd9-153d1689b659",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1614804392189,
    },
    "e-356": {
      id: "e-356",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-357",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "13aa5921-cae7-60c0-e45e-b5c28c2e64f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "13aa5921-cae7-60c0-e45e-b5c28c2e64f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615341514648,
    },
    "e-357": {
      id: "e-357",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-356",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "13aa5921-cae7-60c0-e45e-b5c28c2e64f6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "13aa5921-cae7-60c0-e45e-b5c28c2e64f6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615341514655,
    },
    "e-358": {
      id: "e-358",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-359",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "13aa5921-cae7-60c0-e45e-b5c28c2e64fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "13aa5921-cae7-60c0-e45e-b5c28c2e64fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615342068888,
    },
    "e-359": {
      id: "e-359",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-358",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "13aa5921-cae7-60c0-e45e-b5c28c2e64fc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "13aa5921-cae7-60c0-e45e-b5c28c2e64fc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615342068896,
    },
    "e-360": {
      id: "e-360",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-361",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "2e8e1b4d-cc08-14fa-0f1d-09ca0ba3352e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "2e8e1b4d-cc08-14fa-0f1d-09ca0ba3352e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615342219172,
    },
    "e-361": {
      id: "e-361",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-360",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "2e8e1b4d-cc08-14fa-0f1d-09ca0ba3352e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "2e8e1b4d-cc08-14fa-0f1d-09ca0ba3352e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615342219178,
    },
    "e-364": {
      id: "e-364",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-365",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e06668c5dd93a1|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e06668c5dd93a1|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615343840687,
    },
    "e-366": {
      id: "e-366",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-367",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e06668c5dd93a1|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e06668c5dd93a1|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615344074333,
    },
    "e-368": {
      id: "e-368",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-369",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1615344779645,
    },
    "e-401": {
      id: "e-401",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-402",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6818afb3-5bef-f58e-634f-fbcc98b49dfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6818afb3-5bef-f58e-634f-fbcc98b49dfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616039799823,
    },
    "e-423": {
      id: "e-423",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-424",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|0d419c42-5735-c18b-addc-862cabb534c1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|0d419c42-5735-c18b-addc-862cabb534c1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644129184,
    },
    "e-424": {
      id: "e-424",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-423",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|0d419c42-5735-c18b-addc-862cabb534c1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|0d419c42-5735-c18b-addc-862cabb534c1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644129190,
    },
    "e-425": {
      id: "e-425",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-426",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|28f96491-67c6-e90f-783a-82784474c12f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|28f96491-67c6-e90f-783a-82784474c12f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644228545,
    },
    "e-426": {
      id: "e-426",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-425",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|28f96491-67c6-e90f-783a-82784474c12f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|28f96491-67c6-e90f-783a-82784474c12f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644228545,
    },
    "e-427": {
      id: "e-427",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-428",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|459b1335-44f3-21ac-da77-76dd89fd8ce8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|459b1335-44f3-21ac-da77-76dd89fd8ce8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644313511,
    },
    "e-428": {
      id: "e-428",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-427",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|459b1335-44f3-21ac-da77-76dd89fd8ce8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|459b1335-44f3-21ac-da77-76dd89fd8ce8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644313511,
    },
    "e-429": {
      id: "e-429",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-430",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|a73878d0-cd29-3290-392b-c88e213d20f8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|a73878d0-cd29-3290-392b-c88e213d20f8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644463589,
    },
    "e-430": {
      id: "e-430",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-429",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60516134194df6e4af9d8789|a73878d0-cd29-3290-392b-c88e213d20f8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60516134194df6e4af9d8789|a73878d0-cd29-3290-392b-c88e213d20f8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1616644463589,
    },
    "e-435": {
      id: "e-435",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-436",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6063d811a5870e1b4227a34b|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6063d811a5870e1b4227a34b|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617156113535,
    },
    "e-443": {
      id: "e-443",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6063d811a5870e1b4227a34b|d9c34efd-2363-3976-7bd9-153d1689b659",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6063d811a5870e1b4227a34b|d9c34efd-2363-3976-7bd9-153d1689b659",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1617156113535,
    },
    "e-453": {
      id: "e-453",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-454",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8aaa2c8e-af77-b389-ae64-75a27fef33c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8aaa2c8e-af77-b389-ae64-75a27fef33c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617247582199,
    },
    "e-454": {
      id: "e-454",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-453",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8aaa2c8e-af77-b389-ae64-75a27fef33c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8aaa2c8e-af77-b389-ae64-75a27fef33c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617247582199,
    },
    "e-459": {
      id: "e-459",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-460",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "0cdfc8b6-7869-810f-5c77-9d13e84ccdcb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "0cdfc8b6-7869-810f-5c77-9d13e84ccdcb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617249443745,
    },
    "e-460": {
      id: "e-460",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-459",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "0cdfc8b6-7869-810f-5c77-9d13e84ccdcb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "0cdfc8b6-7869-810f-5c77-9d13e84ccdcb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617249443753,
    },
    "e-461": {
      id: "e-461",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-462",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b6f71966-c4f2-551a-f99d-3a32df492aa8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b6f71966-c4f2-551a-f99d-3a32df492aa8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617249462816,
    },
    "e-462": {
      id: "e-462",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-461",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b6f71966-c4f2-551a-f99d-3a32df492aa8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b6f71966-c4f2-551a-f99d-3a32df492aa8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617249462823,
    },
    "e-463": {
      id: "e-463",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-464",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6066963d9677dec3b476a969|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6066963d9677dec3b476a969|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617335870690,
    },
    "e-471": {
      id: "e-471",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6066963d9677dec3b476a969|d9c34efd-2363-3976-7bd9-153d1689b659",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6066963d9677dec3b476a969|d9c34efd-2363-3976-7bd9-153d1689b659",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1617335870690,
    },
    "e-472": {
      id: "e-472",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-473",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "606b971d5075d34fa4f21de8|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "606b971d5075d34fa4f21de8|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1617663774072,
    },
    "e-480": {
      id: "e-480",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "606b971d5075d34fa4f21de8|d9c34efd-2363-3976-7bd9-153d1689b659",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "606b971d5075d34fa4f21de8|d9c34efd-2363-3976-7bd9-153d1689b659",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1617663774072,
    },
    "e-490": {
      id: "e-490",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-491",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60726f4e35c4a24f95763a76|78690269-788f-cca2-dacc-efa0a8729b84",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60726f4e35c4a24f95763a76|78690269-788f-cca2-dacc-efa0a8729b84",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1618112334066,
    },
    "e-498": {
      id: "e-498",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60726f4e35c4a24f95763a76|d9c34efd-2363-3976-7bd9-153d1689b659",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60726f4e35c4a24f95763a76|d9c34efd-2363-3976-7bd9-153d1689b659",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1618112334066,
    },
    "e-501": {
      id: "e-501",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6077b156acb3117ed0213023|16a5c096-2112-6c5e-cdc4-a89e2c19ba63",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6077b156acb3117ed0213023|16a5c096-2112-6c5e-cdc4-a89e2c19ba63",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 15,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 10,
        },
      ],
      createdOn: 1618457407702,
    },
    "e-512": {
      id: "e-512",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-513",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "607a62db88d1c8581485180d|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "607a62db88d1c8581485180d|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1618633437196,
    },
    "e-514": {
      id: "e-514",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-515",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "607a62db88d1c8581485180d|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "607a62db88d1c8581485180d|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1618633437196,
    },
    "e-520": {
      id: "e-520",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-521",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "607d04bc180ab92af0303cdb|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "607d04bc180ab92af0303cdb|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1618805947787,
    },
    "e-522": {
      id: "e-522",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-523",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "607d04bc180ab92af0303cdb|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "607d04bc180ab92af0303cdb|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1618805947787,
    },
    "e-558": {
      id: "e-558",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-559",
        },
      },
      mediaQueries: ["main", "medium", "tiny"],
      target: {
        id: "609849790e5a877a2f3527ba|07eb6516-5df3-1dc2-db5c-bcf1c2528362",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609849790e5a877a2f3527ba|07eb6516-5df3-1dc2-db5c-bcf1c2528362",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620593016410,
    },
    "e-562": {
      id: "e-562",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-563",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "609849790e5a877a2f3527ba|51524a8c-295e-c874-faef-88ab9e5b5bb3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609849790e5a877a2f3527ba|51524a8c-295e-c874-faef-88ab9e5b5bb3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620593016410,
    },
    "e-564": {
      id: "e-564",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-565",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "609849790e5a877a2f3527ba|015c10be-17fe-7048-c1e7-4f5dbed6b345",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609849790e5a877a2f3527ba|015c10be-17fe-7048-c1e7-4f5dbed6b345",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620593016410,
    },
    "e-575": {
      id: "e-575",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-41",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-574",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620597469377,
    },
    "e-577": {
      id: "e-577",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-42",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-576",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6049799411e066b8b1dd9311",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620597483536,
    },
    "e-581": {
      id: "e-581",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-580",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "609849790e5a877a2f3527ba",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609849790e5a877a2f3527ba",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620621375336,
    },
    "e-586": {
      id: "e-586",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-587",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "609b34846d637759c3813f82|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609b34846d637759c3813f82|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620784261237,
    },
    "e-588": {
      id: "e-588",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-589",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "609b34846d637759c3813f82|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609b34846d637759c3813f82|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1620784261237,
    },
    "e-594": {
      id: "e-594",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "609b3e90b3c3abb636d5ae7f|0de1819c-a073-a5b9-8ac6-97e73ba3c1a8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "609b3e90b3c3abb636d5ae7f|0de1819c-a073-a5b9-8ac6-97e73ba3c1a8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1620791096803,
    },
    "e-607": {
      id: "e-607",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60a095c8ab03728d236f2656|48c2568b-cfce-4763-7179-b8c530c9645e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60a095c8ab03728d236f2656|48c2568b-cfce-4763-7179-b8c530c9645e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1621137265937,
    },
    "e-612": {
      id: "e-612",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60a5a01c5aef2223a4f938e3|1ab960b3-0766-1495-c326-862c13bb5aa5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60a5a01c5aef2223a4f938e3|1ab960b3-0766-1495-c326-862c13bb5aa5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1621468175660,
    },
    "e-619": {
      id: "e-619",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-620",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60aeb827592171105ad4657d|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60aeb827592171105ad4657d|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1622063143461,
    },
    "e-621": {
      id: "e-621",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-622",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60aeb827592171105ad4657d|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60aeb827592171105ad4657d|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1622063143461,
    },
    "e-625": {
      id: "e-625",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-626",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60b0221c06b1202f0f722e7f|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60b0221c06b1202f0f722e7f|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1622155804843,
    },
    "e-627": {
      id: "e-627",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-628",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60b0221c06b1202f0f722e7f|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60b0221c06b1202f0f722e7f|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1622155804843,
    },
    "e-629": {
      id: "e-629",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60c015a610c3c8f443d11403|1f5e5658-daad-3f1b-d4ef-f6869e43a21e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60c015a610c3c8f443d11403|1f5e5658-daad-3f1b-d4ef-f6869e43a21e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1623295048025,
    },
    "e-630": {
      id: "e-630",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0663107dd93a2|3bfba21c-fa98-8b91-7a95-e92fbb9674ec",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0663107dd93a2|3bfba21c-fa98-8b91-7a95-e92fbb9674ec",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1623986265254,
    },
    "e-631": {
      id: "e-631",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-632",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60d3ec795317b10d5303d522|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60d3ec795317b10d5303d522|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1624501369177,
    },
    "e-633": {
      id: "e-633",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-634",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60d3ec795317b10d5303d522|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60d3ec795317b10d5303d522|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1624501369177,
    },
    "e-635": {
      id: "e-635",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60d3c0255a19c170c3d34531|f44d127f-ee8d-6feb-3fda-ed3df7114cf5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60d3c0255a19c170c3d34531|f44d127f-ee8d-6feb-3fda-ed3df7114cf5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1624507409985,
    },
    "e-636": {
      id: "e-636",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-744",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de2c32e82cab683066ebab|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de2c32e82cab683066ebab|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625173042272,
    },
    "e-638": {
      id: "e-638",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-639",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60de2c32e82cab683066ebab|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60de2c32e82cab683066ebab|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1625173042272,
    },
    "e-640": {
      id: "e-640",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-641",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60f0d247e98f8f4c293cd901|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60f0d247e98f8f4c293cd901|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1626395208254,
    },
    "e-642": {
      id: "e-642",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-643",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60f0d247e98f8f4c293cd901|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60f0d247e98f8f4c293cd901|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1626395208254,
    },
    "e-644": {
      id: "e-644",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-645",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60f635d52051bf184cf7fea4|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60f635d52051bf184cf7fea4|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1626748374766,
    },
    "e-646": {
      id: "e-646",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-647",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "60f635d52051bf184cf7fea4|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "60f635d52051bf184cf7fea4|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1626748374766,
    },
    "e-648": {
      id: "e-648",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6118ca3570df92f5affc00be|48c2568b-cfce-4763-7179-b8c530c9645e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6118ca3570df92f5affc00be|48c2568b-cfce-4763-7179-b8c530c9645e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1629014581765,
    },
    "e-649": {
      id: "e-649",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-650",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "4472ac59-f655-1aef-de67-ce06aab3d75b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "4472ac59-f655-1aef-de67-ce06aab3d75b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629184322877,
    },
    "e-651": {
      id: "e-651",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-652",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b2698a74-f38c-4488-fbf1-e239f89622bc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b2698a74-f38c-4488-fbf1-e239f89622bc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629185729117,
    },
    "e-653": {
      id: "e-653",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-654",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "56aa252b-4ae8-178d-bc99-2f3a027d2678",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "56aa252b-4ae8-178d-bc99-2f3a027d2678",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629188718341,
    },
    "e-655": {
      id: "e-655",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-656",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "7a371183-7770-77e9-57a6-485480b119c8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "7a371183-7770-77e9-57a6-485480b119c8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629188997052,
    },
    "e-657": {
      id: "e-657",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-658",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b290ee1d-fda1-fa64-433f-8db699ec34f5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b290ee1d-fda1-fa64-433f-8db699ec34f5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629233939353,
    },
    "e-659": {
      id: "e-659",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-660",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "910ab926-d871-0728-24d9-788e63e8e014",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "910ab926-d871-0728-24d9-788e63e8e014",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629234808664,
    },
    "e-661": {
      id: "e-661",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-662",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "2da709ca-2b68-497c-2512-a7e740db6a2c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "2da709ca-2b68-497c-2512-a7e740db6a2c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629236130208,
    },
    "e-663": {
      id: "e-663",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-664",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d64ef",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d64ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-665": {
      id: "e-665",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-666",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d64ff",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d64ff",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-666": {
      id: "e-666",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-665",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d64ff",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d64ff",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-669": {
      id: "e-669",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-670",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d6527",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d6527",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-670": {
      id: "e-670",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-669",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d6527",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d6527",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-671": {
      id: "e-671",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-672",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d653c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d653c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-672": {
      id: "e-672",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-671",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d653c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d653c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-675": {
      id: "e-675",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-676",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d6540",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d6540",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-676": {
      id: "e-676",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-675",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d6540",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d6540",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-677": {
      id: "e-677",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-678",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e7d88aec-4fd0-3303-eb8c-553f018d6555",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e7d88aec-4fd0-3303-eb8c-553f018d6555",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629238573560,
    },
    "e-679": {
      id: "e-679",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-680",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6122095dee27ae72ec56d852|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6122095dee27ae72ec56d852|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629620574272,
    },
    "e-681": {
      id: "e-681",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-682",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6122095dee27ae72ec56d852|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6122095dee27ae72ec56d852|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1629620574272,
    },
    "e-683": {
      id: "e-683",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "613717b8404ae7204f2ee7ce|6eb4d855-f25c-3f9c-d928-f46072eb8d4b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "613717b8404ae7204f2ee7ce|6eb4d855-f25c-3f9c-d928-f46072eb8d4b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1631092662670,
    },
    "e-684": {
      id: "e-684",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61561f01f721a56f73fc742e|48c2568b-cfce-4763-7179-b8c530c9645e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61561f01f721a56f73fc742e|48c2568b-cfce-4763-7179-b8c530c9645e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1633033986776,
    },
    "e-685": {
      id: "e-685",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61561a86639623090f47bd10|e68ee349-95bd-3825-e073-456643910d3a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61561a86639623090f47bd10|e68ee349-95bd-3825-e073-456643910d3a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1633034359513,
    },
    "e-686": {
      id: "e-686",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-687",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61568496dedbb8688b98f32a|5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61568496dedbb8688b98f32a|5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633421120235,
    },
    "e-687": {
      id: "e-687",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-686",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61568496dedbb8688b98f32a|5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61568496dedbb8688b98f32a|5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633421120235,
    },
    "e-688": {
      id: "e-688",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-689",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61568496dedbb8688b98f32a|2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61568496dedbb8688b98f32a|2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633421897340,
    },
    "e-689": {
      id: "e-689",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-688",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61568496dedbb8688b98f32a|2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61568496dedbb8688b98f32a|2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633421897340,
    },
    "e-690": {
      id: "e-690",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-691",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633422651032,
    },
    "e-691": {
      id: "e-691",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-690",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5dd28b5b-c10e-3d31-96a5-9a53d70f8e65",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633422651039,
    },
    "e-692": {
      id: "e-692",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-693",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633422919119,
    },
    "e-693": {
      id: "e-693",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-692",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "2f7ee6a1-dd80-7949-06c3-dcd7d6ef893d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633422919124,
    },
    "e-694": {
      id: "e-694",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-695",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|5144162a-cbc3-0ad6-0b60-88a39a0318f1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|5144162a-cbc3-0ad6-0b60-88a39a0318f1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633462660747,
    },
    "e-695": {
      id: "e-695",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-694",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|5144162a-cbc3-0ad6-0b60-88a39a0318f1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|5144162a-cbc3-0ad6-0b60-88a39a0318f1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633462660747,
    },
    "e-698": {
      id: "e-698",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-699",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "606b971d5075d34fa4f21de8|b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "606b971d5075d34fa4f21de8|b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633463041723,
    },
    "e-699": {
      id: "e-699",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-698",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "606b971d5075d34fa4f21de8|b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "606b971d5075d34fa4f21de8|b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633463041723,
    },
    "e-700": {
      id: "e-700",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-701",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633466650059,
    },
    "e-701": {
      id: "e-701",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-729",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "b0f6d9ed-9b9c-32f8-b2f2-0abc2cb02ec5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1633466650063,
    },
    "e-702": {
      id: "e-702",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6184885c9ff64c324b7cdade|d443b916-ee86-c18e-efff-11f729d208f3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6184885c9ff64c324b7cdade|d443b916-ee86-c18e-efff-11f729d208f3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1631674042712,
    },
    "e-703": {
      id: "e-703",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6194115c96c3d1a3c476f0dd|97bb89a1-9cfe-3159-34a8-312436af7cff",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6194115c96c3d1a3c476f0dd|97bb89a1-9cfe-3159-34a8-312436af7cff",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1637099416775,
    },
    "e-704": {
      id: "e-704",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-705",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61946c2d7f5168f1894a7d7d|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61946c2d7f5168f1894a7d7d|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1637116973327,
    },
    "e-706": {
      id: "e-706",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-707",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61946c2d7f5168f1894a7d7d|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61946c2d7f5168f1894a7d7d|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1637116973327,
    },
    "e-708": {
      id: "e-708",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0665821dd938d|49703ea8-0f22-3e91-6663-f367aec26f67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0665821dd938d|49703ea8-0f22-3e91-6663-f367aec26f67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1642103579794,
    },
    "e-709": {
      id: "e-709",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e0660b59dd938f|aa786532-6175-139f-0571-d1ade91ca76c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e0660b59dd938f|aa786532-6175-139f-0571-d1ade91ca76c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1642103811678,
    },
    "e-710": {
      id: "e-710",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6216b35f1e840c0d0fb376d3|40c542cf-ad7c-0979-abb5-b9659017f73c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6216b35f1e840c0d0fb376d3|40c542cf-ad7c-0979-abb5-b9659017f73c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1645655653324,
    },
    "e-711": {
      id: "e-711",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "62292dcae95bb37b5d85e6ab|9ec504d5-22ac-accf-a18a-0ac40b94dd2e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "62292dcae95bb37b5d85e6ab|9ec504d5-22ac-accf-a18a-0ac40b94dd2e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1646871012989,
    },
    "e-712": {
      id: "e-712",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "624101ab242370168b5a484d|48c2568b-cfce-4763-7179-b8c530c9645e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "624101ab242370168b5a484d|48c2568b-cfce-4763-7179-b8c530c9645e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1648427434437,
    },
    "e-713": {
      id: "e-713",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-714",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6250999dcc34d13ec396260b|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6250999dcc34d13ec396260b|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1649449373662,
    },
    "e-715": {
      id: "e-715",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-716",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6250999dcc34d13ec396260b|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6250999dcc34d13ec396260b|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1649449373662,
    },
    "e-719": {
      id: "e-719",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-720",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|f95c72ac-44eb-d55c-5a49-903ab233a340",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|f95c72ac-44eb-d55c-5a49-903ab233a340",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1651790068651,
    },
    "e-720": {
      id: "e-720",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-719",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|f95c72ac-44eb-d55c-5a49-903ab233a340",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|f95c72ac-44eb-d55c-5a49-903ab233a340",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1651790068651,
    },
    "e-723": {
      id: "e-723",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-724",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9916467c-319e-a5fa-a627-55c88140ac33",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9916467c-319e-a5fa-a627-55c88140ac33",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1651790704787,
    },
    "e-724": {
      id: "e-724",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-45",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-723",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9916467c-319e-a5fa-a627-55c88140ac33",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9916467c-319e-a5fa-a627-55c88140ac33",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1651790704789,
    },
    "e-729": {
      id: "e-729",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-46", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "62859446bfb7b00545414e3e|2af19dca-8a5d-5650-ec87-8922270b6437",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "62859446bfb7b00545414e3e|2af19dca-8a5d-5650-ec87-8922270b6437",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-46-p",
          smoothing: 20,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: true,
          endOffsetValue: 25,
        },
      ],
      createdOn: 1653079573709,
    },
    "e-731": {
      id: "e-731",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-47",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-730",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "62859446bfb7b00545414e3e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "62859446bfb7b00545414e3e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1653633653283,
    },
    "e-732": {
      id: "e-732",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "629441667925c5d0470488ca|48c2568b-cfce-4763-7179-b8c530c9645e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "629441667925c5d0470488ca|48c2568b-cfce-4763-7179-b8c530c9645e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1653883237314,
    },
    "e-733": {
      id: "e-733",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-734",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|fbeb9e0b-a466-a0a7-441d-d0f5e771c12a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|fbeb9e0b-a466-a0a7-441d-d0f5e771c12a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1655670879772,
    },
    "e-734": {
      id: "e-734",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-733",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|fbeb9e0b-a466-a0a7-441d-d0f5e771c12a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|fbeb9e0b-a466-a0a7-441d-d0f5e771c12a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1655670879772,
    },
    "e-735": {
      id: "e-735",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-736",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5144162a-cbc3-0ad6-0b60-88a39a0318f1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5144162a-cbc3-0ad6-0b60-88a39a0318f1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1656993159528,
    },
    "e-736": {
      id: "e-736",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-44",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-735",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "5144162a-cbc3-0ad6-0b60-88a39a0318f1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "5144162a-cbc3-0ad6-0b60-88a39a0318f1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1656993159531,
    },
    "e-737": {
      id: "e-737",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-738",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f95c72ac-44eb-d55c-5a49-903ab233a340",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f95c72ac-44eb-d55c-5a49-903ab233a340",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1656993321726,
    },
    "e-738": {
      id: "e-738",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-737",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "f95c72ac-44eb-d55c-5a49-903ab233a340",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "f95c72ac-44eb-d55c-5a49-903ab233a340",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1656993321728,
    },
    "e-739": {
      id: "e-739",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6184885c9ff64c324b7cdade|60aed8ae-ad60-7ca0-1aa9-ae9e785fc53b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6184885c9ff64c324b7cdade|60aed8ae-ad60-7ca0-1aa9-ae9e785fc53b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1666126692416,
    },
    "e-740": {
      id: "e-740",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "634f034bb91288ffec796239|a99bc13b-15cf-ce37-944f-1a0199e0d942",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "634f034bb91288ffec796239|a99bc13b-15cf-ce37-944f-1a0199e0d942",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1666127514094,
    },
    "e-741": {
      id: "e-741",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-48",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-742",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ca15e293-bf82-d6e9-23cb-92a40cb43029",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ca15e293-bf82-d6e9-23cb-92a40cb43029",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1669408264978,
    },
    "e-743": {
      id: "e-743",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-49",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-744",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "18dc95ee-4b6f-747d-1ef2-ac0bf7fdba7a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "18dc95ee-4b6f-747d-1ef2-ac0bf7fdba7a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1670991308741,
    },
    "e-745": {
      id: "e-745",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-50", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6049799411e066b8b1dd9311|26f81c54-0498-8a69-4e9f-796bc8e20e5c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6049799411e066b8b1dd9311|26f81c54-0498-8a69-4e9f-796bc8e20e5c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-50-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-50-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672967118005,
    },
    "e-746": {
      id: "e-746",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-50", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "606b971d5075d34fa4f21de8|f832292a-a84a-d250-bbb2-d2ce942daa10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "606b971d5075d34fa4f21de8|f832292a-a84a-d250-bbb2-d2ce942daa10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-50-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-50-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672968937956,
    },
    "e-747": {
      id: "e-747",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-50", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6184885c9ff64c324b7cdade|669b0caa-2081-4436-8299-3a98a7aa68c5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6184885c9ff64c324b7cdade|669b0caa-2081-4436-8299-3a98a7aa68c5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-50-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-50-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672969085156,
    },
    "e-748": {
      id: "e-748",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-50", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "618723129ec80662c3fc8ecb|1eda8670-dcad-5ef9-bd47-418d2b8283da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "618723129ec80662c3fc8ecb|1eda8670-dcad-5ef9-bd47-418d2b8283da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-50-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-50-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672969168546,
    },
    "e-749": {
      id: "e-749",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-50", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "618723129ec80662c3fc8ecb|0ec3821c-280b-1082-e886-913c07cfd9b2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "618723129ec80662c3fc8ecb|0ec3821c-280b-1082-e886-913c07cfd9b2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-50-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-50-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672969216989,
    },
    "e-750": {
      id: "e-750",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-50", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "61c39a721a8431a1fd7ba9bf|83026462-df82-db33-b44f-77a2909b1318",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "61c39a721a8431a1fd7ba9bf|83026462-df82-db33-b44f-77a2909b1318",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-50-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-50-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672969306891,
    },
    "e-751": {
      id: "e-751",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-51", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "634dc32385d3007508cc3cd0|97536555-3561-6408-8ea6-10c9435feeb1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "634dc32385d3007508cc3cd0|97536555-3561-6408-8ea6-10c9435feeb1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-51-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-51-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1672969552578,
    },
    "e-752": {
      id: "e-752",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-52", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6184885c9ff64c324b7cdade|41491a0d-3b58-d52f-916d-e7a1403b12cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6184885c9ff64c324b7cdade|41491a0d-3b58-d52f-916d-e7a1403b12cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-52-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-52-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1673042633557,
    },
    "e-753": {
      id: "e-753",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-53", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "634f034bb91288ffec796239|a99bc13b-15cf-ce37-944f-1a0199e0d925",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "634f034bb91288ffec796239|a99bc13b-15cf-ce37-944f-1a0199e0d925",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-53-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-53-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1673044462068,
    },
    "e-754": {
      id: "e-754",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-755",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "63e00b573f8612fa9d7a8ac1|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "63e00b573f8612fa9d7a8ac1|dd7b36d1-90bc-6a4b-eb93-18ba0a636e79",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1675627351649,
    },
    "e-756": {
      id: "e-756",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-757",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "63e00b573f8612fa9d7a8ac1|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "63e00b573f8612fa9d7a8ac1|f9d5c2b4-e4a3-4f46-7e44-91b414c180e3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1675627351649,
    },
    "e-758": {
      id: "e-758",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "63e0109be4e25f20d40f15b6|9010dfff-2bcf-2aa8-115a-b5cb9883a107",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "63e0109be4e25f20d40f15b6|9010dfff-2bcf-2aa8-115a-b5cb9883a107",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1675629225619,
    },
    "e-759": {
      id: "e-759",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "642e3d1ed43afc3c02acbc1a|d9c34efd-2363-3976-7bd9-153d1689b659",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "642e3d1ed43afc3c02acbc1a|d9c34efd-2363-3976-7bd9-153d1689b659",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1681254215842,
    },
    "e-760": {
      id: "e-760",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-23", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "644b4301da921104c35b8ae8|40c542cf-ad7c-0979-abb5-b9659017f73c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "644b4301da921104c35b8ae8|40c542cf-ad7c-0979-abb5-b9659017f73c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-23-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1682653953454,
    },
    "e-761": {
      id: "e-761",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-762",
        },
      },
      mediaQueries: ["main", "medium", "tiny"],
      target: {
        id: "645861bf4312bb09393017ae|07eb6516-5df3-1dc2-db5c-bcf1c2528362",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "645861bf4312bb09393017ae|07eb6516-5df3-1dc2-db5c-bcf1c2528362",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683513790545,
    },
    "e-763": {
      id: "e-763",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-764",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "645861bf4312bb09393017ae|51524a8c-295e-c874-faef-88ab9e5b5bb3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "645861bf4312bb09393017ae|51524a8c-295e-c874-faef-88ab9e5b5bb3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683513790545,
    },
    "e-765": {
      id: "e-765",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-766",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "645861bf4312bb09393017ae|015c10be-17fe-7048-c1e7-4f5dbed6b345",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "645861bf4312bb09393017ae|015c10be-17fe-7048-c1e7-4f5dbed6b345",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683513790545,
    },
    "e-768": {
      id: "e-768",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-767",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "645861bf4312bb09393017ae",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "645861bf4312bb09393017ae",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1683513790545,
    },
  },
  actionLists: {
    "a-11": {
      id: "a-11",
      title: "Modal | Social 1: Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".div-social-2",
                  selectorGuids: ["5d9bd433-f175-c544-7223-a7f237342b0a"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1607555512573,
    },
    "a-23": {
      id: "a-23",
      title: "Scroll Progress",
      continuousParameterGroups: [
        {
          id: "a-23-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-23-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".div-progress-2",
                      selectorGuids: ["98a9a077-028c-0c31-2d14-d683b3e00a9a"],
                    },
                    xValue: 0,
                    locked: false,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-23-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".div-progress-2",
                      selectorGuids: ["98a9a077-028c-0c31-2d14-d683b3e00a9a"],
                    },
                    xValue: 1,
                    locked: false,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1608924877573,
    },
    "a-21": {
      id: "a-21",
      title: "Modal | Social 1 | Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-social-3",
                  selectorGuids: ["0844293e-f81e-c0e7-ec9e-c60a981dbcda"],
                },
                yValue: 80,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-21-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-social-3",
                  selectorGuids: ["0844293e-f81e-c0e7-ec9e-c60a981dbcda"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-21-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-social-2",
                  selectorGuids: ["5d9bd433-f175-c544-7223-a7f237342b0a"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-social-2",
                  selectorGuids: ["5d9bd433-f175-c544-7223-a7f237342b0a"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuint",
                duration: 500,
                target: {
                  selector: ".div-social-3",
                  selectorGuids: ["0844293e-f81e-c0e7-ec9e-c60a981dbcda"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-21-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 400,
                target: {
                  selector: ".div-social-3",
                  selectorGuids: ["0844293e-f81e-c0e7-ec9e-c60a981dbcda"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1608605209219,
    },
    "a-25": {
      id: "a-25",
      title: "Menu | Click On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n-12",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-hidden-1",
                  selectorGuids: ["5193459c-0f47-67f9-e6ae-94b3859c049c"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-bottom-1",
                  selectorGuids: ["1d64fc87-4066-ead3-12d5-c9b930cd1af4"],
                },
                yValue: -6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-top-1",
                  selectorGuids: ["64f8018c-b2af-f77b-c2f5-a8edcea4c270"],
                },
                yValue: 6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-bottom-1",
                  selectorGuids: ["07d7e4bf-f5ef-3c9d-085a-1a907d1de9fc"],
                },
                yValue: -6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-top-1",
                  selectorGuids: ["4fc9fdfb-f6a6-75cd-2d0b-83aa3b8866d5"],
                },
                yValue: 6,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".text-menu-1",
                  selectorGuids: ["31898bc0-f332-9719-6502-2e58d1a290cc"],
                },
                yValue: -30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 200,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-top-1",
                  selectorGuids: ["4fc9fdfb-f6a6-75cd-2d0b-83aa3b8866d5"],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-10",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 200,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-bottom-1",
                  selectorGuids: ["1d64fc87-4066-ead3-12d5-c9b930cd1af4"],
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-11",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-menu-white-middle-1",
                  selectorGuids: ["58d60fb0-a9fa-80cc-0e51-957311971f22"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-25-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 400,
                target: {
                  selector: ".text-menu-3",
                  selectorGuids: ["85f15cc2-90f8-62a6-3d6a-824cf17c6dad"],
                },
                yValue: -30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  selector: ".text-menu-2",
                  selectorGuids: ["2b65f2ab-5893-6410-9f94-74a05825745a"],
                },
                yValue: -30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-20",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-menu-black-middle-1",
                  selectorGuids: ["686a36ae-b5ba-acab-4b3f-bbc9231a4339"],
                },
                widthValue: 0,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-25-n-19",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 200,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-bottom-1",
                  selectorGuids: ["07d7e4bf-f5ef-3c9d-085a-1a907d1de9fc"],
                },
                yValue: null,
                zValue: 45,
                xUnit: "DEG",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-18",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 200,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-top-1",
                  selectorGuids: ["64f8018c-b2af-f77b-c2f5-a8edcea4c270"],
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1611625817159,
    },
    "a-26": {
      id: "a-26",
      title: "Menu | Click Off",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-hidden-1",
                  selectorGuids: ["5193459c-0f47-67f9-e6ae-94b3859c049c"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-top-1",
                  selectorGuids: ["4fc9fdfb-f6a6-75cd-2d0b-83aa3b8866d5"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-bottom-1",
                  selectorGuids: ["1d64fc87-4066-ead3-12d5-c9b930cd1af4"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".text-menu-3",
                  selectorGuids: ["85f15cc2-90f8-62a6-3d6a-824cf17c6dad"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".text-menu-1",
                  selectorGuids: ["31898bc0-f332-9719-6502-2e58d1a290cc"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-14",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-bottom-1",
                  selectorGuids: ["07d7e4bf-f5ef-3c9d-085a-1a907d1de9fc"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-13",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-top-1",
                  selectorGuids: ["64f8018c-b2af-f77b-c2f5-a8edcea4c270"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".text-menu-2",
                  selectorGuids: ["2b65f2ab-5893-6410-9f94-74a05825745a"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-menu-white-middle-1",
                  selectorGuids: ["58d60fb0-a9fa-80cc-0e51-957311971f22"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-26-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-bottom-1",
                  selectorGuids: ["1d64fc87-4066-ead3-12d5-c9b930cd1af4"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-white-top-1",
                  selectorGuids: ["4fc9fdfb-f6a6-75cd-2d0b-83aa3b8866d5"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-12",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-menu-black-middle-1",
                  selectorGuids: ["686a36ae-b5ba-acab-4b3f-bbc9231a4339"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-26-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-top-1",
                  selectorGuids: ["64f8018c-b2af-f77b-c2f5-a8edcea4c270"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-menu-black-bottom-1",
                  selectorGuids: ["07d7e4bf-f5ef-3c9d-085a-1a907d1de9fc"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1611691518666,
    },
    "a-3": {
      id: "a-3",
      title: "Message disappear",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".container-map-2",
                  selectorGuids: ["313cbf75-25f2-32c1-e4cd-e3c56507a295"],
                },
                value: "none",
              },
            },
            {
              id: "a-3-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-donate-1",
                  selectorGuids: ["07e3191d-e704-6071-c91c-95152f85cfcb"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1601004332460,
    },
    "a-27": {
      id: "a-27",
      title: "Menu About | Click On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: "none",
              },
            },
            {
              id: "a-27-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: "flex",
              },
            },
            {
              id: "a-27-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-27-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: "none",
              },
            },
            {
              id: "a-27-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: "none",
              },
            },
            {
              id: "a-27-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: "none",
              },
            },
            {
              id: "a-27-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1615341541582,
    },
    "a-28": {
      id: "a-28",
      title: "Menu Outreaches | Click On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: "none",
              },
            },
            {
              id: "a-28-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: "flex",
              },
            },
            {
              id: "a-28-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-28-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: "none",
              },
            },
            {
              id: "a-28-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: "none",
              },
            },
            {
              id: "a-28-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: "none",
              },
            },
            {
              id: "a-28-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1615342081110,
    },
    "a-29": {
      id: "a-29",
      title: "Menu Resources | Click On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: "none",
              },
            },
            {
              id: "a-29-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-29-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: "flex",
              },
            },
            {
              id: "a-29-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-29-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: "none",
              },
            },
            {
              id: "a-29-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: "none",
              },
            },
            {
              id: "a-29-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: "none",
              },
            },
            {
              id: "a-29-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1615342225853,
    },
    "a-39": {
      id: "a-39",
      title: "Expand Div | On Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".div-expand-1",
                  selectorGuids: ["87279ced-2f44-ce91-21ba-652491fc9ce2"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "inOutQuint",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".div-expand-1",
                  selectorGuids: ["87279ced-2f44-ce91-21ba-652491fc9ce2"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1616641983230,
    },
    "a-40": {
      id: "a-40",
      title: "Retract Div | Off Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-40-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "inOutQuint",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".div-expand-1",
                  selectorGuids: ["87279ced-2f44-ce91-21ba-652491fc9ce2"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1616642964042,
    },
    "a-41": {
      id: "a-41",
      title: "Scroll Down Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-41-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".image-home-1",
                  selectorGuids: ["436e4eab-998d-e469-e4e9-6e129b48e570"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-41-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  selector: ".image-home-1",
                  selectorGuids: ["436e4eab-998d-e469-e4e9-6e129b48e570"],
                },
                yValue: 5,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-41-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  selector: ".image-home-1",
                  selectorGuids: ["436e4eab-998d-e469-e4e9-6e129b48e570"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-41-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  selector: ".image-home-1",
                  selectorGuids: ["436e4eab-998d-e469-e4e9-6e129b48e570"],
                },
                yValue: -5,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1619142307810,
    },
    "a-42": {
      id: "a-42",
      title: "Animate Load",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-42-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-display-2",
                  selectorGuids: ["aa9f654a-a70c-d50a-76bb-cf917507a534"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-29",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-display-2",
                  selectorGuids: ["aa9f654a-a70c-d50a-76bb-cf917507a534"],
                },
                zValue: 5,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-display-2",
                  selectorGuids: ["aa9f654a-a70c-d50a-76bb-cf917507a534"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-3",
                  selectorGuids: ["c60eb01c-9de8-a7ab-aa03-db7f50336070"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-33",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-3",
                  selectorGuids: ["c60eb01c-9de8-a7ab-aa03-db7f50336070"],
                },
                zValue: 5,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-24",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-3",
                  selectorGuids: ["c60eb01c-9de8-a7ab-aa03-db7f50336070"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-25",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-5",
                  selectorGuids: ["2b8de4e5-9ca2-b621-659c-1a25e90e7f82"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-34",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-5",
                  selectorGuids: ["2b8de4e5-9ca2-b621-659c-1a25e90e7f82"],
                },
                zValue: 5,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-26",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-5",
                  selectorGuids: ["2b8de4e5-9ca2-b621-659c-1a25e90e7f82"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-41",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-4",
                  selectorGuids: ["f96c240c-0fe8-ab1a-833f-3f09579d9eb5"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-63",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff48",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-64",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff48",
                },
                xValue: null,
                zValue: 5,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-65",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff48",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-66",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4c",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-67",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4c",
                },
                zValue: 5,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-68",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4c",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-69",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4f",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-70",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4f",
                },
                zValue: 5,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-71",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4f",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-42-n-84",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-blur-1",
                  selectorGuids: ["78e3a883-8f73-985d-20d9-cf3d3e59745b"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-42-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  selector: ".div-display-2",
                  selectorGuids: ["aa9f654a-a70c-d50a-76bb-cf917507a534"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-42",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 500,
                easing: "inOutQuint",
                duration: 2000,
                target: {
                  selector: ".div-home-4",
                  selectorGuids: ["f96c240c-0fe8-ab1a-833f-3f09579d9eb5"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-72",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 700,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff48",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-73",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 900,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4c",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-display-2",
                  selectorGuids: ["aa9f654a-a70c-d50a-76bb-cf917507a534"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-35",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1000,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-display-2",
                  selectorGuids: ["aa9f654a-a70c-d50a-76bb-cf917507a534"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-83",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1100,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4f",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-75",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff48",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-76",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff48",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-27",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1300,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  selector: ".div-home-5",
                  selectorGuids: ["2b8de4e5-9ca2-b621-659c-1a25e90e7f82"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-77",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1400,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4c",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-78",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1400,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4c",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-81",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1600,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4f",
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-82",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1600,
                easing: "",
                duration: 500,
                target: {
                  id: "6049799411e066b8b1dd9311|695b3d7a-ff26-3790-e966-6f8eb043ff4f",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-28",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1800,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-5",
                  selectorGuids: ["2b8de4e5-9ca2-b621-659c-1a25e90e7f82"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-39",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1800,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-5",
                  selectorGuids: ["2b8de4e5-9ca2-b621-659c-1a25e90e7f82"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-42-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 2200,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  selector: ".div-home-3",
                  selectorGuids: ["c60eb01c-9de8-a7ab-aa03-db7f50336070"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-42-n-85",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 2200,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-blur-1",
                  selectorGuids: ["78e3a883-8f73-985d-20d9-cf3d3e59745b"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 2700,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-3",
                  selectorGuids: ["c60eb01c-9de8-a7ab-aa03-db7f50336070"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-42-n-40",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 2700,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-home-3",
                  selectorGuids: ["c60eb01c-9de8-a7ab-aa03-db7f50336070"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1619216270695,
    },
    "a-2": {
      id: "a-2",
      title: "Message appear",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".container-map-2",
                  selectorGuids: ["313cbf75-25f2-32c1-e4cd-e3c56507a295"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-map-3",
                  selectorGuids: ["9d455b5f-afd1-5cb5-6bde-c893ee7ea17b"],
                },
                zValue: -151,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 2000,
                easing: "inOutQuint",
                duration: 1000,
                target: {
                  selector: ".container-map-2",
                  selectorGuids: ["313cbf75-25f2-32c1-e4cd-e3c56507a295"],
                },
                widthUnit: "AUTO",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-2-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 2200,
                easing: "inOutQuint",
                duration: 1200,
                target: {
                  selector: ".div-map-3",
                  selectorGuids: ["9d455b5f-afd1-5cb5-6bde-c893ee7ea17b"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1600991502284,
    },
    "a-44": {
      id: "a-44",
      title: "Menu Get Involved | Click On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-44-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: "none",
              },
            },
            {
              id: "a-44-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-44-n-9",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: "flex",
              },
            },
            {
              id: "a-44-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-44-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: "none",
              },
            },
            {
              id: "a-44-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: "none",
              },
            },
            {
              id: "a-44-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: "none",
              },
            },
            {
              id: "a-44-n-11",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1615341541582,
    },
    "a-45": {
      id: "a-45",
      title: "Menu Contact | Click On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-45-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: "none",
              },
            },
            {
              id: "a-45-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-45-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: "flex",
              },
            },
            {
              id: "a-45-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  selector: ".div-nav-contact-1",
                  selectorGuids: ["3a867b54-f4bc-a00e-16e6-a85d78e05e41"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-45-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-resources-1",
                  selectorGuids: ["7916c9a3-27cf-b99f-89ca-c725595ce4ec"],
                },
                value: "none",
              },
            },
            {
              id: "a-45-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-about-1",
                  selectorGuids: ["23be390f-6fe6-419e-8168-46ed30286d30"],
                },
                value: "none",
              },
            },
            {
              id: "a-45-n-7",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-outreaches-1",
                  selectorGuids: ["48c0d34d-b832-49fe-7a50-6b330c9b9c70"],
                },
                value: "none",
              },
            },
            {
              id: "a-45-n-8",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".div-nav-get-1",
                  selectorGuids: ["1eb01c77-812c-dc02-017f-72b2fdc15701"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1615341541582,
    },
    "a-46": {
      id: "a-46",
      title: "Slider Animation #1",
      continuousParameterGroups: [
        {
          id: "a-46-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 5,
              actionItems: [
                {
                  id: "a-46-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s2",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "e18fa9da-372a-0c05-f3f8-fefdb7d31fec",
                      ],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-14",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-1",
                      selectorGuids: ["ec4f825c-3073-b941-5b9c-2b54552ff3c3"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-22",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-1",
                      selectorGuids: ["ec4f825c-3073-b941-5b9c-2b54552ff3c3"],
                    },
                    globalSwatchId: "",
                    rValue: 255,
                    bValue: 255,
                    gValue: 255,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 12,
              actionItems: [
                {
                  id: "a-46-n-30",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 0,
                    bValue: 0,
                    gValue: 0,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 25,
              actionItems: [
                {
                  id: "a-46-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s2",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "e18fa9da-372a-0c05-f3f8-fefdb7d31fec",
                      ],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-15",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-1",
                      selectorGuids: ["ec4f825c-3073-b941-5b9c-2b54552ff3c3"],
                    },
                    xValue: 0.92,
                    yValue: 0.92,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-23",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-1",
                      selectorGuids: ["ec4f825c-3073-b941-5b9c-2b54552ff3c3"],
                    },
                    globalSwatchId: "",
                    rValue: 224,
                    bValue: 224,
                    gValue: 224,
                    aValue: 1,
                  },
                },
                {
                  id: "a-46-n-31",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 15,
                    bValue: 129,
                    gValue: 76,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-46-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s3",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "b9c350b2-f660-b6d8-55cc-764ab01817c3",
                      ],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-16",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s2",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "e18fa9da-372a-0c05-f3f8-fefdb7d31fec",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-24",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s2",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "e18fa9da-372a-0c05-f3f8-fefdb7d31fec",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 255,
                    bValue: 255,
                    gValue: 255,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 38,
              actionItems: [
                {
                  id: "a-46-n-32",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 15,
                    bValue: 129,
                    gValue: 76,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-46-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s3",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "b9c350b2-f660-b6d8-55cc-764ab01817c3",
                      ],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-17",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s2",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "e18fa9da-372a-0c05-f3f8-fefdb7d31fec",
                      ],
                    },
                    xValue: 0.92,
                    yValue: 0.92,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-25",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s2",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "e18fa9da-372a-0c05-f3f8-fefdb7d31fec",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 224,
                    bValue: 224,
                    gValue: 224,
                    aValue: 1,
                  },
                },
                {
                  id: "a-46-n-33",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 241,
                    bValue: 82,
                    gValue: 81,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 55,
              actionItems: [
                {
                  id: "a-46-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s4",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "3df8f879-51bb-ca4e-0144-93b851394eac",
                      ],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-18",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s3",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "b9c350b2-f660-b6d8-55cc-764ab01817c3",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-26",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s3",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "b9c350b2-f660-b6d8-55cc-764ab01817c3",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 255,
                    bValue: 255,
                    gValue: 255,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 62,
              actionItems: [
                {
                  id: "a-46-n-34",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 241,
                    bValue: 82,
                    gValue: 81,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 75,
              actionItems: [
                {
                  id: "a-46-n-12",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s4",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "3df8f879-51bb-ca4e-0144-93b851394eac",
                      ],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-19",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s3",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "b9c350b2-f660-b6d8-55cc-764ab01817c3",
                      ],
                    },
                    xValue: 0.92,
                    yValue: 0.92,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-27",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s3",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "b9c350b2-f660-b6d8-55cc-764ab01817c3",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 224,
                    bValue: 224,
                    gValue: 224,
                    aValue: 1,
                  },
                },
                {
                  id: "a-46-n-35",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 255,
                    bValue: 66,
                    gValue: 188,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-46-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s5",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "a80ccd59-3ba8-a356-f55b-aaafd8b5ec57",
                      ],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-20",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s4",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "3df8f879-51bb-ca4e-0144-93b851394eac",
                      ],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-28",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s4",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "3df8f879-51bb-ca4e-0144-93b851394eac",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 255,
                    bValue: 255,
                    gValue: 255,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 88,
              actionItems: [
                {
                  id: "a-46-n-36",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 255,
                    bValue: 66,
                    gValue: 188,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-46-n-13",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s5",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "a80ccd59-3ba8-a356-f55b-aaafd8b5ec57",
                      ],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-46-n-21",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s4",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "3df8f879-51bb-ca4e-0144-93b851394eac",
                      ],
                    },
                    xValue: 0.92,
                    yValue: 0.92,
                    locked: true,
                  },
                },
                {
                  id: "a-46-n-29",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-slide-2.s4",
                      selectorGuids: [
                        "68d87614-aeef-c6f3-976d-c82ea04c85a8",
                        "3df8f879-51bb-ca4e-0144-93b851394eac",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 224,
                    bValue: 224,
                    gValue: 224,
                    aValue: 1,
                  },
                },
                {
                  id: "a-46-n-37",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".html-journeys-1",
                      selectorGuids: ["4af1a2cf-50e0-8ddf-7a23-84b6f379d34a"],
                    },
                    globalSwatchId: "",
                    rValue: 12,
                    bValue: 70,
                    gValue: 131,
                    aValue: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1651448513877,
    },
    "a-47": {
      id: "a-47",
      title: "Animate Load - Journeys",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-47-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".heading-i-white-64-1",
                  selectorGuids: ["ee2b053e-0f73-8c34-2aab-dbbac7602aeb"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-47-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".heading-i-white-64-1",
                  selectorGuids: ["ee2b053e-0f73-8c34-2aab-dbbac7602aeb"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-47-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".text-i-white-normal-22-1.pt-30-1",
                  selectorGuids: [
                    "873072e7-e430-fa5f-0806-4e2ffa31659b",
                    "24acefba-ab86-c5f9-fef5-fcf3f3bed008",
                  ],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-47-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".text-i-white-normal-22-1.pt-30-1",
                  selectorGuids: [
                    "873072e7-e430-fa5f-0806-4e2ffa31659b",
                    "24acefba-ab86-c5f9-fef5-fcf3f3bed008",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-47-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "62859446bfb7b00545414e3e|a6888a7b-3b99-0d96-3cae-f4b31ad36ac8",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-47-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "62859446bfb7b00545414e3e|a6888a7b-3b99-0d96-3cae-f4b31ad36ac8",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-47-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  selector: ".heading-i-white-64-1",
                  selectorGuids: ["ee2b053e-0f73-8c34-2aab-dbbac7602aeb"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-47-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 1500,
                target: {
                  selector: ".heading-i-white-64-1",
                  selectorGuids: ["ee2b053e-0f73-8c34-2aab-dbbac7602aeb"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-47-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1500,
                easing: "",
                duration: 1500,
                target: {
                  selector: ".text-i-white-normal-22-1.pt-30-1",
                  selectorGuids: [
                    "873072e7-e430-fa5f-0806-4e2ffa31659b",
                    "24acefba-ab86-c5f9-fef5-fcf3f3bed008",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-47-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1500,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  selector: ".text-i-white-normal-22-1.pt-30-1",
                  selectorGuids: [
                    "873072e7-e430-fa5f-0806-4e2ffa31659b",
                    "24acefba-ab86-c5f9-fef5-fcf3f3bed008",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-47-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 2000,
                easing: "",
                duration: 1500,
                target: {
                  id: "62859446bfb7b00545414e3e|a6888a7b-3b99-0d96-3cae-f4b31ad36ac8",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-47-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 2000,
                easing: "inOutQuint",
                duration: 1500,
                target: {
                  id: "62859446bfb7b00545414e3e|a6888a7b-3b99-0d96-3cae-f4b31ad36ac8",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1653633659721,
    },
    "a-48": {
      id: "a-48",
      title: "Close Region 2 | On Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-48-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".div-geo-1",
                  selectorGuids: ["4155ce19-04b5-2815-9334-411b342f0dff"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620272052333,
    },
    "a-49": {
      id: "a-49",
      title: "Close Region | On Click",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-49-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "PARENT",
                  selector: ".row-site-1",
                  selectorGuids: ["2c896438-ab9b-4b81-ef16-c6e6adfd2d70"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1620272052333,
    },
    "a-50": {
      id: "a-50",
      title: "Hover Effects | Book",
      continuousParameterGroups: [
        {
          id: "a-50-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-50-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    xValue: 70,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-50-n-5",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-book-1",
                      selectorGuids: ["08487147-e1c3-97f3-bc88-9ec6a147e28a"],
                    },
                    xValue: null,
                    yValue: -10,
                    xUnit: "deg",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-50-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-50-n-6",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-book-1",
                      selectorGuids: ["08487147-e1c3-97f3-bc88-9ec6a147e28a"],
                    },
                    yValue: 10,
                    xUnit: "DEG",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-50-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-50-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    xValue: null,
                    yValue: 150,
                    xUnit: "px",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-50-n-7",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-book-1",
                      selectorGuids: ["08487147-e1c3-97f3-bc88-9ec6a147e28a"],
                    },
                    xValue: 5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-50-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-50-n-8",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-book-1",
                      selectorGuids: ["08487147-e1c3-97f3-bc88-9ec6a147e28a"],
                    },
                    xValue: -5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1672897510321,
    },
    "a-51": {
      id: "a-51",
      title: "Hover Effects | Proclamations",
      continuousParameterGroups: [
        {
          id: "a-51-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-51-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    xValue: 70,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-51-n-9",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-proclamation-1",
                      selectorGuids: ["0350e331-6fd1-f4ce-9fa4-9e38ed309ba5"],
                    },
                    yValue: -10,
                    xUnit: "DEG",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-51-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-51-n-10",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-proclamation-1",
                      selectorGuids: ["0350e331-6fd1-f4ce-9fa4-9e38ed309ba5"],
                    },
                    yValue: 10,
                    xUnit: "DEG",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-51-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-51-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    xValue: null,
                    yValue: 150,
                    xUnit: "px",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-51-n-11",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-proclamation-1",
                      selectorGuids: ["0350e331-6fd1-f4ce-9fa4-9e38ed309ba5"],
                    },
                    xValue: 5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-51-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-1",
                      selectorGuids: ["bc051ceb-949d-e350-3f07-d5e6fba8b873"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-51-n-12",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".image-proclamation-1",
                      selectorGuids: ["0350e331-6fd1-f4ce-9fa4-9e38ed309ba5"],
                    },
                    xValue: -5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1672897510321,
    },
    "a-52": {
      id: "a-52",
      title: "Hover Effects | Book Slide",
      continuousParameterGroups: [
        {
          id: "a-52-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-52-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-2",
                      selectorGuids: ["7f7a62f7-cea7-5bb6-8393-14e1459b53cb"],
                    },
                    xValue: 50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-52-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-books-1",
                      selectorGuids: ["80c34e76-082b-7c83-ba78-8598bbc7f81b"],
                    },
                    xValue: null,
                    yValue: -5,
                    xUnit: "deg",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-52-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-2",
                      selectorGuids: ["7f7a62f7-cea7-5bb6-8393-14e1459b53cb"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-52-n-4",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-books-1",
                      selectorGuids: ["80c34e76-082b-7c83-ba78-8598bbc7f81b"],
                    },
                    yValue: 5,
                    xUnit: "DEG",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-52-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-52-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-2",
                      selectorGuids: ["7f7a62f7-cea7-5bb6-8393-14e1459b53cb"],
                    },
                    xValue: null,
                    yValue: 100,
                    xUnit: "px",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-52-n-6",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-books-1",
                      selectorGuids: ["80c34e76-082b-7c83-ba78-8598bbc7f81b"],
                    },
                    xValue: 5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-52-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-2",
                      selectorGuids: ["7f7a62f7-cea7-5bb6-8393-14e1459b53cb"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-52-n-8",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-books-1",
                      selectorGuids: ["80c34e76-082b-7c83-ba78-8598bbc7f81b"],
                    },
                    xValue: -5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1672897510321,
    },
    "a-53": {
      id: "a-53",
      title: "Hover Effects | Cards Slide",
      continuousParameterGroups: [
        {
          id: "a-53-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-53-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-3",
                      selectorGuids: ["3e8a0c87-e9ca-e36e-1749-0699bb5d735c"],
                    },
                    xValue: 50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-53-n-2",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-cards-1",
                      selectorGuids: ["51a7bc0a-1788-2ed4-08b7-9c9a00bf37cf"],
                    },
                    xValue: null,
                    yValue: -5,
                    xUnit: "deg",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-53-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-3",
                      selectorGuids: ["3e8a0c87-e9ca-e36e-1749-0699bb5d735c"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-53-n-4",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-cards-1",
                      selectorGuids: ["51a7bc0a-1788-2ed4-08b7-9c9a00bf37cf"],
                    },
                    yValue: 5,
                    xUnit: "DEG",
                    yUnit: "deg",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-53-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-53-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-3",
                      selectorGuids: ["3e8a0c87-e9ca-e36e-1749-0699bb5d735c"],
                    },
                    xValue: null,
                    yValue: 150,
                    xUnit: "px",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-53-n-6",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-cards-1",
                      selectorGuids: ["51a7bc0a-1788-2ed4-08b7-9c9a00bf37cf"],
                    },
                    xValue: 5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-53-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".div-glow-3",
                      selectorGuids: ["3e8a0c87-e9ca-e36e-1749-0699bb5d735c"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-53-n-8",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".mask-cards-1",
                      selectorGuids: ["51a7bc0a-1788-2ed4-08b7-9c9a00bf37cf"],
                    },
                    xValue: -5,
                    xUnit: "deg",
                    yUnit: "DEG",
                    zUnit: "DEG",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1672897510321,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
