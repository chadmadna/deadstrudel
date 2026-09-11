// @title Impossible Light
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(110 / 4)

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

_$NOISE: note("c3").s("deadfx_noise:1").pan(.35).loopAt(8).chop(64).seg(16)
  .gain(slider(0.193, 0, 0.5, 0.001))

_$WHISTLE: s("glass_whistle").loopAt(2).chop(8).seg(8).bank("09-iml").gain(.6)

$BASS:
  note("b1").trans(1)
  // note("a1 g1 b1@2").trans(1).slow(2)
  // note("[d2 a1]!3 <[b1] [d2 e2@3]>").trans(1).slow(4)
    .s("glass_brick").loopAt(2).chop(8).seg(8).bank("09-iml").gain(.8)

_$PADS:
  note("b1,b2")
  // note("a2 g2 b1@2").slow(4)
  // note("[d2 a1]!3 <[b1] [d2 e2@3]>").slow(8)
    .s("deadpad").att(0.5).rel(1).cubic("4:.1")
    .hpf(500)
    .gain(.4)

_$BRASS:
  note("a4 | b4 | fs4").vel(.7).fast(7/2) // anything else
  // note("g2 b2 fs3@6 fs2 b2 e3@6 fs2 a2 d3@14").slow(4) // chorus
    .s("deadbrass").att(0.2).rel(1).sinefold("3:.1")
    .hpf(500)
    .gain(.65)


$GUITAR:
  // s("guitar_main").loopAt(8).chop(64).seg(8)
  // s("guitar_verse").loopAt(8).chop(64).seg(8)
  // s("guitar_verse-fill").loopAt(8).chop(64).seg(8).vel(.8)
  s("guitar_chorus").loopAt(8).chop(64).seg(8)
    .bank("09-iml").o(2)
    .diode(".5:.8").hpf(300)
    .gain(.8)

$DRUMS:
  stack(
    // s("[lt lt@5] bd - bd [sd sd@5] bd - bd [ht lt@4] bd [ht lt@4] bd [sd sd@5] bd - -").slow(2),
    // s("lt bd ht bd [sd sd@5] bd [ht ht@5] bd [lt lt@5] -!2 bd <[[lt,sd]!2 -!2] [[sd sd@5] ht lt -]>@4").slow(2),
    // s("[bd,boom bd!7]").slow(2),
    s("sd*2 sd*2 sd sd sd - sd sd*2").vel("[1 .7!3] 1 1.2 [1 .7]"),
    // s("[bd,ht] ht lt*2 bd*2 sd bd <[ht*2 -] <[ht*2 lt] [lt*2 bd*2]>>@2").vel(1.1),
    stack(
      s("[cr,hit] -!7".slow(8)).chop(64).dec(1/64).sus(.5),
      // s("- oh - oh").vel(.7),
    ).o(2).delays(3/16).delay(.8).delayfb(.8)
  ).bank("deadrums").gain(1.2)

_$TOPS:
  stack(
    s("bd hh*2 bd hh*2 [sd,cp cp@6] hh*2 lt hh*2")
  ).bank("bossdr550").hpf(300).o(3).room(.6).chebyshev(".3:.5")
  .gain(.5)

all(x => x.postgain(1))

await initHydra()

src(o1)
  .modulate(src(o1).scale(1.01), () => Math.sin(time % 60))
  .layer(osc(40,0.5,2).modulate(noise(18, 0).scrollX(.4, () => Math.sin(time % 3600)).scrollY(() => Math.tan(time % 3600), .3)).saturate(0).contrast(1.3).mask(shape(4,0.3,0.001)))
  .out(o1)

src(s0)
  .modulateScale(voronoi(100, .2, 20).pixelate(32, 32, 4), .1)
  .modulate(src(o0), .1)
  .modulateRepeat(osc(100, .1, 0), 0.001)
  .saturate(3).hue(-.2)
  .modulate(src(s1).rotate(() => time % 3600).contrast(.5), .1)
  .add(osc(1, 0).rotate(11).scale(1, 1, .4), .5)
  .add(src(o1), 1.3)
  .layer(shape(4,0.3,0).luma())
  .out()

s0.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHl5Nmt0anQ5M2Y5OHl0ZTNwanpyMmtqM2txcmhicWw1dGJvaWN4ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OjtRa0lp8deuwdhA7J/giphy.mp4')
s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHl5Nmt0anQ5M2Y5OHl0ZTNwanpyMmtqM2txcmhicWw1dGJvaWN4ciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hES3mFdWoatVe/giphy.mp4')