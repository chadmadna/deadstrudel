// @title Content Moderation Trauma
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(120 / 4)

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

const cutoffFunc = x => x.mul(0).add(50).pow(x.div(100)).sub(1).mul(19980).div(49).add(20)

_$NOISWEEP: note("c2").s("deadfx_noise:2").pan(.35).loopAt(8).chop(64).seg(27)
  .bpf(saw.range(0, 90).slow(4).apply(cutoffFunc)).delay(.7)
  .gain(.8)

_$TAPE:
  s("deafpunk-mid").loopAt(4).chop(64).seg(16)
  .bank("deadtape")
  .gain(1)

_$GLASSBEAM:
  s("onebeam").loopAt(2).chop(32).seg(16).cat(s("whirl").loopAt(2).chop(32).seg(16))
  .bank("deadglass")
  .gain(1)

_$BASS:
  note("e1 fs1 fs1 e1 fs1@2 e1 fs1@2 e1 fs1@2 e1 g1 as1 cs2").slow(2)
    .s("brbass").gain(.7).att(0).rel(0.2)

_$WOW: note("fs1").slow(4).s("tri").diode(2).vib(4).vmod(12).chop(16)
  .dec(3).sus(.8).hpf(50).hpq(10)
  .gain(.8)

_$PADS:
  note("[fs3] [fs3,g3]").slow(8)
  // note("fs1,[a2,c3,fs3]").slow(4)
  // note("[fs3,[c4@3 cs4 bb3@4]] [fs3,[fs4@3 g4 e4@4]]").slow(8)
    .s("deadpad").chop(8).att(0.5).rel(1).cubic("4:.1")
    .hpf(500)
    .gain(.3)

$DRUMS:
  stack(
    s("boom -!7".slow(8)).chebyshev(".2").vel(1.5),
    // s("boom").chebyshev(".3").vel(1.5).striate(128).slow(2).rib(0, 1),
    s("bd [sd@1 sd@20]").vel(1.4).room(.6),
    stack(
      // s("[cr,hit] -!7".slow(8)).chop(64).dec(1/64).sus(.5),
      // s("- oh - oh").vel(.7),
    ).delays(3/16).delay(.8).delayfb(.8)
  ).bank("deadrums").gain(1.3)

_$TOPS:
  stack(
    s("bd hh*2 bd hh*2 [sd hh] [hh sd] hh*2 sd").delay("0 0 [.8 0] [0 .8] 0 .8")
  ).bank("bossdr550").hpf(100).o(3).room(.6).chebyshev(".3:.5")
  .gain(.5)

all(x => x.postgain(.8))

await initHydra()

// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// Hydra Glitchy Slit Scan
// Flor de Fuego
// https://flordefuego.github.io/ 
s0.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnphMjFxdmY2c3VmenJ6M3dhNzZwbW1oNWR4djVpd3d0M3h1eGt5YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WjMnQiDQHbK6Y/giphy.mp4')
src(s0)
  .contrast(1.3)
  .layer(src(o0)
      .mask(shape(4, 2)
      .scale(0.5, 0.7)
  .scrollX(0.4))
  .scrollX(0.003))
  .modulate(o0, 0.3)
  .out(o0)
