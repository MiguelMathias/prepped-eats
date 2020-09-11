import { User } from 'firebase'
import { firestore } from '../../Firebase'

export interface UserDataModel {
    address: string
    favorites: string[]
    cartJSON: string
    ordersJSON: string
}

const adminUids = ['ZZtZrNJF71W3jOjQQ7VTVaoO2nx2']

export const userIsAdmin = (user: User | null) =>
    adminUids.includes(user?.uid || '')

export const updateUserFS = async (
    user: User | null,
    newUserData: UserDataModel,
    newUser?: {
        email?: string
        password?: string
        profile?: {
            displayName?: string | null
            photoURL?: string | null
        }
    }
) => {
    if (!user) return
    if (newUser) {
        if (newUser.email) await user.updateEmail(newUser.email)
        if (newUser.password) await user.updatePassword(newUser.password)
        //if (newUser.phone) await user.updatePhoneNumber(newUser.phone)
        if (newUser.profile) await user.updateProfile(newUser.profile)
    }
    await firestore.collection('users').doc(user.uid).set(newUserData)
}
