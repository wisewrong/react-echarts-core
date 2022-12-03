export declare const THEME_NAME = "charts-core-theme";
declare const theme: {
    tooltip: {
        borderWidth: number;
    };
    legend: {
        show: boolean;
        icon: string;
        orient: string;
        itemWidth: number;
        itemHeight: number;
        right: number;
        itemGap: number;
        textStyle: {
            color: string;
            fontSize: number;
        };
    };
    categoryAxis: {
        axisLine: {
            show: boolean;
        };
        splitLine: {
            show: boolean;
        };
        splitArea: {
            show: boolean;
        };
        axisTick: {
            show: boolean;
        };
    };
    valueAxis: {
        axisLine: {
            show: boolean;
        };
        splitLine: {
            lineStyle: {
                type: string;
            };
        };
        minInterval: number;
    };
};
export default theme;
