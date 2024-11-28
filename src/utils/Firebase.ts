import * as admin from "firebase-admin";
import {FIREBASE_JSON_PATH} from "./config";
import {app} from "firebase-admin";
import App = app.App;

export class Firebase {
    private static adminApp: App;

    public static setAdminApp = (): void => {
        Firebase.adminApp = Firebase.initializeFirebaseAdmin();
    }

    private static initializeFirebaseAdmin = (): App => {
        const serviceAccount = require(FIREBASE_JSON_PATH);
        admin.initializeApp({credential: admin.credential.cert(serviceAccount),});

        return admin.app();
    }


    public static getFirebaseMessaging = (): admin.messaging.Messaging => {
        if (!Firebase.adminApp) Firebase.setAdminApp();
        return Firebase.adminApp.messaging();
    }
}