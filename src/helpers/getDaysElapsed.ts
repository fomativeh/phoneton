export const getDaysElapsed = (lastDailyRewardClaimTime: any) => {
    // Convert the input date to a Date object if it isn't already
    const lastClaimTime:any = new Date(lastDailyRewardClaimTime);
    
    // Get the current date
    const now:any = new Date();
    
    // Calculate the difference in time (in milliseconds)
    const diffTime = now - lastClaimTime;
    
    // Convert the difference from milliseconds to "days" (where 1 day = 1 minute)
    const diffDays = Math.floor(diffTime / (1000 * 60));
    
    // Return the number of days elapsed, with a minimum of 0
    return Math.max(0, diffDays);
}