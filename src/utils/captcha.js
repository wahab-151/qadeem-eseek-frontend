

export async function getCaptchaToken() {

    return new Promise(resolve =>{
   grecaptcha.ready(async () => {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (!siteKey) 
            { 
                console.error("RECAPTCHA_SITE_KEY is not set");
                resolve(null);
                return; 
            }

        const token = await grecaptcha.execute(siteKey, {
            action: "register"
        })
        resolve(token)
    })

    })
 
}