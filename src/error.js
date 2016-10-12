import ExtendableError from 'es6-error';

export default class SCORMError extends ExtendableError {
    constructor(scorm) {
        const errorCode = scorm.GetLastError();

        super(scorm.GetErrorString(errorCode));

        this.diagnostic = scorm.GetDiagnostic(errorCode);
    }
}
