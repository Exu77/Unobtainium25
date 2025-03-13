export class Util {
    private static readonly oneDay = 24 * 60 * 60 * 1000; 

    public static getDaysBetween(date1: Date, date2: Date): number {
        const milliesBetween = Math.abs(date1.getTime() - date2.getTime());
        return Math.round(milliesBetween / this.oneDay);
    }
}