export const formatTime = (time: any) => {
    if (time === null || time <= 0) return "00h 00m";

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m`;
};