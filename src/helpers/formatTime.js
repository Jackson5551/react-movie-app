export const formatTime = (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    return hours + "h " + minutes + "m"
}