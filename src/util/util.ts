import { PlanItemModel } from './../data/models/Plan'
import { MenuGroupModel } from './../data/models/Menu'
import { MenuItemModel } from '../data/models/Menu'
import { useState } from 'react'

export const distinct = (value: any, index: any, self: string | any[]) =>
    self.indexOf(value) === index

export const toId = (
    value: MenuItemModel | MenuGroupModel | PlanItemModel,
    index: any,
    self: any[]
) => value.id

export const addWorkDays = (startDate: Date, days: number) => {
    // Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
    var dow = startDate.getDay()
    var daysToAdd = days
    // If the current day is Sunday add one day
    if (dow === 0) daysToAdd++
    // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
    if (dow + daysToAdd >= 6) {
        //Subtract days in current working week from work days
        var remainingWorkDays = daysToAdd - (5 - dow)
        //Add current working week's weekend
        daysToAdd += 2
        if (remainingWorkDays > 5) {
            //Add two days for each working week by calculating how many weeks are included
            daysToAdd += 2 * Math.floor(remainingWorkDays / 5)
            //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
            if (remainingWorkDays % 5 === 0) daysToAdd -= 2
        }
    }
    startDate.setDate(startDate.getDate() + daysToAdd)
    return startDate
}

export const getDefaultDeliveryDate = () =>
    addWorkDays(new Date(), 5).toISOString()

export const useForceUpdate = () => {
    const [val, setVal] = useState(false)
    return () => setVal(!val)
}

export const randString = (length: number = 16) => {
    const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return Array(length)
        .join()
        .split(',')
        .map(() => s.charAt(Math.floor(Math.random() * s.length)))
        .join('')
}
