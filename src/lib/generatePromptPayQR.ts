export const generatePromptPayQR =  (amount: number) => {
    try {

        const promptpayId = process.env.NEXT_PUBLIC_PROMPTPAY_ID;

        const formattedAmount = amount.toFixed(2);

        const qrcodeDataUrl = `https://promptpay.io/${promptpayId}/${formattedAmount}`;

        return qrcodeDataUrl

    } catch (error) {
        console.error('Error generating PromptPay:', error);
        throw new Error('ไม่สามารภสร้าง QR Code ได้');
    }
}

generatePromptPayQR(1); // Example usage