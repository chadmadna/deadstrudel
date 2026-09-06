// @title Separation Anthem
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(160 / 4)

/*
▗▄▄  ▗▄▄▄▖  ▄  ▗▄▄  ▗▖   ▗▄▄▄▖  ▄  ▗▄▄  ▗▄▄▄▖▗▄▄▖  ▗▄▖ 
▐▛▀█ ▐▛▀▀▘ ▐█▌ ▐▛▀█ ▐▌   ▐▛▀▀▘ ▐█▌ ▐▛▀█ ▐▛▀▀▘▐▛▀▜▌▗▛▀▜ 
▐▌ ▐▌▐▌    ▐█▌ ▐▌ ▐▌▐▌   ▐▌    ▐█▌ ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▙   
▐▌ ▐▌▐███  █ █ ▐▌ ▐▌▐▌   ▐███  █ █ ▐▌ ▐▌▐███ ▐███  ▜█▙ 
▐▌ ▐▌▐▌    ███ ▐▌ ▐▌▐▌   ▐▌    ███ ▐▌ ▐▌▐▌   ▐▌▝█▖   ▜▌
▐▙▄█ ▐▙▄▄▖▗█ █▖▐▙▄█ ▐▙▄▄▖▐▙▄▄▖▗█ █▖▐▙▄█ ▐▙▄▄▖▐▌ ▐▌▐▄▄▟▘
▝▀▀  ▝▀▀▀▘▝▘ ▝▘▝▀▀  ▝▀▀▀▘▝▀▀▀▘▝▘ ▝▘▝▀▀  ▝▀▀▀▘▝▘ ▝▀ ▀▀▘ 
*/


let noise = stack(
  s("deadfx_noise:0").pan(.6),
  s("deadfx_noise:1").pan(.5),
  s("deadfx_noise:2").pan(.1),
)
  .loopAt(8).chop(128).seg(32).o(2)
  .gain(slider(0.073, 0, 0.2, 0.001))

let clock = s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

let guitarIntro = 
  s("guitar_intro").vel(0.7)
    .bank("06-spa").loopAt(16).chop(128).seg(8).o(2)
    .diode(".5:.8").hpf(200)
    .gain(.4)

let guitarMain = 
  s("guitar_main").vel(0.7)
    .bank("06-spa").loopAt(16).chop(128).seg(8).o(2)
    .diode(".5:.8").hpf(200)
    .gain(.4)

let guitarVerse1 = 
  s("guitar_verse1").vel(0.7)
    .bank("06-spa").loopAt(16).chop(128).seg(8).o(2)
    .diode(".5:.8").hpf(200)
    .gain(.4)

let guitarVerse2 = 
  s("guitar_verse2").vel(0.7)
    .bank("06-spa").loopAt(16).chop(128).seg(8).o(2)
    .diode(".5:.8").hpf(200)
    .gain(.4)

let guitarChorus = 
  s("guitar_chorus").vel(0.7)
    .bank("06-spa").loopAt(16).chop(128).seg(8).o(2)
    .diode(".5:.8").hpf(200)
    .gain(.4)

let bassIntro = 
  s("bass_intro")
    .bank("06-spa").loopAt(16).chop(64).seg(4)
    .vel(0.7)
    .chebyshev(".2:.7").o(2)
    .gain(.45)

let bassMain = 
  s("bass_main")
    .bank("06-spa").loopAt(16).chop(64).seg(4)
    .vel(0.7)
    .chebyshev(".2:.7").o(2)
    .gain(.45)

let bassVerse = 
  s("bass_verse")
    .bank("06-spa").loopAt(16).chop(64).seg(4)
    .vel(0.7)
    .chebyshev(".2:.7").o(2)
    .gain(.45)

let bassChorus = 
  s("bass_chorus")
    .bank("06-spa").loopAt(16).chop(64).seg(4)
    .vel(0.7)
    .chebyshev(".2:.7").o(2)
    .gain(.45)

let padsIntro =
  note("[e1,[f#1@3 a#1]]!3 [[e1,f#1]@3 -]").slow(16)
    .s("deadpad").o(2)
    .hpf(400).att(0.3).rel(0.5)
    .gain(0.5)

let padsMain =
  note("e0,f#1,[[e2@3 f#2 g2@2]@3 [a#0,a#2]]").slow(4)
    .s("deadpad").o(2)
    .hpf(400).att(0.3).rel(0.5)
    .gain(0.5)

let padsChorus =
  note("[a1,a2,e2] [[c1,c2,g2] [d1,d2,a2]] [e1,e2,b2] [e1,e2,bb2,bb3]").slow(8)
    .s("deadpad").o(2)
    .hpf(400).att(0.3).rel(0.5)
    .gain(0.5)

let drumPats = {
  intro: stack(
    s("[bd*4]!14 [bd!3 [bd bd*2]] bd").slow(16).vel(.9).hpf(70).hpq(5),
    s("[- [-!5 ht lt ht] - [-!5 sd lt ht]]!3 [- [-!5 ht lt ht] - [sd,lt]]").slow(16).vel(.7),
    s("sear").loopAt(2).chop(32).seg(32).rel(0).mask("0!15 1".slow(16)).vel(saw.range(0.4, 1.3).seg(32)),
  ),
  main: stack(
    s("[bd [- bd]!2 -]!15 <[- bd - bd]>").slow(16).vel(1).hpf(50).hpq(6),
    s("[[- sd]*2]!15 <[[- sd]*2]>").slow(16).vel(1),
    s("[[ht -]*4]!15 <[[ht -]*2 [lt*2 ht lt ht]]>").slow(16).vel(.6).dec(.6).pan(.4),
    s("[[- ht]*4]!15 <[[- ht]*2 -]>").slow(16).vel(.4).dec(.6).pan(.6),
    s("-!15 sear").loopAt(2).rel(0.5).slow(8).vel(1),
  ),
  chorus: stack(
    s("<[[bd [- bd] -@2]!3 [bd [- bd]!2 [- bd]]] [[[- bd]!4]!3 [[- bd]!2 [bd!3 -] [- bd]]]>").slow(4).vel(1).hpf(70).hpq(5),
    s("<[[- sd]!3 [sd*2 - sd sd]] [[- sd]!8]>").slow(4).vel(1),
    s("<[[ht -]!16] ->").slow(4).vel(.6).dec(.6).pan(.4),
    s("<[[- lt]*16] [- oh!15]>").slow(4).vel(.4).dec(.6).pan(.6),
  ),
  bridge: stack(
    s("bd*4").vel(1).hpf(70).hpq(5).duck(2).duckdepth(.3).datt(.25),
    s("[- hh]*4").vel(.35),
    // s("[- sd]*2").vel(1),
    // s("[boom,bd] [- [boom,bd]@2] - [boom,bd] - [boom,bd]!3").dec(.3).vel(.9),
    // s("[hh*2@11 oh@13]*4").dec(.4).vel(.35),
  )
}

_$DRUMS:
  drumPats.intro
    .bank("deadrums")
    .gain(1.2)

let noseOut = s("spillfill:48").vel(.7).loopAt(1).hpf(400)

let heavenRingMod = stack(note("a1,a2").s("spillfill:29").vel(.5), note("c2").s("spillfill:50").vel(.7)).chop(16).gain(.6).o(2)

let hitMain =
  s("hit").slow(8) // verse, main
    .bank("04-avy")
    .delay(0.5).delays(.125).delayfb(.5).room(0.5).o(1)
    .gain(0.4)

let hitChorus =
  s("hit -@30 hit -@32").slow(8) // chorus
    .bank("04-avy")
    .delay(0.5).delays(.125).delayfb(.5).room(0.5).o(1)
    .gain(0.4)

let breaks = s("riffin").loopAt(2).chop(16).segment(8)
  .pickF("<pat!7 <fillA fillB>>", {
    pat: x => x
      .when("0 1!3", x => x
        .sometimesBy(1, x => x.rib("0 | 3".div(8), .75))
       )
      .when("0 1!7".slow(2), x => x
        .sometimesBy(.5, wchoose(
          [x => x.ply("4 | 6"), 3],
          [x => x.scrub("{2!4}%16".div(16)).speed(".3 .33 .36 .39".fast(4)), 1]
        ))
       ),
    fillA: x => x.scrub("{0!3 0*2 2!2 2*3 2*6}%8".div(16)),
    fillB: x => x.scrub(stepcat([1, "0 0"], [3, run(32).div(32).add(4).div(32)])),
  })
  .sinefold("1:.3")
  .lpf(slider(140,0, 140).pow(2)).lpq(3)
  .bank("yaxu-clean-breaks")
  .gain(.5)

_$SPARSE: s("riffin").loopAt(2).chop(16).segment(8)
  .pickF("<pat!7 fill>".slow(2), {
    pat: x => x.scrub(irand(16).div(16).seg(8).mask("[1 1 1 0] [1 0 0 0] [1 1 1 0] [0 0 0 1]".slow(4)))
      .layer(x => x.juxBy(0.2, rev)),
    fill: x => x.scrub("{0@3 ~ 4 ~!3 0@3 ~!4 4 0@3 ~ 4 ~!2 6 0 ~ 0!2 3!3 2*2}%8".div(16))
      .layer(x => x.juxBy(0.2, press)),
  })
  .rel(.2).vel(.8)
  .sinefold("1:.3").o(1)
  .lpf(slider(140,0, 140).pow(2)).lpq(3)
  .bank("yaxu-clean-breaks")
  .gain(.5)
