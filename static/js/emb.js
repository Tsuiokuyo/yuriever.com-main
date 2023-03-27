new(function() {
    this.navigator = window.navigator;
    this.document = window.document;
    this.setTimeout = window.setTimeout.bind(window);
    var f, aa = aa || {},
        l = this;

    function m(a) { return void 0 !== a }

    function ba() {}

    function n(a) { a.i = function() { return a.bc ? a.bc : a.bc = new a } }

    function ca(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) { if (a instanceof Array) return "array"; if (a instanceof Object) return b; var c = Object.prototype.toString.call(a); if ("[object Window]" == c) return "object"; if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array"; if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function" } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function p(a) { return "array" == ca(a) }

    function da(a) { var b = ca(a); return "array" == b || "object" == b && "number" == typeof a.length }

    function q(a) { return "string" == typeof a }

    function r(a) { return "number" == typeof a }

    function ea(a) { return "function" == ca(a) }

    function fa(a) { var b = typeof a; return "object" == b && null != a || "function" == b }
    var ga = "closure_uid_" + (1E9 * Math.random() >>> 0),
        ha = 0;

    function ia(a, b, c) { return a.call.apply(a.bind, arguments) }

    function ja(a, b, c) { if (!a) throw Error(); if (2 < arguments.length) { var d = Array.prototype.slice.call(arguments, 2); return function() { var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d); return a.apply(b, c) } } return function() { return a.apply(b, arguments) } }

    function t(a, b, c) { t = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ia : ja; return t.apply(null, arguments) }

    function ka(a, b) { var c = Array.prototype.slice.call(arguments, 1); return function() { var b = c.slice();
            b.push.apply(b, arguments); return a.apply(this, b) } }
    var la = Date.now || function() { return +new Date };

    function u(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.C = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.ae = function(a, c, g) { for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k]; return b.prototype[c].apply(a, h) } };

    function ma(a) { a = String(a); if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try { return eval("(" + a + ")") } catch (b) {}
        throw Error("Invalid JSON string: " + a); }

    function na(a) { var b = [];
        qa(new ra, a, b); return b.join("") }

    function ra() { this.Ua = void 0 }

    function qa(a, b, c) {
        switch (typeof b) {
            case "string":
                sa(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) { c.push("null"); break }
                if (p(b)) { var d = b.length;
                    c.push("["); for (var e = "", g = 0; g < d; g++) c.push(e), e = b[g], qa(a, a.Ua ? a.Ua.call(b, String(g), e) : e, c), e = ",";
                    c.push("]"); break }
                c.push("{");
                d = "";
                for (g in b) Object.prototype.hasOwnProperty.call(b, g) && (e = b[g], "function" != typeof e && (c.push(d), sa(g, c),
                    c.push(":"), qa(a, a.Ua ? a.Ua.call(b, g, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }
    var ta = { '"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b" },
        ua = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function sa(a, b) { b.push('"', a.replace(ua, function(a) { if (a in ta) return ta[a]; var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0"); return ta[a] = e + b.toString(16) }), '"') };
    var va;

    function wa(a) { if (Error.captureStackTrace) Error.captureStackTrace(this, wa);
        else { var b = Error().stack;
            b && (this.stack = b) }
        a && (this.message = String(a)) }
    u(wa, Error);
    wa.prototype.name = "CustomError";

    function xa(a, b) { for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift(); return d + c.join("%s") }
    var ya = String.prototype.trim ? function(a) { return a.trim() } : function(a) { return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "") };

    function za(a) { if (!Aa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(Ba, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Ca, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Da, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Ea, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(Fa, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(Ga, "&#0;")); return a }
    var Ba = /&/g,
        Ca = /</g,
        Da = />/g,
        Ea = /"/g,
        Fa = /'/g,
        Ga = /\x00/g,
        Aa = /[\x00&<>"']/;

    function Ha(a, b) { for (var c = 0, d = ya(String(a)).split("."), e = ya(String(b)).split("."), g = Math.max(d.length, e.length), h = 0; 0 == c && h < g; h++) { var k = d[h] || "",
                x = e[h] || "",
                Pd = RegExp("(\\d*)(\\D*)", "g"),
                Qd = RegExp("(\\d*)(\\D*)", "g");
            do { var oa = Pd.exec(k) || ["", "", ""],
                    pa = Qd.exec(x) || ["", "", ""]; if (0 == oa[0].length && 0 == pa[0].length) break;
                c = Ia(0 == oa[1].length ? 0 : parseInt(oa[1], 10), 0 == pa[1].length ? 0 : parseInt(pa[1], 10)) || Ia(0 == oa[2].length, 0 == pa[2].length) || Ia(oa[2], pa[2]) } while (0 == c) } return c }

    function Ia(a, b) { return a < b ? -1 : a > b ? 1 : 0 }

    function Ja(a) { return String(a).replace(/\-([a-z])/g, function(a, c) { return c.toUpperCase() }) }

    function Ka(a) { var b = q(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s"; return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) { return b + e.toUpperCase() }) };

    function La(a, b) { b.unshift(a);
        wa.call(this, xa.apply(null, b));
        b.shift() }
    u(La, wa);
    La.prototype.name = "AssertionError";

    function Ma(a, b) { throw new La("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)); };
    var v = Array.prototype,
        Na = v.indexOf ? function(a, b, c) { return v.indexOf.call(a, b, c) } : function(a, b, c) { c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c; if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, c) : -1; for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1 },
        Oa = v.forEach ? function(a, b, c) { v.forEach.call(a, b, c) } : function(a, b, c) { for (var d = a.length, e = q(a) ? a.split("") : a, g = 0; g < d; g++) g in e && b.call(c, e[g], g, a) },
        Pa = v.filter ? function(a, b, c) { return v.filter.call(a, b, c) } : function(a, b, c) {
            for (var d = a.length, e = [], g = 0, h = q(a) ?
                    a.split("") : a, k = 0; k < d; k++)
                if (k in h) { var x = h[k];
                    b.call(c, x, k, a) && (e[g++] = x) }
            return e
        };

    function Qa(a) { var b;
        a: { b = Ra; for (var c = a.length, d = q(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) { b = e; break a }
            b = -1 }
        return 0 > b ? null : q(a) ? a.charAt(b) : a[b] }

    function Sa(a) { return v.concat.apply(v, arguments) }

    function Ta(a) { var b = a.length; if (0 < b) { for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d]; return c } return [] };

    function Ua(a, b) { for (var c in a) b.call(void 0, a[c], c, a) }

    function Va(a) { var b = [],
            c = 0,
            d; for (d in a) b[c++] = a[d]; return b }

    function Wa(a) { var b = [],
            c = 0,
            d; for (d in a) b[c++] = d; return b }
    var Xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Ya(a, b) { for (var c, d, e = 1; e < arguments.length; e++) { d = arguments[e]; for (c in d) a[c] = d[c]; for (var g = 0; g < Xa.length; g++) c = Xa[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]) } }

    function Za(a) { var b = arguments.length; if (1 == b && p(arguments[0])) return Za.apply(null, arguments[0]); for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0; return c };
    Za("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    Za("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    Za("embed", "iframe", "link", "object", "script", "style", "template");
    var w;
    a: { var $a = l.navigator; if ($a) { var ab = $a.userAgent; if (ab) { w = ab; break a } }
        w = "" }

    function y(a) { return -1 != w.indexOf(a) };
    var bb = y("Opera") || y("OPR"),
        z = y("Trident") || y("MSIE"),
        A = y("Gecko") && -1 == w.toLowerCase().indexOf("webkit") && !(y("Trident") || y("MSIE")),
        B = -1 != w.toLowerCase().indexOf("webkit"),
        cb = B && y("Mobile"),
        db = y("Macintosh"),
        eb = y("Windows"),
        fb = y("Linux") || y("CrOS"),
        gb, hb = l.navigator || null;
    gb = !!hb && -1 != (hb.appVersion || "").indexOf("X11");

    function ib() { var a = l.document; return a ? a.documentMode : void 0 }
    var jb = function() { var a = "",
                b; if (bb && l.opera) return a = l.opera.version, ea(a) ? a() : a;
            A ? b = /rv\:([^\);]+)(\)|;)/ : z ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : B && (b = /WebKit\/(\S+)/);
            b && (a = (a = b.exec(w)) ? a[1] : ""); return z && (b = ib(), b > parseFloat(a)) ? String(b) : a }(),
        kb = {};

    function C(a) { return kb[a] || (kb[a] = 0 <= Ha(jb, a)) }
    var lb = l.document,
        D = lb && z ? ib() || ("CSS1Compat" == lb.compatMode ? parseInt(jb, 10) : 5) : void 0;

    function mb(a) { if ("function" == typeof a.N) return a.N(); if (q(a)) return a.split(""); if (da(a)) { for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]); return b } return Va(a) }

    function nb(a, b, c) { if ("function" == typeof a.forEach) a.forEach(b, c);
        else if (da(a) || q(a)) Oa(a, b, c);
        else { var d; if ("function" == typeof a.U) d = a.U();
            else if ("function" != typeof a.N)
                if (da(a) || q(a)) { d = []; for (var e = a.length, g = 0; g < e; g++) d.push(g) } else d = Wa(a);
            else d = void 0; for (var e = mb(a), g = e.length, h = 0; h < g; h++) b.call(c, e[h], d && d[h], a) } };

    function ob(a, b) { this.u = {};
        this.j = [];
        this.k = 0; var c = arguments.length; if (1 < c) { if (c % 2) throw Error("Uneven number of arguments"); for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]) } else if (a) { a instanceof ob ? (c = a.U(), d = a.N()) : (c = Wa(a), d = Va(a)); for (var e = 0; e < c.length; e++) this.set(c[e], d[e]) } }
    f = ob.prototype;
    f.N = function() { pb(this); for (var a = [], b = 0; b < this.j.length; b++) a.push(this.u[this.j[b]]); return a };
    f.U = function() { pb(this); return this.j.concat() };
    f.ta = function(a) { return qb(this.u, a) };
    f.clear = function() { this.u = {};
        this.k = this.j.length = 0 };
    f.remove = function(a) { return qb(this.u, a) ? (delete this.u[a], this.k--, this.j.length > 2 * this.k && pb(this), !0) : !1 };

    function pb(a) { if (a.k != a.j.length) { for (var b = 0, c = 0; b < a.j.length;) { var d = a.j[b];
                qb(a.u, d) && (a.j[c++] = d);
                b++ }
            a.j.length = c } if (a.k != a.j.length) { for (var e = {}, c = b = 0; b < a.j.length;) d = a.j[b], qb(e, d) || (a.j[c++] = d, e[d] = 1), b++;
            a.j.length = c } }
    f.get = function(a, b) { return qb(this.u, a) ? this.u[a] : b };
    f.set = function(a, b) { qb(this.u, a) || (this.k++, this.j.push(a));
        this.u[a] = b };
    f.forEach = function(a, b) { for (var c = this.U(), d = 0; d < c.length; d++) { var e = c[d],
                g = this.get(e);
            a.call(b, g, e, this) } };
    f.clone = function() { return new ob(this) };

    function qb(a, b) { return Object.prototype.hasOwnProperty.call(a, b) };

    function rb(a) { if ("undefined" == typeof a) return "undefined"; if (null == a) return "NULL"; var b = [],
            c; for (c in a)
            if (!ea(a[c])) { var d = c + " = "; try { d += a[c] } catch (e) { d += "*** " + e + " ***" }
                b.push(d) }
        return b.join("\n") };

    function sb(a, b, c, d, e) { this.reset(a, b, c, d, e) }
    sb.prototype.mb = null;
    var tb = 0;
    sb.prototype.reset = function(a, b, c, d, e) { "number" == typeof e || tb++;
        this.Dc = d || la();
        this.ca = a;
        this.jc = b;
        this.ic = c;
        delete this.mb };
    sb.prototype.Xa = function(a) { this.ca = a };

    function ub(a) { this.kc = a;
        this.ya = this.eb = this.ca = this.Ra = null }

    function E(a, b) { this.name = a;
        this.value = b }
    E.prototype.toString = function() { return this.name };
    var vb = new E("OFF", Infinity),
        wb = new E("SHOUT", 1200),
        xb = new E("SEVERE", 1E3),
        yb = new E("WARNING", 900),
        zb = new E("INFO", 800),
        Ab = new E("CONFIG", 700),
        Bb = new E("FINE", 500);
    f = ub.prototype;
    f.getName = function() { return this.kc };
    f.getParent = function() { return this.Ra };
    f.Wb = function() { this.eb || (this.eb = {}); return this.eb };
    f.Xa = function(a) { this.ca = a };

    function Cb(a) { if (a.ca) return a.ca; if (a.Ra) return Cb(a.Ra);
        Ma("Root logger has no level set."); return null }
    f.log = function(a, b, c) { if (a.value >= Cb(this).value)
            for (ea(b) && (b = b()), a = new sb(a, String(b), this.kc), c && (a.mb = c), c = "log:" + a.jc, l.console && (l.console.timeStamp ? l.console.timeStamp(c) : l.console.markTimeline && l.console.markTimeline(c)), l.msWriteProfilerMark && l.msWriteProfilerMark(c), c = this; c;) { b = c; var d = a; if (b.ya)
                    for (var e = 0, g = void 0; g = b.ya[e]; e++) g(d);
                c = c.getParent() } };
    f.info = function(a, b) { this.log(zb, a, b) };
    var Db = {},
        Eb = null;

    function Fb() { Eb || (Eb = new ub(""), Db[""] = Eb, Eb.Xa(Ab)) }

    function F(a) { Fb(); var b; if (!(b = Db[a])) { b = new ub(a); var c = a.lastIndexOf("."),
                d = a.substr(c + 1),
                c = F(a.substr(0, c));
            c.Wb()[d] = b;
            b.Ra = c;
            Db[a] = b } return b };

    function G() { 0 != Gb && (Hb[this[ga] || (this[ga] = ++ha)] = this);
        this.Y = this.Y;
        this.ea = this.ea }
    var Gb = 0,
        Hb = {};
    G.prototype.Y = !1;
    G.prototype.Ob = function() { if (!this.Y && (this.Y = !0, this.m(), 0 != Gb)) { var a = this[ga] || (this[ga] = ++ha);
            delete Hb[a] } };
    G.prototype.m = function() { if (this.ea)
            for (; this.ea.length;) this.ea.shift()() };

    function Ib(a) { a && "function" == typeof a.Ob && a.Ob() };
    var Jb = "closure_listenable_" + (1E6 * Math.random() | 0),
        Kb = 0;

    function Lb(a, b, c, d, e) { this.da = a;
        this.Ta = null;
        this.src = b;
        this.type = c;
        this.Ia = !!d;
        this.La = e;
        this.key = ++Kb;
        this.ma = this.Ha = !1 }

    function Mb(a) { a.ma = !0;
        a.da = null;
        a.Ta = null;
        a.src = null;
        a.La = null };

    function H(a) { this.src = a;
        this.n = {};
        this.Ea = 0 }
    H.prototype.add = function(a, b, c, d, e) { var g = a.toString();
        a = this.n[g];
        a || (a = this.n[g] = [], this.Ea++); var h = Nb(a, b, d, e); - 1 < h ? (b = a[h], c || (b.Ha = !1)) : (b = new Lb(b, this.src, g, !!d, e), b.Ha = c, a.push(b)); return b };
    H.prototype.remove = function(a, b, c, d) { a = a.toString(); if (!(a in this.n)) return !1; var e = this.n[a];
        b = Nb(e, b, c, d); return -1 < b ? (Mb(e[b]), v.splice.call(e, b, 1), 0 == e.length && (delete this.n[a], this.Ea--), !0) : !1 };

    function Ob(a, b) { var c = b.type; if (!(c in a.n)) return !1; var d = a.n[c],
            e = Na(d, b),
            g;
        (g = 0 <= e) && v.splice.call(d, e, 1);
        g && (Mb(b), 0 == a.n[c].length && (delete a.n[c], a.Ea--)); return g }
    H.prototype.Ba = function(a) { a = a && a.toString(); var b = 0,
            c; for (c in this.n)
            if (!a || c == a) { for (var d = this.n[c], e = 0; e < d.length; e++) ++b, Mb(d[e]);
                delete this.n[c];
                this.Ea-- }
        return b };
    H.prototype.xa = function(a, b, c, d) { a = this.n[a.toString()]; var e = -1;
        a && (e = Nb(a, b, c, d)); return -1 < e ? a[e] : null };

    function Nb(a, b, c, d) { for (var e = 0; e < a.length; ++e) { var g = a[e]; if (!g.ma && g.da == b && g.Ia == !!c && g.La == d) return e } return -1 };

    function I(a, b) { this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.ga = !1;
        this.vc = !0 }
    I.prototype.stopPropagation = function() { this.ga = !0 };
    I.prototype.preventDefault = function() { this.defaultPrevented = !0;
        this.vc = !1 };

    function Pb(a) { a.preventDefault() };
    var Qb = !z || z && 9 <= D,
        Rb = !z || z && 9 <= D,
        Sb = z && !C("9");
    !B || C("528");
    A && C("1.9b") || z && C("8") || bb && C("9.5") || B && C("528");
    A && !C("8") || z && C("9");

    function Tb(a) { Tb[" "](a); return a }
    Tb[" "] = ba;

    function J(a, b) {
        I.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.M = this.state = null;
        if (a) {
            var c = this.type = a.type,
                d = null;
            if ("touchstart" == c || "touchmove" == c) d = a.targetTouches[0];
            else if ("touchend" == c || "touchcancel" == c) d = a.changedTouches[0];
            this.target = null === d ? a.target || a.srcElement : d.target;
            this.currentTarget =
                b;
            var e = a.relatedTarget;
            if (e) { if (A) { var g;
                    a: { try { Tb(e.nodeName);
                            g = !0; break a } catch (h) {}
                        g = !1 }
                    g || (e = null) } } else "mouseover" == c ? e = a.fromElement : "mouseout" == c && (e = a.toElement);
            this.relatedTarget = e;
            null === d ? (this.offsetX = B || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = B || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX :
                d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.state = a.state;
            this.M = a;
            a.defaultPrevented && this.preventDefault()
        }
    }
    u(J, I);
    var Ub = [1, 4, 2];
    J.prototype.stopPropagation = function() { J.C.stopPropagation.call(this);
        this.M.stopPropagation ? this.M.stopPropagation() : this.M.cancelBubble = !0 };
    J.prototype.preventDefault = function() { J.C.preventDefault.call(this); var a = this.M; if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, Sb) try { if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1 } catch (b) {} };
    var Vb = "closure_lm_" + (1E6 * Math.random() | 0),
        Wb = {},
        Xb = 0;

    function K(a, b, c, d, e) { if (p(b)) { for (var g = 0; g < b.length; g++) K(a, b[g], c, d, e); return null }
        c = Yb(c); if (a && a[Jb]) a = a.V(b, c, d, e);
        else { if (!b) throw Error("Invalid event type"); var g = !!d,
                h = Zb(a);
            h || (a[Vb] = h = new H(a));
            c = h.add(b, c, !1, d, e);
            c.Ta || (d = $b(), c.Ta = d, d.src = a, d.da = c, a.addEventListener ? a.addEventListener(b.toString(), d, g) : a.attachEvent(ac(b.toString()), d), Xb++);
            a = c } return a }

    function $b() { var a = bc,
            b = Rb ? function(c) { return a.call(b.src, b.da, c) } : function(c) { c = a.call(b.src, b.da, c); if (!c) return c }; return b }

    function cc(a, b, c, d, e) { if (p(b))
            for (var g = 0; g < b.length; g++) cc(a, b[g], c, d, e);
        else c = Yb(c), a && a[Jb] ? a.zb(b, c, d, e) : a && (a = Zb(a)) && (b = a.xa(b, c, !!d, e)) && dc(b) }

    function dc(a) { if (r(a) || !a || a.ma) return !1; var b = a.src; if (b && b[Jb]) return Ob(b.T, a); var c = a.type,
            d = a.Ta;
        b.removeEventListener ? b.removeEventListener(c, d, a.Ia) : b.detachEvent && b.detachEvent(ac(c), d);
        Xb--;
        (c = Zb(b)) ? (Ob(c, a), 0 == c.Ea && (c.src = null, b[Vb] = null)) : Mb(a); return !0 }

    function ac(a) { return a in Wb ? Wb[a] : Wb[a] = "on" + a }

    function ec(a, b, c, d) { var e = !0; if (a = Zb(a))
            if (b = a.n[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) { var g = b[a];
                    g && g.Ia == c && !g.ma && (g = fc(g, d), e = e && !1 !== g) }
            return e }

    function fc(a, b) { var c = a.da,
            d = a.La || a.src;
        a.Ha && dc(a); return c.call(d, b) }

    function bc(a, b) {
        if (a.ma) return !0;
        if (!Rb) {
            var c;
            if (!(c = b)) a: { c = ["window", "event"]; for (var d = l, e; e = c.shift();)
                    if (null != d[e]) d = d[e];
                    else { c = null; break a }
                c = d }
            e = c;
            c = new J(e, this);
            d = !0;
            if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                a: { var g = !1; if (0 == e.keyCode) try { e.keyCode = -1; break a } catch (h) { g = !0 }
                    if (g || void 0 == e.returnValue) e.returnValue = !0 }
                e = [];
                for (g = c.currentTarget; g; g = g.parentNode) e.push(g);
                for (var g = a.type, k = e.length - 1; !c.ga && 0 <= k; k--) { c.currentTarget = e[k]; var x = ec(e[k], g, !0, c),
                        d = d && x }
                for (k = 0; !c.ga && k <
                    e.length; k++) c.currentTarget = e[k],
                x = ec(e[k], g, !1, c),
                d = d && x
            }
            return d
        }
        return fc(a, new J(b, this))
    }

    function Zb(a) { a = a[Vb]; return a instanceof H ? a : null }
    var gc = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

    function Yb(a) { if (ea(a)) return a;
        a[gc] || (a[gc] = function(b) { return a.handleEvent(b) }); return a[gc] };

    function L() { G.call(this);
        this.T = new H(this);
        this.Hc = this;
        this.vb = null }
    u(L, G);
    L.prototype[Jb] = !0;
    f = L.prototype;
    f.addEventListener = function(a, b, c, d) { K(this, a, b, c, d) };
    f.removeEventListener = function(a, b, c, d) { cc(this, a, b, c, d) };
    f.dispatchEvent = function(a) { var b, c = this.vb; if (c)
            for (b = []; c; c = c.vb) b.push(c); var c = this.Hc,
            d = a.type || a; if (q(a)) a = new I(a, c);
        else if (a instanceof I) a.target = a.target || c;
        else { var e = a;
            a = new I(d, c);
            Ya(a, e) } var e = !0,
            g; if (b)
            for (var h = b.length - 1; !a.ga && 0 <= h; h--) g = a.currentTarget = b[h], e = hc(g, d, !0, a) && e;
        a.ga || (g = a.currentTarget = c, e = hc(g, d, !0, a) && e, a.ga || (e = hc(g, d, !1, a) && e)); if (b)
            for (h = 0; !a.ga && h < b.length; h++) g = a.currentTarget = b[h], e = hc(g, d, !1, a) && e; return e };
    f.m = function() { L.C.m.call(this);
        this.T && this.T.Ba(void 0);
        this.vb = null };
    f.V = function(a, b, c, d) { return this.T.add(String(a), b, !1, c, d) };
    f.zb = function(a, b, c, d) { return this.T.remove(String(a), b, c, d) };

    function hc(a, b, c, d) { b = a.T.n[String(b)]; if (!b) return !0;
        b = b.concat(); for (var e = !0, g = 0; g < b.length; ++g) { var h = b[g]; if (h && !h.ma && h.Ia == c) { var k = h.da,
                    x = h.La || h.src;
                h.Ha && Ob(a.T, h);
                e = !1 !== k.call(x, d) && e } } return e && 0 != d.vc }
    f.xa = function(a, b, c, d) { return this.T.xa(String(a), b, c, d) };
    var M = {};

    function ic() {
        L.call(this);
        this.ra = this.Nb = null;
        this.sa = !1;
        this.Wd = "*";
        this.Db = {
            syn: this.Vd,
            cid: this.ce,
            ack: this.Gc,
            pageshow: this.je,
            keyboardup: this.dd,
            keyboarddown: this.cd,
            iframeresize: this.Kd,
            setuserscalable: this.Pd,
            viewporttoobig: this.Yd,
            browserviewrequest: this.Jc,
            browserviewresponse: this.be,
            buttonexpanded: this.Lc,
            buttoncollapsed: this.Kc,
            resizedone: this.ke,
            resizeondrag: this.le,
            orientation_change: this.ie,
            zoomed: this.me,
            settitle: this.Od,
            stoptitle: this.Ud,
            inittitle: this.de,
            enableresizedragger: this.Rc,
            sendtoapp: this.Nd,
            androidcallback: this.$d,
            openpm: this.he
        }
    }
    n(ic);
    u(ic, L);
    f = ic.prototype;
    f.c = F("chatango.embed.LocalComm");
    f.Ca = function(a) { this.Nb = a;
        K(window, "message", this.td, !1, this) };
    f.send = function(a, b) { if (!(a in this.Db)) throw "Sending illegal command " + a; var c = {};
        c.chatango_cmd = a;
        this.sa && (c.fid = this.wa);
        b && (c.payload = b);
        c = na(c);
        this.Nb.postMessage(c, this.Wd) };
    f.td = function(a) { a = a.M; if (a.data) { M.d && this.c.info("onMsg_ " + a.data); var b; try { b = ma(a.data) } catch (c) { M.d && console.log("Chatango: unexpected msg:" + a.data); return }
            this.sa && this.wa != b.fid || (a = b.chatango_cmd) && this.Db[a].apply(this, b.payload ? [b.payload] : []) } };
    f.disconnect = function() { this.sa = !1 };

    function jc() { this.sc = la() }
    var kc = new jc;
    jc.prototype.set = function(a) { this.sc = a };
    jc.prototype.reset = function() { this.set(la()) };
    jc.prototype.get = function() { return this.sc };

    function lc(a) { this.Hd = a || "";
        this.Td = kc }
    f = lc.prototype;
    f.Fb = !0;
    f.xc = !0;
    f.Rd = !0;
    f.Qd = !0;
    f.yc = !1;
    f.Sd = !1;

    function N(a) { return 10 > a ? "0" + a : String(a) }

    function mc(a, b) { var c = (a.Dc - b) / 1E3,
            d = c.toFixed(3),
            e = 0; if (1 > c) e = 2;
        else
            for (; 100 > c;) e++, c *= 10; for (; 0 < e--;) d = " " + d; return d }

    function nc(a) { lc.call(this, a) }
    u(nc, lc);

    function oc() { this.Id = t(this.Ic, this);
        this.Ka = new nc;
        this.Ka.xc = !1;
        this.Ka.yc = !1;
        this.cc = this.Ka.Fb = !1;
        this.hc = "";
        this.Sc = {} }

    function pc(a) { if (1 != a.cc) { var b;
            Fb();
            b = Eb; var c = a.Id;
            b.ya || (b.ya = []);
            b.ya.push(c);
            a.cc = !0 } }
    oc.prototype.Ic = function(a) {
        if (!this.Sc[a.ic]) {
            var b;
            b = this.Ka;
            var c = [];
            c.push(b.Hd, " ");
            if (b.xc) { var d = new Date(a.Dc);
                c.push("[", N(d.getFullYear() - 2E3) + N(d.getMonth() + 1) + N(d.getDate()) + " " + N(d.getHours()) + ":" + N(d.getMinutes()) + ":" + N(d.getSeconds()) + "." + N(Math.floor(d.getMilliseconds() / 10)), "] ") }
            b.Rd && c.push("[", mc(a, b.Td.get()), "s] ");
            b.Qd && c.push("[", a.ic, "] ");
            b.Sd && c.push("[", a.ca.name, "] ");
            c.push(a.jc);
            b.yc && (d = a.mb) && c.push("\n", d instanceof Error ? d.message : d.toString());
            b.Fb && c.push("\n");
            b = c.join("");
            if (c = qc) switch (a.ca) {
                case wb:
                    rc(c, "info", b); break;
                case xb:
                    rc(c, "error", b); break;
                case yb:
                    rc(c, "warn", b); break;
                default:
                    rc(c, "debug", b) } else this.hc += b
        }
    };
    var qc = l.console;

    function rc(a, b, c) { if (a[b]) a[b](c);
        else a.log(c) };

    function O(a, b) { I.call(this, a);
        this.type = a;
        this.data = b }
    u(O, I);

    function P() { var a = w.toLowerCase();
        this.ua = -1 != a.indexOf("mobile") && -1 == a.indexOf("kindle") && -1 == a.indexOf("ipad") ? sc : -1 != a.indexOf("android") || -1 != a.indexOf("ipad") || -1 != a.indexOf("silk") ? tc : uc }
    n(P);
    var sc = "mobile",
        tc = "tablet",
        uc = "desktop";
    P.prototype.ua = "desktop";

    function vc() { return P.i().ua == sc }

    function wc() { P.i(); return w.match(/(Android)/i) ? !0 : !1 };

    function xc() { ic.call(this) }
    n(xc);
    u(xc, ic);
    f = xc.prototype;
    f.c = F("chatango.embed.LocalCommParent");
    f.Ca = function(a, b, c, d) { xc.C.Ca.call(this, a);
        this.ra = b;
        this.wa = c;
        this.va = d };
    f.Vd = function() { if (!this.sa) { var a = {};
            a.fid = this.wa;
            a.cid = this.ra;
            a.height = this.va.Tc;
            a.width = this.va.Vc;
            a.loc = window.location.href;
            a.window = { width: window.innerWidth, height: window.innerHeight };
            a.handle = this.va.f.handle;
            a.styles = this.va.f.styles;
            a.expandedButton = 1 == this.va.Vb;
            M.d && this.c.info("syn received, sending cid " + this.ra + " to a child");
            this.send("cid", a) } };
    f.Kc = function() { this.dispatchEvent(new O("buttoncollapsed")) };
    f.Gc = function(a) { M.d && this.c.info("ackRcvd for " + a);
        a == this.wa && (M.d && this.c.info("connection established for cid " + this.wa), this.sa = !0, this.dispatchEvent(new O("connestablished"))) };
    f.dd = function() { this.dispatchEvent(new O("kbup")) };
    f.cd = function() { this.dispatchEvent(new O("kbdown")) };
    f.Lc = function() { this.dispatchEvent(new O("buttonexpanded")) };
    f.Kd = function(a) { this.dispatchEvent(new O("resizeiframe", a)) };
    ic.prototype.Rc = function(a) { this.dispatchEvent(new O("enableresizedragger", a)) };
    f = xc.prototype;
    f.Pd = function(a) { this.dispatchEvent(new O("setuserscalable", a)) };
    f.Yd = function() { this.dispatchEvent(new O("viewporttoobig")) };
    f.Jc = function() { this.dispatchEvent(new O("browserviewrequest")) };
    f.Od = function(a) { M.d && this.c.info("setTitle received " + rb(a)); if (window.hasOwnProperty("onMessage")) window.onMessage(a.user + " " + a.time + ": " + a.msg, !0) };
    f.Ud = function() { M.d && this.c.info("stopTitle received");
        window.hasOwnProperty("stopTitleScrolling") && window.stopTitleScrolling(new Event("stop_tile")) };
    f.Nd = function(a) { void 0 !== window.android && void 0 !== window.android.sendToApp && window.android.sendToApp(JSON.stringify(a)) };
    var yc = null,
        yc = "alecm",
        zc = yc + ".dev2.chattanga.com";
    var Ac = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function Bc(a) { if (Cc) { Cc = !1; var b = l.location; if (b) { var c = b.href; if (c && (c = Dc(c)) && c != b.hostname) throw Cc = !0, Error(); } } return a.match(Ac) }
    var Cc = B;

    function Dc(a) { return (a = Bc(a)[3] || null) ? decodeURI(a) : a }

    function Ec(a, b) { for (var c = a.split("&"), d = 0; d < c.length; d++) { var e = c[d].indexOf("="),
                g = null,
                h = null;
            0 <= e ? (g = c[d].substring(0, e), h = c[d].substring(e + 1)) : g = c[d];
            b(g, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "") } };

    function Fc(a, b) { var c; if (a instanceof Fc) this.v = m(b) ? b : a.v, Gc(this, a.Q), c = a.ha, Q(this), this.ha = c, c = a.G, Q(this), this.G = c, Hc(this, a.fa), c = a.H, Q(this), this.H = c, Ic(this, a.B.clone()), c = a.$, Q(this), this.$ = c;
        else if (a && (c = Bc(String(a)))) { this.v = !!b;
            Gc(this, c[1] || "", !0); var d = c[2] || "";
            Q(this);
            this.ha = Jc(d);
            d = c[3] || "";
            Q(this);
            this.G = Jc(d, !0);
            Hc(this, c[4]);
            d = c[5] || "";
            Q(this);
            this.H = Jc(d, !0);
            Ic(this, c[6] || "", !0);
            c = c[7] || "";
            Q(this);
            this.$ = Jc(c) } else this.v = !!b, this.B = new Kc(null, 0, this.v) }
    f = Fc.prototype;
    f.Q = "";
    f.ha = "";
    f.G = "";
    f.fa = null;
    f.H = "";
    f.$ = "";
    f.bd = !1;
    f.v = !1;
    f.toString = function() { var a = [],
            b = this.Q;
        b && a.push(Lc(b, Mc, !0), ":"); if (b = this.G) { a.push("//"); var c = this.ha;
            c && a.push(Lc(c, Mc, !0), "@");
            a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1"));
            b = this.fa;
            null != b && a.push(":", String(b)) } if (b = this.H) this.G && "/" != b.charAt(0) && a.push("/"), a.push(Lc(b, "/" == b.charAt(0) ? Nc : Oc, !0));
        (b = this.B.toString()) && a.push("?", b);
        (b = this.$) && a.push("#", Lc(b, Pc)); return a.join("") };
    f.resolve = function(a) {
        var b = this.clone(),
            c = !!a.Q;
        c ? Gc(b, a.Q) : c = !!a.ha;
        if (c) { var d = a.ha;
            Q(b);
            b.ha = d } else c = !!a.G;
        c ? (d = a.G, Q(b), b.G = d) : c = null != a.fa;
        d = a.H;
        if (c) Hc(b, a.fa);
        else if (c = !!a.H) {
            if ("/" != d.charAt(0))
                if (this.G && !this.H) d = "/" + d;
                else { var e = b.H.lastIndexOf("/"); - 1 != e && (d = b.H.substr(0, e + 1) + d) }
            e = d;
            if (".." == e || "." == e) d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                for (var d = 0 == e.lastIndexOf("/", 0), e = e.split("/"), g = [], h = 0; h < e.length;) {
                    var k = e[h++];
                    "." == k ? d && h == e.length && g.push("") : ".." == k ? ((1 <
                        g.length || 1 == g.length && "" != g[0]) && g.pop(), d && h == e.length && g.push("")) : (g.push(k), d = !0)
                }
                d = g.join("/")
            } else d = e
        }
        c ? (Q(b), b.H = d) : c = "" !== a.B.toString();
        c ? Ic(b, Jc(a.B.toString())) : c = !!a.$;
        c && (a = a.$, Q(b), b.$ = a);
        return b
    };
    f.clone = function() { return new Fc(this) };

    function Gc(a, b, c) { Q(a);
        a.Q = c ? Jc(b, !0) : b;
        a.Q && (a.Q = a.Q.replace(/:$/, "")) }

    function Hc(a, b) { Q(a); if (b) { b = Number(b); if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
            a.fa = b } else a.fa = null }

    function Ic(a, b, c) { Q(a);
        b instanceof Kc ? (a.B = b, a.B.yb(a.v)) : (c || (b = Lc(b, Qc)), a.B = new Kc(b, 0, a.v)) }

    function Q(a) { if (a.bd) throw Error("Tried to modify a read-only Uri"); }
    f.yb = function(a) { this.v = a;
        this.B && this.B.yb(a); return this };

    function Jc(a, b) { return a ? b ? decodeURI(a) : decodeURIComponent(a) : "" }

    function Lc(a, b, c) { return q(a) ? (a = encodeURI(a).replace(b, Rc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null }

    function Rc(a) { a = a.charCodeAt(0); return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16) }
    var Mc = /[#\/\?@]/g,
        Oc = /[\#\?:]/g,
        Nc = /[\#\?]/g,
        Qc = /[\#\?@]/g,
        Pc = /#/g;

    function Kc(a, b, c) { this.s = a || null;
        this.v = !!c }

    function R(a) { a.g || (a.g = new ob, a.k = 0, a.s && Ec(a.s, function(b, c) { a.add(decodeURIComponent(b.replace(/\+/g, " ")), c) })) }
    f = Kc.prototype;
    f.g = null;
    f.k = null;
    f.add = function(a, b) { R(this);
        this.s = null;
        a = Sc(this, a); var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.k++; return this };
    f.remove = function(a) { R(this);
        a = Sc(this, a); return this.g.ta(a) ? (this.s = null, this.k -= this.g.get(a).length, this.g.remove(a)) : !1 };
    f.clear = function() { this.g = this.s = null;
        this.k = 0 };
    f.ta = function(a) { R(this);
        a = Sc(this, a); return this.g.ta(a) };
    f.U = function() { R(this); for (var a = this.g.N(), b = this.g.U(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], g = 0; g < e.length; g++) c.push(b[d]); return c };
    f.N = function(a) { R(this); var b = []; if (q(a)) this.ta(a) && (b = Sa(b, this.g.get(Sc(this, a))));
        else { a = this.g.N(); for (var c = 0; c < a.length; c++) b = Sa(b, a[c]) } return b };
    f.set = function(a, b) { R(this);
        this.s = null;
        a = Sc(this, a);
        this.ta(a) && (this.k -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.k++; return this };
    f.get = function(a, b) { var c = a ? this.N(a) : []; return 0 < c.length ? String(c[0]) : b };
    f.toString = function() { if (this.s) return this.s; if (!this.g) return ""; for (var a = [], b = this.g.U(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.N(d), g = 0; g < d.length; g++) { var h = e; "" !== d[g] && (h += "=" + encodeURIComponent(String(d[g])));
                a.push(h) }
        return this.s = a.join("&") };
    f.clone = function() { var a = new Kc;
        a.s = this.s;
        this.g && (a.g = this.g.clone(), a.k = this.k); return a };

    function Sc(a, b) { var c = String(b);
        a.v && (c = c.toLowerCase()); return c }
    f.yb = function(a) { a && !this.v && (R(this), this.s = null, this.g.forEach(function(a, c) { var d = c.toLowerCase();
            c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.s = null, this.g.set(Sc(this, d), Ta(a)), this.k += a.length)) }, this));
        this.v = a };
    f.extend = function(a) { for (var b = 0; b < arguments.length; b++) nb(arguments[b], function(a, b) { this.add(b, a) }, this) };

    function Tc(a) { this.Sa = window.location.protocol;
        this.Zb = window.location.hostname;
        a && (a = a instanceof Fc ? a.clone() : new Fc(a, void 0), this.Sa = a.Q, this.Zb = a.G);
        a = Uc; var b = this.Zb.split(".").reverse();
        2 <= b.length && "com" == b[0] && "chattanga" == b[1] && (a = 3 <= b.length && "dev2" == b[2] ? Vc : Wc);
        M.d && "file:" == this.Sa && (a = Xc);
        a == Uc ? this.qa = "chatango.com" : a == Wc ? (this.qa = "chattanga.com", this.fa = Yc) : a == Vc ? this.qa = zc : M.d && a == Xc && (this.qa = zc) }
    var Uc = "live",
        Wc = "staging",
        Vc = "dev",
        Xc = "local",
        Yc = [{ protocol: "ws", port: "8080" }, { protocol: "wss", port: "1807" }];
    Tc.prototype.qa = void 0;

    function Zc() { this.u = {} }
    n(Zc);
    Zc.prototype.c = F("chatango.managers.ManagerManager");

    function $c(a, b) { a.u.BASEDOMAIN = b }

    function ad() { var a = Zc.i(),
            b = a.u.BASEDOMAIN;
        b || M.d && a.c.info("No manager found for key: BASEDOMAIN"); return b };

    function bd() { ad().Sa.replace(":", "") }
    n(bd);
    bd.prototype.Ld = "st";

    function cd() { var a = bd.i().Ld,
            b = "";
        a && (b = "."); var c = ad();
        c.Sa.replace(":", ""); return "https://" + a + b + c.qa };

    function S(a, b) { this.width = a;
        this.height = b }
    f = S.prototype;
    f.clone = function() { return new S(this.width, this.height) };
    f.toString = function() { return "(" + this.width + " x " + this.height + ")" };
    f.ceil = function() { this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height); return this };
    f.floor = function() { this.width = Math.floor(this.width);
        this.height = Math.floor(this.height); return this };
    f.round = function() { this.width = Math.round(this.width);
        this.height = Math.round(this.height); return this };
    f.scale = function(a, b) { var c = r(b) ? b : a;
        this.width *= a;
        this.height *= c; return this };
    var dd = !z || z && 9 <= D,
        ed = !A && !z || z && z && 9 <= D || A && C("1.9.1");
    z && C("9");

    function T(a, b) { this.x = m(a) ? a : 0;
        this.y = m(b) ? b : 0 }
    f = T.prototype;
    f.clone = function() { return new T(this.x, this.y) };
    f.toString = function() { return "(" + this.x + ", " + this.y + ")" };
    f.ceil = function() { this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y); return this };
    f.floor = function() { this.x = Math.floor(this.x);
        this.y = Math.floor(this.y); return this };
    f.round = function() { this.x = Math.round(this.x);
        this.y = Math.round(this.y); return this };
    f.translate = function(a, b) { a instanceof T ? (this.x += a.x, this.y += a.y) : (this.x += a, r(b) && (this.y += b)); return this };
    f.scale = function(a, b) { var c = r(b) ? b : a;
        this.x *= a;
        this.y *= c; return this };

    function fd(a) { return a ? new gd(hd(a)) : va || (va = new gd) }

    function id(a) { var b = document,
            c = null; return (c = b.getElementsByClassName ? b.getElementsByClassName(a)[0] : b.querySelectorAll && b.querySelector ? b.querySelector("." + a) : jd("*", a)[0]) || null }

    function jd(a, b) { var c = document,
            d = a && "*" != a ? a.toUpperCase() : ""; if (c.querySelectorAll && c.querySelector && (d || b)) return c.querySelectorAll(d + (b ? "." + b : "")); if (b && c.getElementsByClassName) { c = c.getElementsByClassName(b); if (d) { for (var e = {}, g = 0, h = 0, k; k = c[h]; h++) d == k.nodeName && (e[g++] = k);
                e.length = g; return e } return c }
        c = c.getElementsByTagName(d || "*"); if (b) { e = {}; for (h = g = 0; k = c[h]; h++) { var d = k.className,
                    x; if (x = "function" == typeof d.split) x = 0 <= Na(d.split(/\s+/), b);
                x && (e[g++] = k) }
            e.length = g; return e } return c }

    function kd(a, b) { Ua(b, function(b, d) { "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in ld ? a.setAttribute(ld[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b }) }
    var ld = { cellpadding: "cellPadding", cellspacing: "cellSpacing", colspan: "colSpan", frameborder: "frameBorder", height: "height", maxlength: "maxLength", role: "role", rowspan: "rowSpan", type: "type", usemap: "useMap", valign: "vAlign", width: "width" };

    function md(a) { a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body; return new S(a.clientWidth, a.clientHeight) }

    function nd(a) { var b = B || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
        a = a.parentWindow || a.defaultView; return z && C("10") && a.pageYOffset != b.scrollTop ? new T(b.scrollLeft, b.scrollTop) : new T(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop) }

    function U(a, b, c) { var d = arguments,
            e = document,
            g = d[0],
            h = d[1]; if (!dd && h && (h.name || h.type)) { g = ["<", g];
            h.name && g.push(' name="', za(h.name), '"'); if (h.type) { g.push(' type="', za(h.type), '"'); var k = {};
                Ya(k, h);
                delete k.type;
                h = k }
            g.push(">");
            g = g.join("") }
        g = e.createElement(g);
        h && (q(h) ? g.className = h : p(h) ? g.className = h.join(" ") : kd(g, h));
        2 < d.length && od(e, g, d, 2); return g }

    function od(a, b, c, d) {
        function e(c) { c && b.appendChild(q(c) ? a.createTextNode(c) : c) } for (; d < c.length; d++) { var g = c[d];!da(g) || fa(g) && 0 < g.nodeType ? e(g) : Oa(pd(g) ? Ta(g) : g, e) } }

    function qd(a, b) { od(hd(a), a, arguments, 1) }

    function rd(a, b) { b.parentNode && b.parentNode.insertBefore(a, b) }

    function sd(a) { var b = document.body;
        b.insertBefore(a, b.childNodes[0] || null) }

    function td(a) { return a && a.parentNode ? a.parentNode.removeChild(a) : null }

    function ud(a, b) { var c = b.parentNode;
        c && c.replaceChild(a, b) }

    function hd(a) { return 9 == a.nodeType ? a : a.ownerDocument || a.document }

    function vd(a, b) { var c = [];
        wd(a, b, c, !1); return c }

    function wd(a, b, c, d) { if (null != a)
            for (a = a.firstChild; a;) { if (b(a) && (c.push(a), d) || wd(a, b, c, d)) return !0;
                a = a.nextSibling }
        return !1 }

    function pd(a) { if (a && "number" == typeof a.length) { if (fa(a)) return "function" == typeof a.item || "string" == typeof a.item; if (ea(a)) return "function" == typeof a.item } return !1 }

    function xd(a) { return yd(a, function(a) { if (a = "HEAD" == a.nodeName) a = !0; return a }) }

    function yd(a, b) { for (var c = 0; a;) { if (b(a)) return a;
            a = a.parentNode;
            c++ } return null }

    function gd(a) { this.F = a || l.document || document }
    f = gd.prototype;
    f.createElement = function(a) { return this.F.createElement(a) };
    f.createTextNode = function(a) { return this.F.createTextNode(String(a)) };
    f.appendChild = function(a, b) { a.appendChild(b) };
    f.append = qd;
    f.canHaveChildren = function(a) { if (1 != a.nodeType) return !1; switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1 } return !0 };
    f.removeNode = td;
    f.Wb = function(a) { return ed && void 0 != a.children ? a.children : Pa(a.childNodes, function(a) { return 1 == a.nodeType }) };
    f.contains = function(a, b) { if (a.contains && 1 == b.nodeType) return a == b || a.contains(b); if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16); for (; b && a != b;) b = b.parentNode; return b == a };

    function zd(a) { L.call(this);
        this.Fa = a || window;
        this.Oa = K(this.Fa, "resize", this.Xc, !1, this);
        this.X = md(this.Fa || window) }
    u(zd, L);
    f = zd.prototype;
    f.Oa = null;
    f.Fa = null;
    f.X = null;
    f.t = function() { return this.X ? this.X.clone() : null };
    f.m = function() { zd.C.m.call(this);
        this.Oa && (dc(this.Oa), this.Oa = null);
        this.X = this.Fa = null };
    f.Xc = function() { var a = md(this.Fa || window),
            b = this.X;
        a == b || a && b && a.width == b.width && a.height == b.height || (this.X = a, this.dispatchEvent("resize")) };

    function Ad() { this.Fc = new zd }
    n(Ad);

    function Bd() { L.call(this);
        this.rb = !1 }
    u(Bd, L);
    n(Bd);

    function V() { L.call(this);
        this.$c = -1 != navigator.userAgent.indexOf("Android");
        this.ec = window.outerWidth;
        this.Aa = window.innerHeight;
        this.I = [];
        this.Pc = 40;
        this.Oc = 30;
        this.Lb = 10;
        this.tb = this.cb = this.xb = !1 }
    u(V, L);
    n(V);
    V.prototype.qc = function() { this.dispatchEvent(new I("a"));
        this.cb = this.$c;
        Cd(this) };
    V.prototype.ud = function() { this.tb = !0;
        this.dispatchEvent(new I("a"));
        Cd(this) };
    V.prototype.pc = function() { this.xb = !0;
        Cd(this) };

    function Cd(a) { a.Jb && clearTimeout(a.Jb);
        a.I.length = 0;
        a.I = [];
        a.Kb() }
    V.prototype.Kb = function() {
        this.I.push({ ow: window.outerWidth, iw: window.innerWidth, ih: window.innerHeight });
        var a = this.I.length;
        if (!(a > this.Pc)) {
            if (a >= this.Lb) {
                var b = !0;
                for (i = a - this.Lb; i < a; i++)
                    if (!(0 >= i || this.I[i].ow == this.I[i - 1].ow && this.I[i].iw == this.I[i - 1].iw && this.I[i].ih == this.I[i - 1].ih)) { b = !1; break }
                if (b) {
                    this.dispatchEvent(new I("b"));
                    b = window.outerWidth;
                    a = window.innerHeight;
                    if (b !== this.ec || this.tb) this.ec = b, this.Aa = a, this.dispatchEvent(new I("c"));
                    else {
                        if (this.cb && Math.abs(a - this.Aa) > .25 * this.Aa) {
                            var b =
                                Bd.i(),
                                c = a < this.Aa;
                            c !== b.rb && ((b.rb = c) ? b.dispatchEvent("keyboardraised") : b.dispatchEvent("keyboardlowered"))
                        } else this.xb && this.dispatchEvent(new I("d"));
                        this.Aa = a
                    }
                    this.tb = this.xb = this.cb = !1;
                    return
                }
            }
            this.Jb = setTimeout(t(this.Kb, this), this.Oc)
        }
    };

    function Dd() { this.fc = "1201220704" }
    n(Dd);

    function Ed(a) { this.X = a;
        I.call(this, Fd) }
    u(Ed, I);
    Ed.prototype.t = function() { return this.X };

    function Gd(a, b, c, d) { this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d }
    f = Gd.prototype;
    f.clone = function() { return new Gd(this.top, this.right, this.bottom, this.left) };
    f.toString = function() { return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)" };
    f.contains = function(a) { return this && a ? a instanceof Gd ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1 };
    f.expand = function(a, b, c, d) { fa(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d); return this };
    f.ceil = function() { this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left); return this };
    f.floor = function() { this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left); return this };
    f.round = function() { this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left); return this };
    f.translate = function(a, b) { a instanceof T ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, r(b) && (this.top += b, this.bottom += b)); return this };
    f.scale = function(a, b) { var c = r(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= c;
        this.bottom *= c; return this };

    function Hd(a, b, c, d) { this.left = a;
        this.top = b;
        this.width = c;
        this.height = d }
    f = Hd.prototype;
    f.clone = function() { return new Hd(this.left, this.top, this.width, this.height) };
    f.toString = function() { return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)" };
    f.contains = function(a) { return a instanceof Hd ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height };
    f.t = function() { return new S(this.width, this.height) };
    f.ceil = function() { this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height); return this };
    f.floor = function() { this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height); return this };
    f.round = function() { this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height); return this };
    f.translate = function(a, b) { a instanceof T ? (this.left += a.x, this.top += a.y) : (this.left += a, r(b) && (this.top += b)); return this };
    f.scale = function(a, b) { var c = r(b) ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= c;
        this.height *= c; return this };

    function W(a, b, c) { if (q(b))(b = Id(a, b)) && (a.style[b] = c);
        else
            for (var d in b) { c = a; var e = b[d],
                    g = Id(c, d);
                g && (c.style[g] = e) } }
    var Jd = {};

    function Id(a, b) { var c = Jd[b]; if (!c) { var d = Ja(b),
                c = d;
            void 0 === a.style[d] && (d = (B ? "Webkit" : A ? "Moz" : z ? "ms" : bb ? "O" : null) + Ka(d), void 0 !== a.style[d] && (c = d));
            Jd[b] = c } return c }

    function Kd(a, b) { var c = hd(a); return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : "" }

    function Ld(a, b) { return Kd(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b] }
    var Md = { thin: 2, medium: 4, thick: 6 };

    function Nd(a, b) { if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null)) return 0; var c = a.currentStyle ? a.currentStyle[b + "Width"] : null,
            d; if (c in Md) d = Md[c];
        else if (/^\d+px?$/.test(c)) d = parseInt(c, 10);
        else { d = a.style.left; var e = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            a.style.left = c;
            c = a.style.pixelLeft;
            a.style.left = d;
            a.runtimeStyle.left = e;
            d = c } return d }

    function Od(a) { if (z && !(z && 9 <= D)) { var b = Nd(a, "borderLeft"),
                c = Nd(a, "borderRight"),
                d = Nd(a, "borderTop");
            a = Nd(a, "borderBottom"); return new Gd(d, c, a, b) }
        b = Kd(a, "borderLeftWidth");
        c = Kd(a, "borderRightWidth");
        d = Kd(a, "borderTopWidth");
        a = Kd(a, "borderBottomWidth"); return new Gd(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b)) };
    var Fd = "resize_iframe";

    function Rd(a, b, c) { if (ea(a)) c && (a = t(a, c));
        else if (a && "function" == typeof a.handleEvent) a = t(a.handleEvent, a);
        else throw Error("Invalid listener argument"); return 2147483647 < b ? -1 : l.setTimeout(a, b || 0) };
    var Sd = !!w.match(/\bAndroid\b/);

    function Td(a) { var b = w.match(/\bAndroid\s+(\S+);/); return !b || 2 > b.length ? !1 : 0 <= Ha(b[1], a) }
    var Ud = !!w.match(/\b(iOS|iPhone|iPad|iPod)\b/);

    function Vd() {}
    n(Vd);
    Vd.prototype.fb = [{ type: "blank", rules: [
            [{ styles: "jsr" }, { platform: "IE", platform: "NOT_IEMOBILE", lessThan: 10 }],
            [{ styles: "jsr" }, { platform: "OPERA" }, { features: ["NOWEBSOCKET"] }],
            [{ styles: "jsr" }, { platform: "GECKO" }, { features: ["NOWEBSOCKET"] }],
            [{ styles: "jsr" }, { platform: "ANDROID" }, { features: ["NOWEBSOCKET"] }],
            [{ styles: "jsr" }, { features: ["NOWEBSOCKET"] }]
        ] }, { type: "jsonly", rules: [
            [{ styles: "jsr" }]
        ] }, { type: "linkandroidchrome", rules: [
            [{ platform: "ANDROID", atLeast: 4 }, { features: ["NOWEBSOCKET"] }]
        ] }, {
        type: "linkandroidff",
        rules: [{ param: "js", platform: "ANDROID", lessThan: 4, features: ["NOWEBSOCKET"] }, { platform: "ANDROID", lessThan: 4, platform: ["NOT_GECKO"] }]
    }, { type: "linkdesktopchrome", rules: [
            [{ param: "js" }, { platform: "IE", platform: "NOT_IEMOBILE", lessThan: 10 }],
            [{ param: "js" }, { platform: "OPERA" }, { features: ["NOWEBSOCKET"] }],
            [{ param: "js" }, { platform: "GECKO" }, { features: ["NOWEBSOCKET"] }]
        ] }, {
        type: "js",
        rules: [{ param: "js" }, { platform: "IOS" }, { platform: "IEMOBILE" },
            [{ platform: "MOBILE" }, { platform: "CHROME" }],
            [{ platform: "ANDROID", features: ["WEBSOCKET"] },
                { platform: "CHROME" }
            ],
            [{ platform: "ANDROID", features: ["WEBSOCKET"] }, { platform: "GECKO" }]
        ]
    }];
    Vd.prototype.c = F("chatango.settings.Architecture");

    function Wd(a, b, c) { var d, e, g, h, k;
        a.rc = "js" === b ? "js" : null;
        a.J = c ? c : {}; for (b = 0; b < a.fb.length; b++)
            for (c = a.fb[b].type, d = a.fb[b].rules, e = 0; e < d.length; e++)
                if (g = d[e], M.d && a.c.info("Testing rule: " + na(g)), "undefined" !== typeof g.length) { k = !0; for (h = 0; h < g.length; h++)
                        if (!Xd(a, g[h])) { k = !1; break }
                    if (k) return M.d && a.c.info("Rule matches: " + c), c } else if (Xd(a, g)) return M.d && a.c.info("Rule matches"), c;
        M.d && a.c.info("Using default architecture"); return "js" }

    function Xd(a, b) {
        M.d && a.c.info("Checking rule: " + na(b));
        var c;
        c = w;
        var d = new Fc(window.location.href);
        M.d && a.c.info("Checking rule platform");
        if ("undefined" != typeof b.platform)
            if ("IE" == b.platform) { if (!z) return !1 } else if ("IEMOBILE" == b.platform) { if (!/(iemobile)/i.test(c)) return !1 } else if ("NOT_IEMOBILE" == b.platform) { if (/(iemobile)/i.test(c)) return !1 } else if ("GECKO" == b.platform) { if (!A) return !1 } else if ("NOT_GECKO" == b.platform) { if (A) return !1 } else if ("WEBKIT" == b.platform) { if (!B) return !1 } else if ("CHROME" ==
            b.platform) { if (!c.match(/\bChrome\b/)) return !1 } else if ("LINUX" == b.platform) { if (!fb) return !1 } else if ("MAC" == b.platform) { if (!db) return !1 } else if ("MOBILE" == b.platform) { if (!cb) return !1 } else if ("OPERA" == b.platform) { if (!bb) return !1 } else if ("SAFARI" == b.platform) { if (!B) return !1 } else if ("WINDOWS" == b.platform) { if (!eb) return !1 } else if ("X11" == b.platform) { if (!gb) return !1 } else if ("IOS" == b.platform) { if (!c || !c.match(/\b(iOS|iPod|iPad|iPhone)\b/)) return !1 } else if (!("ANDROID" != b.platform || c && Sd)) return !1;
        M.d && a.c.info("Checking rule version");
        if ("ANDROID" == b.platform) { if ("undefined" != typeof b.lessThan && Td(b.lessThan) || "undefined" != typeof b.atLeast && !Td(b.atLeast)) return !1 } else if ("undefined" != typeof b.lessThan && C(b.lessThan) || "undefined" != typeof b.atLeast && !C(b.atLeast)) return !1;
        M.d && a.c.info("Checking rule features");
        if ("undefined" != typeof b.features)
            for (c = 0; c < b.features.length; c++)
                if ("WEBSOCKET" == b.features[c] && "undefined" == typeof window.WebSocket || "NOWEBSOCKET" == b.features[c] && "undefined" != typeof window.WebSocket) return !1;
        M.d && a.c.info("Checking rule parameters");
        if ("undefined" !== typeof b.param && (M.d && (a.c.info('uri.getParameterValue(rule["param"]): ' + d.B.get(b.param)), a.c.info('typeof uri.getParameterValue(rule["param"]): ' + typeof d.B.get(b.param))), "undefined" === typeof d.B.get(b.param) && (!a.rc || a.rc != b.param))) return !1;
        M.d && a.c.info("Checking rule parameters");
        if ("undefined" !== typeof b.styles)
            if (a.J) switch (b.styles) {
                case "jsr":
                    if (!(a.J.cv && 0 != a.J.cv || a.J.pos && "none" != a.J.pos || a.J.mockgroup)) return !1;
                    break;
                case "is_cv":
                    if (!(a.J.cv && 0 != a.J.cv || a.J.pos && "none" !=
                            a.J.pos)) return !1
            } else return !1;
        M.d && a.c.info("Rule matches");
        return !0
    };

    function Yd() {}
    Yd.prototype.Ib = null;

    function Zd(a) { var b;
        (b = a.Ib) || (b = {}, $d(a) && (b[0] = !0, b[1] = !0), b = a.Ib = b); return b };
    var ae;

    function be() {}
    u(be, Yd);

    function ce(a) { return (a = $d(a)) ? new ActiveXObject(a) : new XMLHttpRequest }

    function $d(a) { if (!a.ac && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) { for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) { var d = b[c]; try { return new ActiveXObject(d), a.ac = d } catch (e) {} } throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"); } return a.ac }
    ae = new be;

    function X(a, b) { a && a.log(Bb, b, void 0) };

    function de(a) { L.call(this);
        this.headers = new ob;
        this.bb = a || null;
        this.l = !1;
        this.ab = this.b = null;
        this.za = this.dc = this.ba = "";
        this.aa = this.pb = this.Na = this.lb = !1;
        this.Da = 0;
        this.Za = null;
        this.tc = ee;
        this.$a = this.Zd = !1 }
    u(de, L);
    var ee = "",
        fe = de.prototype,
        ge = F("goog.net.XhrIo");
    fe.A = ge;
    var he = /^https?$/i,
        ie = ["POST", "PUT"];
    f = de.prototype;
    f.send = function(a, b, c, d) {
        if (this.b) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.ba + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.ba = a;
        this.za = "";
        this.dc = b;
        this.lb = !1;
        this.l = !0;
        this.b = this.gb();
        this.ab = this.bb ? Zd(this.bb) : Zd(ae);
        this.b.onreadystatechange = t(this.oc, this);
        try { X(this.A, Y(this, "Opening Xhr")), this.pb = !0, this.b.open(b, String(a), !0), this.pb = !1 } catch (e) { X(this.A, Y(this, "Error opening Xhr: " + e.message));
            je(this, e); return }
        a = c || "";
        var g = this.headers.clone();
        d &&
            nb(d, function(a, b) { g.set(b, a) });
        d = Qa(g.U());
        c = l.FormData && a instanceof l.FormData;
        !(0 <= Na(ie, b)) || d || c || g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        g.forEach(function(a, b) { this.b.setRequestHeader(b, a) }, this);
        this.tc && (this.b.responseType = this.tc);
        "withCredentials" in this.b && (this.b.withCredentials = this.Zd);
        try {
            ke(this), 0 < this.Da && (this.$a = le(this.b), X(this.A, Y(this, "Will abort after " + this.Da + "ms if incomplete, xhr2 " + this.$a)), this.$a ? (this.b.timeout = this.Da, this.b.ontimeout =
                t(this.Ec, this)) : this.Za = Rd(this.Ec, this.Da, this)), X(this.A, Y(this, "Sending request")), this.Na = !0, this.b.send(a), this.Na = !1
        } catch (h) { X(this.A, Y(this, "Send error: " + h.message)), je(this, h) }
    };

    function le(a) { return z && C(9) && r(a.timeout) && m(a.ontimeout) }

    function Ra(a) { return "content-type" == a.toLowerCase() }
    f.gb = function() { return this.bb ? ce(this.bb) : ce(ae) };
    f.Ec = function() { "undefined" != typeof aa && this.b && (this.za = "Timed out after " + this.Da + "ms, aborting", X(this.A, Y(this, this.za)), this.dispatchEvent("timeout"), this.abort(8)) };

    function je(a, b) { a.l = !1;
        a.b && (a.aa = !0, a.b.abort(), a.aa = !1);
        a.za = b;
        me(a);
        a.ja() }

    function me(a) { a.lb || (a.lb = !0, a.dispatchEvent("complete"), a.dispatchEvent("error")) }
    f.abort = function() { this.b && this.l && (X(this.A, Y(this, "Aborting")), this.l = !1, this.aa = !0, this.b.abort(), this.aa = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), this.ja()) };
    f.m = function() { this.b && (this.l && (this.l = !1, this.aa = !0, this.b.abort(), this.aa = !1), this.ja(!0));
        de.C.m.call(this) };
    f.oc = function() { this.Y || (this.pb || this.Na || this.aa ? ne(this) : this.wd()) };
    f.wd = function() { ne(this) };

    function ne(a) {
        if (a.l && "undefined" != typeof aa)
            if (a.ab[1] && 4 == Z(a) && 2 == oe(a)) X(a.A, Y(a, "Local request error detected and ignored"));
            else if (a.Na && 4 == Z(a)) Rd(a.oc, 0, a);
        else if (a.dispatchEvent("readystatechange"), 4 == Z(a)) {
            X(a.A, Y(a, "Request complete"));
            a.l = !1;
            try {
                var b = oe(a),
                    c;
                a: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        c = !0; break a;
                    default:
                        c = !1 }
                var d;
                if (!(d = c)) {
                    var e;
                    if (e = 0 === b) {
                        var g = Bc(String(a.ba))[1] || null;
                        if (!g && self.location) var h = self.location.protocol,
                            g = h.substr(0,
                                h.length - 1);
                        e = !he.test(g ? g.toLowerCase() : "")
                    }
                    d = e
                }
                if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");
                else { var k; try { k = 2 < Z(a) ? a.b.statusText : "" } catch (x) { X(a.A, "Can not get status: " + x.message), k = "" }
                    a.za = k + " [" + oe(a) + "]";
                    me(a) }
            } finally { a.ja() }
        }
    }
    f.ja = function(a) { if (this.b) { ke(this); var b = this.b,
                c = this.ab[0] ? ba : null;
            this.ab = this.b = null;
            a || this.dispatchEvent("ready"); try { b.onreadystatechange = c } catch (d) {
                (a = this.A) && a.log(xb, "Problem encountered resetting onreadystatechange: " + d.message, void 0) } } };

    function ke(a) { a.b && a.$a && (a.b.ontimeout = null);
        r(a.Za) && (l.clearTimeout(a.Za), a.Za = null) }

    function Z(a) { return a.b ? a.b.readyState : 0 }

    function oe(a) { try { return 2 < Z(a) ? a.b.status : -1 } catch (b) { return -1 } }
    f.Xb = function() { return String(this.ba) };
    f.Yb = function(a) { if (this.b) { var b = this.b.responseText;
            a && 0 == b.indexOf(a) && (b = b.substring(a.length)); return ma(b) } };
    f.getResponseHeader = function(a) { return this.b && 4 == Z(this) ? this.b.getResponseHeader(a) : void 0 };
    f.getAllResponseHeaders = function() { return this.b && 4 == Z(this) ? this.b.getAllResponseHeaders() : "" };

    function Y(a, b) { return b + " [" + a.dc + " " + a.ba + " " + oe(a) + "]" };

    function pe() { L.call(this);
        this.q = null;
        this.l = !1 }
    u(pe, L);
    f = pe.prototype;
    f.c = F("chatango.networking.XdrIo");
    f.Yb = function(a) { if (this.q) { var b = this.q.responseText;
            a && 0 == b.indexOf(a) && (b = b.substring(a.length)); return ma(b) } };
    f.Xb = function() { return String(this.ba) };
    f.send = function(a, b, c) {
        if (this.q) throw Error("[chatango.networking.XdrIo] Object is active with another request");
        this.ba = a;
        b = b ? b.toUpperCase() : "GET";
        try { var d = new XDomainRequest } catch (e) { throw Error("[chatango.networking.XdrIo: Unable to create XDomainRequest: " + e.message); }
        this.q = d;
        this.l = !0;
        this.q.onload = t(this.sd, this);
        this.q.onerror = t(this.qd, this);
        this.q.ontimeout = t(this.Dd, this);
        try { M.d && this.c.info("Opening Xdr"), this.q.open(b, a) } catch (g) {
            this.c.log(yb, "Error opening Xdr: " + g.message, void 0);
            return
        }
        a = c || "";
        try { M.d && this.c.info("Sending request"), this.q.send(a) } catch (h) { this.c.log(yb, "Send error: " + h.message, void 0) }
    };
    f.sd = function() { M.d && this.c.info("XDR Loaded");
        this.l = !1;
        this.uc = new ActiveXObject("Microsoft.XMLDOM");
        this.uc.async = !1;
        this.uc.loadXML(this.q.responseText);
        this.dispatchEvent("complete");
        this.dispatchEvent("success");
        qe(this) };
    f.qd = function() { M.d && this.c.info("XDR Error");
        this.l = !1;
        this.dispatchEvent("complete");
        this.dispatchEvent("error");
        qe(this) };
    f.Dd = function() { M.d && this.c.info("XDR Timeout");
        this.l = !1;
        this.dispatchEvent("complete");
        this.dispatchEvent("error");
        qe(this) };
    f.abort = function() { this.q && this.l && (M.d && this.A.log(Bb, Y(this, "Aborting"), void 0), this.l = !1, this.q.abort(), this.dispatchEvent("complete"), this.dispatchEvent("abort"), qe(this)) };
    f.m = function() { pe.C.m.call(this);
        qe(this) };

    function qe(a) { var b = a.q;
        a.q = null;
        b.fe = null;
        b.ee = null;
        b.ge = null };

    function re(a, b) { this.Hb = !0 === b;
        de.call(this, a) }
    u(re, de);
    re.prototype.gb = function() { var a = re.C.gb.call(this);
        this.Hb && K(a.upload, "progress", this.dispatchEvent, !1, this); return a };
    re.prototype.ja = function(a) { this.Hb && cc(this.b.upload, "progress", this.dispatchEvent, !1, this);
        re.C.ja.call(this, a) };

    function se() {}
    n(se);

    function te(a, b) { b || (b = 0);
        W(a, "position", "fixed"); switch (b) {
            case 1:
                W(a, "bottom", "0px");
                W(a, "left", "0px");
                W(a, "right", "auto");
                W(a, "top", "auto"); break;
            case 3:
                W(a, "bottom", "0px");
                W(a, "right", "0px");
                W(a, "left", "auto");
                W(a, "top", "auto"); break;
            case 0:
                W(a, "top", "0px");
                W(a, "left", "0px");
                W(a, "right", "auto");
                W(a, "bottom", "auto"); break;
            case 2:
                W(a, "top", "0px"), W(a, "right", "0px"), W(a, "left", "auto"), W(a, "bottom", "auto") } };

    function ue(a) { G.call(this);
        this.Ma = a;
        this.j = {} }
    u(ue, G);
    var ve = [];
    f = ue.prototype;
    f.V = function(a, b, c, d) { p(b) || (b && (ve[0] = b.toString()), b = ve); for (var e = 0; e < b.length; e++) { var g = K(a, b[e], c || this.handleEvent, d || !1, this.Ma || this); if (!g) break;
            this.j[g.key] = g } return this };
    f.zb = function(a, b, c, d, e) { if (p(b))
            for (var g = 0; g < b.length; g++) this.zb(a, b[g], c, d, e);
        else c = c || this.handleEvent, e = e || this.Ma || this, c = Yb(c), d = !!d, b = a && a[Jb] ? a.xa(b, c, d, e) : a ? (a = Zb(a)) ? a.xa(b, c, d, e) : null : null, b && (dc(b), delete this.j[b.key]); return this };
    f.Ba = function() { Ua(this.j, dc);
        this.j = {} };
    f.m = function() { ue.C.m.call(this);
        this.Ba() };
    f.handleEvent = function() { throw Error("EventHandler.handleEvent not implemented"); };

    function we(a, b, c) { L.call(this);
        this.target = a;
        this.handle = b || a;
        this.gc = c || new Hd(NaN, NaN, NaN, NaN);
        this.F = hd(a);
        this.L = new ue(this);
        a = ka(Ib, this.L);
        this.Y ? a.call(void 0) : (this.ea || (this.ea = []), this.ea.push(m(void 0) ? t(a, void 0) : a));
        K(this.handle, ["touchstart", "mousedown"], this.Ac, !1, this) }
    u(we, L);
    var xe = z || A && C("1.9.3");
    f = we.prototype;
    f.clientX = 0;
    f.clientY = 0;
    f.screenX = 0;
    f.screenY = 0;
    f.Bc = 0;
    f.Cc = 0;
    f.deltaX = 0;
    f.deltaY = 0;
    f.Ub = !0;
    f.Z = !1;
    f.$b = 0;
    f.Yc = !1;
    f.Bb = !1;
    f.m = function() { we.C.m.call(this);
        cc(this.handle, ["touchstart", "mousedown"], this.Ac, !1, this);
        this.L.Ba();
        xe && this.F.releaseCapture();
        this.handle = this.target = null };

    function ye(a) { m(a.wc) || (a.wc = "rtl" == Ld(a.target, "direction")); return a.wc }
    f.Ac = function(a) {
        var b = "mousedown" == a.type;
        if (!this.Ub || this.Z || b && (!(Qb ? 0 == a.M.button : "click" == a.type || a.M.button & Ub[0]) || B && db && a.ctrlKey)) this.dispatchEvent("earlycancel");
        else {
            if (0 == this.$b)
                if (this.dispatchEvent(new ze("start", this, a.clientX, a.clientY, a))) this.Z = !0, a.preventDefault();
                else return;
            else a.preventDefault();
            var b = this.F,
                c = b.documentElement,
                d = !xe;
            this.L.V(b, ["touchmove", "mousemove"], this.Wc, d);
            this.L.V(b, ["touchend", "mouseup"], this.Ja, d);
            xe ? (c.setCapture(!1), this.L.V(c, "losecapture",
                this.Ja)) : this.L.V(b ? b.parentWindow || b.defaultView : window, "blur", this.Ja);
            z && this.Yc && this.L.V(b, "dragstart", Pb);
            this.Md && this.L.V(this.Md, "scroll", this.Qa, d);
            this.clientX = this.Bc = a.clientX;
            this.clientY = this.Cc = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            this.Bb ? (a = this.target, b = a.offsetLeft, c = a.offsetParent, c || "fixed" != Ld(a, "position") || (c = hd(a).documentElement), c ? (A ? (d = Od(c), b += d.left) : z && 8 <= D && !(z && 9 <= D) && (d = Od(c), b -= d.left), a = "rtl" == Ld(c, "direction") ? c.clientWidth - (b + a.offsetWidth) :
                b) : a = b) : a = this.target.offsetLeft;
            this.deltaX = a;
            this.deltaY = this.target.offsetTop;
            a = fd(this.F);
            this.ub = nd(a.F);
            la()
        }
    };
    f.Ja = function(a) { this.L.Ba();
        xe && this.F.releaseCapture(); if (this.Z) { this.Z = !1; var b = Ae(this, this.deltaX),
                c = Be(this, this.deltaY);
            this.dispatchEvent(new ze("end", this, a.clientX, a.clientY, a, b, c)) } else this.dispatchEvent("earlycancel") };
    f.Wc = function(a) {
        if (this.Ub) {
            var b = (this.Bb && ye(this) ? -1 : 1) * (a.clientX - this.clientX),
                c = a.clientY - this.clientY;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            if (!this.Z) { var d = this.Bc - this.clientX,
                    e = this.Cc - this.clientY; if (d * d + e * e > this.$b)
                    if (this.dispatchEvent(new ze("start", this, a.clientX, a.clientY, a))) this.Z = !0;
                    else { this.Y || this.Ja(a); return } }
            c = Ce(this, b, c);
            b = c.x;
            c = c.y;
            this.Z && this.dispatchEvent(new ze("beforedrag", this, a.clientX, a.clientY, a, b, c)) && (De(this,
                a, b, c), a.preventDefault())
        }
    };

    function Ce(a, b, c) { var d;
        d = fd(a.F);
        d = nd(d.F);
        b += d.x - a.ub.x;
        c += d.y - a.ub.y;
        a.ub = d;
        a.deltaX += b;
        a.deltaY += c;
        b = Ae(a, a.deltaX);
        a = Be(a, a.deltaY); return new T(b, a) }
    f.Qa = function(a) { var b = Ce(this, 0, 0);
        a.clientX = this.clientX;
        a.clientY = this.clientY;
        De(this, a, b.x, b.y) };

    function De(a, b, c, d) { a.Bb && ye(a) ? a.target.style.right = c + "px" : a.target.style.left = c + "px";
        a.target.style.top = d + "px";
        a.dispatchEvent(new ze("drag", a, b.clientX, b.clientY, b, c, d)) }

    function Ae(a, b) { var c = a.gc,
            d = isNaN(c.left) ? null : c.left,
            c = isNaN(c.width) ? 0 : c.width; return Math.min(null != d ? d + c : Infinity, Math.max(null != d ? d : -Infinity, b)) }

    function Be(a, b) { var c = a.gc,
            d = isNaN(c.top) ? null : c.top,
            c = isNaN(c.height) ? 0 : c.height; return Math.min(null != d ? d + c : Infinity, Math.max(null != d ? d : -Infinity, b)) }

    function ze(a, b, c, d, e, g, h) { I.call(this, a);
        this.clientX = c;
        this.clientY = d;
        this.R = e;
        this.left = m(g) ? g : b.deltaX;
        this.top = m(h) ? h : b.deltaY }
    u(ze, I);

    function Ee(a, b, c) { G.call(this);
        this.ed = a;
        this.Zc = b;
        this.Ma = c;
        this.Mc = t(this.Ed, this) }
    u(Ee, G);
    f = Ee.prototype;
    f.Ya = !1;
    f.wb = 0;
    f.oa = null;
    f.stop = function() { this.oa && (l.clearTimeout(this.oa), this.oa = null, this.Ya = !1) };
    f.pause = function() { this.wb++ };
    f.m = function() { Ee.C.m.call(this);
        this.stop() };
    f.Ed = function() { this.oa = null;
        this.Ya && !this.wb && (this.Ya = !1, Fe(this)) };

    function Fe(a) { a.oa = Rd(a.Mc, a.Zc);
        a.ed.call(a.Ma) };

    function Ge(a, b) {
        L.call(this);
        this.a = a;
        this.o = b;
        this.zc = "size_" + this.a.id.substr(-11);
        this.Jd = new Ee(this.Qc, 30, this);
        this.jb = 14;
        this.Mb = "tr" == this.o || "bl" == this.o ? "nesw-resize" : "nwse-resize";
        this.K = U("div", { id: "chatangoDragEl", draggable: "true", style: "cursor:" + this.Mb + "; width:" + this.jb + "px; height:" + this.jb + "px; z-index:10000000000; position:fixed;" });
        this.kb = new we(this.K, null, null);
        this.a.parentNode.appendChild(this.K);
        this.K.draggable = !0;
        K(this.kb, "start", this.nd, !1, this);
        K(this.kb, "drag", this.od, !1, this);
        K(this.kb, "end", this.md, !1, this)
    }
    u(Ge, L);
    n(Ge);
    Ge.prototype.nd = function(a) { document.body.style.cursor = this.Mb;
        this.Rb = a.R.screenX;
        this.Sb = a.R.screenY;
        this.Qb = this.a.offsetWidth;
        this.Pb = this.a.offsetHeight;
        He(this, !1) };
    Ge.prototype.md = function() { document.body.style.cursor = "auto";
        He(this, !0);
        localStorage.setItem(this.zc, JSON.stringify({ w: this.la, h: this.ka })) };
    Ge.prototype.od = function(a) { if (!(0 > a.R.M.x) && 0 != a.R.screenX) { switch (this.o) {
                case "tl":
                case "bl":
                    this.la = this.Qb - this.Rb + a.R.screenX; break;
                default:
                    this.la = this.Qb + this.Rb - a.R.screenX } switch (this.o) {
                case "tr":
                case "tl":
                    this.ka = this.Pb - this.Sb + a.R.screenY; break;
                default:
                    this.ka = this.Pb + this.Sb - a.R.screenY }
            this.la = Math.max(this.la, 120);
            this.ka = Math.max(this.ka, 200);
            Ie(this, this.la, this.ka);
            this.Va = new S(this.la, this.ka);
            a = this.Jd;
            a.oa || a.wb ? a.Ya = !0 : Fe(a) } };
    Ge.prototype.Qc = function() { this.dispatchEvent(new Ed(this.Va)) };

    function Ie(a, b, c) { var d, e, g, h, k = Math.round(a.jb / 2) + 1; switch (a.o) {
            case "tl":
                d = b - k;
                g = c - k; break;
            case "tr":
                e = b - k;
                g = c - k; break;
            case "bl":
                d = b - k;
                h = c - k; break;
            case "br":
                e = b - k, h = c - k }
        a.K.style.left = void 0 != d ? d + "px" : "auto";
        a.K.style.right = void 0 != e ? e + "px" : "auto";
        a.K.style.top = void 0 != g ? g + "px" : "auto";
        a.K.style.bottom = void 0 != h ? h + "px" : "auto" }

    function He(a, b) { b ? W(a.a, "pointer-events", "auto") : W(a.a, "pointer-events", "none") };

    function Je() { L.call(this);
        this.Tb = "";
        this.Gb = {} }
    u(Je, L);

    function Ke() {
        this.pa = !1;
        this.fd = Zc.i();
        M.d && (this.Nc = new oc, pc(this.Nc), F("goog").Xa(vb), F("chatango").Xa(vb));
        K(window, "pageshow", this.vd, !1, this);
        K(window, "orientationchange", this.nc, !1, this);
        vc() && (this.Ga = document.documentElement.clientWidth / window.innerWidth);
        if (this.p = Le()) {
            $c(this.fd, new Tc(this.p.src));
            var a = this.p.id;
            M.d && this.c.info("embedding " + a);
            this.ra = a.replace("cid", "").replace("_", "");
            this.p.id += "_";
            try { this.f = ma(this.p.innerHTML) } catch (b) { throw "Invalid Embed Code"; }
            Me(this, this.p);
            this.ad = void 0 != this.f.styles.pm && 1 == this.f.styles.pm;
            (a = this.f.styles.pos) && vc() && (this.f.styles.cv = 1);
            this.nb = !1;
            vc() && this.f.styles.fwtickm && 0 != this.f.styles.fwtickm && (this.nb = !0, this.f.styles.cv = 1, a = new S(window.innerWidth, .075 * window.innerHeight), this.f.styles.cvw = a.width, this.f.styles.cvh = a.height, this.f.styles.ticker = 1, this.f.styles.cvfntsz = "100%", a = "br");
            this.o = a;
            this.hb = 1 == this.f.styles.cv;
            var c = Wd(Vd.i(), this.f.arch, this.f.styles);
            M.d && console.log("Architecture:", c);
            "js" == c || "jsonly" == c ?
                (this.ob = Ne(this, this.p, a), this.e = xc.i(), K(this.e, "resizeiframe", this.yd, !1, this), K(this.e, "browserviewrequest", function() { this.e.send("browserviewresponse", this.t()) }, !1, this), K(this.e, "buttonexpanded", this.hd, !1, this), K(this.e, "buttoncollapsed", this.gd, !1, this), this.e.Ca(this.a.contentWindow, this.p.id, this.ob, this), K(this.e, "setuserscalable", this.Cd, !1, this), K(this.e, "viewporttoobig", this.Gd, !1, this), K(this.e, "settitle", this.Fd, !1, this), K(this.e, "connestablished", this.jd, !1, this), K(this.e, "enableresizedragger",
                    this.pd, !1, this), K(this.e, "kbdown", this.mc, !1, this), K(this.e, "kbup", this.sb, !1, this)) : "linkandroidchrome" == c ? Oe(this, this.p) : "linkandroidff" == c ? Pe(this, this.p) : "linkdesktopchrome" == c && Qe(this, this.p)
        }
    }
    n(Ke);
    var Re = /^cid\d{10,20}$/;
    f = Ke.prototype;
    f.c = F("chatango.embed.Embed");
    f.Fd = function(a) { document.title = a.data };

    function Me(a, b) { a.width = b.style.width;
        a.height = b.style.height;
        a.Vc = a.width;
        a.Tc = a.height }
    f.yd = function(a) { this.width = a.data.width.toString();
        this.height = a.data.height.toString();
        kd(this.a, { width: this.width.replace("px", "") + "px", height: this.height.replace("px", "") + "px" });
        this.e.send("resizedone", this.t());
        vc() && this.Pa();
        this.pa && Se(this) };
    f.pd = function(a) { var b = a.data.enable;
        b && !this.Wa && (this.Wa = new Ge(this.a, this.f.styles.pos), K(this.Wa, Fd, this.xd, !1, this)); if (this.Wa)
            if (a = this.Wa, b)
                if (a.K.style.display = "block", b = localStorage.getItem(a.zc), b = JSON.parse(b)) { var c = Ad.i().Fc,
                        b = new S(Math.min(b.w, c.t().width - 20), Math.min(b.h, c.t().height - 20));
                    a.dispatchEvent(new Ed(b));
                    Ie(a, b.width, b.height) } else Ie(a, a.a.offsetWidth, a.a.offsetHeight);
        else a.K.style.display = "none" };
    f.xd = function(a) { this.Va = a.t();
        this.width = this.Va.width.toString() + "px";
        this.height = this.Va.height.toString() + "px";
        kd(this.a, { width: this.width.replace("px", "") + "px", height: this.height.replace("px", "") + "px" });
        a = this.t();
        a.ifW = this.width;
        a.ifH = this.height;
        this.e.send("resizeondrag", a) };
    f.Gd = function() { var a = this.f.styles.pos;
        a || (a = this.f.styles.bpos); var b, c; switch (a) {
            case "tl":
                break;
            case "tr":
                b = document.width; break;
            case "bl":
                c = document.height; break;
            default:
                c = document.height, b = document.width }
        window.scrollTo(b, c) };
    f.Cd = function(a) {
        switch (a.data) {
            case "disable":
                Te(this);
                a = document.getElementsByTagName("HEAD");
                if (0 == a.length) break;
                a = a[0];
                var b = vd(a, function(a) { return 1 == a.nodeType && "META" == a.tagName && "viewport" == a.name });
                if (0 == b.length) this.S = U("META", { name: "viewport", content: "user-scalable=0" }), a.appendChild(this.S), this.P = U("META", { name: "viewport", content: "user-scalable=1" });
                else {
                    this.P = b[b.length - 1];
                    a = {};
                    for (var c = this.P.attributes.length, b = 0; b < c; b++) a[this.P.attributes[b].nodeName] = this.P.attributes[b].nodeValue;
                    if (a.content)
                        if (b = a.content.match(/user-scalable\s*=\s*([01yesnotrufal]*)/))
                            if ("1" == b[1] || "true" == b[1] || "yes" == b[1]) a.content = a.content.replace(/user-scalable\s*=\s*([01yesnotrufal]*)/, "user-scalable=0");
                            else break;
                    else kd(this.P, { content: a.content + ", user-scalable=1" }), a.content += ", user-scalable=0";
                    else a.content = "user-scalable=0", this.P.attributes.content = "user-scalable=1";
                    this.S = U("META");
                    kd(this.S, a);
                    ud(this.S, this.P)
                }
                break;
            case "restore":
                Te(this)
        }
    };

    function Te(a) { if (a.S) { if (a.P) { var b = a.S;
                b.parentNode && b.parentNode.insertBefore(a.P, b.nextSibling) }
            td(a.S);
            a.S = null } }

    function Ne(a, b, c) {
        var d = -1 != navigator.userAgent.indexOf("Android"),
            e = -1 != navigator.userAgent.indexOf("Mobile") || d;
        if (a.hb) {
            if (a.width = a.f.styles.cvw || 65, a.height = a.f.styles.cvh || 20, e && !a.O && (a.O = Bd.i(), K(a.O, "keyboardraised", a.sb, !1, a), K(a.O, "keyboardlowered", a.lc, !1, a)), e && !a.D) {
                a.D = V.i();
                K(a.D, "a", a.ld, !1, a);
                K(a.D, "c", a.nc, !1, a);
                K(a.D, "b", a.kd, !1, a);
                K(a.D, "d", a.Pa, !1, a);
                var g = a.D;
                /ipad|ipod|iphone/gi.test(navigator.appVersion) ? K(document, "gestureend", g.pc, !1, g) : K(document, "touchend", g.pc, !1, g);
                d ? (d = a.D, K(window, "resize", d.qc, !1, d)) : (d = a.D, K(window, "orientationchange", d.ud, !1, d))
            }
        } else d && !a.D && (a.D = V.i(), d = a.D, K(window, "resize", d.qc, !1, d), a.O || (a.O = Bd.i(), K(a.O, "keyboardraised", a.sb, !1, a), K(a.O, "keyboardlowered", a.lc, !1, a)));
        d = Math.floor(256 * Math.random()).toString(16) + String((new Date).getTime()).substr(-4, 4) + a.ra;
        a.width = String(a.width).split("px")[0];
        a.height = String(a.height).split("px")[0];
        g = -1 == String(a.width).indexOf("%") ? "px" : "";
        a.a = U("IFRAME", {
            frameborder: 0,
            width: a.width + g,
            height: a.height +
                g,
            id: d,
            allow: "autoplay"
        });
        g = e ? "t" : "d";
        void 0 != a.f.styles.mockgroup && (g = e ? "MGt" : "MGd");
        a.ad && (g = e ? "PMt" : "PMd");
        a.a.src = cd() + "/h5/gz/" + ("r" + Dd.i().fc) + "/i" + g + ".html";
        c ? (W(a.a, "z-index", 2147483648), Ue(a), sd(a.a)) : xd(b) ? sd(a.a) : rd(a.a, b);
        b = cd() + "/cfg/nc/r.json?" + d;
        se.i();
        c = z && !C(10) && Dc(b) != document.domain ? new pe : new re(void 0, void 0);
        K(c, "success", a.Ad, void 0, a);
        K(c, ["error", "timeout", "abort"], a.zd, void 0, a);
        c.send(b);
        a.Eb = new Je;
        K(a.Eb, "url_blocked", a.rd, void 0, a);
        a = a.Eb;
        a.Tb = window.location.href;
        a.Gb = { "abiwins.blogspot.": !0, "forumlovers.com": !0, "jorpetz.com": !0, "chanchat.blog.fc2.com": !0, "chatango.do.am": !0, "greatestleak.pw": !0, "dropxxbox.com": !0, "leakedsauce.com": !0, "lark.ru": !0, "torjackan.info": !0, "totallynsfw.com": !0, "dropto.website": !0, "chatango-tips-and-tricks.blogspot.com": !0, "css-html-script-editor.blogspot.fr": !0, "patorjack.com": !0, "exe.bz": !0, "getxid.com": !0, "izlemac-cbkws-com.cdn.ampproject.org": !0, "moresharecorp.github.io": !0 };
        b = !0;
        for (var h in a.Gb)
            if (-1 != a.Tb.indexOf(h)) { b = !1; break }
        b ||
            a.dispatchEvent("url_blocked");
        return d
    }
    f.Ad = function(a) { var b = a.currentTarget;
        a = b.Yb();
        b = b.Xb(); "r" + Dd.i().fc != "r" + a.r && (a = "" + b.substr(b.indexOf("?") + 1), b = document.getElementById(a), b.src = "about:blank", this.a = U("IFRAME", { frameborder: 0, width: b.width, height: b.height, id: a + "_" }), this.a.src = "about:blank", ud(this.a, b), this.f.styles.cv ? W(this.a, "display", "none") : this.a.contentDocument.write("<html><body><span style='font:11px sans-serif;'>Please clear your browser cache and refresh to see the latest version of Chatango.</span></body></html>")) };
    f.zd = function() {};
    f.rd = function() { this.a.contentDocument.write("<html><body></body></html>");
        this.a.style.width = "0px";
        this.a.style.height = "0px";
        this.a.style.display = "none" };

    function Oe(a, b) { a.W = U("p", void 0, "This version is not available in your current browser.  "); var c = U("a", { href: "https://play.google.com/store/apps/details?id=com.android.chrome" }, "Download Chrome for Android");
        qd(a.W, c);
        rd(a.W, b) }

    function Pe(a, b) { a.W = U("p", void 0, "This version is not available in your current browser.  "); var c = U("a", { href: "https://play.google.com/store/apps/details?id=org.mozilla.firefox" }, "Download Firefox for Android");
        qd(a.W, c);
        rd(a.W, b) }

    function Qe(a, b) { a.W = U("p", void 0, "This version is not available in your current browser.  "); var c = U("a", { href: "http://google.com/chrome" }, "Download Chrome");
        qd(a.W, c);
        rd(a.W, b) }

    function Le() { var a;
        a = jd("script", void 0); for (var b = 0; b < a.length; b++) { var c = a[b].id.match(Re); if (c) return a = c[0], b = document, q(a) ? b.getElementById(a) : a } return null }
    f.vd = function() { M.d && this.c.info("onPageShow");
        this.e && this.e.send("pageshow") };
    f.t = function() { var a = Ad.i().Fc,
            b = {};
        b.vpwidth = a.t().width;
        b.vpheight = a.t().height;
        b.win_innerWidth = window.innerWidth;
        b.win_innerHeight = window.innerHeight;
        b.win_innerHeight = window.innerHeight;
        b.win_outerWidth = window.outerWidth;
        b.doc_clientWidth = document.documentElement.clientWidth;
        b.zoom = document.documentElement.clientWidth / window.innerWidth; return b };
    f.nc = function() { this.nb ? (this.Ga = -1, this.Pa()) : this.e.send("orientation_change", this.t()) };
    f.jd = function() { this.e.send("inittitle", document.title) };
    f.hd = function() {
        this.ia || (this.ia = U("div", { style: "width:" + this.a.width + "; height:" + this.a.height + "; display:inline-block" }), rd(this.ia, this.a));
        this.e.disconnect();
        this.Vb = !0;
        td(this.a);
        sd(this.a);
        this.e.Ca(this.a.contentWindow, this.p.id, this.ob, this);
        var a = this.ia.style;
        a.position = "relative";
        z && !C("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block";
        W(this.a, "z-index", 2147483648);
        a = this.f.styles.bpos;
        switch (a) {
            case "tl":
                a = 0; break;
            case "tr":
                a = 2; break;
            case "bl":
                a = 1; break;
            default:
                a = 3 }
        W(this.a,
            "z-index", 2147483648);
        te(this.a, a)
    };
    f.gd = function() { this.ia && (W(this.ia, "display", "none"), this.e.disconnect(), this.Vb = !1, td(this.a), rd(this.a, this.ia), this.e.Ca(this.a.contentWindow, this.p.id, this.ob, this), W(this.a, "position", "static")) };
    f.Cb = 0;
    f.Pa = function() { var a = document.documentElement.clientWidth / window.innerWidth; if (a != this.Ga) { this.Ga = a; var b, c;
            this.o && (this.nb && (c = new S(window.innerWidth, .075 * window.innerHeight), this.width = c.width, this.height = c.height, this.Cb = 1 < this.Ga ? 1 : 0, b = c.width + 2 * this.Cb, c = c.height, this.a.setAttribute("width", b + "px"), this.a.setAttribute("height", c + "px"), W(this.a, "width", b + "px"), W(this.a, "height", c + "px")), Ue(this));
            a = this.t();
            b && (a.cvWidth = b, a.cvHeight = c);
            this.e.send("zoomed", a) } };

    function Ue(a) { if (a.o)
            if (P.i().ua == uc || 1 >= a.Ga) { switch (a.o) {
                    case "br":
                        te(a.a, 3); break;
                    case "bl":
                        te(a.a, 1); break;
                    case "tl":
                        te(a.a, 0); break;
                    case "tr":
                        te(a.a, 2) }
                a.pa && (cc(window, "scroll", a.Qa, !1, a), a.na && clearTimeout(a.na), W(a.a, "display", "block"), a.qb = !1);
                a.pa = !1 } else a.pa = !0, W(a.a, "position", "absolute"), K(window, "scroll", a.Qa, !1, a), Ve(a) }
    f.sb = function() { if (this.Uc) { if (P.i().ua == tc) { var a = id("bottombar");
                a && (a.style.display = "none") }
            wc() && (a = id("topbar")) && (a.style.display = "none") }
        this.o && this.hb && We(this, !1) };
    f.mc = function() { if (this.Uc) { if (P.i().ua == tc) { var a = id("bottombar");
                a && (a.style.display = "block") }
            wc() && (a = id("topbar")) && (a.style.display = "block") }
        this.o && this.hb && (this.Pa(), Ve(this)) };
    f.lc = function() {-1 != navigator.userAgent.indexOf("Android") && this.e && this.e.send("keyboarddown");
        this.mc() };
    f.Ab = !1;

    function Ve(a) { a.Ab || (a.Ab = !0, setTimeout(t(a.Xd, a), 100)) }
    f.Xd = function() { this.Ab = !1;
        this.pa ? Se(this) : We(this, !0) };

    function We(a, b) { var c = a.O && a.O.rb ? !0 : !1;
        b && !c && a.ib && !a.qb ? (W(a.a, "transition", "opacity .3s ease-in"), W(a.a, "opacity", 1)) : (W(a.a, "transition", "none"), W(a.a, "opacity", 0)) }
    f.Qa = function() { if (this.pa) { this.qb = !0;
            We(this, !1);
            this.na && clearTimeout(this.na); var a = Ud ? 1E3 : 150;
            this.na = setTimeout(t(this.Bd, this), a) } };
    f.Bd = function() { this.qb = !1;
        We(this, !0);
        Se(this);
        this.na && clearTimeout(this.na) };

    function Se(a) { if (a.o) { W(a.a, "right", null);
            W(a.a, "bottom", null); var b = a.Cb || 0; switch (a.o[1]) {
                case "r":
                    W(a.a, "left", window.scrollX + window.innerWidth - a.width - b + "px"); break;
                case "l":
                    W(a.a, "left", window.scrollX - b + "px") } switch (a.o[0]) {
                case "b":
                    W(a.a, "top", window.scrollY + window.innerHeight - a.height + 1 + "px"); break;
                case "t":
                    W(a.a, "top", window.scrollY - 1 + "px") }
            We(a, !0) } }
    f.ib = !0;
    f.ld = function() { this.ib = !1;
        We(this, !1) };
    f.kd = function() { this.ib = !0;
        Ve(this) };
    this.chatangoembed = Ke;
    this.chatangoembed.getInstance = this.chatangoembed.i;
    this.chatangoembed.getInstance()
})();