const COLLECTION_END = 'users';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore()

export const createUser = async (user: any) => {
    return new Promise(async (resolve, reject) => {
        const id = await db.collection(COLLECTION_END).doc(user.email).set(user);
        console.log('ID', id)
        console.log('USUARIO CREADO', user)
        const nu = {...user}
        resolve(nu);
    });
}

export async function getUserById(idUser: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        await db.collection(`${COLLECTION_END}`).doc(idUser).get().then(a => { return a.data() }).then(d => resolve(d));
    });
}