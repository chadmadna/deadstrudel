// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// Hydra Glitchy Slit Scan
// Flor de Fuego
// https://flordefuego.github.io/ 
s0.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnphMjFxdmY2c3VmenJ6M3dhNzZwbW1oNWR4djVpd3d0M3h1eGt5YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WjMnQiDQHbK6Y/giphy.mp4')
src(s0)
	.saturate(2)
	.contrast(1.3)
	.layer(src(o0)
		.mask(shape(4, 2)
		.scale(0.5, 0.7)
	.scrollX(0.4))
	.scrollX(0.003))
	.modulate(o0, 0.3)
	.out(o0)