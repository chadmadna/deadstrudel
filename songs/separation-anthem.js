// @title Separation Anthem
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(160 / 4)

/*
██▄   ▄███▄   ██   ██▄   █     ▄███▄   ██   ██▄   ▄███▄   █▄▄▄▄   ▄▄▄▄▄   
█  █  █▀   ▀  █ █  █  █  █     █▀   ▀  █ █  █  █  █▀   ▀  █  ▄▀  █     ▀▄ 
█   █ ██▄▄    █▄▄█ █   █ █     ██▄▄    █▄▄█ █   █ ██▄▄    █▀▀▌ ▄  ▀▀▀▀▄   
█  █  █▄   ▄▀ █  █ █  █  ███▄  █▄   ▄▀ █  █ █  █  █▄   ▄▀ █  █  ▀▄▄▄▄▀    
███▀  ▀███▀      █ ███▀      ▀ ▀███▀      █ ███▀  ▀███▀     █             
                █                        █                 ▀              
               ▀                        ▀                                 
*/


$NOISE: stack(
  s("deadfx_noise:0").pan(.6),
  s("deadfx_noise:1").pan(.5),
  s("deadfx_noise:2").pan(.1),
)
  .loopAt(8).chop(128).seg(32).o(2)
  .gain(slider(0.073, 0, 0.2, 0.001))

$CLOCK: s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

_$GUITAR:
  s("guitar_intro")
  // s("guitar_main")
  // s("guitar_verse1")
  // s("guitar_verse2")
  // s("guitar_chorus")
    .bank("06-spa").loopAt(16).chop(128).seg(8).vel(0.7).o(2)
    .diode(".5:.8").hpf(200)
    .gain(slider(0.4, 0, 0.4))

_$BASS:
  s("bass_intro")
  // s("bass_main")
  // s("bass_verse")
  // s("bass_chorus")
    .bank("06-spa").loopAt(16).chop(64).seg(4)
    .vel(0.7)
    .chebyshev(".2:.7").o(2)
    .gain(slider(0.45, 0, 0.45))

_$PADS:
  note("[e1,[f#1@3 a#1]]!3 [[e1,f#1]@3 -]").slow(16) // intro
  // note("e0,f#1,[[e2@3 f#2 g2@2]@3 [a#0,a#2]]").slow(4) // bridge
    .s("deadpad").o(2)
    .hpf(400).att(0.3).rel(0.5)
    .gain(0.45)

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

_$SPILL: stack(
  s("spillfill:48").vel(.8).loopAt(1).hpf(400),
)

$HIT:
  s("hit").slow(8) // verse, main
  // s("hit -@30 hit -@32").slow(8) // chorus
    .bank("04-avy")
    .delay(0.5).delays(.125).delayfb(.5).room(0.5).o(1)
    .gain(0.4)

_$BREAKS: s("riffin").loopAt(2).chop(16).segment(8)
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

all((x) => x.postgain(.9))

await initHydra()

let randVals = Array.from({ length: 128 }, Math.random)
let randVals2 = Array.from({ length: 13 }, Math.random)

let bg = src(s0)
  .brightness(.1)
  .modulate(src(s0).scale(8), 0.5)
  .scrollY(0.25, 0.2)
  // .scrollX(randVals.map((x) => x * 0.25 - 0.125).ease('easeInOutQuart'))
  .modulateScrollY(voronoi(1000, 4, 0.5), 0.01)
  .kaleid(6)
  .rotate(randVals.ease('easeInOutQuart'))
  .hue(.47)
  .saturate(0.8)
  .brightness(-0.2)
  .out(o0)

let axe = src(s0).hue(.5).brightness(.3)
  .mult(src(s1).saturate(0))
  .rotate(() => Math.sin(time))
  .mask(shape(1000, 1))
  .scale(.3)
  .pixelate(600, 600)
  .out(o1)

src(o0)
  .modulate(src(o0), .4)
  .layer(src(o1).luma(.001))
  .scale(randVals.map((x) => x * 2 + 1).ease('easeInOutQuart'), height/width)
  .out(o2)

render(o2)

s0.initImage('https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Triptych_of_Garden_of_Earthly_Delights_%28detail%29_-_WGA2526.jpg')
s1.initVideo('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZWsxZXI5azV2YmZoazU4bDhrMjcwbmVseDBocnZhNXphcGFyaDJjaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZXAy7FfBNtZDgOt4jS/giphy.mp4')
