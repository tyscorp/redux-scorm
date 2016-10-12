import test from 'ava';
import * as actions from '../src/actions';
import * as actionTypes from '../src/action-types';



test('actions.initialize', (t) => {
    const type = actionTypes.INITIALIZE;
    const data1 = 1;
    const data2 = { hello: 'world' };

    t.deepEqual(actions.initialize(), { type, payload: undefined });
    t.deepEqual(actions.initialize(data1), { type, payload: data1 });
    t.deepEqual(actions.initialize(data2), { type, payload: data2 });
});

test('actions.reinitialize', (t) => {
    const type = actionTypes.REINITIALIZE;
    const data1 = 1;
    const data2 = { hello: 'world' };

    t.deepEqual(actions.reinitialize(), { type, payload: undefined });
    t.deepEqual(actions.reinitialize(data1), { type, payload: data1 });
    t.deepEqual(actions.reinitialize(data2), { type, payload: data2 });
});

test('actions.terminate', (t) => {
    const type = actionTypes.TERMINATE;
    const data1 = 1;
    const data2 = { hello: 'world' };

    t.deepEqual(actions.terminate(), { type });
    t.deepEqual(actions.terminate(data1), { type });
    t.deepEqual(actions.terminate(data2), { type });
});

test('actions.getValue', (t) => {
    const type = actionTypes.GET_VALUE;
    const data1 = 1;
    const data2 = { hello: 'world' };

    t.deepEqual(actions.getValue(), { type, payload: { element: undefined } });
    t.deepEqual(actions.getValue(data1), { type, payload: { element: data1 } });
    t.deepEqual(actions.getValue(data2), { type, payload: { element: data2 } });
});

test('actions.setValue', (t) => {
    const type = actionTypes.SET_VALUE;
    const data1 = 1;
    const data2 = { hello: 'world' };

    t.deepEqual(actions.setValue(), { type, payload: { element: undefined, value: undefined } });
    t.deepEqual(actions.setValue(data1), { type, payload: { element: data1, value: undefined } });
    t.deepEqual(actions.setValue(data2, data2), { type, payload: { element: data2, value: data2 } });
});
