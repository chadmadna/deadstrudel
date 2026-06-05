// @title The Pack
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(130 / 4)

$BASS:
  // s("bass_verse")
  s("bass_solo").hpf(120)
    .bank("02-tpk").loopAt(8).chop(64).seg(8)
    .vel(0.7)
    .gain(slider(0, 0, 0.6, 0.05))

_$PADS:
  note("[e2,a2] [[g2,c3]@3 [a2,d3]] [g2,b2] [f#2,d3]").slow(8) // main
  // note("[e2,a2]").slow(4).seg(8) // postverse
  // note("[e2,a2]!6 [g2,c3] [a2,d3]").slow(8).seg(8) // solo
    .s("deadpad")
    .hpf(400).att(0.3).rel(0.5)
    .gain(0.35)

_$DISTGTR:
  s("distgtr_solo")
    .bank("02-tpk").loopAt(8).chop(64).seg(8)
    .vel(0.7).hpf(400)
    // .scrub(irand(8).div(8).seg(8)).sometimes(x => x.dec(.2).ply("2 | 4"))
    // .rarely(x => x.speed("-.0675")).juxBy(0.3, rev)
    .gain(0.5)

_$GTRCLAV:
  s("gtrclav_verse")
  // s("gtrclav_postverse")
  // s("gtrclav_solo")
    .bank("02-tpk").loopAt(8).chop(64).seg(8)
    // .rib("0 | 0.5 | 1.25".fast(4), .375)
    .lpf(8000).hpf(60).delay(0.3).dfb(0.7).ds(1)
    .gain(0.3)

_$VOX:
// verse
  note(`[-@2 7 7 11 10@2 11@2 10@2 11@2 10 11@2] [-@7 7 11 11 11 11@2 10@2 10] [10@2 9 9 8@2 7 7 10 10 9 9 8@2 8 7] [8@2 7 8@3 9@2 -@6 7@2]`).slow(8)
  // note(`[11@3 10@3 11@2 -@5 7 7@2] [11@2 11@2 11 11 10 10 10 9@3 -@4] [10@3 9@3 8 7 10@2 10 9@2 9 8 7] [8@2 8 7 8@2 9@2 -@6 7@2]`).slow(8)
  // note(`[11@3 10@3 11@3 10@3 11@2 10@2] [11 10@2 9@3 9 10 9 8 8@2 -@2 6@2] [10@3 9 8@4 -@4 8 9@2 7] [-@13 11 11 10]`).slow(8)
  // note(`[11@2 10 10 11 10@2 11@2 11 10 9@5] [-@4 [11 11 10]@4 11@4 -@4] [-@5 9 9 9 10@2 9 8@5] [-@4 10@2 10@2 9@2 8 8@3 -@2]`).slow(8)
// postverse
  // note(`[9@4 7@4 -@8] -@3`).slow(8)
    .scale("A:minor")
    .s("gm_choir_aahs")
    .att(0).dec(0.2).sus(0.7).rel(0.2)
    .chebyshev(0.1, 1).delay(0.3).room(0.5)
    // .o(2).delay(.5).delayfb(.95).delays(1/6).room(.3)
    .gain(0.7)

_$DRUMS:
stack(
  s("bd bd bd*4@2 - bd bd*4@2").vel(0.7),
  s("lt*2 - lt -").vel(0.6),
  s("- sd"),
)
  // s("[bd*2 -!3] -!7 [bd*2 -!3] -!3 [bd*2 -!3] - [bd*2 -!3] [bd*8]").slow(16)
    .bank("deadrums")
    // .scrub("{0 0 0 0*2 1 1 1 1}%8".div(16)) // fill 1
    .hpf(100)
    .gain(0.7)

$HIT:
  s("hit").bank("04-avy")
    .slow(16) // usual
    // .slow(8) // breaks section
    .delay(0.5).room(0.5).o(1)
    .gain(0.25)

$NOISE: s("deadfx_noise").loopAt(8).chop(64).seg(8).gain(0.1)

_$BREAKS:
  s("do")
    .bank("yaxu-clean-breaks").loopAt(2).chop(16).segment(8)
    .pickF("<pat!7 fill>", {
      pat: (x) => x
        .when("<0 1!7>".fast(4), (x) => x.rib("0 | 4".div(16), 1))
        .when("0 1!3", (x) => x.sometimesBy(0.1, (x) => x.ply(2))),
      fill: (x) => x.rib("12".div(16), 0.25).ply("1 2"),
    })
    .crush(6).room(0.3)
    .delay(0.2).delays(0.25).delayfb(0.3)
    .gain(0.3)

all((x) => x.compressor("-10:10:.1:.1:.5"))

await initHydra()

let randVals = Array.from({ length: 128 }, Math.random)

let bg = src(s2)
  .modulate(src(s2).modulate(noise(1, 0.5), 0.01), 0.5)
  .scrollY(0.25, 0.2)
  .scrollX(randVals.map((x) => x * 0.25 - 0.125).ease('easeInOutQuart'))
  .modulateScrollY(voronoi(1000, 4, 0.5), 0.01)
  .modulateScale(voronoi(20, 0.3).modulateRotate(osc(1, 0.3)), 0.1)
  .invert()
  .saturate(0.8)
  // .hue(.53)
  .brightness(-0.2)
  .out(o0)

s2.initImage('https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Triptych_of_Garden_of_Earthly_Delights_%28detail%29_-_WGA2526.jpg')
