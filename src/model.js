import _ from 'lodash';

function tryGetModel(...args) {
    const model = _.attempt(getModel, args);

    return _.isError(model) ? {} : model;
}

function getModelArray(scorm, key, children, count) {
     return Object.assign(
        {
            [`${key}._children`]: children,
            [`${key}._count`]: count
        },
        _.reduce(
            _.range(0, Number(count)),
            (memo, n) => Object.assign(
                memo,
                _.reduce(
                    children.split(','),
                    (memo2, childkey) => Object.assign(
                        memo2,
                        tryGetModel(scorm, `${key}.${n}.${childkey}`)
                    ),
                    {}
                )
            ),
            {}
        )
    );
}

function getModelChildren(scorm, key, children) {
     return Object.assign(
        { [`${key}._children`]: children },
        _.reduce(
            children.split(','),
            (memo, childkey) => Object.assign(
                memo,
                tryGetModel(scorm, `${key}.${childkey}`)
            ),
            {}
        )
    );
}

function getModel(scorm, key) {
    const val = scorm.GetValue(key);

    // if this key exists, just return it
    if (scorm.GetLastError() === '0') {
        return { [key]: val };
    }

    // if key doesn't exist, check for children
    const children = scorm.GetValue(`${key}._children`);

    const hasChildren = scorm.GetLastError() === '0';

    // if there are no children, exit
    // TODO: change this to `return {}`?
    if (!hasChildren) {
        throw new SCORMError(scorm);
    }

    // check to see if it's an array
    const count = scorm.GetValue(`${key}._count`);

    const isArray = scorm.GetLastError() === '0';

    if (!isArray) {
        return getModelChildren(scorm, key, children);
    }

    return getModelArray(scorm, key, children, count);
}

export default function getSCORMDataModel(scorm) {
    const children = scorm.GetValue('cmi._children');

    return Object.assign(
        { 'cmi._children': children },
        _.reduce(
            children.split(','),
            (memo, key) => Object.assign(
                memo,
                tryGetModel(scorm, `cmi.${key}`)
            ),
            {}
        )
    );
}