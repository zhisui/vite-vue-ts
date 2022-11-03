import dayjs from 'dayjs';

export default (value?: string, format?: string) => {
    return value ? dayjs(value).format(format || 'YYYY-MM-DD HH:mm:ss') : '--';
}
