export const getDaysElapsed = (lastDailyRewardClaimTime: any) => {
    // Convert the input date to a Date object if it isn't already
    const lastClaimTime: any = new Date(lastDailyRewardClaimTime);

    // Get the current date
    const now: any = new Date();

    // Calculate the difference in time (in milliseconds)
    const diffTime = now - lastClaimTime;

    // Convert the difference from milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Return the number of days elapsed, with a minimum of 0
    return Math.max(0, diffDays);
}