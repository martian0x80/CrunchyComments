(() => {
  "use strict";
  function t(t, e, i, n) {
    return new (i || (i = Promise))(function (o, s) {
      function r(t) {
        try {
          d(n.next(t));
        } catch (t) {
          s(t);
        }
      }
      function a(t) {
        try {
          d(n.throw(t));
        } catch (t) {
          s(t);
        }
      }
      function d(t) {
        var e;
        t.done
          ? o(t.value)
          : ((e = t.value),
            e instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                })).then(r, a);
      }
      d((n = n.apply(t, e || [])).next());
    });
  }
  Object.create,
    Object.create,
    "function" == typeof SuppressedError && SuppressedError;
  class e {
    static parseDate(t) {
      return "string" == typeof t && t.length >= 10 && !t.startsWith("0001")
        ? new Date(t)
        : void 0;
    }
    static isUuid(t) {
      return "string" == typeof t && !!t.match(this.reUuid);
    }
    static timeAgo(t, e, i) {
      if (!i) return "";
      const n = Math.floor((e - i) / 1e3);
      let o = Math.floor(n / 31536e3);
      return o > 1
        ? `${o} ${t("timeYearsAgo")}`
        : 1 === o
          ? t("timeYearAgo")
          : ((o = Math.floor(n / 2592e3)),
            o > 1
              ? `${o} ${t("timeMonthsAgo")}`
              : 1 === o
                ? t("timeMonthAgo")
                : ((o = Math.floor(n / 86400)),
                  o > 1
                    ? `${o} ${t("timeDaysAgo")}`
                    : 1 === o
                      ? t("timeYesterday")
                      : ((o = Math.floor(n / 3600)),
                        o > 1
                          ? `${o} ${t("timeHoursAgo")}`
                          : 1 === o
                            ? t("timeHourAgo")
                            : ((o = Math.floor(n / 60)),
                              o > 1
                                ? `${o} ${t("timeMinutesAgo")}`
                                : t(
                                    1 === o ? "timeMinuteAgo" : "timeJustNow",
                                  )))));
    }
    static joinUrl(...t) {
      return t.reduce(
        (t, e) =>
          t
            ? (t.endsWith("/") && (t = t.substring(0, t.length - 1)),
              e.startsWith("/") && (e = e.substring(1)),
              `${t}/${e}`)
            : e,
        "",
      );
    }
    static getCookie(t) {
      var e;
      return (
        (null === (e = `; ${this.cookieSrc.cookie}`.split(`; ${t}=`).pop()) ||
        void 0 === e
          ? void 0
          : e.split(";").shift()) || void 0
      );
    }
    static setCookie(t, e, i) {
      const n = new Date();
      n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
        (this.cookieSrc.cookie = `${t}=${
          e || ""
        }; Expires=${n.toUTCString()}; Path=/; SameSite=Strict`);
    }
  }
  (e.reUuid = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/),
    (e.cookieSrc = parent.Cypress ? parent.document : document);
  class i {
    constructor(t, e, i) {
      (this.status = t), (this.message = e), (this.response = i);
    }
  }
  class n {
    constructor(t, e, i) {
      (this.baseUrl = t), (this.onBeforeRequest = e), (this.onError = i);
    }
    delete(t, e, i) {
      return this.request("DELETE", t, e, i);
    }
    get(t, e) {
      return this.request("GET", t, void 0, e);
    }
    post(t, e, i) {
      return this.request("POST", t, e, i);
    }
    put(t, e, i) {
      return this.request("PUT", t, e, i);
    }
    getEndpointUrl(t) {
      return e.joinUrl(this.baseUrl, t);
    }
    request(t, e, n, o) {
      var s;
      return (
        null === (s = this.onBeforeRequest) || void 0 === s || s.call(this),
        new Promise((s, r) => {
          var a;
          try {
            const a = new XMLHttpRequest();
            a.open(t, this.getEndpointUrl(e), !0),
              n && a.setRequestHeader("Content-type", "application/json"),
              o &&
                Object.entries(o).forEach(([t, e]) => a.setRequestHeader(t, e));
            const d = () => {
              var t;
              const e = new i(a.status, a.statusText, a.response);
              null === (t = this.onError) || void 0 === t || t.call(this, e),
                r(e);
            };
            (a.onload = () => {
              a.status < 200 || a.status > 299
                ? d()
                : a.response
                  ? s(JSON.parse(a.response))
                  : s(void 0);
            }),
              (a.onerror = d),
              (a.withCredentials = !0),
              a.send(n ? JSON.stringify(n) : void 0);
          } catch (t) {
            null === (a = this.onError) || void 0 === a || a.call(this, t),
              r(t);
          }
        })
      );
    }
  }
  class o {
    constructor(t) {
      Object.assign(this, t);
    }
    get isReadonly() {
      return this.isDomainReadonly || this.isPageReadonly;
    }
    hasAuthMethod(t) {
      var e;
      return (
        this.authAnonymous ||
        this.authLocal ||
        (this.authSso && !(t && this.ssoNonInteractive)) ||
        !!(null === (e = this.idps) || void 0 === e ? void 0 : e.length)
      );
    }
    get hasNonInteractiveSso() {
      return this.authSso && this.ssoNonInteractive;
    }
  }
  var s;
  !(function (t) {
    (t[(t.signup = 0)] = "signup"),
      (t[(t.localAuth = 1)] = "localAuth"),
      (t[(t.federatedAuth = 2)] = "federatedAuth"),
      (t[(t.unregistered = 3)] = "unregistered");
  })(s || (s = {}));
  const r = "00000000-0000-0000-0000-000000000000",
    a = {
      sa: (t, e) => t.score - e.score,
      sd: (t, e) => e.score - t.score,
      td: (t, e) => e.createdTime.localeCompare(t.createdTime),
      ta: (t, e) => t.createdTime.localeCompare(e.createdTime),
    };
  class d {
    constructor(t) {
      (this.text = t), (this.severity = "ok");
    }
  }
  class l {
    constructor(t, e) {
      (this.text = t), (this.details = e), (this.severity = "error");
    }
    static of(t, e) {
      let n = (null == e ? void 0 : e("errorUnknown")) || "Unknown error";
      if ("string" == typeof t) n = t;
      else if (t instanceof i) {
        let i;
        if ("string" == typeof t.response)
          try {
            i = JSON.parse(t.response);
          } catch (t) {}
        "unknown-host" === (null == i ? void 0 : i.id)
          ? (n = (null == e ? void 0 : e("errorUnknownHost")) || i.id)
          : ((n = (null == i ? void 0 : i.message) || t.message || n),
            (null == i ? void 0 : i.details) && (n += ` (${i.details})`));
      }
      return new l(n, JSON.stringify(t, void 0, 2));
    }
  }
  class h {
    constructor(t) {
      (this.baseUrl = t),
        (this.httpClient = new n(
          t,
          () => {
            var t;
            return null === (t = this._onBeforeRequest) || void 0 === t
              ? void 0
              : t.call(this);
          },
          (t) => {
            var e;
            return null === (e = this._onError) || void 0 === e
              ? void 0
              : e.call(this, t);
          },
        ));
    }
    set onBeforeRequest(t) {
      this._onBeforeRequest = t;
    }
    set onError(t) {
      this._onError = t;
    }
    getAvatarUrl(t, i) {
      return e.joinUrl(this.baseUrl, "users", t, "avatar") + `?size=${i}`;
    }
    getOAuthInitUrl(t, i, n) {
      return (
        e.joinUrl(this.baseUrl, "oauth", t) +
        `?host=${encodeURIComponent(i)}&token=${n}`
      );
    }
    getPrincipal() {
      var i, n;
      return t(this, void 0, void 0, function* () {
        return (
          void 0 === this._principal &&
            (void 0 === this._userSessionToken &&
              (this._userSessionToken = e.getCookie(h.SessionTokenCookieName)),
            this._userSessionToken &&
              this._userSessionToken !== h.AnonymousUserSessionToken &&
              (this._principal =
                null !== (i = yield this.fetchPrincipal()) && void 0 !== i
                  ? i
                  : null),
            this.storeAuth(this._principal, this._userSessionToken)),
          null !== (n = this._principal) && void 0 !== n ? n : void 0
        );
      });
    }
    storeAuth(t, i) {
      this._principal = null != t ? t : null;
      const n = t && i ? i : h.AnonymousUserSessionToken;
      this._userSessionToken !== n &&
        ((this._userSessionToken = n),
        e.setCookie(h.SessionTokenCookieName, this._userSessionToken, 30));
    }
    i18nMessages(e) {
      return t(this, void 0, void 0, function* () {
        return yield this.httpClient.get(
          `embed/i18n/${e || "unknown"}/messages`,
        );
      });
    }
    authLogin(e, i, n) {
      return t(this, void 0, void 0, function* () {
        const t = yield this.httpClient.post("embed/auth/login", {
          email: e,
          password: i,
          host: n,
        });
        this.storeAuth(t.principal, t.sessionToken);
      });
    }
    authLoginToken(e, i) {
      return t(this, void 0, void 0, function* () {
        const t = yield this.httpClient.put(
          "embed/auth/login/token",
          { host: i },
          { Authorization: `Bearer ${e}` },
        );
        this.storeAuth(t.principal, t.sessionToken);
      });
    }
    authLogout() {
      return t(this, void 0, void 0, function* () {
        yield this.httpClient.post("embed/auth/logout", void 0, this.addAuth()),
          this.storeAuth(null);
      });
    }
    authNewLoginToken(e) {
      return t(this, void 0, void 0, function* () {
        return (yield this.httpClient.post(
          "embed/auth/login/token",
          void 0,
          e ? void 0 : this.addAuth(),
        )).token;
      });
    }
    authUserSettingsUpdate(e, i, n, o) {
      var s;
      return t(this, void 0, void 0, function* () {
        yield this.httpClient.put(
          "embed/auth/user",
          {
            domainId: e,
            notifyReplies: i,
            notifyModerator: n,
            notifyCommentStatus: o,
          },
          this.addAuth(),
        ),
          (this._principal =
            null !== (s = yield this.fetchPrincipal()) && void 0 !== s
              ? s
              : null);
      });
    }
    authSignup(e, i, n, o, s, r) {
      return t(this, void 0, void 0, function* () {
        return (yield this.httpClient.post("embed/auth/signup", {
          domainId: e,
          email: i,
          name: n,
          password: o,
          websiteUrl: s,
          url: r,
        })).isConfirmed;
      });
    }
    commentDelete(e) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.delete(
          `embed/comments/${e}`,
          void 0,
          this.addAuth(),
        );
      });
    }
    commentGet(e) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.get(`embed/comments/${e}`, this.addAuth());
      });
    }
    commentList(e, i) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.post(
          "embed/comments",
          { host: e, path: i },
          this.addAuth(),
        );
      });
    }
    commentModerate(e, i) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.post(
          `embed/comments/${e}/moderate`,
          { approve: i },
          this.addAuth(),
        );
      });
    }
    commentNew(e, i, n, o, s, r) {
      return t(this, void 0, void 0, function* () {
        const commentSent = this.httpClient.put(
          "embed/comments",
          {
            host: e,
            path: i,
            unregistered: n,
            authorName: o,
            parentId: s,
            markdown: r,
          },
          this.addAuth(),
        );

        const jsonBody = yield commentSent;
        let pageTitle = document.getElementsByTagName("title")[0].innerText;
        pageTitle = pageTitle.replace(" - Watch on Crunchyroll", "");
        const commentpfp = jsonBody["commenter"]["hasAvatar"]
          ? `https://comentario.rmrf.online/api/users/${jsonBody["commenter"]["id"]}/avatar?size=L`
          : null;

        const jsonBodytoSend = {
          username: jsonBody["commenter"]["name"],
          avatar_url: commentpfp,
          embeds: [
            {
              title: pageTitle,
              description: `[Link to Comment](${jsonBody["comment"]["url"]})`,
              color: 1805533,
              fields: [
                // {
                //   "name": "Episode",
                //   "value": "The Kaiju Who Eats Kaiju"
                // },
                {
                  name: "Comment",
                  value: r,
                },
              ],
              timestamp: jsonBody["comment"]["createdTime"],
            },
          ],
        };

        fetch("https://crunchy.404420.xyz/action/log/", {
          method: "POST",
          body: JSON.stringify(jsonBodytoSend),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return commentSent;
      });
    }
    commentPreview(e, i) {
      return t(this, void 0, void 0, function* () {
        return (yield this.httpClient.post("embed/comments/preview", {
          domainId: e,
          markdown: i,
        })).html;
      });
    }
    commentSticky(e, i) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.post(
          `embed/comments/${e}/sticky`,
          { sticky: i },
          this.addAuth(),
        );
      });
    }
    commentUpdate(e, i) {
      return t(this, void 0, void 0, function* () {
        const commentSent = this.httpClient.put(
          `embed/comments/${e}`,
          { markdown: i },
          this.addAuth(),
        );
        const jsonBody = yield commentSent;
        let pageTitle = document.getElementsByTagName("title")[0].innerText;
        pageTitle = pageTitle.replace(" - Watch on Crunchyroll", "");
        const commentpfp = jsonBody["comment"]["userEdited"]
          ? `https://comentario.rmrf.online/api/users/${jsonBody["comment"]["userEdited"]}/avatar?size=L`
          : null;

        const jsonBodytoSend = {
          username: null,
          avatar_url: commentpfp,
          embeds: [
            {
              title: pageTitle,
              description: `[Link to Comment](${jsonBody["comment"]["url"]})`,
              color: 1805533,
              fields: [
                // {
                //   "name": "Episode",
                //   "value": "The Kaiju Who Eats Kaiju"
                // },
                {
                  name: "Comment",
                  value: i,
                },
              ],
              footer: {
                text: "Edited",
              },
              timestamp: jsonBody["comment"]["createdTime"],
            },
          ],
        };

        fetch("https://crunchy.404420.xyz/action/log/", {
          method: "POST",
          body: JSON.stringify(jsonBodytoSend),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return commentSent;
      });
    }
    commentVote(e, i) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.post(
          `embed/comments/${e}/vote`,
          { direction: i },
          this.addAuth(),
        );
      });
    }
    pageUpdate(e, i) {
      return t(this, void 0, void 0, function* () {
        return this.httpClient.put(
          `embed/page/${e}`,
          { isReadonly: i },
          this.addAuth(),
        );
      });
    }
    addAuth(t) {
      const e = t || {};
      return (
        this._userSessionToken &&
          this._userSessionToken !== h.AnonymousUserSessionToken &&
          (e["X-User-Session"] = this._userSessionToken),
        e
      );
    }
    fetchPrincipal() {
      return t(this, void 0, void 0, function* () {
        try {
          return yield this.httpClient.post(
            "embed/auth/user",
            void 0,
            this.addAuth(),
          );
        } catch (t) {
          return void console.error(t);
        }
      });
    }
  }
  (h.AnonymousUserSessionToken = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
    (h.SessionTokenCookieName = "comentario_commenter_session");
  class c {
    constructor(t) {
      this.el = t;
    }
    static new(t) {
      return new c(document.createElement(t));
    }
    static newSvg() {
      return new c(
        document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      );
    }
    static byId(t) {
      return new c(document.getElementById(this.idPrefix + t));
    }
    get element() {
      if (!this.el) throw new Error("No underlying HTML element in the Wrap");
      return this.el;
    }
    get ok() {
      return !!this.el;
    }
    get hasChildren() {
      var t, e;
      return !!(null ===
        (e = null === (t = this.el) || void 0 === t ? void 0 : t.childNodes) ||
      void 0 === e
        ? void 0
        : e.length);
    }
    get val() {
      var t;
      return null === (t = this.el) || void 0 === t ? void 0 : t.value;
    }
    get isChecked() {
      var t;
      return null === (t = this.el) || void 0 === t ? void 0 : t.checked;
    }
    attr(t) {
      return (
        this.el &&
          t &&
          Object.entries(t).forEach(([t, e]) => {
            null == e ? this.el.removeAttribute(t) : this.el.setAttribute(t, e);
          }),
        this
      );
    }
    id(t) {
      return this.el && (this.el.id = c.idPrefix + t), this;
    }
    inner(t) {
      return this.el instanceof HTMLElement && (this.el.innerText = t), this;
    }
    value(t) {
      return this.el && (this.el.value = t), this;
    }
    html(t) {
      return this.el && (this.el.innerHTML = t), this;
    }
    style(t) {
      return this.attr({ style: t });
    }
    prepend(...t) {
      var e;
      return (
        null === (e = this.el) ||
          void 0 === e ||
          e.prepend(
            ...t.filter((t) => (null == t ? void 0 : t.ok)).map((t) => t.el),
          ),
        this
      );
    }
    appendTo(t) {
      return this.el && t.el && t.el.appendChild(this.el), this;
    }
    append(...t) {
      var e;
      return (
        null === (e = this.el) ||
          void 0 === e ||
          e.append(...t.filter((t) => t && t.ok).map((t) => t.el)),
        this
      );
    }
    remove() {
      var t, e;
      return (
        null ===
          (e =
            null === (t = this.el) || void 0 === t ? void 0 : t.parentNode) ||
          void 0 === e ||
          e.removeChild(this.el),
        (this.el = void 0),
        this
      );
    }
    classes(...t) {
      return this.setClasses(!0, ...t);
    }
    noClasses(...t) {
      return this.setClasses(!1, ...t);
    }
    setClasses(t, ...e) {
      return (
        this.el &&
          (null == e ||
            e
              .filter((t) => !!t)
              .map((t) => `comentario-${t}`)
              .forEach((e) =>
                t ? this.el.classList.add(e) : this.el.classList.remove(e),
              )),
        this
      );
    }
    click(t) {
      return this.on("click", t);
    }
    keydown(t) {
      return this.on("keydown", t);
    }
    animated(t) {
      return this.on("animationend", t).on("animationcancel", t);
    }
    on(t, e, i) {
      var n;
      return (
        "function" == typeof e &&
          (null === (n = this.el) ||
            void 0 === n ||
            n.addEventListener(t, (t) => e(this, t), { once: i })),
        this
      );
    }
    checked(t) {
      return this.el && (this.el.checked = t), this;
    }
    focus() {
      var t;
      return null === (t = this.el) || void 0 === t || t.focus(), this;
    }
    scrollTo() {
      return (
        this.el &&
          setTimeout(() => {
            var t;
            return (
              !this.vertVisible() &&
              (null === (t = this.el) || void 0 === t
                ? void 0
                : t.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                    behavior: "smooth",
                  }))
            );
          }, 100),
        this
      );
    }
    else(t) {
      return this.el || t(), this;
    }
    getAttr(t) {
      var e, i;
      return null ===
        (i =
          null === (e = this.el) || void 0 === e
            ? void 0
            : e.attributes.getNamedItem(t)) || void 0 === i
        ? void 0
        : i.value;
    }
    hasClass(t) {
      var e;
      return !!(null === (e = this.el) || void 0 === e
        ? void 0
        : e.classList.contains(`comentario-${t}`));
    }
    vertVisible() {
      var t;
      const e =
        null === (t = this.el) || void 0 === t
          ? void 0
          : t.getBoundingClientRect();
      return !!e && e.top >= 0 && e.bottom <= window.innerHeight;
    }
  }
  c.idPrefix = "comentario-";
  const p = {
    arrowDown:
      '<path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>',
    arrowUp:
      '<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>',
    bin: '<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>',
    bold: '<path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>',
    bulletList:
      '<path d="M2 7c1.333 0 1.333-2 0-2S.667 7 2 7m0 4c1.333 0 1.333-2 0-2s-1.333 2 0 2m3-5.5h10v1H5zm0 4h10v1H5z"/>',
    caretDown: '<path d="M8 12 0 4h16z"/>',
    check:
      '<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>',
    code: '<path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>',
    enter:
      '<path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>',
    exit: '<path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>',
    gear: '<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>',
    help: '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>',
    image:
      '<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/>',
    italic:
      '<path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>',
    link: '<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>',
    lock: '<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>',
    newTab:
      '<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>',
    numberedList:
      '<path d="M5 9.333h10v1H5zm-3.291.166h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054v.507H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zm.855-2.166h-.635V5.257h-.031l-.598.42V5.11l.629-.443h.635zm2.436-2h10v1H5z"/>',
    pencil:
      '<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>',
    quote:
      '<path d="M6.75 4.876A2.993 2.993 0 0 0 1.24 6.508a2.997 2.997 0 0 0 4.604 2.528c-.236.699-.675 1.445-1.397 2.193a.75.75 0 0 0 1.078 1.042C8.196 9.503 7.85 6.494 6.75 4.88zm7.19 0a2.993 2.993 0 0 0-5.51 1.632 2.997 2.997 0 0 0 4.603 2.528c-.235.699-.674 1.445-1.397 2.193a.75.75 0 0 0 1.079 1.042c2.671-2.768 2.324-5.777 1.226-7.392z"/>',
    reply:
      '<path d="M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>',
    star: '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>',
    strikethrough:
      '<path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.8 2.8 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967"/>',
    table:
      '<path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>',
    times:
      '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>',
    unlock:
      '<path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>',
  };
  class u {
    static a(t, e) {
      return c
        .new("a")
        .inner(t)
        .attr({ href: e, target: "_blank", rel: "noopener" });
    }
    static div(...t) {
      return c.new("div").classes(...t);
    }
    static span(t, ...e) {
      return c
        .new("span")
        .inner(null != t ? t : "")
        .classes(...e);
    }
    static badge(t, ...e) {
      return u
        .div("badge")
        .classes(...e)
        .inner(t);
    }
    static form(t, e) {
      const i = (e, i) => {
        i.preventDefault(),
          [
            ...e.element.getElementsByTagName("input"),
            ...e.element.getElementsByTagName("textarea"),
          ].forEach((t) => new c(t).classes("touched")),
          e.element.checkValidity() && t();
      };
      return c
        .new("form")
        .on("submit", i)
        .on("keydown", (t, n) => {
          switch (n.code) {
            case "Enter":
              return (
                n.ctrlKey && !n.shiftKey && !n.altKey && !n.metaKey && i(t, n)
              );
            case "Escape":
              return (
                !n.ctrlKey &&
                !n.shiftKey &&
                !n.altKey &&
                !n.metaKey &&
                ((t) => {
                  e && (t.preventDefault(), e());
                })(n)
              );
          }
        });
    }
    static input(t, e = "text", i = null, n = null, o) {
      return c
        .new("input")
        .classes("input")
        .attr({
          name: t,
          type: e,
          placeholder: i,
          autocomplete: n,
          required: o ? "required" : null,
          size: "1",
        })
        .on("blur", (t) => t.classes("touched"));
    }
    static textarea(t, e, i) {
      return c
        .new("textarea")
        .attr({ placeholder: t, required: e ? "required" : null })
        .on("blur", (t) => t.classes("touched"))
        .on(
          "input",
          (t) =>
            i &&
            t
              .style("height:auto")
              .style(
                `height:${Math.min(
                  Math.max(
                    t.element.scrollHeight +
                      t.element.offsetHeight -
                      t.element.clientHeight,
                    75,
                  ),
                  400,
                )}px`,
              ),
        );
    }
    static button(t, e, ...i) {
      return c
        .new("button")
        .classes("btn", ...i)
        .html(t)
        .attr({ type: "button" })
        .click(e);
    }
    static iconButton(t, e, i, ...n) {
      return this.button("", i, ...n)
        .append(this.icon(t))
        .attr({ title: e });
    }
    static toolButton(t, e, i, ...n) {
      return this.iconButton(t, e, i, "btn-tool", ...n).attr({
        tabindex: "-1",
      });
    }
    static submit(t, e) {
      const i = c
        .new("button")
        .classes("btn", "btn-primary", "fw-bold")
        .attr({ type: "submit" });
      return e
        ? i.append(this.icon("enter").classes("submit-icon")).attr({ title: t })
        : i.inner(t);
    }
    static icon(t) {
      return c
        .newSvg()
        .attr({ fill: "currentColor", viewBox: "0 0 16 16" })
        .classes("icon")
        .html(p[t]);
    }
  }
  function m(t) {
    if (null == t) return window;
    if ("[object Window]" !== t.toString()) {
      var e = t.ownerDocument;
      return (e && e.defaultView) || window;
    }
    return t;
  }
  function v(t) {
    return t instanceof m(t).Element || t instanceof Element;
  }
  function f(t) {
    return t instanceof m(t).HTMLElement || t instanceof HTMLElement;
  }
  function g(t) {
    return (
      "undefined" != typeof ShadowRoot &&
      (t instanceof m(t).ShadowRoot || t instanceof ShadowRoot)
    );
  }
  var b = Math.max,
    y = Math.min,
    w = Math.round;
  function C() {
    var t = navigator.userAgentData;
    return null != t && t.brands && Array.isArray(t.brands)
      ? t.brands
          .map(function (t) {
            return t.brand + "/" + t.version;
          })
          .join(" ")
      : navigator.userAgent;
  }
  function S() {
    return !/^((?!chrome|android).)*safari/i.test(C());
  }
  function A(t, e, i) {
    void 0 === e && (e = !1), void 0 === i && (i = !1);
    var n = t.getBoundingClientRect(),
      o = 1,
      s = 1;
    e &&
      f(t) &&
      ((o = (t.offsetWidth > 0 && w(n.width) / t.offsetWidth) || 1),
      (s = (t.offsetHeight > 0 && w(n.height) / t.offsetHeight) || 1));
    var r = (v(t) ? m(t) : window).visualViewport,
      a = !S() && i,
      d = (n.left + (a && r ? r.offsetLeft : 0)) / o,
      l = (n.top + (a && r ? r.offsetTop : 0)) / s,
      h = n.width / o,
      c = n.height / s;
    return {
      width: h,
      height: c,
      top: l,
      right: d + h,
      bottom: l + c,
      left: d,
      x: d,
      y: l,
    };
  }
  function x(t) {
    var e = m(t);
    return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
  }
  function k(t) {
    return t ? (t.nodeName || "").toLowerCase() : null;
  }
  function I(t) {
    return ((v(t) ? t.ownerDocument : t.document) || window.document)
      .documentElement;
  }
  function T(t) {
    return A(I(t)).left + x(t).scrollLeft;
  }
  function _(t) {
    return m(t).getComputedStyle(t);
  }
  function M(t) {
    var e = _(t),
      i = e.overflow,
      n = e.overflowX,
      o = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(i + o + n);
  }
  function O(t, e, i) {
    void 0 === i && (i = !1);
    var n,
      o,
      s = f(e),
      r =
        f(e) &&
        (function (t) {
          var e = t.getBoundingClientRect(),
            i = w(e.width) / t.offsetWidth || 1,
            n = w(e.height) / t.offsetHeight || 1;
          return 1 !== i || 1 !== n;
        })(e),
      a = I(e),
      d = A(t, r, i),
      l = { scrollLeft: 0, scrollTop: 0 },
      h = { x: 0, y: 0 };
    return (
      (s || (!s && !i)) &&
        (("body" !== k(e) || M(a)) &&
          (l =
            (n = e) !== m(n) && f(n)
              ? { scrollLeft: (o = n).scrollLeft, scrollTop: o.scrollTop }
              : x(n)),
        f(e)
          ? (((h = A(e, !0)).x += e.clientLeft), (h.y += e.clientTop))
          : a && (h.x = T(a))),
      {
        x: d.left + l.scrollLeft - h.x,
        y: d.top + l.scrollTop - h.y,
        width: d.width,
        height: d.height,
      }
    );
  }
  function L(t) {
    var e = A(t),
      i = t.offsetWidth,
      n = t.offsetHeight;
    return (
      Math.abs(e.width - i) <= 1 && (i = e.width),
      Math.abs(e.height - n) <= 1 && (n = e.height),
      { x: t.offsetLeft, y: t.offsetTop, width: i, height: n }
    );
  }
  function P(t) {
    return "html" === k(t)
      ? t
      : t.assignedSlot || t.parentNode || (g(t) ? t.host : null) || I(t);
  }
  function E(t) {
    return ["html", "body", "#document"].indexOf(k(t)) >= 0
      ? t.ownerDocument.body
      : f(t) && M(t)
        ? t
        : E(P(t));
  }
  function B(t, e) {
    var i;
    void 0 === e && (e = []);
    var n = E(t),
      o = n === (null == (i = t.ownerDocument) ? void 0 : i.body),
      s = m(n),
      r = o ? [s].concat(s.visualViewport || [], M(n) ? n : []) : n,
      a = e.concat(r);
    return o ? a : a.concat(B(P(r)));
  }
  function U(t) {
    return ["table", "td", "th"].indexOf(k(t)) >= 0;
  }
  function D(t) {
    return f(t) && "fixed" !== _(t).position ? t.offsetParent : null;
  }
  function N(t) {
    for (var e = m(t), i = D(t); i && U(i) && "static" === _(i).position; )
      i = D(i);
    return i &&
      ("html" === k(i) || ("body" === k(i) && "static" === _(i).position))
      ? e
      : i ||
          (function (t) {
            var e = /firefox/i.test(C());
            if (/Trident/i.test(C()) && f(t) && "fixed" === _(t).position)
              return null;
            var i = P(t);
            for (
              g(i) && (i = i.host);
              f(i) && ["html", "body"].indexOf(k(i)) < 0;

            ) {
              var n = _(i);
              if (
                "none" !== n.transform ||
                "none" !== n.perspective ||
                "paint" === n.contain ||
                -1 !== ["transform", "perspective"].indexOf(n.willChange) ||
                (e && "filter" === n.willChange) ||
                (e && n.filter && "none" !== n.filter)
              )
                return i;
              i = i.parentNode;
            }
            return null;
          })(t) ||
          e;
  }
  var R = "top",
    H = "bottom",
    j = "right",
    $ = "left",
    V = "auto",
    z = [R, H, j, $],
    W = "start",
    q = "end",
    F = "viewport",
    K = "popper",
    J = z.reduce(function (t, e) {
      return t.concat([e + "-" + W, e + "-" + q]);
    }, []),
    G = [].concat(z, [V]).reduce(function (t, e) {
      return t.concat([e, e + "-" + W, e + "-" + q]);
    }, []),
    Y = [
      "beforeRead",
      "read",
      "afterRead",
      "beforeMain",
      "main",
      "afterMain",
      "beforeWrite",
      "write",
      "afterWrite",
    ];
  function X(t) {
    var e = new Map(),
      i = new Set(),
      n = [];
    function o(t) {
      i.add(t.name),
        []
          .concat(t.requires || [], t.requiresIfExists || [])
          .forEach(function (t) {
            if (!i.has(t)) {
              var n = e.get(t);
              n && o(n);
            }
          }),
        n.push(t);
    }
    return (
      t.forEach(function (t) {
        e.set(t.name, t);
      }),
      t.forEach(function (t) {
        i.has(t.name) || o(t);
      }),
      n
    );
  }
  var Q = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Z() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    return !e.some(function (t) {
      return !(t && "function" == typeof t.getBoundingClientRect);
    });
  }
  var tt = { passive: !0 };
  function et(t) {
    return t.split("-")[0];
  }
  function it(t) {
    return t.split("-")[1];
  }
  function nt(t) {
    return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
  }
  function ot(t) {
    var e,
      i = t.reference,
      n = t.element,
      o = t.placement,
      s = o ? et(o) : null,
      r = o ? it(o) : null,
      a = i.x + i.width / 2 - n.width / 2,
      d = i.y + i.height / 2 - n.height / 2;
    switch (s) {
      case R:
        e = { x: a, y: i.y - n.height };
        break;
      case H:
        e = { x: a, y: i.y + i.height };
        break;
      case j:
        e = { x: i.x + i.width, y: d };
        break;
      case $:
        e = { x: i.x - n.width, y: d };
        break;
      default:
        e = { x: i.x, y: i.y };
    }
    var l = s ? nt(s) : null;
    if (null != l) {
      var h = "y" === l ? "height" : "width";
      switch (r) {
        case W:
          e[l] = e[l] - (i[h] / 2 - n[h] / 2);
          break;
        case q:
          e[l] = e[l] + (i[h] / 2 - n[h] / 2);
      }
    }
    return e;
  }
  var st = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function rt(t) {
    var e,
      i = t.popper,
      n = t.popperRect,
      o = t.placement,
      s = t.variation,
      r = t.offsets,
      a = t.position,
      d = t.gpuAcceleration,
      l = t.adaptive,
      h = t.roundOffsets,
      c = t.isFixed,
      p = r.x,
      u = void 0 === p ? 0 : p,
      v = r.y,
      f = void 0 === v ? 0 : v,
      g = "function" == typeof h ? h({ x: u, y: f }) : { x: u, y: f };
    (u = g.x), (f = g.y);
    var b = r.hasOwnProperty("x"),
      y = r.hasOwnProperty("y"),
      C = $,
      S = R,
      A = window;
    if (l) {
      var x = N(i),
        k = "clientHeight",
        T = "clientWidth";
      x === m(i) &&
        "static" !== _((x = I(i))).position &&
        "absolute" === a &&
        ((k = "scrollHeight"), (T = "scrollWidth")),
        (o === R || ((o === $ || o === j) && s === q)) &&
          ((S = H),
          (f -=
            (c && x === A && A.visualViewport
              ? A.visualViewport.height
              : x[k]) - n.height),
          (f *= d ? 1 : -1)),
        (o !== $ && ((o !== R && o !== H) || s !== q)) ||
          ((C = j),
          (u -=
            (c && x === A && A.visualViewport ? A.visualViewport.width : x[T]) -
            n.width),
          (u *= d ? 1 : -1));
    }
    var M,
      O = Object.assign({ position: a }, l && st),
      L =
        !0 === h
          ? (function (t, e) {
              var i = t.x,
                n = t.y,
                o = e.devicePixelRatio || 1;
              return { x: w(i * o) / o || 0, y: w(n * o) / o || 0 };
            })({ x: u, y: f }, m(i))
          : { x: u, y: f };
    return (
      (u = L.x),
      (f = L.y),
      d
        ? Object.assign(
            {},
            O,
            (((M = {})[S] = y ? "0" : ""),
            (M[C] = b ? "0" : ""),
            (M.transform =
              (A.devicePixelRatio || 1) <= 1
                ? "translate(" + u + "px, " + f + "px)"
                : "translate3d(" + u + "px, " + f + "px, 0)"),
            M),
          )
        : Object.assign(
            {},
            O,
            (((e = {})[S] = y ? f + "px" : ""),
            (e[C] = b ? u + "px" : ""),
            (e.transform = ""),
            e),
          )
    );
  }
  var at = (function (t) {
    void 0 === t && (t = {});
    var e = t,
      i = e.defaultModifiers,
      n = void 0 === i ? [] : i,
      o = e.defaultOptions,
      s = void 0 === o ? Q : o;
    return function (t, e, i) {
      void 0 === i && (i = s);
      var o,
        r,
        a = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, Q, s),
          modifiersData: {},
          elements: { reference: t, popper: e },
          attributes: {},
          styles: {},
        },
        d = [],
        l = !1,
        h = {
          state: a,
          setOptions: function (i) {
            var o = "function" == typeof i ? i(a.options) : i;
            c(),
              (a.options = Object.assign({}, s, a.options, o)),
              (a.scrollParents = {
                reference: v(t)
                  ? B(t)
                  : t.contextElement
                    ? B(t.contextElement)
                    : [],
                popper: B(e),
              });
            var r,
              l,
              p = (function (t) {
                var e = X(t);
                return Y.reduce(function (t, i) {
                  return t.concat(
                    e.filter(function (t) {
                      return t.phase === i;
                    }),
                  );
                }, []);
              })(
                ((r = [].concat(n, a.options.modifiers)),
                (l = r.reduce(function (t, e) {
                  var i = t[e.name];
                  return (
                    (t[e.name] = i
                      ? Object.assign({}, i, e, {
                          options: Object.assign({}, i.options, e.options),
                          data: Object.assign({}, i.data, e.data),
                        })
                      : e),
                    t
                  );
                }, {})),
                Object.keys(l).map(function (t) {
                  return l[t];
                })),
              );
            return (
              (a.orderedModifiers = p.filter(function (t) {
                return t.enabled;
              })),
              a.orderedModifiers.forEach(function (t) {
                var e = t.name,
                  i = t.options,
                  n = void 0 === i ? {} : i,
                  o = t.effect;
                if ("function" == typeof o) {
                  var s = o({ state: a, name: e, instance: h, options: n });
                  d.push(s || function () {});
                }
              }),
              h.update()
            );
          },
          forceUpdate: function () {
            if (!l) {
              var t = a.elements,
                e = t.reference,
                i = t.popper;
              if (Z(e, i)) {
                (a.rects = {
                  reference: O(e, N(i), "fixed" === a.options.strategy),
                  popper: L(i),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (t) {
                    return (a.modifiersData[t.name] = Object.assign(
                      {},
                      t.data,
                    ));
                  });
                for (var n = 0; n < a.orderedModifiers.length; n++)
                  if (!0 !== a.reset) {
                    var o = a.orderedModifiers[n],
                      s = o.fn,
                      r = o.options,
                      d = void 0 === r ? {} : r,
                      c = o.name;
                    "function" == typeof s &&
                      (a =
                        s({ state: a, options: d, name: c, instance: h }) || a);
                  } else (a.reset = !1), (n = -1);
              }
            }
          },
          update:
            ((o = function () {
              return new Promise(function (t) {
                h.forceUpdate(), t(a);
              });
            }),
            function () {
              return (
                r ||
                  (r = new Promise(function (t) {
                    Promise.resolve().then(function () {
                      (r = void 0), t(o());
                    });
                  })),
                r
              );
            }),
          destroy: function () {
            c(), (l = !0);
          },
        };
      if (!Z(t, e)) return h;
      function c() {
        d.forEach(function (t) {
          return t();
        }),
          (d = []);
      }
      return (
        h.setOptions(i).then(function (t) {
          !l && i.onFirstUpdate && i.onFirstUpdate(t);
        }),
        h
      );
    };
  })({
    defaultModifiers: [
      {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function () {},
        effect: function (t) {
          var e = t.state,
            i = t.instance,
            n = t.options,
            o = n.scroll,
            s = void 0 === o || o,
            r = n.resize,
            a = void 0 === r || r,
            d = m(e.elements.popper),
            l = [].concat(e.scrollParents.reference, e.scrollParents.popper);
          return (
            s &&
              l.forEach(function (t) {
                t.addEventListener("scroll", i.update, tt);
              }),
            a && d.addEventListener("resize", i.update, tt),
            function () {
              s &&
                l.forEach(function (t) {
                  t.removeEventListener("scroll", i.update, tt);
                }),
                a && d.removeEventListener("resize", i.update, tt);
            }
          );
        },
        data: {},
      },
      {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function (t) {
          var e = t.state,
            i = t.name;
          e.modifiersData[i] = ot({
            reference: e.rects.reference,
            element: e.rects.popper,
            strategy: "absolute",
            placement: e.placement,
          });
        },
        data: {},
      },
      {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function (t) {
          var e = t.state,
            i = t.options,
            n = i.gpuAcceleration,
            o = void 0 === n || n,
            s = i.adaptive,
            r = void 0 === s || s,
            a = i.roundOffsets,
            d = void 0 === a || a,
            l = {
              placement: et(e.placement),
              variation: it(e.placement),
              popper: e.elements.popper,
              popperRect: e.rects.popper,
              gpuAcceleration: o,
              isFixed: "fixed" === e.options.strategy,
            };
          null != e.modifiersData.popperOffsets &&
            (e.styles.popper = Object.assign(
              {},
              e.styles.popper,
              rt(
                Object.assign({}, l, {
                  offsets: e.modifiersData.popperOffsets,
                  position: e.options.strategy,
                  adaptive: r,
                  roundOffsets: d,
                }),
              ),
            )),
            null != e.modifiersData.arrow &&
              (e.styles.arrow = Object.assign(
                {},
                e.styles.arrow,
                rt(
                  Object.assign({}, l, {
                    offsets: e.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: d,
                  }),
                ),
              )),
            (e.attributes.popper = Object.assign({}, e.attributes.popper, {
              "data-popper-placement": e.placement,
            }));
        },
        data: {},
      },
      {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (t) {
          var e = t.state;
          Object.keys(e.elements).forEach(function (t) {
            var i = e.styles[t] || {},
              n = e.attributes[t] || {},
              o = e.elements[t];
            f(o) &&
              k(o) &&
              (Object.assign(o.style, i),
              Object.keys(n).forEach(function (t) {
                var e = n[t];
                !1 === e
                  ? o.removeAttribute(t)
                  : o.setAttribute(t, !0 === e ? "" : e);
              }));
          });
        },
        effect: function (t) {
          var e = t.state,
            i = {
              popper: {
                position: e.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(e.elements.popper.style, i.popper),
            (e.styles = i),
            e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
            function () {
              Object.keys(e.elements).forEach(function (t) {
                var n = e.elements[t],
                  o = e.attributes[t] || {},
                  s = Object.keys(
                    e.styles.hasOwnProperty(t) ? e.styles[t] : i[t],
                  ).reduce(function (t, e) {
                    return (t[e] = ""), t;
                  }, {});
                f(n) &&
                  k(n) &&
                  (Object.assign(n.style, s),
                  Object.keys(o).forEach(function (t) {
                    n.removeAttribute(t);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      },
    ],
  });
  function dt(t, e) {
    var i = e.getRootNode && e.getRootNode();
    if (t.contains(e)) return !0;
    if (i && g(i)) {
      var n = e;
      do {
        if (n && t.isSameNode(n)) return !0;
        n = n.parentNode || n.host;
      } while (n);
    }
    return !1;
  }
  function lt(t, e, i) {
    return b(t, y(e, i));
  }
  function ht(t) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
  }
  function ct(t, e) {
    return e.reduce(function (e, i) {
      return (e[i] = t), e;
    }, {});
  }
  const pt = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function (t) {
        var e,
          i = t.state,
          n = t.name,
          o = t.options,
          s = i.elements.arrow,
          r = i.modifiersData.popperOffsets,
          a = et(i.placement),
          d = nt(a),
          l = [$, j].indexOf(a) >= 0 ? "height" : "width";
        if (s && r) {
          var h = (function (t, e) {
              return ht(
                "number" !=
                  typeof (t =
                    "function" == typeof t
                      ? t(
                          Object.assign({}, e.rects, {
                            placement: e.placement,
                          }),
                        )
                      : t)
                  ? t
                  : ct(t, z),
              );
            })(o.padding, i),
            c = L(s),
            p = "y" === d ? R : $,
            u = "y" === d ? H : j,
            m =
              i.rects.reference[l] +
              i.rects.reference[d] -
              r[d] -
              i.rects.popper[l],
            v = r[d] - i.rects.reference[d],
            f = N(s),
            g = f ? ("y" === d ? f.clientHeight || 0 : f.clientWidth || 0) : 0,
            b = m / 2 - v / 2,
            y = h[p],
            w = g - c[l] - h[u],
            C = g / 2 - c[l] / 2 + b,
            S = lt(y, C, w),
            A = d;
          i.modifiersData[n] = (((e = {})[A] = S), (e.centerOffset = S - C), e);
        }
      },
      effect: function (t) {
        var e = t.state,
          i = t.options.element,
          n = void 0 === i ? "[data-popper-arrow]" : i;
        null != n &&
          ("string" != typeof n || (n = e.elements.popper.querySelector(n))) &&
          dt(e.elements.popper, n) &&
          (e.elements.arrow = n);
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"],
    },
    ut = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (t) {
        var e = t.state,
          i = t.options,
          n = t.name,
          o = i.offset,
          s = void 0 === o ? [0, 0] : o,
          r = G.reduce(function (t, i) {
            return (
              (t[i] = (function (t, e, i) {
                var n = et(t),
                  o = [$, R].indexOf(n) >= 0 ? -1 : 1,
                  s =
                    "function" == typeof i
                      ? i(Object.assign({}, e, { placement: t }))
                      : i,
                  r = s[0],
                  a = s[1];
                return (
                  (r = r || 0),
                  (a = (a || 0) * o),
                  [$, j].indexOf(n) >= 0 ? { x: a, y: r } : { x: r, y: a }
                );
              })(i, e.rects, s)),
              t
            );
          }, {}),
          a = r[e.placement],
          d = a.x,
          l = a.y;
        null != e.modifiersData.popperOffsets &&
          ((e.modifiersData.popperOffsets.x += d),
          (e.modifiersData.popperOffsets.y += l)),
          (e.modifiersData[n] = r);
      },
    };
  function mt(t) {
    return Object.assign({}, t, {
      left: t.x,
      top: t.y,
      right: t.x + t.width,
      bottom: t.y + t.height,
    });
  }
  function vt(t, e, i) {
    return e === F
      ? mt(
          (function (t, e) {
            var i = m(t),
              n = I(t),
              o = i.visualViewport,
              s = n.clientWidth,
              r = n.clientHeight,
              a = 0,
              d = 0;
            if (o) {
              (s = o.width), (r = o.height);
              var l = S();
              (l || (!l && "fixed" === e)) &&
                ((a = o.offsetLeft), (d = o.offsetTop));
            }
            return { width: s, height: r, x: a + T(t), y: d };
          })(t, i),
        )
      : v(e)
        ? (function (t, e) {
            var i = A(t, !1, "fixed" === e);
            return (
              (i.top = i.top + t.clientTop),
              (i.left = i.left + t.clientLeft),
              (i.bottom = i.top + t.clientHeight),
              (i.right = i.left + t.clientWidth),
              (i.width = t.clientWidth),
              (i.height = t.clientHeight),
              (i.x = i.left),
              (i.y = i.top),
              i
            );
          })(e, i)
        : mt(
            (function (t) {
              var e,
                i = I(t),
                n = x(t),
                o = null == (e = t.ownerDocument) ? void 0 : e.body,
                s = b(
                  i.scrollWidth,
                  i.clientWidth,
                  o ? o.scrollWidth : 0,
                  o ? o.clientWidth : 0,
                ),
                r = b(
                  i.scrollHeight,
                  i.clientHeight,
                  o ? o.scrollHeight : 0,
                  o ? o.clientHeight : 0,
                ),
                a = -n.scrollLeft + T(t),
                d = -n.scrollTop;
              return (
                "rtl" === _(o || i).direction &&
                  (a += b(i.clientWidth, o ? o.clientWidth : 0) - s),
                { width: s, height: r, x: a, y: d }
              );
            })(I(t)),
          );
  }
  function ft(t, e) {
    void 0 === e && (e = {});
    var i = e,
      n = i.placement,
      o = void 0 === n ? t.placement : n,
      s = i.strategy,
      r = void 0 === s ? t.strategy : s,
      a = i.boundary,
      d = void 0 === a ? "clippingParents" : a,
      l = i.rootBoundary,
      h = void 0 === l ? F : l,
      c = i.elementContext,
      p = void 0 === c ? K : c,
      u = i.altBoundary,
      m = void 0 !== u && u,
      g = i.padding,
      w = void 0 === g ? 0 : g,
      C = ht("number" != typeof w ? w : ct(w, z)),
      S = p === K ? "reference" : K,
      x = t.rects.popper,
      T = t.elements[m ? S : p],
      M = (function (t, e, i, n) {
        var o =
            "clippingParents" === e
              ? (function (t) {
                  var e = B(P(t)),
                    i =
                      ["absolute", "fixed"].indexOf(_(t).position) >= 0 && f(t)
                        ? N(t)
                        : t;
                  return v(i)
                    ? e.filter(function (t) {
                        return v(t) && dt(t, i) && "body" !== k(t);
                      })
                    : [];
                })(t)
              : [].concat(e),
          s = [].concat(o, [i]),
          r = s[0],
          a = s.reduce(
            function (e, i) {
              var o = vt(t, i, n);
              return (
                (e.top = b(o.top, e.top)),
                (e.right = y(o.right, e.right)),
                (e.bottom = y(o.bottom, e.bottom)),
                (e.left = b(o.left, e.left)),
                e
              );
            },
            vt(t, r, n),
          );
        return (
          (a.width = a.right - a.left),
          (a.height = a.bottom - a.top),
          (a.x = a.left),
          (a.y = a.top),
          a
        );
      })(v(T) ? T : T.contextElement || I(t.elements.popper), d, h, r),
      O = A(t.elements.reference),
      L = ot({ reference: O, element: x, strategy: "absolute", placement: o }),
      E = mt(Object.assign({}, x, L)),
      U = p === K ? E : O,
      D = {
        top: M.top - U.top + C.top,
        bottom: U.bottom - M.bottom + C.bottom,
        left: M.left - U.left + C.left,
        right: U.right - M.right + C.right,
      },
      $ = t.modifiersData.offset;
    if (p === K && $) {
      var V = $[o];
      Object.keys(D).forEach(function (t) {
        var e = [j, H].indexOf(t) >= 0 ? 1 : -1,
          i = [R, H].indexOf(t) >= 0 ? "y" : "x";
        D[t] += V[i] * e;
      });
    }
    return D;
  }
  const gt = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: function (t) {
      var e = t.state,
        i = t.options,
        n = t.name,
        o = i.mainAxis,
        s = void 0 === o || o,
        r = i.altAxis,
        a = void 0 !== r && r,
        d = i.boundary,
        l = i.rootBoundary,
        h = i.altBoundary,
        c = i.padding,
        p = i.tether,
        u = void 0 === p || p,
        m = i.tetherOffset,
        v = void 0 === m ? 0 : m,
        f = ft(e, { boundary: d, rootBoundary: l, padding: c, altBoundary: h }),
        g = et(e.placement),
        w = it(e.placement),
        C = !w,
        S = nt(g),
        A = "x" === S ? "y" : "x",
        x = e.modifiersData.popperOffsets,
        k = e.rects.reference,
        I = e.rects.popper,
        T =
          "function" == typeof v
            ? v(Object.assign({}, e.rects, { placement: e.placement }))
            : v,
        _ =
          "number" == typeof T
            ? { mainAxis: T, altAxis: T }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
        M = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
        O = { x: 0, y: 0 };
      if (x) {
        if (s) {
          var P,
            E = "y" === S ? R : $,
            B = "y" === S ? H : j,
            U = "y" === S ? "height" : "width",
            D = x[S],
            V = D + f[E],
            z = D - f[B],
            q = u ? -I[U] / 2 : 0,
            F = w === W ? k[U] : I[U],
            K = w === W ? -I[U] : -k[U],
            J = e.elements.arrow,
            G = u && J ? L(J) : { width: 0, height: 0 },
            Y = e.modifiersData["arrow#persistent"]
              ? e.modifiersData["arrow#persistent"].padding
              : { top: 0, right: 0, bottom: 0, left: 0 },
            X = Y[E],
            Q = Y[B],
            Z = lt(0, k[U], G[U]),
            tt = C ? k[U] / 2 - q - Z - X - _.mainAxis : F - Z - X - _.mainAxis,
            ot = C
              ? -k[U] / 2 + q + Z + Q + _.mainAxis
              : K + Z + Q + _.mainAxis,
            st = e.elements.arrow && N(e.elements.arrow),
            rt = st ? ("y" === S ? st.clientTop || 0 : st.clientLeft || 0) : 0,
            at = null != (P = null == M ? void 0 : M[S]) ? P : 0,
            dt = D + ot - at,
            ht = lt(u ? y(V, D + tt - at - rt) : V, D, u ? b(z, dt) : z);
          (x[S] = ht), (O[S] = ht - D);
        }
        if (a) {
          var ct,
            pt = "x" === S ? R : $,
            ut = "x" === S ? H : j,
            mt = x[A],
            vt = "y" === A ? "height" : "width",
            gt = mt + f[pt],
            bt = mt - f[ut],
            yt = -1 !== [R, $].indexOf(g),
            wt = null != (ct = null == M ? void 0 : M[A]) ? ct : 0,
            Ct = yt ? gt : mt - k[vt] - I[vt] - wt + _.altAxis,
            St = yt ? mt + k[vt] + I[vt] - wt - _.altAxis : bt,
            At =
              u && yt
                ? (function (t, e, i) {
                    var n = lt(t, e, i);
                    return n > i ? i : n;
                  })(Ct, mt, St)
                : lt(u ? Ct : gt, mt, u ? St : bt);
          (x[A] = At), (O[A] = At - mt);
        }
        e.modifiersData[n] = O;
      }
    },
    requiresIfExists: ["offset"],
  };
  var bt = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function yt(t) {
    return t.replace(/left|right|bottom|top/g, function (t) {
      return bt[t];
    });
  }
  var wt = { start: "end", end: "start" };
  function Ct(t) {
    return t.replace(/start|end/g, function (t) {
      return wt[t];
    });
  }
  const St = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (t) {
      var e = t.state,
        i = t.options,
        n = t.name;
      if (!e.modifiersData[n]._skip) {
        for (
          var o = i.mainAxis,
            s = void 0 === o || o,
            r = i.altAxis,
            a = void 0 === r || r,
            d = i.fallbackPlacements,
            l = i.padding,
            h = i.boundary,
            c = i.rootBoundary,
            p = i.altBoundary,
            u = i.flipVariations,
            m = void 0 === u || u,
            v = i.allowedAutoPlacements,
            f = e.options.placement,
            g = et(f),
            b =
              d ||
              (g !== f && m
                ? (function (t) {
                    if (et(t) === V) return [];
                    var e = yt(t);
                    return [Ct(t), e, Ct(e)];
                  })(f)
                : [yt(f)]),
            y = [f].concat(b).reduce(function (t, i) {
              return t.concat(
                et(i) === V
                  ? (function (t, e) {
                      void 0 === e && (e = {});
                      var i = e,
                        n = i.placement,
                        o = i.boundary,
                        s = i.rootBoundary,
                        r = i.padding,
                        a = i.flipVariations,
                        d = i.allowedAutoPlacements,
                        l = void 0 === d ? G : d,
                        h = it(n),
                        c = h
                          ? a
                            ? J
                            : J.filter(function (t) {
                                return it(t) === h;
                              })
                          : z,
                        p = c.filter(function (t) {
                          return l.indexOf(t) >= 0;
                        });
                      0 === p.length && (p = c);
                      var u = p.reduce(function (e, i) {
                        return (
                          (e[i] = ft(t, {
                            placement: i,
                            boundary: o,
                            rootBoundary: s,
                            padding: r,
                          })[et(i)]),
                          e
                        );
                      }, {});
                      return Object.keys(u).sort(function (t, e) {
                        return u[t] - u[e];
                      });
                    })(e, {
                      placement: i,
                      boundary: h,
                      rootBoundary: c,
                      padding: l,
                      flipVariations: m,
                      allowedAutoPlacements: v,
                    })
                  : i,
              );
            }, []),
            w = e.rects.reference,
            C = e.rects.popper,
            S = new Map(),
            A = !0,
            x = y[0],
            k = 0;
          k < y.length;
          k++
        ) {
          var I = y[k],
            T = et(I),
            _ = it(I) === W,
            M = [R, H].indexOf(T) >= 0,
            O = M ? "width" : "height",
            L = ft(e, {
              placement: I,
              boundary: h,
              rootBoundary: c,
              altBoundary: p,
              padding: l,
            }),
            P = M ? (_ ? j : $) : _ ? H : R;
          w[O] > C[O] && (P = yt(P));
          var E = yt(P),
            B = [];
          if (
            (s && B.push(L[T] <= 0),
            a && B.push(L[P] <= 0, L[E] <= 0),
            B.every(function (t) {
              return t;
            }))
          ) {
            (x = I), (A = !1);
            break;
          }
          S.set(I, B);
        }
        if (A)
          for (
            var U = function (t) {
                var e = y.find(function (e) {
                  var i = S.get(e);
                  if (i)
                    return i.slice(0, t).every(function (t) {
                      return t;
                    });
                });
                if (e) return (x = e), "break";
              },
              D = m ? 3 : 1;
            D > 0 && "break" !== U(D);
            D--
          );
        e.placement !== x &&
          ((e.modifiersData[n]._skip = !0), (e.placement = x), (e.reset = !0));
      }
    },
    requiresIfExists: ["offset"],
    data: { _skip: !1 },
  };
  class At {
    constructor(t, e, i, n) {
      (this.t = t),
        (this.parent = e),
        (this.title = i),
        (this.pos = n),
        (this._confirmed = !1);
    }
    get confirmed() {
      return this._confirmed;
    }
    run(t) {
      return new Promise((e) => {
        (this.resolve = () => e(t)),
          (this.dialogBox = u
            .div("dialog", "fade-in")
            .attr({ role: "dialog" })
            .click((t, e) => e.stopPropagation())
            .keydown(
              (t, e) =>
                !e.ctrlKey &&
                !e.shiftKey &&
                !e.altKey &&
                !e.metaKey &&
                "Escape" === e.code &&
                this.dismiss(),
            )
            .animated(() => {
              var t;
              return null === (t = this.animationDone) || void 0 === t
                ? void 0
                : t.call(this);
            })
            .append(
              this.renderHeader(),
              u.div("dialog-body").append(this.renderContent()),
            )),
          (this.backdrop = u
            .div("backdrop", "fade-in")
            .click(() => this.dismiss())
            .appendTo(this.parent)),
          (this.animationDone = () => {
            (this.animationDone = void 0),
              this.dialogBox.scrollTo(),
              this.onShow();
          }),
          this.dialogBox.appendTo(this.parent),
          this.popperBind();
      });
    }
    renderContent() {
      return null;
    }
    dismiss(t) {
      (this.animationDone = () => {
        var e;
        (this.animationDone = void 0),
          this.dialogBox.remove(),
          this.backdrop.remove(),
          (this._confirmed = !!t),
          null === (e = this.resolve) || void 0 === e || e.call(this);
      }),
        this.dialogBox.noClasses("fade-in").classes("fade-out"),
        this.backdrop.noClasses("fade-in").classes("fade-out");
    }
    onShow() {}
    renderHeader() {
      return u
        .div("dialog-header")
        .inner(this.title)
        .append(
          u.toolButton(
            "times",
            this.t("actionClose"),
            () => this.dismiss(),
            "dialog-btn-close",
          ),
        );
    }
    popperBind() {
      var t, e;
      if (
        !(null ===
          (e = null === (t = this.pos) || void 0 === t ? void 0 : t.ref) ||
        void 0 === e
          ? void 0
          : e.ok)
      )
        return;
      const i = u.div("dialog-arrow");
      this.dialogBox.append(i);
      const n = pt;
      n.options = { element: i.element, padding: 8 };
      const o = ut;
      (o.options = { offset: [8, 8] }),
        at(this.pos.ref.element, this.dialogBox.element, {
          placement: this.pos.placement,
          modifiers: [gt, St, n, o],
        });
    }
  }
  class xt extends At {
    constructor(t, e, i, n) {
      super(t, e, t("dlgTitleConfirm"), i), (this.text = n);
    }
    static run(e, i, n, o) {
      return t(this, void 0, void 0, function* () {
        const t = new xt(e, i, n, o);
        return yield t.run(null), t.confirmed;
      });
    }
    renderContent() {
      return (
        (this.btnOk = u.button(
          this.t("actionOk"),
          () => this.dismiss(!0),
          "btn-danger",
        )),
        u.div().append(
          u.div("dialog-centered").inner(this.text),
          u.div("dialog-centered").append(
            u.button(this.t("actionCancel"), () => this.dismiss(), "btn-link"),
            this.btnOk,
          ),
        )
      );
    }
    onShow() {
      var t;
      null === (t = this.btnOk) || void 0 === t || t.focus();
    }
  }
  class kt {
    add(t) {
      var e;
      this._data || (this._data = {});
      const i = null !== (e = t.parentId) && void 0 !== e ? e : "";
      i in this._data ? this._data[i].push(t) : (this._data[i] = [t]);
    }
    remove(t) {
      var e;
      if (this._data) {
        delete this._data[t.id];
        const i =
            this._data[null !== (e = t.parentId) && void 0 !== e ? e : ""],
          n = i.indexOf(t);
        n >= 0 && i.splice(n, 1);
      }
    }
    getListFor(t, e) {
      var i;
      const n = null != t ? t : "";
      return (
        !e ||
          (this._data && n in this._data) ||
          (this._data || (this._data = {}), (this._data[n] = [])),
        (null === (i = this._data) || void 0 === i ? void 0 : i[n]) || []
      );
    }
    findById(t) {
      let e;
      return (
        this._data &&
          Object.values(this._data).find(
            (i) => (e = i.find((e) => e.id === t)),
          ),
        e
      );
    }
    refill(t) {
      this._data =
        null == t
          ? void 0
          : t.reduce((t, e) => {
              var i;
              const n = null !== (i = e.parentId) && void 0 !== i ? i : "";
              return n in t ? t[n].push(e) : (t[n] = [e]), t;
            }, {});
    }
    replaceComment(t, e, i) {
      const n = this.getListFor(e, !1),
        o = n.findIndex((e) => e.id === t),
        s = o >= 0 ? n[o] : void 0,
        r = Object.assign(Object.assign({}, s), i);
      return o >= 0 && (n[o] = r), r;
    }
  }
  class It extends c {
    constructor(t, e, i) {
      super(u.div().element),
        (this._comment = t),
        (this.level = i),
        (this.collapsed = !1),
        (this.isModerator = !1),
        (this._comment.card = this),
        (this.t = e.t),
        this.render(e),
        this.update();
    }
    static renderChildComments(t, e, i) {
      const n = t.parentMap.getListFor(i, !1);
      return (
        n.sort((e, i) => {
          let n =
            (!e.isDeleted && e.isSticky ? -999999999 : 0) -
            (!i.isDeleted && i.isSticky ? -999999999 : 0);
          return 0 === n && (n = a[t.commentSort](e, i)), n;
        }),
        n.map((i) => new It(i, t, e))
      );
    }
    get comment() {
      return this._comment;
    }
    set comment(t) {
      (this._comment.card = void 0),
        (this._comment = t),
        (this._comment.card = this),
        this.update();
    }
    blink() {
      var t;
      null === (t = this.eCardSelf) ||
        void 0 === t ||
        t.classes("bg-blink").animated((t) => t.noClasses("bg-blink"));
    }
    update() {
      const t = this._comment;
      t.isDeleted
        ? this.updateAsDeleted()
        : (this.updateVoteScore(t.score, t.direction),
          this.updateStatus(t.isPending, t.isApproved),
          this.updateSticky(t.isSticky),
          this.updateModerationNotice(t.isPending, t.isApproved),
          this.updateText(t.html)),
        this.updateSubtitle(t);
    }
    render(t) {
      const e = this._comment,
        i = e.id,
        n = e.userCreated ? t.commenters[e.userCreated] : void 0;
      let o = "deleted";
      n &&
        ((o = n.id === r ? "anonymous" : n.colourIndex.toString()),
        n.isModerator &&
          (this.eModeratorBadge = u.badge(
            this.t("statusModerator"),
            "badge-moderator",
          ))),
        (this.children = u
          .div(
            "card-children",
            this.level >= t.maxLevel && "card-children-unnest",
          )
          .animated((t) => t.hasClass("fade-out") && t.classes("hidden"))
          .append(...It.renderChildComments(t, this.level + 1, i))),
        (this.eCardSelf = u
          .div("card-self")
          .id(i)
          .append(
            (this.eHeader = u.div("card-header").append(
              t.onGetAvatar(n),
              u.div("name-container").append(
                (this.eNameWrap = u.div("name-wrap").append(
                  c
                    .new((null == n ? void 0 : n.websiteUrl) ? "a" : "div")
                    .inner(
                      e.authorName ||
                        (null == n ? void 0 : n.name) ||
                        `[${this.t("statusDeletedUser")}]`,
                    )
                    .classes("name")
                    .attr(
                      (null == n ? void 0 : n.websiteUrl)
                        ? {
                            href: n.websiteUrl,
                            rel: "nofollow noopener noreferrer",
                          }
                        : void 0,
                    ),
                  this.eModeratorBadge,
                )),
                u
                  .div("subtitle")
                  .append(
                    (this.eSubtitleLink = c
                      .new("a")
                      .attr({ href: `#${c.idPrefix}${i}` })),
                  ),
              ),
            )),
            (this.eBody = u.div("card-body")),
            this.commentToolbar(t),
          ));
      const s = this.children.hasChildren;
      (this.eToggler = u.div(
        s ? "card-expand-toggler" : "card-expand-spacer",
        `border-${o}`,
      )),
        s &&
          (this.eToggler
            .attr({ role: "button" })
            .click(() => this.collapse(!this.collapsed)),
          this.updateExpandToggler()),
        this.classes("card").append(
          this.eToggler,
          (this.expandBody = u
            .div("card-expand-body")
            .append(this.eCardSelf, this.children)),
        );
    }
    commentToolbar(t) {
      if (this._comment.isDeleted) return null;
      const e = u.div("toolbar");
      this.isModerator =
        !!t.principal &&
        (t.principal.isSuperuser ||
          t.principal.isOwner ||
          t.principal.isModerator);
      const i = t.principal && this._comment.userCreated === t.principal.id,
        n = u.div("toolbar-section").appendTo(e),
        o = u.div("toolbar-section").appendTo(e);
      return (
        t.enableVoting &&
          n.append(
            (this.btnUpvote = u
              .toolButton("arrowUp", this.t("actionUpvote"), () =>
                t.onVote(this, this._comment.direction > 0 ? 0 : 1),
              )
              .attr(i && { disabled: "true" })),
            (this.eScore = u
              .div("score")
              .attr({ title: this.t("commentScore") })),
            (this.btnDownvote = u
              .toolButton("arrowDown", this.t("actionDownvote"), () =>
                t.onVote(this, this._comment.direction < 0 ? 0 : -1),
              )
              .attr(i && { disabled: "true" })),
          ),
        t.canAddComments &&
          (this.btnReply = u
            .toolButton("reply", this.t("actionReply"), () => t.onReply(this))
            .appendTo(n)),
        this.isModerator &&
          this._comment.isPending &&
          ((this.btnApprove = u
            .toolButton(
              "check",
              this.t("actionApprove"),
              () => t.onModerate(this, !0),
              "text-success",
            )
            .appendTo(o)),
          (this.btnReject = u
            .toolButton(
              "times",
              this.t("actionReject"),
              () => t.onModerate(this, !1),
              "text-warning",
            )
            .appendTo(o))),
        this._comment.parentId ||
          (this.btnSticky = u
            .toolButton("star", "", () => t.onSticky(this))
            .attr({ disabled: this.isModerator ? null : "true" })
            .appendTo(o)),
        ((this.isModerator && t.modCommentEditing) ||
          (i && t.ownCommentEditing)) &&
          (this.btnEdit = u
            .toolButton("pencil", this.t("actionEdit"), () => t.onEdit(this))
            .appendTo(o)),
        ((this.isModerator && t.modCommentDeletion) ||
          (i && t.ownCommentDeletion)) &&
          (this.btnDelete = u
            .toolButton(
              "bin",
              this.t("actionDelete"),
              (e) => this.deleteComment(e, t),
              "text-danger",
            )
            .appendTo(o)),
        e
      );
    }
    deleteComment(e, i) {
      return t(this, void 0, void 0, function* () {
        (yield xt.run(
          this.t,
          i.root,
          { ref: e, placement: "bottom-end" },
          this.t("confirmCommentDeletion"),
        )) && i.onDelete(this);
      });
    }
    collapse(t) {
      var e;
      (null === (e = this.children) || void 0 === e ? void 0 : e.ok) &&
        ((this.collapsed = t),
        this.children
          .noClasses("fade-in", "fade-out", !t && "hidden")
          .classes(t && "fade-out", !t && "fade-in"),
        this.updateExpandToggler());
    }
    updateAsDeleted() {
      var t, e, i, n, o, s, r, a, d, l, h;
      null === (t = this.eCardSelf) || void 0 === t || t.classes("deleted"),
        null === (e = this.eScore) || void 0 === e || e.remove(),
        null === (i = this.btnApprove) || void 0 === i || i.remove(),
        null === (n = this.btnReject) || void 0 === n || n.remove(),
        null === (o = this.btnDelete) || void 0 === o || o.remove(),
        null === (s = this.btnDownvote) || void 0 === s || s.remove(),
        null === (r = this.btnEdit) || void 0 === r || r.remove(),
        null === (a = this.btnReply) || void 0 === a || a.remove(),
        null === (d = this.btnSticky) || void 0 === d || d.remove(),
        null === (l = this.btnUpvote) || void 0 === l || l.remove(),
        null === (h = this.eBody) ||
          void 0 === h ||
          h.inner(`(${this.t("statusDeleted")})`);
    }
    updateExpandToggler() {
      var t, e;
      (null === (t = this.children) || void 0 === t ? void 0 : t.ok) &&
        (null === (e = this.eToggler) ||
          void 0 === e ||
          e.setClasses(this.collapsed, "collapsed").attr({
            title: this.t(
              this.collapsed
                ? "actionExpandChildren"
                : "actionCollapseChildren",
            ),
          }));
    }
    updateVoteScore(t, e) {
      var i, n, o;
      null === (i = this.eScore) ||
        void 0 === i ||
        i
          .inner(t.toString() || "0")
          .setClasses(t > 0, "upvoted")
          .setClasses(t < 0, "downvoted"),
        null === (n = this.btnUpvote) ||
          void 0 === n ||
          n.setClasses(e > 0, "upvoted"),
        null === (o = this.btnDownvote) ||
          void 0 === o ||
          o.setClasses(e < 0, "downvoted");
    }
    updateStatus(t, e) {
      var i, n, o, s, r, a;
      null === (i = this.eCardSelf) ||
        void 0 === i ||
        i.setClasses(t, "pending"),
        t
          ? this.ePendingBadge ||
            null === (a = this.eNameWrap) ||
            void 0 === a ||
            a.append(
              (this.ePendingBadge = u.badge(
                this.t("statusPending"),
                "badge-pending",
              )),
            )
          : (null === (n = this.eCardSelf) ||
              void 0 === n ||
              n.setClasses(!e, "rejected"),
            null === (o = this.ePendingBadge) || void 0 === o || o.remove(),
            (this.ePendingBadge = void 0),
            null === (s = this.btnApprove) || void 0 === s || s.remove(),
            (this.btnApprove = void 0),
            null === (r = this.btnReject) || void 0 === r || r.remove(),
            (this.btnReject = void 0));
    }
    updateSticky(t) {
      var e;
      null === (e = this.btnSticky) ||
        void 0 === e ||
        e
          .attr({
            title: this.t(
              t
                ? this.isModerator
                  ? "actionUnsticky"
                  : "stickyComment"
                : "actionSticky",
            ),
          })
          .setClasses(t, "is-sticky")
          .setClasses(!this.isModerator && !t, "hidden");
    }
    updateModerationNotice(t, e) {
      var i;
      let n = "";
      t
        ? (n = this.t("commentIsPending"))
        : e || (n = this.t("commentIsRejected")),
        n
          ? (this.eModNotice ||
              (this.eModNotice = u
                .div("moderation-notice")
                .appendTo(this.eHeader)),
            this.eModNotice.inner(n))
          : (null === (i = this.eModNotice) || void 0 === i || i.remove(),
            (this.eModNotice = void 0));
    }
    updateSubtitle(t) {
      var i;
      const n = new Date().getTime(),
        o =
          null === (i = e.parseDate(t.createdTime)) || void 0 === i
            ? void 0
            : i.getTime();
      this.eSubtitleLink
        .inner("")
        .append(u.span(e.timeAgo(this.t, n, o)).attr({ title: t.createdTime }));
      const s = (i, o, s, r) => {
        var a;
        const d =
          null === (a = e.parseDate(i)) || void 0 === a ? void 0 : a.getTime();
        d &&
          t.userCreated &&
          this.eSubtitleLink.append(
            u.span(", " + this.t(o === t.userCreated ? s : r) + " "),
            u.span(e.timeAgo(this.t, n, d)).attr({ title: i }),
          );
      };
      t.isDeleted
        ? s(
            t.deletedTime,
            t.userDeleted,
            "statusDeletedByAuthor",
            "statusDeletedByModerator",
          )
        : s(
            t.editedTime,
            t.userEdited,
            "statusEditedByAuthor",
            "statusEditedByModerator",
          );
    }
    updateText(t) {
      this.eBody.html(t || "");
    }
  }
  class Tt extends c {
    constructor(t, e, i, n, o, s, r, a) {
      super(
        u.form(
          () => r(this),
          () => s(this),
        ).element,
      ),
        (this.t = t),
        (this.parent = e),
        (this.pageInfo = o),
        (this.onPreview = a),
        (this.previewing = !1),
        (this.toolbar = this.renderToolbar()),
        this.classes("comment-editor").append(
          this.toolbar,
          (this.textarea = u
            .textarea(null, !0, !0)
            .attr({ name: "comentario-comment-editor", maxlength: "4096" })
            .value(n)
            .on("input", () => this.textChanged())),
          (this.preview = u.div("comment-editor-preview", "hidden")),
          u.div("comment-editor-footer").append(
            u.button(this.t("actionCancel"), () => s(this), "btn-link"),
            (this.btnPreview = u.button(
              this.t("actionPreview"),
              () => this.togglePreview(),
              "btn-secondary",
            )),
            (this.btnSubmit = u.submit(
              this.t(i ? "actionSave" : "actionAddComment"),
              !1,
            )),
          ),
        ),
        this.parent.classes("editor-inserted").prepend(this),
        this.textChanged(),
        this.textarea.focus();
    }
    get markdown() {
      return this.textarea.val.trim();
    }
    remove() {
      return this.parent.noClasses("editor-inserted"), super.remove();
    }
    togglePreview() {
      return t(this, void 0, void 0, function* () {
        (this.previewing = !this.previewing),
          this.toolbar.setClasses(this.previewing, "disabled"),
          this.textarea.setClasses(this.previewing, "hidden"),
          this.preview.setClasses(!this.previewing, "hidden"),
          this.btnPreview.setClasses(this.previewing, "btn-active");
        let t = "";
        if (this.previewing)
          try {
            t = yield this.onPreview(this.markdown);
          } catch (e) {
            t = `${this.t("previewFailed")}: ${e.message || "(unknown error)"}`;
          }
        this.preview.html(t), this.previewing || this.textarea.focus();
      });
    }
    textChanged() {
      const t = { disabled: this.markdown ? void 0 : "disabled" };
      this.btnPreview.attr(t), this.btnSubmit.attr(t);
    }
    applyInlinePattern(t, e) {
      const i = this.textarea.element,
        n = i.selectionStart,
        o = i.selectionEnd;
      let s = i.value.substring(n, o) || e || this.t("sampleText");
      const r = s.length,
        a = t.indexOf("$");
      let d = t.indexOf("{"),
        l = t.indexOf("}");
      (s =
        t.substring(0, a) +
        s +
        t.substring(a + 1, d) +
        t.substring(d + 1, l) +
        t.substring(l + 1)),
        o <= n + 1
          ? ((d = n + a), (l = d + r))
          : ((d += n + r - 1), (l += n + r - 2)),
        i.setRangeText(s),
        i.setSelectionRange(d, l),
        this.textChanged(),
        i.focus();
    }
    applyBlockPattern(t) {
      const e = this.textarea.element,
        i = e.selectionStart;
      let n = e.value;
      const o = t.length;
      let s = i;
      for (; s > 0 && !["\r", "\n"].includes(n.charAt(s - 1)); ) s--;
      let r = e.selectionEnd;
      do {
        if (
          ((n = n.substring(0, s) + t + n.substring(s)),
          (s = n.indexOf("\n", s + o)) < 0)
        )
          break;
        s++, (r += o);
      } while (s < r);
      (e.value = n),
        e.setSelectionRange(i + o, i + o),
        this.textChanged(),
        e.focus();
    }
    renderToolbar() {
      return u.div("toolbar").append(
        u.div("toolbar-section").append(
          u.toolButton("bold", this.t("btnBold"), () =>
            this.applyInlinePattern("**$**{}"),
          ),
          u.toolButton("italic", this.t("btnItalic"), () =>
            this.applyInlinePattern("*$*{}"),
          ),
          u.toolButton("strikethrough", this.t("btnStrikethrough"), () =>
            this.applyInlinePattern("~~$~~{}"),
          ),
          this.pageInfo.markdownLinksEnabled &&
            u.toolButton("link", this.t("btnLink"), () =>
              this.applyInlinePattern(
                "[$]({https://example.com})",
                this.t("sampleText"),
              ),
            ),
          u.toolButton("quote", this.t("btnQuote"), () =>
            this.applyBlockPattern("> "),
          ),
          u.toolButton("code", this.t("btnCode"), () =>
            this.applyInlinePattern("`$`{}"),
          ),
          this.pageInfo.markdownImagesEnabled &&
            u.toolButton("image", this.t("btnImage"), () =>
              this.applyInlinePattern(
                "![]($){}",
                "https://example.com/image.png",
              ),
            ),
          this.pageInfo.markdownTablesEnabled &&
            u.toolButton("table", this.t("btnTable"), () =>
              this.applyInlinePattern(
                "\n| $ | {Heading} |\n|---------|---------|\n| Text    | Text    |\n",
                "Heading",
              ),
            ),
          u.toolButton("bulletList", this.t("btnBulletList"), () =>
            this.applyBlockPattern("* "),
          ),
          u.toolButton("numberedList", this.t("btnNumberedList"), () =>
            this.applyBlockPattern("1. "),
          ),
        ),
        u.div("toolbar-section").append(
          u
            .a(
              "",
              e.joinUrl(
                this.pageInfo.baseDocsUrl,
                this.pageInfo.defaultLangId,
                "kb/markdown/",
              ),
            )
            .classes("btn", "btn-tool")
            .attr({ title: this.t("btnMarkdownHelp") })
            .append(u.icon("help")),
        ),
      );
    }
  }
  class _t extends At {
    constructor(t, e, i, n, o) {
      super(t, e, t("dlgTitleLogIn"), i),
        (this.baseUrl = n),
        (this.pageInfo = o),
        (this._choice = s.localAuth);
    }
    get email() {
      var t;
      return (
        (null === (t = this._email) || void 0 === t ? void 0 : t.val) || ""
      );
    }
    get password() {
      var t;
      return (null === (t = this._pwd) || void 0 === t ? void 0 : t.val) || "";
    }
    get data() {
      var t, e, i;
      return {
        choice: this._choice,
        idp: this._idp,
        email: null === (t = this._email) || void 0 === t ? void 0 : t.val,
        password: null === (e = this._pwd) || void 0 === e ? void 0 : e.val,
        userName:
          null === (i = this._userName) || void 0 === i ? void 0 : i.val,
      };
    }
    static run(t, e, i, n, o) {
      const s = new _t(t, e, i, n, o);
      return s.run(s);
    }
    renderContent() {
      var t, e, i;
      const n = [];
      (this.pageInfo.authSso ||
        (null === (t = this.pageInfo.idps) || void 0 === t
          ? void 0
          : t.length)) &&
        n.push(
          u
            .div("dialog-centered")
            .inner(this.t("loginWith"))
            .append(
              u
                .div("oauth-buttons")
                .append(
                  this.pageInfo.authSso &&
                    u.button(
                      this.t("actionSso"),
                      () => this.dismissWith(s.federatedAuth, "sso"),
                      "btn-sso",
                    ),
                  ...(null !==
                    (i =
                      null === (e = this.pageInfo.idps) || void 0 === e
                        ? void 0
                        : e.map((t) =>
                            u.button(
                              t.name,
                              () => this.dismissWith(s.federatedAuth, t.id),
                              `btn-${t.id}`,
                            ),
                          )) && void 0 !== i
                    ? i
                    : []),
                ),
            ),
        ),
        this.pageInfo.authLocal &&
          ((this._email = u
            .input("email", "email", "email@example.com", "email", !0)
            .attr({ maxlength: "254" })),
          (this._pwd = u
            .input(
              "password",
              "password",
              this.t("fieldPassword"),
              "current-password",
              !0,
            )
            .attr({ maxlength: "63" })),
          n.push(
            u
              .form(
                () => this.dismiss(!0),
                () => this.dismiss(),
              )
              .id("login-form")
              .append(
                u.div("dialog-centered").inner(this.t("loginViaLocalAuth")),
                u.div("input-group").append(this._email),
                u
                  .div("input-group")
                  .append(this._pwd, u.submit(this.t("actionLogIn"), !0)),
                u
                  .div("dialog-centered")
                  .append(
                    u
                      .a(
                        this.t("forgotPasswordLink"),
                        `${this.baseUrl}/en/auth/forgotPassword`,
                      )
                      .append(u.icon("newTab").classes("ms-1")),
                  ),
              ),
          )),
        this.pageInfo.localSignupEnabled &&
          n.push(
            u
              .div("dialog-centered")
              .inner(this.t("noAccountYet"))
              .append(
                u.button(
                  this.t("actionSignUpLink"),
                  () => this.dismissWith(s.signup),
                  "btn-secondary",
                  "ms-2",
                ),
              ),
          ),
        this.pageInfo.authAnonymous &&
          n.push(
            u
              .form(
                () => this.dismissWith(s.unregistered),
                () => this.dismiss(),
              )
              .id("unregistered-form")
              .append(
                u.div("dialog-centered").inner(this.t("notWillingToSignup")),
                u
                  .div("input-group")
                  .append(
                    (this._userName = u
                      .input(
                        "userName",
                        "text",
                        this.t("fieldYourNameOptional"),
                        "name",
                        !1,
                      )
                      .attr({ maxlength: "63" })),
                    u.submit(this.t("actionCommentUnreg"), !0),
                  ),
              ),
          );
      const o = u.div();
      return n.forEach((t, e) => o.append(e > 0 && c.new("hr"), t)), o;
    }
    dismissWith(t, e) {
      (this._choice = t), (this._idp = e), this.dismiss(!0);
    }
  }
  class Mt extends At {
    constructor(t, e, i, n) {
      super(t, e, t("dlgTitleCreateAccount"), i), (this.pageInfo = n);
    }
    static run(t, e, i, n) {
      const o = new Mt(t, e, i, n);
      return o.run(o);
    }
    get data() {
      var t, e, i, n;
      return {
        email:
          (null === (t = this._email) || void 0 === t ? void 0 : t.val) || "",
        name:
          (null === (e = this._name) || void 0 === e ? void 0 : e.val) || "",
        password:
          (null === (i = this._pwd) || void 0 === i ? void 0 : i.val) || "",
        websiteUrl:
          (null === (n = this._website) || void 0 === n ? void 0 : n.val) || "",
      };
    }
    renderContent() {
      return (
        (this._email = u
          .input("email", "email", "email@example.com", "email", !0)
          .attr({ minlength: "6", maxlength: "254" })),
        (this._name = u
          .input("name", "text", this.t("fieldRealName"), "name", !0)
          .attr({ pattern: "^.{2,63}$", maxlength: "63" })),
        (this._pwd = u
          .input(
            "password",
            "password",
            this.t("fieldPassword"),
            "current-password",
            !0,
          )
          .attr({
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d\\W]).{8,63}$",
            maxlength: "63",
          })),
        (this._website = u
          .input("website", "url", this.t("fieldWebsiteOpt"), "url")
          .attr({ minlength: "8", maxlength: "2083" })),
        u
          .form(
            () => this.dismiss(!0),
            () => this.dismiss(),
          )
          .append(
            u.div("input-group").append(this._email),
            u.div("input-group").append(this._name),
            u.div("input-group").append(this._pwd),
            u.div("form-text").inner(this.t("pwdStrengthExplained")),
            u.div("input-group").append(this._website),
            u
              .div("dialog-centered")
              .append(
                u.span(this.t("signUpAgreeTo") + " "),
                u
                  .a(
                    this.t("signUpAgreeTerms"),
                    this.pageInfo.termsOfServiceUrl,
                  )
                  .append(u.icon("newTab").classes("ms-1")),
                u.span(" " + this.t("signUpAgreeAnd") + " "),
                u
                  .a(
                    this.t("signUpAgreePrivacyPolicy"),
                    this.pageInfo.privacyPolicyUrl,
                  )
                  .append(u.icon("newTab").classes("ms-1")),
                u.span("."),
              ),
            u
              .div("dialog-centered")
              .append(u.submit(this.t("actionSignUp"), !1)),
          )
      );
    }
    onShow() {
      var t;
      null === (t = this._email) || void 0 === t || t.focus();
    }
  }
  class Ot extends At {
    constructor(t, e, i, n, o) {
      super(t, e, t("dlgTitleUserSettings"), i),
        (this.principal = n),
        (this.onOpenProfile = o);
    }
    static run(t, e, i, n, o) {
      const s = new Ot(t, e, i, n, o);
      return s.run(s);
    }
    get data() {
      var t, e, i;
      return {
        notifyModerator: !!(null === (t = this._cbNotifyModerator) ||
        void 0 === t
          ? void 0
          : t.isChecked),
        notifyReplies: !!(null === (e = this._cbNotifyReplies) || void 0 === e
          ? void 0
          : e.isChecked),
        notifyCommentStatus: !!(null === (i = this._cbNotifyCommentStatus) ||
        void 0 === i
          ? void 0
          : i.isChecked),
      };
    }
    renderContent() {
      const t =
        this.principal &&
        (this.principal.isSuperuser ||
          this.principal.isOwner ||
          this.principal.isModerator);
      return u
        .form(
          () => this.dismiss(!0),
          () => this.dismiss(),
        )
        .append(
          u.div("checkbox-group").append(
            t &&
              u.div("checkbox-container").append(
                (this._cbNotifyModerator = c
                  .new("input")
                  .id("cb-notify-moderator")
                  .attr({ type: "checkbox" })
                  .checked(this.principal.notifyModerator)),
                c
                  .new("label")
                  .attr({ for: this._cbNotifyModerator.getAttr("id") })
                  .inner(this.t("fieldModNotifications")),
              ),
            u.div("checkbox-container").append(
              (this._cbNotifyReplies = c
                .new("input")
                .id("cb-notify-replies")
                .attr({ type: "checkbox" })
                .checked(this.principal.notifyReplies)),
              c
                .new("label")
                .attr({ for: this._cbNotifyReplies.getAttr("id") })
                .inner(this.t("fieldReplyNotifications")),
            ),
            u.div("checkbox-container").append(
              (this._cbNotifyCommentStatus = c
                .new("input")
                .id("cb-notify-comment-status")
                .attr({ type: "checkbox" })
                .checked(this.principal.notifyCommentStatus)),
              c
                .new("label")
                .attr({ for: this._cbNotifyCommentStatus.getAttr("id") })
                .inner(this.t("fieldComStatusNotifications")),
            ),
          ),
          u.div("dialog-centered").append(u.submit(this.t("actionSave"), !1)),
          !this.principal.isSso && c.new("hr"),
          !this.principal.isSso &&
            u
              .div("dialog-centered")
              .append(
                u
                  .button(
                    this.t("actionEditComentarioProfile"),
                    () => this.openProfile(),
                    "btn-link",
                  )
                  .append(u.icon("newTab").classes("ms-1")),
              ),
        );
    }
    openProfile() {
      this.dismiss(!1), this.onOpenProfile();
    }
  }
  class Lt extends c {
    constructor(t, e, i, n, o, s, r, a, d, l) {
      super(u.div("profile-bar", "toolbar", "py-2").element),
        (this.t = t),
        (this.baseUrl = e),
        (this.root = i),
        (this.onGetAvatar = n),
        (this.onLogin = o),
        (this.onLogout = s),
        (this.onSignup = r),
        (this.onSaveSettings = a),
        (this.onToggleLock = d),
        (this.onOpenProfile = l);
    }
    get btnLogin() {
      return this._btnLogin;
    }
    get btnSettings() {
      return this._btnSettings;
    }
    set pageInfo(t) {
      (this._pageInfo = t), this.render();
    }
    set principal(t) {
      (this._principal = t), this.render();
    }
    loginUser() {
      var e, i;
      return t(this, void 0, void 0, function* () {
        if (
          !(null === (e = this._pageInfo) || void 0 === e
            ? void 0
            : e.hasAuthMethod(!0))
        )
          return Promise.reject();
        if (!this._pageInfo.authLocal && !this._pageInfo.authAnonymous)
          switch (
            (null === (i = this._pageInfo.idps) || void 0 === i
              ? void 0
              : i.length) ||
            0
          ) {
            case 0:
              if (this._pageInfo.authSso)
                return this.onLogin({ choice: s.federatedAuth, idp: "sso" });
              break;
            case 1:
              return this.onLogin({
                choice: s.federatedAuth,
                idp: this._pageInfo.idps[0].id,
              });
          }
        const t = yield _t.run(
          this.t,
          this.root,
          { ref: this._btnLogin, placement: "bottom-end" },
          this.baseUrl,
          this._pageInfo,
        );
        if (t.confirmed) {
          const e = t.data;
          return e.choice === s.signup ? this.signupUser() : this.onLogin(e);
        }
      });
    }
    signupUser() {
      return t(this, void 0, void 0, function* () {
        const t = yield Mt.run(
          this.t,
          this.root,
          { ref: this._btnLogin, placement: "bottom-end" },
          this._pageInfo,
        );
        t.confirmed && (yield this.onSignup(t.data));
      });
    }
    editSettings() {
      return t(this, void 0, void 0, function* () {
        const t = yield Ot.run(
          this.t,
          this.root,
          { ref: this._btnSettings, placement: "bottom-end" },
          this._principal,
          this.onOpenProfile,
        );
        t.confirmed && (yield this.onSaveSettings(t.data));
      });
    }
    render() {
      var t, e, i;
      if (
        (this.html(""),
        (this._btnSettings = void 0),
        (this._btnLogin = void 0),
        this._principal)
      ) {
        const i =
            this._principal.isSuperuser ||
            this._principal.isOwner ||
            this._principal.isModerator,
          n =
            null === (t = this._pageInfo) || void 0 === t
              ? void 0
              : t.isDomainReadonly,
          o =
            null === (e = this._pageInfo) || void 0 === e
              ? void 0
              : e.isPageReadonly;
        this.append(
          u.div("toolbar-section").append(
            this.onGetAvatar(),
            c
              .new(this._principal.websiteUrl ? "a" : "div")
              .classes("name", "text-muted", "fw-bold")
              .inner(this._principal.name)
              .attr({
                href: this._principal.websiteUrl,
                rel:
                  this._principal.websiteUrl && "nofollow noopener noreferrer",
              }),
          ),
          u.div("toolbar-section").append(
            i &&
              !n &&
              u.toolButton(
                o ? "unlock" : "lock",
                this.t(o ? "btnUnlock" : "btnLock"),
                () => this.onToggleLock(),
                "btn-lg",
              ),
            (this._btnSettings = u.toolButton(
              "gear",
              this.t("btnSettings"),
              () => this.editSettings(),
              "btn-lg",
            )),
            u.toolButton(
              "exit",
              this.t("btnLogout"),
              () => this.onLogout(),
              "btn-lg",
            ),
          ),
        );
      } else
        (null === (i = this._pageInfo) || void 0 === i
          ? void 0
          : i.hasAuthMethod(!0)) &&
          this.append(
            u.div(),
            (this._btnLogin = u.button(
              this.t("actionSignIn"),
              () => this.loginUser(),
              "btn-primary",
              "fw-bold",
            )),
          );
    }
  }
  class Pt extends c {
    constructor(t, e, i, n) {
      super(u.div("sort-bar").element),
        (this.t = t),
        (this.onChange = e),
        (this.curSort = i),
        u
          .div("sort-buttons")
          .appendTo(this)
          .append(
            n &&
              (this.btnByScore = u
                .button(
                  this.t("sortVotes"),
                  () => this.setSort("sd" === this.curSort ? "sa" : "sd"),
                  "btn-sm",
                  "btn-link",
                )
                .append(u.icon("caretDown").classes("ms-1"))),
            (this.btnByTimeAsc = u.button(
              this.t("sortOldest"),
              () => this.setSort("ta"),
              "btn-sm",
              "btn-link",
            )),
            (this.btnByTimeDesc = u.button(
              this.t("sortNewest"),
              () => this.setSort("td"),
              "btn-sm",
              "btn-link",
            )),
          ),
        this.setSort(i);
    }
    setSort(t) {
      var e;
      const i = this.curSort !== t;
      (this.curSort = t),
        null === (e = this.btnByScore) ||
          void 0 === e ||
          e
            .setClasses("s" === (null == t ? void 0 : t[0]), "btn-active")
            .setClasses("sa" === t, "sort-asc"),
        this.btnByTimeAsc.setClasses("ta" === t, "btn-active"),
        this.btnByTimeDesc.setClasses("td" === t, "btn-active"),
        i && t && this.onChange(t);
    }
  }
  class Et {
    get unregisteredCommenting() {
      return this._unregisteredCommenting;
    }
    get unregisteredName() {
      return this._unregisteredName;
    }
    setUnregisteredCommenting(t, e) {
      (this._unregisteredCommenting === t && this._unregisteredName === e) ||
        ((this._unregisteredCommenting = t),
        (this._unregisteredName = t ? e : void 0),
        this.save());
    }
    get commentSort() {
      return this._commentSort;
    }
    set commentSort(t) {
      this._commentSort !== t && ((this._commentSort = t), this.save());
    }
    load() {
      const t = localStorage.getItem(Et.StorageKey);
      if (t)
        try {
          const e = JSON.parse(t);
          (this._unregisteredCommenting = e.unregisteredCommenting),
            (this._unregisteredName = e.unregisteredName),
            (this._commentSort = e.commentSort);
        } catch (t) {}
    }
    save() {
      localStorage.setItem(
        Et.StorageKey,
        JSON.stringify({
          unregisteredCommenting: this._unregisteredCommenting,
          unregisteredName: this._unregisteredName,
          commentSort: this._commentSort,
        }),
      );
    }
  }
  Et.StorageKey = "comentario_settings";
  class Bt {
    constructor(t, e, i, n) {
      (this.domainId = e),
        (this.pagePath = i),
        (this.onIncomingMessage = n),
        (this.connectDelay = 1e3);
      const o = new URL(t);
      (o.protocol = "https:" === o.protocol ? "wss:" : "ws:"),
        (this.baseUrl = o.href),
        this.connect();
    }
    connect() {
      (this.ws = new WebSocket(e.joinUrl(this.baseUrl, "ws/comments"))),
        (this.ws.onopen = () => this.handleOpen()),
        (this.ws.onclose = (t) => this.handleClose(t)),
        (this.ws.onmessage = (t) => this.handleIncoming(t.data)),
        (this.ws.onerror = (t) => this.handleError(t)),
        this.connectDelay < 256e3 && (this.connectDelay *= 2);
    }
    handleOpen() {
      var t;
      this.connectDelay = 1e3;
      const e = { domain: this.domainId, path: this.pagePath };
      null === (t = this.ws) || void 0 === t || t.send(JSON.stringify(e));
    }
    handleClose(t) {
      console.debug("WebSocketClient: websocket is closed", t),
        (this.ws = void 0),
        setTimeout(() => this.connect(), this.connectDelay);
    }
    handleIncoming(t) {
      try {
        this.onIncomingMessage(JSON.parse(t));
      } catch (t) {
        console.error("WebSocketClient: Failed to parse incoming message", t);
      }
    }
    handleError(t) {
      var e;
      console.error("WebSocketClient: websocket error", t),
        null === (e = this.ws) || void 0 === e || e.close();
    }
  }
  class Ut {
    get initialised() {
      return !!this.messages.size;
    }
    constructor(t) {
      (this.api = t),
        (this.t = (t) => this.messages.get(t) || `![${t}]`),
        (this.messages = new Map());
    }
    init(e) {
      return t(this, void 0, void 0, function* () {
        const t = yield this.api.i18nMessages(e);
        this.messages.clear(),
          t.forEach((t) => this.messages.set(t.id, t.translation));
      });
    }
  }
  class Dt extends At {
    constructor(t, e, i) {
      super(t, e, t("dlgTitlePopupBlocked"), i);
    }
    static run(e, i, n) {
      return t(this, void 0, void 0, function* () {
        const t = new Dt(e, i, n);
        return yield t.run(null), t.confirmed;
      });
    }
    renderContent() {
      return u
        .div()
        .append(
          u.div("dialog-centered").inner(this.t("popupWasBlocked")),
          u
            .div("dialog-centered")
            .append(
              (this.btnRetry = u.button(
                this.t("actionRetry"),
                () => this.dismiss(!0),
                "btn-primary",
              )),
            ),
        );
    }
    onShow() {
      var t;
      null === (t = this.btnRetry) || void 0 === t || t.focus();
    }
  }
  class Nt extends HTMLElement {
    constructor() {
      super(...arguments),
        (this.origin = "https://comentario.rmrf.online"),
        (this.cdn = "https://comentario.rmrf.online"),
        (this.apiService = new h(this.origin + "/api")),
        (this.i18n = new Ut(this.apiService)),
        (this.location = parent.Cypress ? window.location : parent.location),
        (this.localConfig = new Et()),
        (this.commenters = {}),
        (this.loadedCss = {}),
        (this.parentMap = new kt()),
        (this.ignoreApiErrors = !1),
        (this.pagePath =
          this.getAttribute("page-id") || this.location.pathname.replace("/de/", "/").replace("/fr/", "/").replace("/pt-br/", "/").replace("/es/", "/")),
        (this.cssOverride = this.getAttribute("css-override")),
        (this.noFonts = "true" === this.getAttribute("no-fonts")),
        (this.autoInit = "false" !== this.getAttribute("auto-init")),
        (this.autoNonIntSso =
          "true" === this.getAttribute("auto-non-interactive-sso")),
        (this.maxLevel = Number(this.getAttribute("max-level")) || 5),
        (this.liveUpdate = "false" !== this.getAttribute("live-update"));
    }
    connectedCallback() {
      (this.root = u.div("root").appendTo(new c(this))),
        this.autoInit && this.main();
    }
    disconnectedCallback() {
      this.root.inner("");
    }
    main() {
      var e, i;
      return t(this, void 0, void 0, function* () {
        if (
          ((this.apiService.onBeforeRequest = () =>
            !this.ignoreApiErrors && this.setMessage()),
          (this.apiService.onError = () => this.handleInitApiError()),
          yield this.initI18n(),
          this.localConfig.load(),
          "false" !== this.cssOverride)
        )
          try {
            yield this.cssLoad(`${this.cdn}/comentario.css`),
              this.cssOverride && (yield this.cssLoad(this.cssOverride));
          } catch (t) {
            console.error(t);
          }
        this.root
          .inner("")
          .classes(!this.noFonts && "root-font")
          .append(
            (this.profileBar = new Lt(
              this.i18n.t,
              this.origin,
              this.root,
              () => this.createAvatarElement(this.principal),
              (t) => this.login(t),
              () => this.logout(),
              (t) => this.signup(t),
              (t) => this.saveUserSettings(t),
              () => this.pageReadonlyToggle(),
              () => this.openComentarioProfile(),
            )),
            (this.mainArea = u.div("main-area")),
            u
              .div("footer")
              .append(u.a(this.i18n.t("poweredBy"), "https://comentario.app/")),
          ),
          (this.apiService.onError = (t) =>
            !this.ignoreApiErrors && this.handleApiError(t)),
          (this.contentPlaceholderTimer = setTimeout(
            () => this.addContentPlaceholder(),
            500,
          ));
        try {
          yield this.updateAuthStatus(), yield this.reload();
        } finally {
          this.stopContentPlaceholderTimer();
        }
        this.scrollToCommentHash(),
          (null === (e = this.pageInfo) || void 0 === e
            ? void 0
            : e.liveUpdateEnabled) &&
            this.liveUpdate &&
            new Bt(this.origin, this.pageInfo.domainId, this.pagePath, (t) =>
              this.handleLiveUpdate(t),
            ),
          console.info(
            `Initialised Comentario ${
              (null === (i = this.pageInfo) || void 0 === i
                ? void 0
                : i.version) || "(?)"
            }`,
          ),
          this.autoNonIntSso && (yield this.nonInteractiveSsoLogin());
      });
    }
    reject(t) {
      return Promise.reject(`Comentario: ${t}`);
    }
    cssLoad(t) {
      return this.loadedCss[t] ||
        this.ownerDocument.querySelector(`link[href="${t}"]`)
        ? Promise.resolve()
        : new Promise((e, i) => {
            (this.loadedCss[t] = !0),
              c
                .new("link")
                .attr({ href: t, rel: "stylesheet", type: "text/css" })
                .on("load", () => e())
                .on("error", (t, e) => i(e))
                .appendTo(new c(this.ownerDocument.head));
          });
    }
    nonInteractiveSsoLogin(e) {
      return t(this, void 0, void 0, function* () {
        if (!this.pageInfo)
          return this.reject("Initialisation hasn't finished yet.");
        if (!this.pageInfo.hasNonInteractiveSso)
          return this.reject("Non-interactive SSO is not enabled.");
        if (this.principal) {
          if (!(null == e ? void 0 : e.force)) return;
          yield this.logout();
        }
        yield this.oAuthLogin("sso");
      });
    }
    reload() {
      return t(this, void 0, void 0, function* () {
        yield this.loadPageData(), this.setupMainArea(), this.renderComments();
      });
    }
    initI18n() {
      return t(this, void 0, void 0, function* () {
        const t =
          this.getAttribute("lang") || this.ownerDocument.documentElement.lang;
        return this.i18n.init(t);
      });
    }
    scrollToCommentHash() {
      const t = this.location.hash;
      (null == t ? void 0 : t.startsWith("#comentario-"))
        ? this.scrollToComment(t.substring(12))
        : (null == t ? void 0 : t.startsWith("#comentario")) &&
          this.root.scrollTo();
    }
    scrollToComment(t) {
      c.byId(t)
        .classes("bg-highlight")
        .animated((t) => t.noClasses("bg-highlight"))
        .scrollTo()
        .else(
          () =>
            e.isUuid(t) &&
            this.setMessage(new l(this.i18n.t("commentNotFound"))),
        );
    }
    renderComments() {
      this.commentsArea
        .html("")
        .append(
          ...It.renderChildComments(this.makeCommentRenderingContext(), 1),
        ),
        this.updateSortBar();
    }
    applySort(t) {
      (this.localConfig.commentSort = t), this.renderComments();
    }
    updateSortBar() {
      var t, e;
      null === (t = this.sortBar) ||
        void 0 === t ||
        t.setClasses(
          !(null === (e = this.commentsArea) || void 0 === e
            ? void 0
            : e.hasChildren),
          "hidden",
        );
    }
    setMessage(t) {
      var e;
      if (
        (null === (e = this.messagePanel) || void 0 === e || e.remove(),
        (this.messagePanel = void 0),
        !t)
      )
        return;
      const i = "error" === t.severity;
      if (
        (this.root.prepend(
          (this.messagePanel = u
            .div("message-box")
            .classes(i && "error")
            .append(
              u
                .div("message-box-body")
                .inner(
                  i && this.i18n.initialised
                    ? `${this.i18n.t("error")}: ${t.text}.`
                    : t.text,
                ),
            )),
        ),
        t.details)
      ) {
        const e = c
          .new("code")
          .classes("fade-in", "hidden")
          .append(c.new("pre").inner(t.details));
        let i = !0;
        this.messagePanel.append(
          u.div().append(
            u.button(
              this.i18n.t("technicalDetails"),
              (t) => {
                e.setClasses((i = !i), "hidden"),
                  t.setClasses(!i, "btn-active");
              },
              "btn-link",
              "btn-sm",
            ),
          ),
          e,
        );
      }
      this.messagePanel.scrollTo();
    }
    updateAuthStatus() {
      return t(this, void 0, void 0, function* () {
        (this.principal = yield this.apiService.getPrincipal()),
          this.principal && this.localConfig.setUnregisteredCommenting(!1),
          (this.profileBar.principal = this.principal);
      });
    }
    setupMainArea() {
      var t, e, i;
      this.stopContentPlaceholderTimer(),
        this.mainArea.html(""),
        (this.commentsArea = void 0),
        (null === (t = this.pageInfo) || void 0 === t ? void 0 : t.isReadonly)
          ? this.mainArea.append(
              u
                .div("page-moderation-notice")
                .inner(this.i18n.t("pageIsReadonly")),
            )
          : (
                null === (e = this.pageInfo) || void 0 === e
                  ? void 0
                  : e.hasAuthMethod(!1)
              )
            ? this.mainArea.append(
                (this.addCommentHost = u
                  .div("add-comment-host")
                  .attr({ tabindex: "0" })
                  .on(
                    "focus",
                    (t) =>
                      !t.hasClass("editor-inserted") && this.addComment(void 0),
                  )
                  .append(
                    u
                      .div("add-comment-placeholder")
                      .inner(this.i18n.t("addCommentPlaceholder")),
                  )),
              )
            : this.mainArea.append(
                u
                  .div("page-moderation-notice")
                  .inner(this.i18n.t("domainAuthUnconfigured")),
              ),
        this.mainArea.append(
          (this.sortBar = new Pt(
            this.i18n.t,
            (t) => this.applySort(t),
            this.localConfig.commentSort,
            !!(null === (i = this.pageInfo) || void 0 === i
              ? void 0
              : i.enableCommentVoting),
          )),
          (this.commentsArea = u.div("comments").appendTo(this.mainArea)),
        );
    }
    addComment(e) {
      this.cancelCommentEdits(),
        (this.editor = new Tt(
          this.i18n.t,
          (null == e ? void 0 : e.children) || this.addCommentHost,
          !1,
          "",
          this.pageInfo,
          () => this.cancelCommentEdits(),
          (i) =>
            t(this, void 0, void 0, function* () {
              return yield this.submitNewComment(e, i.markdown);
            }),
          (t) => this.apiService.commentPreview(this.pageInfo.domainId, t),
        ));
    }
    editComment(e) {
      this.cancelCommentEdits(),
        (this.editor = new Tt(
          this.i18n.t,
          e.expandBody,
          !0,
          e.comment.markdown,
          this.pageInfo,
          () => this.cancelCommentEdits(),
          (i) =>
            t(this, void 0, void 0, function* () {
              return yield this.submitCommentEdits(e, i.markdown);
            }),
          (t) => this.apiService.commentPreview(this.pageInfo.domainId, t),
        ));
    }
    submitNewComment(e, i) {
      return t(this, void 0, void 0, function* () {
        if (
          (this.principal ||
            this.localConfig.unregisteredCommenting ||
            (yield this.profileBar.loginUser()),
          this.principal || this.localConfig.unregisteredCommenting)
        ) {
          const t = yield this.apiService.commentNew(
            this.location.host,
            this.pagePath,
            !this.principal,
            this.localConfig.unregisteredName,
            null == e ? void 0 : e.comment.id,
            i,
          );
          (this.lastCommentId = t.comment.id),
            this.parentMap.add(t.comment),
            (this.commenters[t.commenter.id] = t.commenter),
            this.cancelCommentEdits(),
            this.renderComments(),
            this.scrollToComment(t.comment.id);
        }
      });
    }
    submitCommentEdits(e, i) {
      return t(this, void 0, void 0, function* () {
        const t = e.comment;
        this.lastCommentId = t.id;
        const n = yield this.apiService.commentUpdate(t.id, i);
        (e.comment = this.parentMap.replaceComment(
          t.id,
          t.parentId,
          Object.assign(Object.assign({}, n.comment), {
            direction: t.direction,
          }),
        )),
          this.cancelCommentEdits();
      });
    }
    cancelCommentEdits() {
      var t;
      null === (t = this.editor) || void 0 === t || t.remove();
    }
    signup(e) {
      return t(this, void 0, void 0, function* () {
        (yield this.apiService.authSignup(
          this.pageInfo.domainId,
          e.email,
          e.name,
          e.password,
          e.websiteUrl,
          this.location.href,
        ))
          ? yield this.authenticateLocally(e.email, e.password)
          : this.setMessage(new d(this.i18n.t("accountCreatedConfirmEmail")));
      });
    }
    login(e) {
      return t(this, void 0, void 0, function* () {
        switch (e.choice) {
          case s.localAuth:
            return this.authenticateLocally(e.email, e.password);
          case s.federatedAuth:
            return this.oAuthLogin(e.idp);
          case s.unregistered:
            this.localConfig.setUnregisteredCommenting(!0, e.userName);
        }
      });
    }
    authenticateLocally(e, i) {
      return t(this, void 0, void 0, function* () {
        yield this.apiService.authLogin(e, i, this.location.host),
          yield this.updateAuthStatus(),
          this.principal && (yield this.reload());
      });
    }
    oAuthLogin(e) {
      var i;
      return t(this, void 0, void 0, function* () {
        const t = yield this.apiService.authNewLoginToken(!0),
          n = this.apiService.getOAuthInitUrl(e, this.location.host, t);
        "sso" === e &&
        (null === (i = this.pageInfo) || void 0 === i
          ? void 0
          : i.hasNonInteractiveSso)
          ? yield this.loginSsoNonInteractive(n)
          : yield this.loginOAuthPopup(n),
          yield this.apiService.authLoginToken(t, this.location.host),
          yield this.updateAuthStatus(),
          this.principal && (yield this.reload());
      });
    }
    loginSsoNonInteractive(e) {
      return t(this, void 0, void 0, function* () {
        const t = new Promise((t, e) =>
            window.addEventListener(
              "message",
              (i) => {
                var n;
                i.origin === this.origin &&
                  "auth.sso.result" ===
                    (null === (n = i.data) || void 0 === n ? void 0 : n.type) &&
                  (i.data.success ? t(i.data) : e(i.data.error));
              },
              { once: !0 },
            ),
          ),
          i = new Promise((t, e) =>
            setTimeout(() => e("SSO login timed out"), 3e4),
          ),
          n = c
            .new("iframe")
            .attr({ src: e, style: "display: none" })
            .appendTo(this.root);
        try {
          yield Promise.race([t, i]);
        } catch (t) {
          throw (
            (this.setMessage(
              l.of(t || this.i18n.t("ssoAuthFailed"), this.i18n.t),
            ),
            t)
          );
        } finally {
          n.remove();
        }
      });
    }
    loginOAuthPopup(e) {
      return t(this, void 0, void 0, function* () {
        const t = window.open(e, "_blank", "popup,width=800,height=600");
        if (!t)
          return (yield Dt.run(this.i18n.t, this.root, {
            ref: this.profileBar.btnLogin,
            placement: "bottom-end",
          }))
            ? this.loginOAuthPopup(e)
            : this.reject("Failed to open OAuth popup");
        yield new Promise((e) => {
          const i = setInterval(() => {
            t.closed && (clearInterval(i), e());
          }, 500);
        });
      });
    }
    logout() {
      return t(this, void 0, void 0, function* () {
        return (
          yield this.apiService.authLogout(),
          yield this.updateAuthStatus(),
          this.reload()
        );
      });
    }
    loadPageData() {
      var e;
      return t(this, void 0, void 0, function* () {
        let t;
        try {
          (t = yield this.apiService.commentList(
            this.location.host,
            this.pagePath,
          )),
            (this.pageInfo = new o(t.pageInfo)),
            this.localConfig.commentSort ||
              (this.localConfig.commentSort = this.pageInfo.defaultSort),
            (this.profileBar.pageInfo = this.pageInfo);
        } catch (t) {
          throw ((this.profileBar.pageInfo = void 0), t);
        }
        this.parentMap.refill(t.comments),
          null === (e = t.commenters) ||
            void 0 === e ||
            e.forEach((t) => (this.commenters[t.id] = t));
      });
    }
    pageReadonlyToggle() {
      return t(this, void 0, void 0, function* () {
        return (
          yield this.apiService.pageUpdate(
            this.pageInfo.pageId,
            !this.pageInfo.isPageReadonly,
          ),
          this.reload()
        );
      });
    }
    moderateComment(e, i) {
      return t(this, void 0, void 0, function* () {
        const t = e.comment;
        (this.lastCommentId = t.id),
          yield this.apiService.commentModerate(t.id, i),
          (e.comment = this.parentMap.replaceComment(t.id, t.parentId, {
            isPending: !1,
            isApproved: i,
          }));
      });
    }
    deleteComment(e) {
      var i;
      return t(this, void 0, void 0, function* () {
        const t = e.comment;
        (this.lastCommentId = t.id),
          yield this.apiService.commentDelete(t.id),
          this.pageInfo.showDeletedComments
            ? (e.comment = this.parentMap.replaceComment(t.id, t.parentId, {
                isDeleted: !0,
                markdown: "",
                html: "",
                deletedTime: new Date().toISOString(),
                userDeleted:
                  null === (i = this.principal) || void 0 === i ? void 0 : i.id,
              }))
            : (this.parentMap.remove(t), e.remove(), this.updateSortBar());
      });
    }
    stickyComment(e) {
      return t(this, void 0, void 0, function* () {
        const t = e.comment;
        this.lastCommentId = t.id;
        const i = !t.isSticky;
        yield this.apiService.commentSticky(t.id, i),
          this.parentMap.replaceComment(t.id, t.parentId, { isSticky: i }),
          this.renderComments(),
          i && this.scrollToComment(t.id);
      });
    }
    voteComment(e, i) {
      return t(this, void 0, void 0, function* () {
        let t = !1;
        if (!this.principal) {
          if ((yield this.profileBar.loginUser(), !this.principal)) return;
          t = !0;
        }
        const n = e.comment;
        this.lastCommentId = n.id;
        const o = yield this.apiService.commentVote(n.id, i);
        t
          ? yield this.reload()
          : (e.comment = this.parentMap.replaceComment(n.id, n.parentId, {
              score: o.score,
              direction: i,
            }));
      });
    }
    makeCommentRenderingContext() {
      var t, e, i, n, o, s;
      return {
        root: this.root,
        parentMap: this.parentMap,
        commenters: this.commenters,
        principal: this.principal,
        commentSort: this.localConfig.commentSort || "ta",
        canAddComments:
          !(null === (t = this.pageInfo) || void 0 === t
            ? void 0
            : t.isReadonly) && this.pageInfo.hasAuthMethod(!1),
        ownCommentDeletion: !!(null === (e = this.pageInfo) || void 0 === e
          ? void 0
          : e.commentDeletionAuthor),
        modCommentDeletion: !!(null === (i = this.pageInfo) || void 0 === i
          ? void 0
          : i.commentDeletionModerator),
        ownCommentEditing: !!(null === (n = this.pageInfo) || void 0 === n
          ? void 0
          : n.commentEditingAuthor),
        modCommentEditing: !!(null === (o = this.pageInfo) || void 0 === o
          ? void 0
          : o.commentEditingModerator),
        maxLevel: this.maxLevel,
        enableVoting: !!(null === (s = this.pageInfo) || void 0 === s
          ? void 0
          : s.enableCommentVoting),
        t: this.i18n.t,
        onGetAvatar: (t) => this.createAvatarElement(t),
        onModerate: (t, e) => this.moderateComment(t, e),
        onDelete: (t) => this.deleteComment(t),
        onEdit: (t) => this.editComment(t),
        onReply: (t) => this.addComment(t),
        onSticky: (t) => this.stickyComment(t),
        onVote: (t, e) => this.voteComment(t, e),
      };
    }
    saveUserSettings(e) {
      return t(this, void 0, void 0, function* () {
        yield this.apiService.authUserSettingsUpdate(
          this.pageInfo.domainId,
          e.notifyReplies,
          e.notifyModerator,
          e.notifyCommentStatus,
        ),
          yield this.updateAuthStatus();
      });
    }
    createAvatarElement(t) {
      switch (!0) {
        case !t:
          return u.div("avatar", "bg-deleted");
        case t.id === r:
          return u.div("avatar", "bg-anonymous");
        case t.hasAvatar:
          return c
            .new("img")
            .classes("avatar-img")
            .attr({
              src: this.apiService.getAvatarUrl(t.id, "M"),
              loading: "lazy",
              alt: "",
            });
        default:
          return u
            .div("avatar", `bg-${t.colourIndex}`)
            .html(t.name[0].toUpperCase());
      }
    }
    handleLiveUpdate(e) {
      var i, n, o, s;
      return t(this, void 0, void 0, function* () {
        if (
          e.domain !==
            (null === (i = this.pageInfo) || void 0 === i
              ? void 0
              : i.domainId) ||
          e.path !== this.pagePath ||
          !e.comment
        )
          return;
        if (this.lastCommentId === e.comment)
          return void (this.lastCommentId = void 0);
        if ("delete" === e.action) {
          const t = this.parentMap.replaceComment(e.comment, e.parentComment, {
            isDeleted: !0,
            markdown: "",
            html: "",
            deletedTime: new Date().toISOString(),
          });
          return void (t.card && (t.card.comment = t));
        }
        let t, r;
        this.ignoreApiErrors = !0;
        try {
          const i = yield this.apiService.commentGet(e.comment);
          (t = i.comment), (r = i.commenter);
        } catch (t) {
          return;
        } finally {
          this.ignoreApiErrors = !1;
        }
        r && (this.commenters[r.id] = r);
        const a = this.parentMap.getListFor(t.parentId, !0),
          d = a.findIndex((e) => e.id === t.id);
        let l;
        if (d >= 0) (l = a[d].card), (a[d] = t), l && (l.comment = t);
        else {
          let e;
          if (
            (a.push(t),
            t.parentId &&
              !(e =
                null === (n = this.parentMap.findById(t.parentId)) ||
                void 0 === n
                  ? void 0
                  : n.card))
          )
            return;
          l = new It(
            t,
            this.makeCommentRenderingContext(),
            (null !== (o = null == e ? void 0 : e.level) && void 0 !== o
              ? o
              : 0) + 1,
          ).appendTo(
            null !== (s = null == e ? void 0 : e.children) && void 0 !== s
              ? s
              : this.commentsArea,
          );
        }
        this.updateSortBar(), "vote" !== e.action && (null == l || l.blink());
      });
    }
    handleInitApiError() {
      this.root.append(
        u
          .div()
          .style("color: red; font-weight: bold; font-size: 1.5em;")
          .inner("Oh no, Comentario failed to start."),
        u
          .div()
          .inner(
            "If you own this website, you might want to look at the browser console to find out why.",
          ),
      );
    }
    handleApiError(t) {
      this.setMessage(l.of(t, this.i18n.initialised ? this.i18n.t : void 0));
    }
    addContentPlaceholder() {
      const t = () => u.div("ph-bg", "ph-card-text"),
        e = () =>
          u
            .div("ph-comment-card")
            .append(u.div("ph-bg", "ph-card-header"), t(), t(), t());
      u.div("main-area-placeholder")
        .append(
          u.div("ph-profile-bar").append(u.div("ph-bg", "ph-button")),
          u.div("ph-bg", "ph-add-comment-host"),
          e(),
          e(),
          e(),
        )
        .appendTo(this.mainArea);
    }
    stopContentPlaceholderTimer() {
      this.contentPlaceholderTimer &&
        (clearTimeout(this.contentPlaceholderTimer),
        (this.contentPlaceholderTimer = void 0));
    }
    openComentarioProfile() {
      return t(this, void 0, void 0, function* () {
        const t = yield this.apiService.authNewLoginToken(!1);
        for (
          ;
          !window.open(
            `${this.origin}?authToken=${encodeURIComponent(
              t,
            )}&path=${encodeURIComponent("/manage/account/profile")}`,
            "_blank",
          );

        )
          if (
            !(yield Dt.run(this.i18n.t, this.root, {
              ref: this.profileBar.btnSettings,
              placement: "bottom-end",
            }))
          )
            return this.reject("Failed to open Admin UI popup");
      });
    }
  }
  customElements.define("comentario-comments", Nt);
})();
