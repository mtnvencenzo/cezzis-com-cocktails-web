import { waitFor } from '@testing-library/react';
import { vi, expect } from 'vitest';

export interface ITestRunner {
    spyOn: Function;
    expect: Function;
    resetAllMocks: Function;
    waitingFor: Function;
}

export class Auth0ReactTesterPlugin {
    public static TestRunner: ITestRunner = {
        spyOn: typeof vi !== 'undefined' ? vi.spyOn : () => {},
        expect: typeof vi !== 'undefined' ? expect : () => {},
        resetAllMocks: typeof vi !== 'undefined' ? vi.resetAllMocks : () => {},
        waitingFor: typeof vi !== 'undefined' ? waitFor : () => {}
    };

    public static init(testRunner: ITestRunner | null = null) {
        if (testRunner) {
            Auth0ReactTesterPlugin.TestRunner = testRunner;
        }
    }
}
