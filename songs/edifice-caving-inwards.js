// @title Edifice Caving Inwards
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

$CLOCK: s("deadfx_clock").loopAt(4).chop(32).seg(8).vel(.5).hpf(6000).jux(x => press(x).vel(.25)).gain(.2)

$NOISE: note("c1,c2,c3").s("deadfx_noise:2").pan(.35)
  .loopAt(8).chop(64).seg(16)
  .sinefold(".5:1").o(2)
  .vel(perlin.range(.4, 1)) // random walk
  .gain(slider(0.05, 0, 0.2, 0.001))

$BASS:
  s("bass_main")
  // s("bass_verse")
  // s("bass_solo")
    .bank("07-edc").loopAt(8).chop(64).seg(8).o(2)
    .hpq(15).hpf(80)
    .gain(slider(0, 0, 0.3))

$PADS:
  // s("synth_main").vel(.8)
  s("synth_verse").vel(.8)
  // s("synth_build").vel(1)
  // s("synth_outro").vel(1)
    .bank("07-edc").loopAt(8).chop(64).seg(16)
    .rel(0.5).o(2)
    .gain(0.25)

$DRUMS:
  stack(
    s("boom,bd,808 sear").vel(.9).rel(0).att("0 2").slow(4).duck(2).duckdepth(".5 0".slow(4)).datt(.15),
    s("[[bd -!2 bd] [- bd]!2 -]").vel(1).hpf(50).hpq(6).duck(2).duckdepth(.3).datt(.15),
    // s("[- sd]*2").vel(1),
    // s("[- sd]").vel(1),
    // s("[boom,bd] [- [boom,bd]@2] - [boom,bd] - [boom,bd]!3").dec(.5).vel(1).duck(2).duckdepth(.3).datt(.15),
    // s("[bdh,boom]@2 [bdh,boom] [bdh,boom]*3@6 [bdh,boom] [bdh,boom]*3@6").slow(2).vel(.35).duck(2).duckdepth(.5).datt(.15), // lmao
    // s("[sd sd*2 sd sd] [- sd!2 -] [sd sd*2 sd sd] [- sd sd*2 -] [sd sd*2 sd sd] [- sd!2 -] [sd sd*2 sd sd] [sd sd*2 [- sd] sd]").dec(.4).slow(4).vel(.9),
    // s("[hh*2@11 oh@13]*4").dec(.4).vel(.35),
    // s("[boom,bd] [- boom,bd] - sd*2 ht*2 lt*2 [bl,sd]@2").dec(.5).vel("1@3 1.5@3 1.7@2").duck(2).duckdepth(.3).datt(.15).room("0@3 1").rsize("0@3 4").delay("0@3 1"), // bye
  )
    .bank("deadrums")
    .hpf(100)
    .gain(1)

$HIT:
  s("hit").slow(8)
    .bank("04-avy")
    .delay(0.5)
    .gain(0.4)

_$PREBRING: 
  s("nontech").bank("deadfx").loopAt(2).chop(16).crush(5).vel(.4).gain(.7).o(1).speed(.35)
  // s("nontech@3 [nontech@5 praisebe@3]".slow(4)).bank("deadfx").loopAt(2).chop(16).crush(5).vel(".4@3 [.4@3 .8]".slow(8)).gain(.7).o(1).speed(.35)
    .scrub("{0 6*2 0 0 6*2 0 5*2 7*2}%8".div(8)).delay(0.3)
    // .scrub(`{0@2 0 0@2 0@2 0@2 0 0@2 0@2 0@2}%16 {2@2 2 2@2 2@2 2@2 2 2@2 2@2 2@2}%16 {5@2 5 5@2 5@2 5@2 5 5@2 5@2 5@2}%16 <{4!12}%12 {0@2 3!2 0@2 0@2 3!2 0@2 0@2 3!2 0@2 0@2 3!2 0@2 5!2 5!2 7@2 4@2}%32>`.div(8).slow(8)).delay(0.5)
    // .scrub(`{0@2 0 0@2 0@2 0@2 0 0@2 0@2 0@2}%16 {2@2 2 2@2 2@2 2@2 2 2@2 2@2 2@2}%16 {5@2 5 5@2 5@2 5@2 5 5@2 5@2 5@2}%16 {0@2 3!2 0@2 0@2 3!2 0@2 0@2 3!2 0@2 0@2 0!4 0@8}%32`.div(8).slow(8)).delay(0.5)

const slidey = slider(0, 0, 100)
const cutoffFunc = x => x.mul(0).add(50).pow(x.div(100)).sub(1).mul(19980).div(49).add(20)

$BREAKS: s("groove").bank("yaxu-clean-breaks").loopAt(2).chop(16).segment(8)
  .pickF("<pat>", {
  // .pickF("<pat!7 <fillA fillB>>", {
    pat: x => x
      .when("0 1!3", x => x
        // .sometimesBy(.5, x => x.rib("0 | 2".div(8), .75))
       )
      .when("0 1!7".slow(2), x => x
        // .sometimesBy(.75, x => x.rib("0 | 2 | 3".div(8), ".5 | .25"))
        // .sometimesBy(.25, wchoose(
        //   [x => x.ply("4 | 6"), 3],
        //   [x => x.scrub("{2!4}%16".div(16)).speed(".3 .33 .36 .39".fast(4)), 1]
        // ))
       ),
    fillA: x => x.scrub("{0!3 0*2 2!2 2*3 2*6}%8".div(16)),
    fillB: x => x.scrub(stepcat([1, "0 0"], [3, run(32).div(32).add(4).div(32)])),
  })
  // .degradeBy(slider(0, 0, .75, .0625)) // die off
  .gain(.4)
  .compressor("-35:4:0:.03:.15")
  .chebyshev(".3:.25")
  .coarse(slidey.mul(-.03).add(4))
  .lpf(slidey.apply(cutoffFunc)).lpq(10)

all(x => x.postgain(1))

/*
██╗    ██╗    ██╗ ██████╗ ███╗   ██╗██████╗ ███████╗██████╗     ██╗    ██╗██╗  ██╗ ██████╗ ███████╗    ████████╗██╗  ██╗███████╗
██║    ██║    ██║██╔═══██╗████╗  ██║██╔══██╗██╔════╝██╔══██╗    ██║    ██║██║  ██║██╔═══██╗██╔════╝    ╚══██╔══╝██║  ██║██╔════╝
██║    ██║ █╗ ██║██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝    ██║ █╗ ██║███████║██║   ██║███████╗       ██║   ███████║█████╗  
██║    ██║███╗██║██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗    ██║███╗██║██╔══██║██║   ██║╚════██║       ██║   ██╔══██║██╔══╝  
██║    ╚███╔███╔╝╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║    ╚███╔███╔╝██║  ██║╚██████╔╝███████║       ██║   ██║  ██║███████╗
╚═╝     ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝     ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝       ╚═╝   ╚═╝  ╚═╝╚══════╝
                                                                                                                                
██████╗ ███████╗ █████╗ ██╗         ██╗      ██████╗ ███╗   ██╗██████╗  ██████╗     ██╗██████╗ ███████╗███╗   ██╗ ██████╗       
██╔══██╗██╔════╝██╔══██╗██║         ██║     ██╔═══██╗████╗  ██║██╔══██╗██╔═══██╗    ██║██╔══██╗██╔════╝████╗  ██║██╔════╝       
██████╔╝█████╗  ███████║██║         ██║     ██║   ██║██╔██╗ ██║██║  ██║██║   ██║    ██║██████╔╝█████╗  ██╔██╗ ██║██║  ███╗      
██╔══██╗██╔══╝  ██╔══██║██║         ██║     ██║   ██║██║╚██╗██║██║  ██║██║   ██║    ██║██╔══██╗██╔══╝  ██║╚██╗██║██║   ██║      
██║  ██║███████╗██║  ██║███████╗    ███████╗╚██████╔╝██║ ╚████║██████╔╝╚██████╔╝    ██║██║  ██║███████╗██║ ╚████║╚██████╔╝      
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝    ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝  ╚═════╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝     
*/

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
