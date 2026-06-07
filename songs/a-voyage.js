// @title A Voyage
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json?v=99')
setcpm(130 / 4)

$BASS:
  s("bass")
    .bank("04-avy").loopAt(16).chop(128).seg(8)
    .gain(slider(0, 0, 0.3, 0.05))

_$GUITAR: s("guitar")
  .bank("04-avy").loopAt(16).chop(128).seg(8)
  .gain(slider(0.3, 0, 0.3, 0.05))

_$PADS:
  note("[D1,D2] [A#1,F2] [A1,E2] [A1,C#2] [A1,D2] [F1,A#1] [A1,C3] [E2,C#3]").slow(16)
    .s("deadpad").att(0.5).rel(1)
    .gain(0.3)

_$DRUMS:
stack(
  s("bd sd").bank("deadrums").slow(2),
  s("boom").bank("deadrums").slow(2),
  s("sear").bank("deadrums").loopAt(2).chop(32).seg(32).rel(0).mask("0 1".slow(2)).vel(saw.range(0.3, 1).fast(1).seg(32)),
  note("-@7 [- [[c2 -]!2 [c2@3 -]@2 [c2 -] [c2@3 -]@2 c2]]".slow(8)).s("scan").bank("deadrums").rel(0).vel(0.9),
)
  .room(0.25).o(1)
  .gain(0.7)

_$TOMS: s("toms")
  .bank("04-avy").loopAt(2).chop(16).seg(8)
  .vel(0.49)
  .room(0.4).rsize(2).rdim(200).o(1)
  .gain(0.45)

_$TOPS: s("techytop")
  .bank("04-avy").loopAt(2).chop(32).seg(16)
  .vel(0.8)
  .mask("1 0".slow(2))
  .delay(0.5).delays(0.5).delayfb(0.5).o(1)
  .gain(0.2)

$HIT: s("hit").bank("04-avy").slow(16).delay(0.5).room(0.5).o(1).gain(0.25)

$NOISE: s("deadfx_noise:0").loopAt(8).chop(64).seg(8).gain(0.1)

_$TIME: s("shaker_small*8").vel(perlin.range(0.5, 0.9).seg(16)).superimpose(x => x.jux(press).vel(.5)).gain(.5)
$CLOCK: s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

_$BREAKS: s("riffin")
  .bank("yaxu-clean-breaks").loopAt(2).chop(16).seg(8)
  .pickF("<pat!7 <fillA fillB>>", {
    pat: (x) =>x
        .when("0 1!3", (x) => x.sometimesBy(0.7, (x) => x.rib("0 | 3".div(8), 0.75)))
        .when("0 1!7".slow(2), (x) => x
          .sometimesBy(0.1, wchoose(
              [(x) => x.ply("4 | 6"), 3],
              [(x) => x.scrub("{2!4}%16".div(16)).speed(".3 .33 .36 .39".fast(4)), 1],
          ))),
    fillA: (x) => x.scrub("{0!3 0*2 2!2 2*3 2*6}%8".div(16)),
    fillB: (x) => x.scrub(stepcat([1, "0 0"], [3, run(32).div(32).add(4).div(32)])),
  })
  .lpf(slider(122.5, 0, 140).pow(2)).lpq(3).hpf(60)
  .chebyshev(0.4, 0.01)
  .gain(0.08)

await initHydra()

let bg = src(s2)
  .modulate(src(s2), 0.2)
  .scrollX(0.5, 0.1)
  .modulate(
    osc(30, 0.05, 0)
      .modulate(noise(3, 0.01), 0.01)
      .modulate(noise(100, 0), 0.01),
    0.01,
  )
  .modulateScale(noise(1, 0.3), 0.1)
  .saturate(0.5)
  .hue(0.55)
  .out(o0)

s2.initImage(
  'https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Triptych_of_Garden_of_Earthly_Delights_%28detail%29_-_WGA2526.jpg',
)
