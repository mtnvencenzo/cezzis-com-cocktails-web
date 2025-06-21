import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * Executes the recaptcha call with a callback.  Note that the callback is provided only for mocking puposes during unit tests.
   the unit test implements calling the callback 
    
*/

export const executeRecaptcha = async (recaptchaRef: React.RefObject<ReCAPTCHA | null>, callback?: (token: string | null) => Promise<void>) => {
    if (!recaptchaRef?.current) {
        return;
    }

    if (callback) {
        // nothing to do, just disabling eslint error
        // primary used for mocking and callback isn't an implmentation thing
    }

    // initiate token retreive.  handleToken() will be called back to with the results of a token
    await recaptchaRef.current.executeAsync();
};

export const resetRecaptcha = (recaptchaRef: React.RefObject<ReCAPTCHA | null>) => {
    if (!recaptchaRef?.current) {
        return;
    }

    recaptchaRef.current.reset();
};
