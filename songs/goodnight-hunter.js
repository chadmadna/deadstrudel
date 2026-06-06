// @title Goodnight, Hunter
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json?v=3')
setcpm(130 / 4)

_$BASS:
  s("bass_verse")
  // s("bass_chorus")
  // s("bass_outro")
    .bank("03-gnh").loopAt(16).chop(128).seg(8)
    .gain(slider(0.3, 0, 0.3, 0.05))

$PADS:
  note("[f1,g#1,c2,g2]").slow(2) // main
  // note("[f2,g#2,c3,g3]").slow(2) // verse
  // note("<[a#1,[a#2@3 c2]] [c#1,[c#2@3 d#2]] [f1,[c2@3 a#2]] [g#1,f2] [a#1,[a#2@3 c2]] [c#1,[c#2@3 d#2]] [f1,[c2@3 a#2]] [c2,[[a#2,c3]@7 g3@9]]>".slow(2)) // chorus
  // note("[[[f2@8],[- g#2@7],[-@2 c3@6],[-@3 g3@5]] [f2,g#2,c3,g3]!7],[- [c4@3 c#4] c4 [a#3@3 g#3]]").slow(8) // outro
    .s("deadpad").att(0.2).rel(1)
    .o(3).room(0.9).rsize(7)
    .gain(0.25)

$GUITAR:
  s("guitar_intro").loopAt(8).chop(64).seg(8)
  // s("guitar_verse").loopAt(8).chop(64).seg(8)
  // s("guitar_chorus").loopAt(16).chop(128).seg(8)
    .bank("03-gnh")
    .gain(slider(0, 0, 0.3, 0.01))

_$BELLS:
  // note(`<a#2 [- c3] c#3 [- d#3] c3 [- a#2] f2 - a#2 [- c3] c#3 [- d#3] c3 [- a#2] c3 ->`) // verse
  note(`<f2 [d#3 c3] f2 [c#3 d#3] f2 [d#3 c3] a#2 [c#3 d#3]>`) // outro
    .s("deadbell")
    .gain(0.2)

_$LEAD: note(`<f2 [d#3 c3] f2 [c#3 d#3] f2 [d#3 c3] a#2 [c#3 d#3]>`) // outro
  .s("deadbrass").lpf(10000).lpq(5).dec(2)
  .gain(0.45)

_$DRUMS: stack(
  // // verse
  s("bd bd*2 -@3 [- bd] -@2"),
  s("-@6 sd!2"),
  s("-@2 [- ht] lt [- ht] lt -@2").vel(0.8),
  s("oh!4").begin(0.1).vel(0.3),

  // // chorus
  // s("bd [bd bd*2] -@2 bd [- bd*2] -@2"),
  // s("-@6 sd@2"),
  // s("-@2 [- ht] lt [- ht] lt [- ht] lt").vel(.8),
  // s("oh!4").begin(.1).vel(.3),

  // // outro
  // s("<[bd - sd [- lt] - [ht bd] sd [ht lt]] [bd - sd ht [- ht] [- bd] sd sd] [bd - sd - [- ht] [- bd] sd [ht lt]] [[bd sd] [- bd] sd [ht lt] [- lt] bd sd ht]>")
).slow(2)
  .bank("deadrums")
  .room(0.25).o(1)
  .gain(0.7)

_$TOMS:
  s("toms")
    .bank("04-avy").loopAt(2).chop(16).seg(8).vel(0.49)
    .rib(0.5, 0.5)
    .room(0.4).rsize(2).rdim(200).o(1)
    .gain(0.45)

_$DRUMS_BRIDGE:
  s("drums_bridge")
    .bank("03-gnh").loopAt(8).chop(128).seg(16)
    .chebyshev(0.05)
    // .when("0 1!7".slow(4), x => x.rib("12 | 8".div(16).fast(4), ".375 | .5 | 1".fast(4)))
    .gain(slider(0.5, 0, 0.5, 0.05))

$HIT: s("hit").bank("04-avy").slow(16).delay(0.5).room(0.5).o(1).gain(0.25)

_$NOISE: s("deadfx_noise:0").loopAt(8).chop(64).seg(8).gain(0.1)

_$TIME: s("shaker_small*8").vel(perlin.range(0.5, 0.9).seg(16)).superimpose(x => x.jux(press).vel(.5)).gain(.5)
$CLOCK: s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

_$BREAKS: s("squib")
  .bank("yaxu-clean-breaks").loopAt(2).chop(16).seg(8)
  .pickF("<pat!7 <fillA fillB>>", {
    pat: (x) => x
      .when("0 1!3", (x) => x.sometimesBy(0.7, (x) => x.rib("0 | 3".div(8), 0.75)))
      .when("0 1!7".slow(2), (x) => x.sometimesBy(0.1, wchoose(
        [(x) => x.ply("4 | 6"), 3],
        [(x) => x.scrub("{2!4}%16".div(16)).speed(".3 .33 .36 .39".fast(4)), 1],
      ))),
    fillA: (x) => x.scrub("{0!3 0*2 2!2 2*3 2*6}%8".div(16)),
    fillB: (x) => x.scrub(stepcat([1, "0 0"], [3, run(32).div(32).add(4).div(32)])),
  })
  .lpf(slider(122.5, 0, 140).pow(2)).lpq(3).hpf(60)
  .chebyshev(0.4, 0.01).juxBy(0.7, rev)
  .gain(0.05)

all(
  x => x.compressor("-10:10:.1:.1:.5")
)

// Hydra stuff
await initHydra()

let bg = src(s0)
  .modulate(src(s2), 0.1)
  .scrollX(() => Math.sin(time) * 0.2 + 3, 0.3)
  .scrollY(() => Math.sin(Math.sin(2 * time)) * 0.1, 0.1)
  .modulateScrollX(osc(600, 0.1).modulate(noise(10, 0.01), 0.1), 0.01)
  .modulate(osc(30, 0.05, 0).modulate(noise(100, 0), 0.01), 0.01)
  .modulateScale(noise(1, 0.3), 0.1)
  .hue(0.05)
  .invert()
  .mult(
    src(s1).invert().hue(0.45).scale(1.2).modulateScale(voronoi(30, 1), 0.1),
  )
  .out(o0)

s0.initImage('https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Triptych_of_Garden_of_Earthly_Delights_%28detail%29_-_WGA2526.jpg')
s1.initImage('https://upload.wikimedia.org/wikipedia/commons/0/0e/ARCSIX_Analyzes_Arctic_Sea_Ice_Loss_%28153113_-_photo_lrg%29.jpg')
