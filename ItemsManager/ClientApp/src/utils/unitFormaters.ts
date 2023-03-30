import moment from 'moment'

export const formatDate = (date: Date, format: string) => {
    return moment(date).format(format)
}