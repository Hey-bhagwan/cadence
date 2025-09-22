// components/EnableNotificationsButton.tsx
'use client'

import { useState, useEffect } from "react";
import { saveSubscription } from '@/app/actions';

// Helper function to convert the VAPID key
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default function EnableNotificationsButton() {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.getSubscription().then(subscription => {
                    if (subscription) {
                        setIsSubscribed(true);
                    }
                });
            });
        }
    }, []);

    const subscribeUser = async () => {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
            });

            await saveSubscription(subscription);
            setIsSubscribed(true);
            alert('Notifications enabled!');
        } else {
            alert('Push notifications are not supported by your browser.');
        }
    };

    return (
        <div className="text-center my-4">
            <button 
                onClick={subscribeUser} 
                disabled={isSubscribed}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded disabled:bg-gray-400"
            >
                {isSubscribed ? 'Notifications Enabled' : 'Enable Notifications'}
            </button>
        </div>
    );
}