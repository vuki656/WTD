import dayjs from 'dayjs'

export const todayUnix = dayjs()
    .startOf('day')
    .unix()

export const unixToDate = (value: number) => {
    return dayjs(value * 1000).format('DD-MM-YYYY')
}
