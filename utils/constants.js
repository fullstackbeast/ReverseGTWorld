module.exports = {
    URLS: {
        BASEURL: "https://gtworld.gtbank.com/GTWorldApp/api",
        get STATEMENT() { return `${this.BASEURL}/Statement/statement-request` },
        get LOGIN() { return `${this.BASEURL}/Authentication/login-enc` },
        get HISTORY() { return `${this.BASEURL}/Account/new-account-history-two` }
    },
    CHANNEL: "GTWORLDv1.0",
            APPVERSION: "1.9.22",
    ENC_KEY: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAquiugN6mW6EsNIxDAVtFovN1yGHEaQNybzkgmBp+hbgfS5knFsMcPMRNE1NqM6fOLwnJue43PouBAIkdvVNfg6sKMeJpg2Lc8LyXjtSr0xnOR0JFxwHrPQGxw33G0oKdi7wFlhZYQvCdNNe59dS2uKuYx0PKgVJlcrdZdwYqdOdUTFcbt1U2WFLfjLdS5wph0CiNxMyfSbSoQzmTKsMeg4QKRO/ZZCVLjoOdhJdpAgrUL3nnLu5w90BDJDtR0AJoAbX0gi0daIh/XqU3+XRbLTPaWmpkHjGFpiN5PtOxwLr2uFrqw9sGH3aLUfGCNGGsdZKipacF5GcncRrv5rUFcQIDAQAB"
}