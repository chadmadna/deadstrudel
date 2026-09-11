// @title Mandate Defiled
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(116 / 4)

/*
▗▄▄  ▗▄▄▄▖  ▄  ▗▄▄  ▗▖   ▗▄▄▄▖  ▄  ▗▄▄  ▗▄▄▄▖▗▄▄▖  ▗▄▖ 
▐▛▀█ ▐▛▀▀▘ ▐█▌ ▐▛▀█ ▐▌   ▐▛▀▀▘ ▐█▌ ▐▛▀█ ▐▛▀▀▘▐▛▀▜▌▗▛▀▜ 
▐▌ ▐▌▐▌    ▐█▌ ▐▌ ▐▌▐▌   ▐▌    ▐█▌ ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▙   
▐▌ ▐▌▐███  █ █ ▐▌ ▐▌▐▌   ▐███  █ █ ▐▌ ▐▌▐███ ▐███  ▜█▙ 
▐▌ ▐▌▐▌    ███ ▐▌ ▐▌▐▌   ▐▌    ███ ▐▌ ▐▌▐▌   ▐▌▝█▖   ▜▌
▐▙▄█ ▐▙▄▄▖▗█ █▖▐▙▄█ ▐▙▄▄▖▐▙▄▄▖▗█ █▖▐▙▄█ ▐▙▄▄▖▐▌ ▐▌▐▄▄▟▘
▝▀▀  ▝▀▀▀▘▝▘ ▝▘▝▀▀  ▝▀▀▀▘▝▀▀▀▘▝▘ ▝▘▝▀▀  ▝▀▀▀▘▝▘ ▝▀ ▀▀▘ 
*/

$CLOCK: s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

_$NOISE: note("c2").s("deadfx_noise:0").loopAt(8).chop(64).seg(16)
  .gain(slider(0.3, 0, 0.5, 0.001))

$TAPE:
  // s("tape_intro").loopAt(8).chop(64).seg(16).rib(0, 4) // intro loop
  s("tape_intro").loopAt(8).chop(64).seg(16) // intro fill
  .bank("08-mdf")
  .gain(.5)

_$PADS:
  note("b0")
  // note("b0,[b1 g2 fs2 d2]").slow(4)
  // note("b0,<[b1 g2 bb2 fs2] [b1 g2 d2 ds2]>").slow(4)
    .s("deadpad").att(0.5).rel(1).cubic("4:.1")
    .hpf(500)
    .gain(.3)

_$GUITAR:
  // s("guitar_intro").loopAt(1).chop(8).seg(8)
  s("guitar_main").loopAt(8).chop(64).seg(8)
  // s("guitar_prech").loopAt(8).chop(64).seg(8)
  // s("guitar_chorus").loopAt(8).chop(64).seg(8)
  // s("guitar_bridge").loopAt(8).chop(64).seg(8).vel(.8)
    .bank("08-mdf").o(2)
    .diode(".5:.8").hpf(300)
    .gain(.65)

_$DRUMS:
  stack(
    s("boom -!7".slow(8)).chop(64).dec(1/64).sus(.3).chebyshev(".2").vel(1.5),
    // s("bd*8").vel(.8),
    // s("lt sd*2 sd sd sd*2 sd <[sd -]!3 [sd*4]>@2"),
    s("bd [- bd*2] [sd bd] bd").vel(.8),
    // s("[bd,ht] ht lt*2 bd*2 sd bd <[ht*2 -] <[ht*2 lt] [lt*2 bd*2]>>@2").vel(.9),
    stack(
      s("[cr,hit] -!7".slow(8)).chop(64).dec(1/64).sus(.5),
      // s("- oh - oh").vel(.7),
    ).o(2).delays(3/16).delay(.8).delayfb(.8)
  ).bank("deadrums").gain(1.2)

_$DIZZY: note("c1").slow(4).s("tri").chebyshev(.8).vib(116/60/2*3).vmod(12).dec(10).sus(.2).gain(1)

_$TOPS:
  stack(
    s("bd [- hh*2] [cp bd] <[sd*4] [lt*4] [sd*4] [ht*2 lt*2]>")
  ).bank("bossdr550").hpf(300).o(3).room(.6).chebyshev(".3:.5")
  .gain(.5)

all(x => x.postgain(1))

await initHydra()

osc(300, 12, 1)
  .mult(
    osc(40, -0.05, 1)
      .modulate(noise(3,1).modulate(osc(20, .3, 4))
  )).rotate(11).scale(1, .5, 2)
  .modulatePixelate(o0, 4000, 500).brightness(-.3).contrast(2)
  .saturate(0.3)
  .add(src(s0).saturate(0).contrast(2).invert())
  .diff(src(s1).invert()).invert()
  .contrast(.8)
  .out()

s0.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGdmcGJrYTQ4aXBvOXdoZjBtcXk2bGFiOXYxOHNuMGZja3QzdzZrNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ov9k06VQ0SU6f15rW/giphy.mp4')
s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGdmcGJrYTQ4aXBvOXdoZjBtcXk2bGFiOXYxOHNuMGZja3QzdzZrNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VhoLNmkoO92zleTLQH/giphy.mp4')
