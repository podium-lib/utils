import tap from 'tap';
import { Hints } from '../lib/hints.js';

tap.test(
    'PodiumHttpIncoming() - object tag - should be PodiumHttpIncoming',
    (t) => {
        const hints = new Hints();
        hints.addExpectedHint('foo');
        hints.addExpectedHint('bar');
        hints.addReceivedHint('foo');
        hints.addReceivedHint('bar');
        t.equal(hints.allHintsReceived, true);
        t.end();
    },
);
