// @title 12 Hours
// @by DEADLEADERS

samples('http://localhost:3000/strudel.json')
setcpm(120 / 4)

_$BASS:
  note("[f2!3 c3 f2!4]!2 [e2!3 c3 e2!4]!2").slow(4)
  // note("[f2!3 c3 f2!4]!2 [e2!3 c3 e2!4]!2 [a2!3 c3 a2!4]!2 [g2!3 c3 g2!4]!2").slow(8)
    .s("bass_verse").hpf(120).rel(0.2)
    .bank("02-tpk").trans(-9)
    .vel(0.6)
    .sometimesBy(.4, x => x.ply(3))
    .compressor("-10:4:1:.01:.5")
    .room(.6)
    .gain(slider(0.35, 0, 0.35, 0.05))

$PADS:
  note("[f1,a2,e3] [[e1,c2,e3] [e1,c2,d3]] [a1,e2,b2] [[g1,c3,e3] [g1,b2,f3]]").slow(8) // main
    .s("deadpad")
    .hpf(100).att(0.3).rel(0.5)
    .crush(8)
    .gain(0.3)

_$VOX:
  note(`[10@2 9 9 8@2 7 7 10 10 9 9 8@2 8 7] [8@2 7 8@3 9@2 -@6 7@2]`).slow(8)
    .s("gm_choir_aahs").scale("A:minor")
    .att(0.4).dec(0.2).sus(0.7).rel(0.5)
    .chebyshev(0.1, 1)
    .delay(0.3).room(0.5)
    // .o(2).delay(.5).delayfb(.95).delays(1/6).room(.3)
    .gain(0.5)

_$DRUMS:
stack(
  s("bd@2 bd!2 ~@2 <bd [ht lt]>@2").vel(0.9).slow(1),
  // s("hh*2 hh oh@2 hh*3@2 hh*2 hh").vel(0.4),
  // s("boom").vel(.7),
  s("- sd").vel(.8),
)
// stack(
//   s("bd@2 bd!2 ~@2 bd ~ bd*2 ~ bd@2").vel(0.9).slow(1.5),
//   s("hh*2 hh oh@2 hh*3@2 hh*2 hh").vel(0.4),
//   s("- sd"),
// )
    .bank("deadrums")
    // .scrub("{0 0 0 0*2 1 1 1 1}%8".div(16)) // fill 1
    .hpf(100)
    .gain(0.8)

$HIT:
  s("hit").bank("04-avy")
    // .slow(16) // usual
    .slow(8) // breaks section
    .delay(0.5).room(0.5).o(1)
    .gain(0.25)

_$NOISE: s("deadfx_noise").loopAt(8).chop(64).seg(8).gain(0.1)

$TIME: s("shaker_small*8").vel(perlin.range(0.5, 0.9).seg(16)).superimpose(x => x.jux(press).vel(.5)).gain(.8)
_$CLOCK: s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

_$BREAKS:
  s("eeloil")
    .bank("yaxu-clean-breaks").loopAt(2).chop(16).segment(8)
    .pickF("<pat!3 fill>", {
      pat: (x) => x
        .when("<0 1!3>".fast(4), (x) => x.rib("0 | 2".div(16), .75))
        .when("0 1!3", (x) => x.sometimesBy(0.1, (x) => x.ply(2))),
      fill: (x) => x.rib("12".div(16), 0.25).ply("1 2"),
    })
    .crush(6).room(0.3)
    // .delay(0.2).delays(0.25).delayfb(0.3)
    .gain(0.3)

all((x) => x.compressor("-10:10:.1:.1:.5")).postgain()

await initHydra()

let randVals = Array.from({ length: 128 }, Math.random)
let box = src(s2).scrollY(-.1).scale(1, height/width).scrollX(-.16)
let bg = src(s2)
  .modulate(src(s2).modulate(noise(1, 0.5), 0.01), 0.5)
  .scrollY(0.25, 0.2)
  .add(src(o0).modulate(box), .5)
  .modulateRotate(osc(randVals.map((x) => x * 0.025 - 0.125).ease('easeInOutQuart')))
  .brightness(-0.2)
  .blend(box.modulateScale(o0), .001)
  .saturate(1.5)
  .invert()
  .hue(-.05)
  .out(o0)

src(o0).add(box.scale(1).invert(), .5).out(o1)
render(o1)

s2.initImage('https://scontent.fcgk40-1.fna.fbcdn.net/v/t1.15752-9/728143260_27544331878512905_5074589341837439730_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=-1te8KqEloUQ7kNvwHbTk7D&_nc_oc=Ado3UepcfEo7cLgLYH38HCTAcWHIjqX1I619aJccoI4VhoTYeB4oYeZiq3edBk-qlAw&_nc_zt=23&_nc_ht=scontent.fcgk40-1.fna&_nc_ss=7b6a8&oh=03_Q7cD6QF4IWdgzy7tch13MzjKOmbLPmFkVj40a6zdRjcE-qtvCA&oe=6AC4F053')
