import dayjs from 'dayjs';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * 创建日历数据
 * author rencp
 * @param date 日期或日期字符串
 */
export const createCalendarDays = (date: Date | string): Array<Array<{ type: string, day: number, date: string }>> => {
    const days = dayjs(date).daysInMonth();
    const msd = dayjs(date).startOf('month'); //该月的第一天
    const med = dayjs(date).endOf('month'); //该月的最后一天
    const msdd = msd.day(); //该月第一天的星期数
    const medd = med.day(); //该月的最后一天的星期数
    const pmd = msdd;  //前面补齐的天数
    const nmd = 6 - medd;  //后面补齐的天数
    //格式化当前月每日
    const fdays = Array.from(new Array(days)).map((v, i) => {
        const date: string = msd.add(i, 'day').format('YYYY-MM-DD');
        return {
            type: 'cur',
            day: i + 1,
            date,
        };
    });
    //前面用上一个月补齐
    Array.from(new Array(pmd)).forEach((v, i) => {
        const date = msd.subtract(i + 1, 'day');
        fdays.unshift({
            type: 'prev',
            day: date.date(),
            date: date.format('YYYY-MM-DD'),
        });
    });
    //后面用下一个月补齐
    Array.from(new Array(nmd)).forEach((v, i) => {
        const date = med.add(i + 1, 'day');
        fdays.push({
            type: 'next',
            day: date.date(),
            date: date.format('YYYY-MM-DD'),
        });
    });
    const calendar = Array.from(new Array(fdays.length)).map((v, i) => {
        return fdays.slice(i * 7, (i + 1) * 7);
    });
    return calendar;
};

/**
 * 通用文件下载
 * author rencp
 * @param url 下载地址
 * @param name 下载文件名(带后缀名)
 * @param config 配置参数
 */
export const commDownload = (url: string, name?: string, config?: { http?: AxiosRequestConfig, onprogress?: Function }) => {
    const fileName = name || url.split('/').pop() as string;
    const ctrl = new AbortController();
    const promise = new Promise<void>((resolve, reject) => {
        const httpConfig: AxiosRequestConfig = {
            url,
            method: 'get',
            responseType: 'blob',
            timeout: 0,
            signal: ctrl.signal,
            onDownloadProgress(ev) {
                const { loaded, total } = ev as { loaded: number, total: number };
                const progress = loaded === total
                    ? 100
                    : (total === 0 ? 0 : Number((loaded / total * 100).toFixed(1)));
                config && config.onprogress && config.onprogress(progress);
            },
        };
        if (config && config.http) {
            Object.assign(httpConfig, config.http);
        }
        axios(httpConfig).then(({ data }) => {
            const link = document.createElement('a');
            const URL = window.URL || window.webkitURL;
            link.download = fileName;
            link.rel = 'noopener';
            link.target = '_blank';
            link.href = URL.createObjectURL(data);
            setTimeout(function () {
                URL.revokeObjectURL(link.href);
            }, 4E4); // 40s
            resolve();
            setTimeout(() => {
                try {
                    link.dispatchEvent(new MouseEvent('click'));
                } catch (e) {
                    var evt = document.createEvent('MouseEvents');
                    evt.initMouseEvent(
                        'click',
                        true,
                        true,
                        window,
                        0,
                        0,
                        0,
                        80,
                        20,
                        false,
                        false,
                        false,
                        false,
                        0,
                        null,
                    );
                    link.dispatchEvent(evt);
                }
            }, 0);
        }).catch(() => {
            reject();
        });
    });
    return { promise, cancel: () => ctrl.abort() };
};



