((m, I, n, i, S, l, y, d, e, s, _, R, O, C, K) => {
    d = l.body, s = Array.from(l[i + "All"]("section")), K = $ => {
        _ = Math.min(s.length, $ || 1), R = s[_ - 1], s.map.call(R[i + "All"](m), a => a[I].remove(S)), y.hash = _, d.style.background = R[n].bg || "", d[n].slideId = R[n].id || _
    }, addEventListener("keydown", (g, o) => {
        C = g.which - 32, C && C - 2 && C - 7 && C - 8 || (O = R[i](m + `:not(.${S})`), O ? O[I].add(S) : K(_ + 1), o = 1), C - 1 && C - 5 && C - 6 || (K(_ - 1), o = 1), C + 5 || (d[I].toggle("muted"), o = 1), C - 4 || (K(1), o = 1), C - 3 || (K(1 / 0), o = 1), o && g.preventDefault()
    }), s.map((a, t) => a.id = t + 1), setInterval(e = a => {
        a = y.hash.substr(1), a != _ && K(a)
    }, 99), e(), d[I].add("loaded")
})(".incremental", "classList", "dataset", "querySelector", "revealed", document, location)