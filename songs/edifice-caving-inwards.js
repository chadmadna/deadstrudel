// @title Edifice Caving Inwards
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(140 / 4)

_$NOISE: note("c1,c2,c3").s("deadfx_noise:2").pan(.35)
  .loopAt(8).chop(64).seg(16)
  .sinefold(".5:1")
  .vel(perlin.range(.4, 1)) // random walk
  .gain(slider(0.05, 0, 0.12, 0.001))

$BASS:
  s("bass_main")
  // s("bass_verse")
  // s("bass_solo")
    .bank("07-edc").loopAt(8).chop(64).seg(8)
    .hpq(6).hpf(60)
    .gain(slider(0.28, 0, 0.28, 0.01))

$PADS:
  s("synth_main").vel(.8)
  // s("synth_verse").vel(.8)
  // s("synth_build").vel(1)
    .bank("07-edc").loopAt(8).chop(64).seg(16)
    .rel(0.5)
    .gain(0.2)

$DRUMS:
  stack(
    s("boom,808 sear").vel(.9).rel(0).att("0 2").slow(4),
    s("[[bd -!2 bd] [- bd]!2 -]").vel(1).hpf(70).hpq(5),
    // s("[- sd]*2").vel(1),
    s("[- sd]").vel(1),
  )
    .bank("deadrums")
    .hpf(100)
    .gain(1)

$HIT:
  s("hit").slow(16)
    .bank("04-avy")
    .delay(0.5)
    .gain(0.3)

$BREAKS: s("groove").bank("yaxu-clean-breaks").loopAt(2).chop(16).segment(8)
  .pickF("<pat>", {
  // .pickF("<pat!7 <fillA fillB>>", {
    pat: x => x
      .when("0 1!3", x => x
        // .sometimesBy(.7, x => x.rib("0 | 2 | 4".div(8), .75))
       )
      .when("0 1!7".slow(2), x => x
        // .sometimesBy(.7, x => x.rib("0 | 2 | 3 | 4".div(8), ".5 | .25 | .75"))
        // .sometimesBy(.2, wchoose(
        //   [x => x.ply("4 | 6"), 3],
        //   [x => x.scrub("{2!4}%16".div(16)).speed(".3 .33 .36 .39".fast(4)), 1]
        // ))
       ),
    fillA: x => x.scrub("{0!3 0*2 2!2 2*3 2*6}%8".div(16)),
    fillB: x => x.scrub(stepcat([1, "0 0"], [3, run(32).div(32).add(4).div(32)])),
  })
  .degradeBy(slider(0, 0, .75, .0625)) // die off
  .chebyshev(".3:.5")
  .lpf(slider(140,0, 140).pow(2)).lpq(3)
  .gain(.45)

all((x) => x.compressor("-10:10:.1:.1:.5").postgain(1.4))

await initHydra()

speed = .4

let randVals = Array.from({ length: 32 }, Math.random)

src(s0)
  .brightness(.1)
  .scrollY(0.25, 0.6)
  .scrollY(randVals.map((x) => x * 0.25 - 0.125).ease('easeInOutQuart').fast(1.3))
  .repeat(randVals.map(x => x * 3).fast(3.5), randVals.map(x => x * 4).fast(2.3))
  .kaleid(7)
  .modulate(src(s0).scale(4), 0.8)
  .out(o0)

src(o0)
  .modulatePixelate(src(o0).posterize(16), 100)
  .diff(src(o2), .2)
  .modulateScrollY(src(s1).scale(1.5), .2)
  .add(src(s1).scale(1.3).modulate(src(s1).scale(1.5), 3), 0.3)
  .scale(1, height/width)
  .out(o2)

render(o2)

s0.initImage('https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Triptych_of_Garden_of_Earthly_Delights_%28detail%29_-_WGA2526.jpg')
s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenA1anpyOWIwZnRwdXZuaHBxeXNndWJsc3JnNHY4N3ZqamxhM2txcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/geDYq73orMiMLQ1bH5/giphy.mp4')
