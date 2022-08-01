window.onload = main;

function main() {
    var ctx = new AudioContext();

    var white_noise = createSoundWaveform(ctx, (i) => {
        return (Math.random() * 2 - 1) * 0.02;
    })
    var sin_wave = createSoundWaveform(ctx, (i) => {
        return Math.sin(i * 0.04) * 0.06;
    })
    var square_wave = createSoundWaveform(ctx, (i) => {
        return Math.sign(Math.sin(i * 0.04)) * 0.02;
    })
    var triangle_wave = createSoundWaveform(ctx, (i) => {
        return 2 * Math.abs(i / 156 - Math.floor(i / 156 + 0.5)) * 0.12;
    })
    var sawtooth_wave = createSoundWaveform(ctx, (i) => {
        return ((i / 156 - Math.floor(i / 156 + 0.5)) + 0.5) * 0.08;
    })

    var white_noise_button = document.querySelector("#whiteNoise");
    white_noise_button.addEventListener("click", e => {
        playSound(ctx, white_noise);
    })
    var sin_button = document.querySelector("#sinWave");
    sin_button.addEventListener("click", e => {
        playSound(ctx, sin_wave);
    })
    var square_button = document.querySelector("#squareWave");
    square_button.addEventListener("click", e => {
        playSound(ctx, square_wave);
    })
    var tri_button = document.querySelector("#triWave");
    tri_button.addEventListener("click", e => {
        playSound(ctx, triangle_wave);
    })
    var saw_button = document.querySelector("#sawWave");
    saw_button.addEventListener("click", e => {
        playSound(ctx, sawtooth_wave);
    })

}

function createSoundWaveform(ctx, modification_function) {
    var sound = ctx.createBuffer(2, ctx.sampleRate * 4, ctx.sampleRate);
    for(var channel = 0; channel < sound.numberOfChannels; channel++) {
        const buffer = sound.getChannelData(channel);
        for (var i = 0; i < sound.length; i++) {
            buffer[i] = modification_function(i);
        }
    }
    return sound;
}

function playSound(ctx, source) {
    const sound = ctx.createBufferSource();
    sound.buffer = source;
    sound.connect(ctx.destination);
    sound.start();
}